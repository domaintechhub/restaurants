import React from 'react';
import { Quote, ArrowUpRight, Award } from 'lucide-react';
import { CRITIC_NOTES } from '../data/articles';
import { Venue } from '../types';

interface CriticsNotebookProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
}

export const CriticsNotebook: React.FC<CriticsNotebookProps> = ({
  venues,
  onSelectVenue,
}) => {
  return (
    <section className="py-12 border-b border-[#EDE5D8] bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#EDE5D8]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#E05A38]" />
              <span>Gastronomic Field Notes</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Critic\'s Notebook
            </h2>
          </div>
          <p className="text-xs text-[#78716C] max-w-md">
            Unannounced tastings, honest appraisals, and cellar impressions filed by our resident correspondents.
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CRITIC_NOTES.map((note) => {
            const venue = venues.find((v) => v.id === note.venueId);

            return (
              <div
                key={note.id}
                className="bg-white p-6 rounded-lg border border-[#EDE5D8] flex flex-col justify-between space-y-4 hover:border-[#E05A38]/50 transition-colors shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#78716C]">
                    <div className="flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-[#B45309]" />
                      <span className="font-semibold text-[#1C1917]">{note.venueName}</span>
                    </div>
                    <span className="font-mono font-bold text-[#E05A38] bg-[#F7F2EA] px-2 py-0.5 rounded text-[11px]">
                      {note.rating}
                    </span>
                  </div>

                  <p className="font-serif italic text-sm text-[#1C1917] leading-relaxed">
                    &ldquo;{note.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EDE5D8] flex items-center justify-between">
                  <div className="text-[11px] text-[#78716C]">
                    <span className="font-semibold text-[#1C1917] block">{note.author}</span>
                    <span>{note.authorRole} · {note.date}</span>
                  </div>

                  {venue && (
                    <button
                      onClick={() => onSelectVenue(venue)}
                      className="cursor-pointer text-xs font-semibold text-[#E05A38] hover:text-[#A83213] flex items-center gap-1 transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
