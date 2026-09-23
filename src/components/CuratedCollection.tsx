import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage';

export const CuratedCollection: React.FC = () => {
  const collections = [
    {
      title: 'Everyday Essentials',
      description: 'Understated organic hoodies, heavyweight knitwear, and modular commuter carry.',
      cta: 'Explore Essentials',
      link: '/shop?category=Fashion',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Modern Tech',
      description: 'Active noise-cancelling acoustics, titanium biometric watches, and wireless audio.',
      cta: 'Explore Tech',
      link: '/shop?category=Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Weekend Style',
      description: 'Engineered running shoes, polarized sunglasses, and insulated vessels.',
      cta: 'Explore Weekend',
      link: '/shop?category=Fitness',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F7F7F5] border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] block mb-1">
              Curated For You
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111]">
              Architected For Daily Life
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#111111] hover:text-[#FF5A36] flex items-center gap-1 transition-colors"
          >
            <span>View All Lookbooks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#E8E8E8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE9E5]">
                <ProductImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-2 group-hover:text-[#FF5A36] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#737373] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] group-hover:text-[#FF5A36] transition-colors"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
