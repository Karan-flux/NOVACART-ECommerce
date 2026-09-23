import React from 'react';
import { Award, Zap, ShieldCheck, HeartHandshake } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Made with carefully selected materials and rigorously inspected craftsmanship.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Quick and reliable courier shipping with live tracking straight to your doorstep.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      description: 'Your payment details are protected with 256-bit bank-grade encryption.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer Satisfaction',
      description: 'We are here when you need us with hassle-free 30-day returns and real humans.',
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#FDFDFD] border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-3 group">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F7F5] group-hover:bg-[#FF5A36]/10 flex items-center justify-center shrink-0 border border-[#E8E8E8] group-hover:border-[#FF5A36]/30 transition-colors">
                  <Icon className="w-5 h-5 text-[#111111] group-hover:text-[#FF5A36] transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#737373] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
