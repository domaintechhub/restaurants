import React from 'react';
import { X, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Article, Venue } from '../types';

interface EditorialArticleModalProps {
  article: Article;
  pairedVenue?: Venue;
  onClose: () => void;
  onBookVenue: (venue: Venue) => void;
}

export const EditorialArticleModal: React.FC<EditorialArticleModalProps> = ({
  article,
  pairedVenue,
  onClose,
  onBookVenue,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative bg-[#FFFFFF] rounded-xl border border-[#EDE5D8] max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col my-auto">
        
        {/* Sticky bar */}
        <div className="sticky top-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md px-6 py-4 border-b border-[#EDE5D8] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] uppercase tracking-wider">
            <span>{article.issueNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 md:p-12 space-y-8">
          
          {/* Header */}
          <div className="space-y-4 max-w-2xl mx-auto text-center">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] leading-[1.18] text-balance">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-[#59413c] leading-relaxed">
              {article.subtitle}
            </p>

            <div className="pt-2 flex items-center justify-center gap-3 text-xs text-[#78716C]">
              <span className="font-semibold text-[#1C1917]">{article.author.name}</span>
              <span aria-hidden="true">·</span>
              <span>{article.author.role}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                {article.readTime}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#78716C]" />
                {article.date}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="rounded-lg overflow-hidden border border-[#EDE5D8] bg-[#F7F2EA] aspect-[16/9] shadow-xs">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Prose Content */}
          <div className="max-w-2xl mx-auto space-y-6 text-[#1C1917] text-base leading-relaxed">
            {article.contentParagraphs.map((para, idx) => (
              <p
                key={idx}
                className={idx === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#E05A38]' : ''}
              >
                {para}
              </p>
            ))}

            {/* Pull Quote Callout */}
            <div className="my-8 py-6 px-8 bg-[#FDFBF7] border-y border-[#EDE5D8] text-center">
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#1C1917] leading-snug">
                {article.pullQuote}
              </blockquote>
              <div className="mt-3 text-xs text-[#B45309] font-medium tracking-wide">
                — {article.author.name}, {article.author.role}
              </div>
            </div>

            {/* Paired Venue Card Feature */}
            {pairedVenue && (
              <div className="mt-10 p-5 bg-[#F7F2EA] rounded-xl border border-[#EDE5D8] flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <img
                    src={pairedVenue.heroImage}
                    alt={pairedVenue.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-md object-cover border border-[#EDE5D8] shrink-0"
                  />
                  <div>
                    <div className="text-[11px] font-semibold text-[#B45309] uppercase tracking-wider">
                      Featured In This Piece
                    </div>
                    <div className="font-serif font-bold text-lg text-[#1C1917]">
                      {pairedVenue.name}
                    </div>
                    <div className="text-xs text-[#78716C]">
                      {pairedVenue.neighborhood}, {pairedVenue.city} · {pairedVenue.cuisine}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onBookVenue(pairedVenue)}
                  className="cursor-pointer px-4 py-2 text-xs font-semibold text-white bg-[#E05A38] hover:bg-[#C64726] rounded-md transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  <span>Reserve at {pairedVenue.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
