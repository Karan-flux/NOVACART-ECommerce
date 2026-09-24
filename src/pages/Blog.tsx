import React, { useState } from 'react';
import { Clock, Calendar, ArrowRight, X, User } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/products';
import { ProductImage } from '../components/ProductImage';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const featured = BLOG_POSTS[0];
  const remaining = BLOG_POSTS.slice(1);

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24">
      {/* Header */}
      <section className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-[#FF5A36] block">
            NovaCart Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111111]">
            Stories on Design, Gear & Modern Living
          </h1>
          <p className="text-xs sm:text-sm text-[#737373] max-w-xl mx-auto">
            Deep-dives into athletic footwear engineering, acoustic workspace ergonomics, and minimalist wardrobing.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Featured Story */}
        {featured && (
          <div
            onClick={() => setSelectedPost(featured)}
            className="mb-14 rounded-3xl border border-[#E8E8E8] overflow-hidden bg-white hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
          >
            <div className="lg:col-span-7 aspect-16/10 overflow-hidden bg-[#F7F7F5]">
              <ProductImage
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#FF5A36]/10 text-[#FF5A36] font-bold uppercase tracking-wider">
                    {featured.category}
                  </span>
                  <span className="text-[#737373] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111111] group-hover:text-[#FF5A36] transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#737373] leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#E8E8E8] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#111111]">{featured.author}</span>
                  <span className="text-[#737373]">· {featured.date}</span>
                </div>
                <span className="font-bold text-[#FF5A36] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remaining.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#F7F7F5]">
                <ProductImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className="text-[11px] font-bold text-[#FF5A36] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[#737373]">·</span>
                    <span className="text-[11px] text-[#737373]">{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#111111] group-hover:text-[#FF5A36] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#737373] mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8E8E8] flex items-center justify-between text-xs text-[#737373]">
                  <span>{post.date}</span>
                  <span className="font-semibold text-[#111111] group-hover:text-[#FF5A36] flex items-center gap-1 transition-colors">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F7F7F5] text-[#111111]"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/9 rounded-2xl overflow-hidden mb-6 bg-[#F7F7F5]">
              <ProductImage
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-[#737373] mb-3">
              <span className="font-bold text-[#FF5A36] uppercase">{selectedPost.category}</span>
              <span>·</span>
              <span>{selectedPost.readTime}</span>
              <span>·</span>
              <span>{selectedPost.date}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] mb-4">
              {selectedPost.title}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#737373] leading-relaxed">
              <p className="font-medium text-[#111111]">{selectedPost.excerpt}</p>
              <p>
                As consumer expectations shift toward transparency and material integrity, product development teams are reimagining foundational wardrobe and home essentials from first principles. By eliminating synthetic micro-fillers and opting for single-origin organic cotton, we achieve garments that soften and drape better with each wash cycle.
              </p>
              <p>
                In technical acoustics, the convergence of adaptive ambient cancellation and lossless wireless bandwidth allows travelers and creators to maintain an immersive personal studio anywhere in the world.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8E8E8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold">
                  {selectedPost.author.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#111111] block">
                    {selectedPost.author}
                  </span>
                  <span className="text-[10px] text-[#737373]">Senior Design Columnist</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-[#111111] text-white rounded-xl text-xs font-semibold hover:bg-[#FF5A36] transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
