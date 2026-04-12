import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, X, ChevronRight } from 'lucide-react';
import { products } from '../sections/Products';
import type { Product } from '../sections/Products';

const categories = [
  'All',
  'Highway & Infrastructure',
  'Airport & Heavy-Duty',
  'Metro, Rail & Tunnel',
  'Pharmaceutical & Food-Grade',
  'Dam & Water Infrastructure',
];

function ProductPopup({ product, onClose }: { product: Product; onClose: () => void }) {
  const [activeType, setActiveType] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const imgs = product.images && product.images.length > 1 ? product.images : null;

  useEffect(() => {
    if (!imgs) return;
    const t = setInterval(() => setImgIndex(i => (i + 1) % imgs.length), 3000);
    return () => clearInterval(t);
  }, [imgs]);

  const prev = () => imgs && setImgIndex(i => (i - 1 + imgs.length) % imgs.length);
  const next = () => imgs && setImgIndex(i => (i + 1) % imgs.length);
  const currentImg = imgs ? imgs[imgIndex] : product.image;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-[#111111] rounded-3xl overflow-hidden w-full max-w-5xl border border-white/10 shadow-2xl flex flex-col lg:flex-row h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-[#FFD700] hover:text-black transition-all">
          <X className="w-5 h-5" />
        </button>

        {/* Left — Image / Carousel */}
        <div className="lg:w-2/5 flex-shrink-0 relative">
          <div className="h-48 lg:h-full overflow-hidden">
            <img src={currentImg} alt={product.name} className="w-full h-full object-cover transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
          </div>
          {imgs && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-[#FFD700] hover:text-black transition-all">
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-[#FFD700] hover:text-black transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5 z-10">
                {imgs.map((_, i) => (
                  <button key={i} onClick={() => setImgIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${i === imgIndex ? 'bg-[#FFD700] w-4' : 'bg-white/40 w-1.5'}`}
                  />
                ))}
              </div>
            </>
          )}
          <div className="absolute bottom-4 left-4">
            <span className="text-xs bg-[#FFD700] text-black font-semibold px-3 py-1.5 rounded-full">{product.category}</span>
          </div>
        </div>

        {/* Right — Content */}
        <div className="flex-1 overflow-y-auto p-7 lg:p-10 flex flex-col gap-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white font-display mb-1">
              {product.name}
            </h3>
            <div className="w-12 h-0.5 bg-[#FFD700] mt-3" />
          </div>

          <div className="space-y-3">
            {product.about.map((para, i) => (
              <p key={i} className="text-gray-400 text-sm leading-relaxed">{para}</p>
            ))}
          </div>

          {/* Coupler Type Switcher */}
          {product.types && (
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold mb-3">
                Coupler Types
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.types.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveType(i)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                      activeType === i
                        ? 'bg-[#FFD700] text-black border-[#FFD700]'
                        : 'border-white/10 text-gray-400 hover:border-[#FFD700]/50 hover:text-[#FFD700]'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              <div className="border border-white/10 rounded-xl p-4">
                <p className="text-sm font-semibold text-white mb-2">{product.types[activeType].name}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{product.types[activeType].description}</p>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold mb-3">
              Key Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <ChevronRight className="w-4 h-4 text-[#FFD700] flex-shrink-0 mt-0.5" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-5 border-t border-white/10">
            <p className="text-xs text-gray-500">
              All products are fully customizable based on client drawings, samples, dimensions, material specifications, hardness (Shore A), and environmental conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllProductsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-dark px-6 lg:px-12 py-4 flex items-center gap-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#FFD700] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <span className="text-2xl font-bold font-display">
          AAR<span className="text-[#FFD700]">DHA</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-4">
            All <span className="text-[#FFD700]">Products</span>
          </h1>
          <p className="text-gray-400 text-lg">Precision rubber components for critical infrastructure</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-[#FFD700] text-black border-[#FFD700]'
                  : 'border-white/10 text-gray-400 hover:border-[#FFD700]/50 hover:text-[#FFD700]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelected(product)}
              className="group bg-[#1A1A1A] rounded-2xl overflow-hidden cursor-pointer hover:border-[#FFD700]/30 border border-white/5 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-[#FFD700]/70 uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#FFD700] transition-colors">{product.name}</h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{product.about[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <ProductPopup product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
