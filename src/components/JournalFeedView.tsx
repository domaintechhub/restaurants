import React from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, Flame } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../data/articles';
import { Article, Venue } from '../types';

interface JournalFeedViewProps {
  onSelectArticle: (article: Article) => void;
  venues: Venue[];
  onBookVenue: (venue: Venue) => void;
}

export const JournalFeedView: React.FC<JournalFeedViewProps> = ({
  onSelectArticle,
  venues,
  onBookVenue,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Editorial Header */}
      <div className="border-b border-[#EDE5D8] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] uppercase tracking-wider">
          <Flame className="w-4 h-4 text-[#E05A38]" />
          <span>The Gastronomic Journal · Quarterly Compendium</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
          Dispatches from the Hearth &amp; Cellar
        </h1>
        <p className="text-sm sm:text-base text-[#59413c] max-w-2xl leading-relaxed">
          Critical essays, terroir investigations, and conversations with the artisans redefining the modern dining table across Europe and beyond.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {EDITORIAL_ARTICLES.map((article) => {
          const pairedVenue = venues.find((v) => v.id === article.pairedVenueId);

          return (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="cursor-pointer group bg-white rounded-lg border border-[#EDE5D8] overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#E05A38]/40 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F2EA]">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                  {article.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#78716C]">
                    <span>{article.issueNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B45309]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] group-hover:text-[#E05A38] transition-colors leading-tight">
                    {article.title}
                  </h2>

                  <p className="text-xs text-[#59413c] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDE5D8] flex items-center justify-between">
                  <div className="text-[11px] text-[#78716C]">
                    <span className="font-semibold text-[#1C1917] block">{article.author.name}</span>
                    <span>{article.author.role}</span>
                  </div>

                  <span className="text-xs font-semibold text-[#E05A38] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
};
