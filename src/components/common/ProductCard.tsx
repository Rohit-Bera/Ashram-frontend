import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useGlobalContext } from '../../context/LangContext';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onAddToCart: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

export function ProductCard({ product, onView, onAddToCart, onToggleWishlist, isWishlisted }: ProductCardProps) {
  const { t } = useGlobalContext();

  return (
    <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between">
      <div
        onClick={() => onView(product)}
        className="relative h-48 bg-amber-50 cursor-pointer overflow-hidden group"
      >
        <img
          src={product.imageUrl}
          alt={t(product.name)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          referrerPolicy="no-referrer"
        />
        <span className="absolute top-3 left-3 bg-amber-950/80 backdrop-blur-md text-amber-100 text-[9px] font-bold font-mono px-2 py-0.5 rounded">
          {product.category}
        </span>
        {onToggleWishlist && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
            className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full shadow"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-amber-400'}`} />
          </button>
        )}
      </div>

      <div className="p-4 flex-1 text-left flex flex-col justify-between space-y-4">
        <div onClick={() => onView(product)} className="cursor-pointer">
          <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-1000 line-clamp-2 leading-tight">{t(product.name)}</h4>
          <p className="text-[11px] text-amber-700/80 mt-1 line-clamp-2 leading-relaxed">{t(product.description)}</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="font-mono font-bold text-sm text-amber-950">₹{product.price}</div>
          <button
            onClick={() => onAddToCart(product.id)}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold shadow transition-colors"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}
