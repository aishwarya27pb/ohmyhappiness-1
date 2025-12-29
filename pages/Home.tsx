
import React from 'react';
import { ArrowRight, Star, ShieldCheck, Zap, Heart, Package, Shield, Leaf, Coffee, Briefcase } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, category?: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const categories = [
    { name: 'Employee Welcome Kits', icon: <Briefcase className="w-8 h-8" />, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600', color: 'from-blue-600/20 to-indigo-600/20' },
    { name: 'Client Gifts', icon: <Shield className="w-8 h-8" />, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600', color: 'from-amber-600/20 to-orange-600/20' },
    { name: 'Eco-Friendly Gifts', icon: <Leaf className="w-8 h-8" />, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600', color: 'from-emerald-600/20 to-green-600/20' },
    { name: 'Drinkware', icon: <Coffee className="w-8 h-8" />, img: 'https://images.unsplash.com/photo-1602143307185-8a1a598103d1?auto=format&fit=crop&q=80&w=600', color: 'from-rose-600/20 to-pink-600/20' },
    { name: 'Promotional Products', icon: <Package className="w-8 h-8" />, img: 'https://images.unsplash.com/photo-1610940882244-1fbcfe928bc6?auto=format&fit=crop&q=80&w=600', color: 'from-slate-600/20 to-slate-900/20' },
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-full lg:w-1/2 h-full bg-amber-50/50 lg:rounded-bl-[200px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <Heart className="w-4 h-4 fill-current" />
                Spreading Joy at Work
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-slate-900 serif">
                Gift better, <br />
                <span className="text-rose-500 italic">feel happier.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Elevate your professional culture with curated gifts that say more than a thousand words. Welcome to <span className="font-bold text-slate-900">Oh My Happiness</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => onNavigate('catalog')}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-rose-600 transition-all shadow-xl hover:shadow-rose-100 active:scale-95"
                >
                  Browse Catalog
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onNavigate('ai')}
                  className="flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-2xl text-lg font-bold hover:border-amber-500 hover:text-amber-600 transition-all bg-white"
                >
                  Joy Concierge
                </button>
              </div>
              
              <div className="mt-16 flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-40 grayscale">
                <img src="https://picsum.photos/seed/l1/120/40" alt="Client" className="h-6" />
                <img src="https://picsum.photos/seed/l2/120/40" alt="Client" className="h-6" />
                <img src="https://picsum.photos/seed/l3/120/40" alt="Client" className="h-6" />
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2 px-6 lg:px-0">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
              <div className="relative animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" 
                  alt="Premium Happiness Box" 
                  className="rounded-3xl shadow-2xl object-cover aspect-square w-full"
                />
              </div>
              <div className="absolute -bottom-8 lg:-bottom-6 -left-2 lg:-left-6 bg-white p-5 lg:p-6 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-100 max-w-[280px]">
                <div className="bg-amber-100 p-3 rounded-full shrink-0">
                  <Star className="w-6 h-6 text-amber-600 fill-current" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Premium Service</p>
                  <p className="text-sm font-bold text-slate-900">4.9/5 Rating from 2k+ HR Leaders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 serif text-slate-900">Explore by <span className="text-rose-500">Corporate Need.</span></h2>
              <p className="text-lg text-slate-500">Whether it's the first day for a new hire or a token of appreciation for a loyal client, we have the perfect collection.</p>
            </div>
            <button 
              onClick={() => onNavigate('catalog')}
              className="text-slate-900 font-bold flex items-center gap-2 hover:text-rose-500 transition-colors group"
            >
              View all collections <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <div 
                key={cat.name}
                onClick={() => onNavigate('catalog', cat.name)}
                className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} group-hover:opacity-40 transition-opacity`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="mb-4 bg-white/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center text-white border border-white/30 group-hover:scale-110 group-hover:bg-rose-500 transition-all">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                    Explore <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 serif text-slate-900">The "Oh My Happiness" Difference</h2>
            <p className="text-lg text-slate-500">We don't just ship boxes; we deliver moments of genuine connection and surprise for modern teams.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Zap className="w-10 h-10 text-rose-500" />,
                title: "Joy-Centric AI",
                desc: "Our AI helps you choose gifts that resonate emotionally, ensuring your appreciation is felt deeply."
              },
              {
                icon: <Heart className="w-10 h-10 text-amber-500" />,
                title: "Curated Luxury",
                desc: "Every item is hand-selected from artisanal brands that prioritize quality, ethics, and 'the wow factor'."
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-indigo-500" />,
                title: "Stress-Free Logistics",
                desc: "We handle global customs, multi-address shipping, and last-mile tracking so you never have to worry."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl transition-all duration-300">
                <div className="mb-8 bg-white w-20 h-20 rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Social Proof / Impact */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-12">Trusted by visionary companies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                <div className="flex justify-center text-2xl font-black text-slate-300">TECHFLOW</div>
                <div className="flex justify-center text-2xl font-black text-slate-300">NEXUS</div>
                <div className="flex justify-center text-2xl font-black text-slate-300">VANTAGE</div>
                <div className="flex justify-center text-2xl font-black text-slate-300">ZENITH</div>
            </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 px-4 relative">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-10 lg:p-20 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -ml-20 -mb-20" />
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 serif">Start your journey to <br/><span className="text-rose-400">happier business.</span></h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Join the revolution in employee engagement. From one gift to ten thousand, we make it magical.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => onNavigate('login')}
                  className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-rose-50 transition-colors shadow-xl"
                >
                  Create Account
                </button>
                <button className="bg-transparent border-2 border-slate-700 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-colors">
                  Contact Sales
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
