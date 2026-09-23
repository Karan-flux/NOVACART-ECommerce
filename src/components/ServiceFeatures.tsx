import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

export const ServiceFeatures: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'FREE SHIPPING',
      subtitle: 'Orders over $50',
    },
    {
      icon: ShieldCheck,
      title: 'SECURE PAYMENTS',
      subtitle: '100% secure checkout',
    },
    {
      icon: RotateCcw,
      title: 'EASY RETURNS',
      subtitle: '30-day return policy',
    },
    {
      icon: Headphones,
      title: '24/7 SUPPORT',
      subtitle: 'Always here to help',
    },
  ];

  return (
    <div className="bg-white border-b border-[#E8E8E8] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 sm:gap-4 p-2 rounded-xl transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F7F7F5] group-hover:bg-[#FF5A36]/10 flex items-center justify-center shrink-0 border border-[#E8E8E8] group-hover:border-[#FF5A36]/30 transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#111111] group-hover:text-[#FF5A36] transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold tracking-wide text-[#111111] uppercase">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#737373] mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
