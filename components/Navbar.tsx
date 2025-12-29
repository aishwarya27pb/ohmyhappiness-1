
import React, { useState } from 'react';
import { ShoppingCart, User, Menu, LogOut, Heart, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  user: any;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, user, onLogout, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className="bg-gradient-to-br from-amber-400 to-rose-500 p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <span className="sr-only">Oh My Happiness</span>
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 serif">Oh My <span className="text-rose-500">Happiness</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('home')} className="text-sm font-semibold text-slate-600 hover:text-rose-500 transition-colors">Home</button>
            <button onClick={() => navigate('catalog')} className="text-sm font-semibold text-slate-600 hover:text-rose-500 transition-colors">Catalog</button>
            <button onClick={() => navigate('ai')} className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-2">
              AI Concierge
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">PREMIUM</span>
            </button>
            <button onClick={() => navigate('about')} className="text-sm font-semibold text-slate-600 hover:text-rose-500 transition-colors">Bulk Orders</button>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('cart')}
              className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center gap-4 ml-2">
                  <button 
                    onClick={() => navigate('dashboard')}
                    className="flex items-center space-x-2 text-sm font-bold text-slate-700 hover:text-rose-500"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300">
                      <User className="w-4 h-4" />
                    </div>
                    <span>{user.name}</span>
                  </button>
                  <button onClick={onLogout} className="text-slate-400 hover:text-red-500 p-2 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('login')}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
                >
                  Sign In
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-4 pb-8 space-y-4">
            <button onClick={() => navigate('home')} className="block w-full text-left px-4 py-3 text-lg font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">Home</button>
            <button onClick={() => navigate('catalog')} className="block w-full text-left px-4 py-3 text-lg font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">Catalog</button>
            <button onClick={() => navigate('ai')} className="block w-full text-left px-4 py-3 text-lg font-semibold text-amber-600 hover:bg-slate-50 rounded-xl">AI Concierge</button>
            <button onClick={() => navigate('about')} className="block w-full text-left px-4 py-3 text-lg font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">Bulk Orders</button>
            <div className="pt-4 border-t border-slate-100">
              {user ? (
                <>
                  <button onClick={() => navigate('dashboard')} className="block w-full text-left px-4 py-3 text-lg font-semibold text-slate-800">My Dashboard</button>
                  <button onClick={onLogout} className="block w-full text-left px-4 py-3 text-lg font-semibold text-red-500">Sign Out</button>
                </>
              ) : (
                <button 
                  onClick={() => navigate('login')}
                  className="w-full bg-rose-500 text-white py-4 rounded-xl text-lg font-bold shadow-lg"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
