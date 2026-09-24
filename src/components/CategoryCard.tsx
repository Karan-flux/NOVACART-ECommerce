import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  count?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, count }) => {
  return (
    <Link
      to={`/category/${id}`}
      className="group relative block aspect-4/5 rounded-2xl overflow-hidden bg-[#F7F7F5] border border-[#E8E8E8] shadow-xs hover:shadow-md transition-all duration-300"
    >
      {/* Background Image */}
      <ProductImage
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end">
        {count && (
          <span className="text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1">
            {count}
          </span>
        )}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          {name}
        </h3>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF5A36] group-hover:text-white transition-colors">
          <span>Shop Now</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </Link>
  );
};
