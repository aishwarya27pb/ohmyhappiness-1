
import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Check, Upload, MessageSquare, Minus, Plus } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [giftMessage, setGiftMessage] = useState('');
  
  const totalPrice = quantity * product.price;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [onClose]);

  const handleAdd = () => {
    if (!product.inStock) return;
    onAddToCart({
      ...product,
      quantity,
      selectedColor,
      giftMessage
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      <div className="relative bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-300 max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-2.5 bg-white/80 backdrop-blur rounded-full text-slate-900 hover:bg-white shadow-xl transition-all hover:scale-110 active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full lg:w-1/2 bg-slate-50 h-64 lg:h-auto overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-black uppercase tracking-widest shadow-2xl">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-16 overflow-y-auto">
          <div className="mb-8">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-500 mb-4 block">{product.category}</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 serif mb-4">{product.name}</h2>
            <p className="text-lg text-slate-500 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-10">
            {product.colors && (
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Choose Color Theme</label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${selectedColor === color ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-600 border-slate-100 hover:border-rose-200'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.isCustomizable && (
              <div className="grid md:grid-cols-2 gap-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 mb-4">
                    <Upload className="w-4 h-4" />
                    Logo Branding
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-rose-300 transition-colors cursor-pointer group">
                    <p className="text-xs text-slate-400 font-medium group-hover:text-rose-500">Click to upload .SVG or .PNG</p>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 mb-4">
                    <MessageSquare className="w-4 h-4" />
                    Personal Message
                  </label>
                  <textarea 
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="E.g. 'Welcome to the Team!'"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none h-20 resize-none"
                  />
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                <div className="flex items-center gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Quantity</label>
                    <div className="flex items-center bg-slate-50 rounded-2xl border-2 border-slate-100">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <input 
                        type="number" 
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 bg-transparent border-none text-center text-xl font-black text-slate-900 focus:ring-0 outline-none"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-slate-100" />
                  <div>
                    <span className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Price Each</span>
                    <span className="text-xl font-black text-slate-900">${product.price}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Est. Total</span>
                  <span className="text-4xl font-black text-slate-900">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`w-full py-6 rounded-3xl font-black text-xl transition-all shadow-2xl flex items-center justify-center gap-3 ${product.inStock ? 'bg-slate-900 text-white hover:bg-rose-500 hover:shadow-rose-100 active:scale-[0.98]' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
              >
                {product.inStock ? (
                  <>
                    <ShoppingBag className="w-6 h-6" />
                    Add to Gifting Quote
                  </>
                ) : (
                  'Currently Unavailable'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
