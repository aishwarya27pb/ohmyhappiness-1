
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Home from './pages/Home';
import AIConcierge from './pages/AIConcierge';
import Dashboard from './pages/Dashboard';
import { PRODUCTS } from './constants';
import { Product, CartItem, User } from './types';
import { ShoppingCart, Trash2, ChevronRight, X, Heart, Search, SlidersHorizontal, Package, CheckCircle2, User as UserIcon, Lock, Mail, Filter, ArrowUpDown } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtering & Sorting State
  const [sortBy, setSortBy] = useState('Popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [stockOnly, setStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Form states
  const [authForm, setAuthForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const categories = [
    'All', 
    'Employee Welcome Kits', 
    'Client Gifts', 
    'Eco-Friendly Gifts', 
    'Employee Gifts', 
    'Drinkware', 
    'Promotional Products',
    'Electronics',
    'Stationery',
    'Food & Beverage',
    'Wellness',
    'Apparel'
  ];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && authForm.password !== authForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const authenticatedUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: isSignUp ? authForm.username : (authForm.email.split('@')[0] || 'User'),
      email: authForm.email,
      company: 'Corporate Partner',
      role: 'buyer'
    };
    setUser(authenticatedUser);
    setShowLogin(false);
    setAuthForm({ username: '', email: '', password: '', confirmPassword: '' });
    setCurrentPage('dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.selectedColor === item.selectedColor);
      if (existing) {
        return prev.map(i => (i.id === item.id && i.selectedColor === item.selectedColor) 
          ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const processedProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesStock = stockOnly ? p.inStock : true;
      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    });

    // Apply Sorting
    switch (sortBy) {
      case 'Price: Low to High': result.sort((a, b) => a.price - b.price); break;
      case 'Price: High to Low': result.sort((a, b) => b.price - a.price); break;
      case 'Name: A-Z': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'Rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    
    return result;
  }, [activeCategory, searchQuery, priceRange, stockOnly, sortBy]);

  const handleNavigation = (page: string, category?: string) => {
    if (page === 'login') {
      setIsSignUp(false);
      setShowLogin(true);
    } else {
      setCurrentPage(page);
      if (category) setActiveCategory(category);
      window.scrollTo(0, 0);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={handleNavigation} />;
      case 'ai': return <AIConcierge />;
      case 'dashboard': return <Dashboard />;
      case 'catalog':
        return (
          <div className="animate-in fade-in duration-500">
            <div className="bg-slate-900 py-24 px-4 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full blur-3xl -mr-32 -mt-32" />
                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl -ml-48 -mb-48" />
               </div>
               <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-5xl md:text-7xl font-bold text-white serif mb-8">Corporate <span className="text-rose-400 italic">Solutions</span></h1>
                <p className="text-slate-400 text-xl leading-relaxed mb-12">
                  Elevate your company's gifting strategy with our premium collections. 
                  We specialize in branded products that employees and clients actually keep.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-white/70 text-sm font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-rose-500" /> Custom Branding</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-rose-500" /> Global Fulfillment</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-rose-500" /> Eco-Friendly Options</div>
                </div>
               </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
              {/* Toolbar */}
              <div className="sticky top-24 z-40 space-y-4 mb-20">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl border border-slate-100">
                  <div className="flex flex-wrap gap-2 justify-center overflow-x-auto max-w-full lg:max-w-none pb-2 lg:pb-0">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all min-w-max ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-grow lg:w-80">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search the vault..."
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-rose-500 outline-none font-medium text-slate-900"
                      />
                    </div>
                    <button 
                      onClick={() => setShowFilters(!showFilters)}
                      className={`p-4 rounded-2xl transition-all ${showFilters ? 'bg-rose-500 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                      <SlidersHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Filters Drawer */}
                {showFilters && (
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 animate-in slide-in-from-top-4 duration-300">
                    <div className="grid md:grid-cols-3 gap-12">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                          <ArrowUpDown className="w-4 h-4" /> Sort By
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {['Popular', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z', 'Rating'].map(option => (
                            <button
                              key={option}
                              onClick={() => setSortBy(option)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold border ${sortBy === option ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Price Range</h4>
                        <div className="flex items-center gap-4">
                          <input 
                            type="range" 
                            min="0" 
                            max="500" 
                            step="10"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                            className="flex-grow accent-rose-500"
                          />
                          <span className="font-black text-slate-900 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                            Up to ${priceRange[1]}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Availability</h4>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div 
                            onClick={() => setStockOnly(!stockOnly)}
                            className={`w-14 h-8 rounded-full transition-all relative ${stockOnly ? 'bg-rose-500' : 'bg-slate-200'}`}
                          >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${stockOnly ? 'left-7' : 'left-1 shadow-sm'}`} />
                          </div>
                          <span className="font-bold text-slate-700">Show only In Stock</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Grid */}
              <div className="mb-10 flex items-center gap-4">
                <h2 className="text-3xl font-bold text-slate-900 serif">
                  {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory}
                </h2>
                <span className="text-slate-400 font-bold">({processedProducts.length} items)</span>
              </div>
              
              {processedProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {processedProducts.map(p => (
                    <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                  <Package className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No items match your criteria</h3>
                  <p className="text-slate-400">Try adjusting your filters or price range.</p>
                  <button 
                    onClick={() => {setActiveCategory('All'); setSearchQuery(''); setPriceRange([0, 1000]); setStockOnly(false);}}
                    className="mt-8 text-rose-500 font-black uppercase tracking-widest text-sm hover:underline"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'cart':
        return (
          <div className="max-w-5xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-slate-900 serif mb-12">Your Happiness <span className="text-rose-500">Selections</span></h1>
            {cart.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
                <ShoppingCart className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                <p className="text-slate-500 text-xl mb-8 font-medium">Your quote is currently empty.</p>
                <button 
                  onClick={() => setCurrentPage('catalog')}
                  className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-rose-500 transition-all shadow-xl"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="bg-white p-8 rounded-[2rem] flex flex-col sm:flex-row items-center gap-8 border border-slate-100 shadow-sm">
                      <img src={item.image} className="w-32 h-32 rounded-2xl object-cover shadow-md" />
                      <div className="flex-grow text-center sm:text-left">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-2xl text-slate-900">{item.name}</h3>
                            <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest font-black">{item.category}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-200 hover:text-red-500 transition-colors p-2">
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
                          {item.selectedColor && <span className="bg-slate-50 px-3 py-1 rounded-lg">Color: {item.selectedColor}</span>}
                          {item.giftMessage && <span className="bg-rose-50 text-rose-500 px-3 py-1 rounded-lg">Custom Msg Included</span>}
                        </div>
                        <div className="mt-8 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-300 uppercase">Per Item</span>
                            <span className="font-black text-slate-900 text-xl">${item.price}</span>
                          </div>
                          <div className="bg-slate-900 text-white px-6 py-2 rounded-xl text-lg font-black">
                            Qty: {item.quantity}
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-xs font-black text-slate-300 uppercase">Subtotal</span>
                            <span className="font-black text-slate-900 text-xl">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl h-fit sticky top-28">
                  <h2 className="text-2xl font-bold mb-8 serif">Quote Summary</h2>
                  <div className="space-y-5 mb-10">
                    <div className="flex justify-between text-slate-500 text-lg">
                      <span>Total Items</span>
                      <span className="font-bold text-slate-900">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-lg">
                      <span>Logistics</span>
                      <span className="text-emerald-500 font-black">COMPLIMENTARY</span>
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex justify-between font-black text-4xl text-slate-900">
                      <span>Total</span>
                      <span>${cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-xl hover:bg-rose-500 transition-all flex items-center justify-center gap-3 shadow-2xl hover:shadow-rose-100">
                    Finalize Quote
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      default: return <Home onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-rose-100 selection:text-rose-900">
      <Navbar 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        user={user} 
        onLogout={handleLogout}
        onNavigate={handleNavigation}
      />
      <div className="flex-grow">{renderPage()}</div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}

      {/* Footer & Auth Modal same as before */}
      {/* ... (footer remains same) ... */}
      <footer className="bg-white border-t border-slate-200 py-24 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-8">
                <div className="bg-rose-500 p-2 rounded-xl shadow-lg">
                  <Heart className="w-6 h-6 text-white fill-current" />
                </div>
                <span className="text-2xl font-bold text-slate-900 serif">Oh My <span className="text-rose-500">Happiness</span></span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Designing moments of corporate joy through artisanal quality and intelligent curation.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-[0.2em] text-slate-900 text-xs mb-8">Collections</h4>
              <ul className="space-y-5 text-slate-500 font-bold">
                {categories.filter(c => c !== 'All').map(c => (
                  <li key={c} onClick={() => {handleNavigation('catalog', c);}} className="hover:text-rose-500 cursor-pointer transition-colors">{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-[0.2em] text-slate-900 text-xs mb-8">Support</h4>
              <ul className="space-y-5 text-slate-500 font-bold">
                <li className="hover:text-rose-500 cursor-pointer">Shipping Policy</li>
                <li className="hover:text-rose-500 cursor-pointer">Bulk Discounts</li>
                <li className="hover:text-rose-500 cursor-pointer">Branding Guide</li>
                <li className="hover:text-rose-500 cursor-pointer">Sustainability</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-[0.2em] text-slate-900 text-xs mb-8">Corporate Joy</h4>
              <p className="text-slate-500 mb-6 font-medium">Join 2,000+ HR leaders receiving our weekly happiness insights.</p>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Business email" 
                  className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm w-full focus:ring-2 focus:ring-rose-500 outline-none font-bold"
                />
                <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-rose-500 transition-all shadow-xl">Join List</button>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
            <p>© 2024 Oh My Happiness Inc. All Rights Reserved.</p>
            <div className="flex gap-12">
              <span className="hover:text-slate-900 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-900 cursor-pointer">Terms</span>
              <span className="hover:text-slate-900 cursor-pointer">Logistics</span>
            </div>
          </div>
        </div>
      </footer>

      {showLogin && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setShowLogin(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden p-10 animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowLogin(false)} className="absolute top-8 right-8 p-2.5 text-slate-300 hover:text-slate-900 transition-all">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center bg-gradient-to-br from-rose-500 to-rose-600 p-5 rounded-[1.5rem] mb-6 shadow-2xl shadow-rose-100">
                <Heart className="w-8 h-8 text-white fill-current" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 serif">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
              <p className="text-slate-500 mt-2 text-sm">{isSignUp ? 'Join our corporate gifting platform today.' : 'Enter your details to access your portal.'}</p>
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignUp && (
                <div className="relative">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-2">Username</label>
                  <div className="relative">
                    <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input type="text" name="username" required value={authForm.username} onChange={handleInputChange} placeholder="Display Name" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.2rem] px-12 py-3.5 focus:border-rose-500 outline-none transition-all text-base font-bold" />
                  </div>
                </div>
              )}
              <div className="relative">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input type="email" name="email" required value={authForm.email} onChange={handleInputChange} placeholder="name@company.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.2rem] px-12 py-3.5 focus:border-rose-500 outline-none transition-all text-base font-bold" />
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between mb-2 ml-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
                  {!isSignUp && <button type="button" className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:underline">Forgot Password?</button>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input type="password" name="password" required value={authForm.password} onChange={handleInputChange} placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.2rem] px-12 py-3.5 focus:border-rose-500 outline-none transition-all text-base font-bold" />
                </div>
              </div>
              {isSignUp && (
                <div className="relative">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input type="password" name="confirmPassword" required value={authForm.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.2rem] px-12 py-3.5 focus:border-rose-500 outline-none transition-all text-base font-bold" />
                  </div>
                </div>
              )}
              <button type="submit" className="w-full bg-slate-900 text-white py-4.5 rounded-[1.2rem] font-black text-lg hover:bg-rose-500 transition-all shadow-xl hover:shadow-rose-100 active:scale-95 mt-4">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>
            <div className="mt-8 text-center border-t border-slate-100 pt-6">
              <p className="text-sm text-slate-500 font-medium">
                {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
                <button onClick={() => setIsSignUp(!isSignUp)} className="text-rose-500 font-bold hover:underline">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
