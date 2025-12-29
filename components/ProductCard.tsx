
import React from 'react';
import { Star, Plus, Sparkles, Ban } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 ease-out border border-slate-100 flex flex-col h-full cursor-pointer ${!product.inStock ? 'opacity-75' : ''}`}
    >
      <div className="relative aspect-[1/1] overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-slate-100">
            {product.category}
          </span>
          {product.isCustomizable && (
            <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Customizable
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
              <Ban className="w-3 h-3" /> Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-500 transition-colors leading-tight">{product.name}</h3>
          <div className="flex items-center text-amber-500 shrink-0 ml-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-black text-slate-900">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-grow leading-relaxed italic">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Starts at</span>
            <span className="text-2xl font-black text-slate-900 transition-colors group-hover:text-rose-600">${product.price}</span>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg group-hover:shadow-rose-100 group-hover:rotate-90 ${product.inStock ? 'bg-slate-900 text-white group-hover:bg-rose-500' : 'bg-slate-100 text-slate-300'}`}>
            <Plus className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
