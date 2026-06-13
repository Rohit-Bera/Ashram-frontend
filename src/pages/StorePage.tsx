import { useState, useEffect } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { useGlobalContext } from '../context/LangContext';
import { ProductCard } from '../components/common/ProductCard';
import { StarRating } from '../components/common/StarRating';
import { Product } from '../types';

interface StorePageProps {
  viewedProduct: Product | null;
  setViewedProduct: (product: Product | null) => void;
  initialCategory?: string;
  onToast: (msg: string) => void;
}

const CATEGORIES = ['All', 'Books', 'Clothing', 'Accessories', 'Spiritual Items', 'Donations'];

export function StorePage({ viewedProduct, setViewedProduct, initialCategory, onToast }: StorePageProps) {
  const { t, products, addToCart, wishlist, toggleWishlist } = useGlobalContext();
  const [productCategory, setProductCategory] = useState(initialCategory || 'All');
  const [storeSearch, setStoreSearch] = useState('');

  useEffect(() => {
    if (initialCategory) setProductCategory(initialCategory);
  }, [initialCategory]);

  const filteredProducts = products.filter(p => {
    if (productCategory !== 'All' && p.category !== productCategory) return false;
    if (storeSearch && !t(p.name).toLowerCase().includes(storeSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Divine E-Store</span>
        <h3 className="text-3xl font-serif text-amber-950 mt-2 font-medium">Sacred Seva Marketplace</h3>
        <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
          Support our farm ashrams and cow care centers by purchasing authentic translation commentaries, original tulsi malas, organic incense, and clothing.
        </p>
      </div>

      {viewedProduct ? (
        <div className="bg-white rounded-3xl border border-amber-100 p-6 md:p-8 shadow-sm animate-in zoom-in-95 duration-150 text-left">
          <button
            onClick={() => setViewedProduct(null)}
            className="text-xs text-amber-900 border border-amber-200 rounded-lg px-3 py-1.5 hover:bg-amber-50 transition-colors mb-6"
          >
            ← Back to Store listings
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-2xl border border-amber-100 shadow bg-amber-50">
              <img
                src={viewedProduct.imageUrl}
                alt={t(viewedProduct.name)}
                className="w-full h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-amber-600 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full shadow">
                {viewedProduct.category}
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-serif font-bold text-amber-1000 leading-tight">{t(viewedProduct.name)}</h2>
                <div className="mt-2">
                  <StarRating rating={viewedProduct.rating} count={viewedProduct.reviews.length} />
                </div>
              </div>

              <div className="text-3xl font-bold font-mono text-amber-950 flex items-baseline gap-1">
                ₹{viewedProduct.price}
                <span className="text-[10px] text-amber-600/70 font-sans tracking-wide">Donation inclusions</span>
              </div>

              <div className="text-xs text-amber-900 leading-relaxed font-serif bg-amber-50 p-4 border border-amber-100 rounded-xl">
                <span className="font-bold text-amber-950 uppercase tracking-widest text-[9px] block mb-1">Wisdom specifications</span>
                {t(viewedProduct.description)}
              </div>

              <div className="pt-3 flex gap-3 items-center">
                <div className="text-xs">
                  <span className="text-amber-800 block">Inventory metrics:</span>
                  <span className={`font-bold font-mono ${viewedProduct.stock > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {viewedProduct.stock > 0 ? `In Stock (${viewedProduct.stock} items)` : 'SOLD OUT'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    addToCart(viewedProduct.id);
                    onToast('Product added to Seva Cart! Open cart to check details.');
                  }}
                  disabled={viewedProduct.stock <= 0}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add item to Seva Cart
                </button>
              </div>

              <div className="flex justify-between items-center bg-amber-50 p-3 rounded-xl border border-amber-100 text-[10px] text-amber-800">
                <span>✓ Dispatch from Goshala directly</span>
                <span>✓ Sanctified Prasadam items</span>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-100 mt-10 pt-6 space-y-4">
            <h3 className="text-base font-serif font-bold text-amber-950">Devotee Reviews & Experience logs</h3>
            {viewedProduct.reviews.length === 0 ? (
              <p className="text-xs text-amber-700 italic">No reviews registered for this item yet. Be the first to express experiences!</p>
            ) : (
              <div className="space-y-4 max-w-xl">
                {viewedProduct.reviews.map(rev => (
                  <div key={rev.id} className="bg-amber-50/10 border border-amber-50 rounded-xl p-4 space-y-1.5 text-xs text-left">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-950">{rev.userName}</span>
                      <span className="text-[10px] text-amber-600 font-mono">{rev.date}</span>
                    </div>
                    <StarRating rating={rev.rating} size="sm" />
                    <p className="text-amber-850 font-serif leading-relaxed italic">" {rev.comment} "</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          <div className="md:col-span-3 bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-4 text-xs text-left">
            <div>
              <h4 className="font-bold text-amber-950 uppercase text-[10px] tracking-wider mb-2.5">Category</h4>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setProductCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
                      productCategory === cat
                        ? 'bg-amber-50 text-amber-950 font-bold border-l-4 border-amber-600 pl-2'
                        : 'text-amber-800 hover:bg-amber-50/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-amber-100 pt-3">
              <h4 className="font-bold text-amber-950 uppercase text-[10px] tracking-wider mb-2">Search items</h4>
              <div className="relative">
                <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-amber-500" />
                <input
                  type="text"
                  placeholder="Type scriptures title..."
                  value={storeSearch}
                  onChange={e => setStoreSearch(e.target.value)}
                  className="w-full text-xs max-w-full bg-[#fcf9f4] border border-amber-200 rounded p-1.5 pl-7 focus:outline-none"
                />
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-[10px] text-amber-800 border border-amber-100/50 leading-relaxed font-serif">
              🏵️ Support Vedic cow farms and Gurukul educations direct with every transaction.
            </div>
          </div>

          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(item => (
              <ProductCard
                key={item.id}
                product={item}
                onView={setViewedProduct}
                onAddToCart={(id) => {
                  addToCart(id);
                  onToast('List added to Seva Cart!');
                }}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.includes(item.id)}
              />
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
