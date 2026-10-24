import React, { useState } from 'react';
import { ArrowUpRight, Flame, Clock, BookOpen } from 'lucide-react';
import { Article, Venue } from '../types';

interface HeroEditorialProps {
  article: Article;
  featuredVenue: Venue;
  onReadArticle: (article: Article) => void;
  onReserveVenue: (venue: Venue) => void;
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  article,
  featuredVenue,
  onReadArticle,
  onReserveVenue,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative border-b border-[#EDE5D8] bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Magazine issue index kicker */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EDE5D8] mb-8 text-xs font-medium text-[#78716C]">
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-widest text-[#B45309] font-bold">
              Terra &amp; Hearth Gazette
            </span>
            <span aria-hidden="true" className="text-[#EDE5D8]">/</span>
            <span>{article.issueNumber}</span>
            <span aria-hidden="true" className="text-[#EDE5D8]">/</span>
            <span>Volume IV</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#78716C]">
            <span>Autumn Tasting Circuit</span>
            <span aria-hidden="true">·</span>
            <span>Barcelona · Paris · Rome</span>
          </div>
        </div>

        {/* 2-Column Split: Editorial Lead Left + Visual Hearth Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column: 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Unboxed category metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#B45309] uppercase">
                <Flame className="w-3.5 h-3.5 text-[#E05A38]" />
                <span>The Autumn Cover Story</span>
                <span aria-hidden="true">·</span>
                <span>Barcelona &amp; Lyon</span>
              </div>

              {/* High-contrast serif headline with text-wrap: balance */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15] text-balance">
                {article.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#59413c] leading-relaxed font-normal max-w-2xl">
                {article.subtitle}
              </p>

              {/* Editorial excerpt quote */}
              <div className="p-5 bg-[#F7F2EA] rounded-md border border-[#EDE5D8] my-4">
                <blockquote className="font-serif italic text-sm sm:text-base text-[#1C1917] leading-relaxed">
                  {article.pullQuote}
                </blockquote>
                <div className="mt-3 text-xs text-[#78716C] flex items-center gap-2">
                  <span className="font-semibold text-[#1C1917]">{article.author.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.author.role}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B45309]" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onReadArticle(article)}
                className="cursor-pointer px-5 py-3 text-sm font-semibold text-white bg-[#1C1917] hover:bg-[#33302D] rounded-md transition-colors flex items-center gap-2 shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Cover Story</span>
              </button>

              <button
                onClick={() => onReserveVenue(featuredVenue)}
                className="cursor-pointer px-5 py-3 text-sm font-semibold text-[#E05A38] bg-white border border-[#EDE5D8] hover:border-[#E05A38] hover:bg-[#FDFBF7] rounded-md transition-all flex items-center gap-2"
              >
                <span>Reserve Featured Hearth: {featuredVenue.name}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: 5 cols with visual anchor */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-lg overflow-hidden border border-[#EDE5D8] bg-[#F7F2EA] flex-1 group min-h-[340px] lg:min-h-[460px] shadow-sm">
              {!imageError ? (
                <img
                  src={article.coverImage}
                  alt="Chefs stoking the wood-fired hearth at Asador Malva"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#F7F2EA] to-[#EDE5D8] text-center">
                  <Flame className="w-12 h-12 text-[#E05A38] mb-3" />
                  <p className="font-serif font-bold text-lg text-[#1C1917]">Asador Malva Open Hearth</p>
                  <p className="text-xs text-[#78716C] mt-1">Live embers and holm oak coals</p>
                </div>
              )}

              {/* Scrim overlay for editorial caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#fea619] mb-1">
                  Featured Destination · Barcelona
                </div>
                <div className="font-serif text-lg font-semibold leading-tight text-white">
                  Asador Malva · Three-tier clay hearth
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs text-white/90">
                  <span className="font-mono tabular-nums">4 Tables Available Tonight</span>
                  <button
                    onClick={() => onReserveVenue(featuredVenue)}
                    className="cursor-pointer text-xs font-semibold text-[#ffb4a2] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Instant Booking</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
