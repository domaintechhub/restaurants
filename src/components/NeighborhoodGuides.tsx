import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { NEIGHBORHOOD_GUIDES } from '../data/articles';

interface NeighborhoodGuidesProps {
  onSelectCity: (city: string) => void;
}

export const NeighborhoodGuides: React.FC<NeighborhoodGuidesProps> = ({
  onSelectCity,
}) => {
  return (
    <section className="py-12 border-b border-[#EDE5D8] bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#EDE5D8]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#E05A38]" />
              <span>Urban Dining Terroir</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              City Districts &amp; Quarters
            </h2>
          </div>
          <p className="text-xs text-[#78716C] max-w-md">
            Our neighborhood compendiums map culinary micro-climates, morning markets, and evening cellar routes.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEIGHBORHOOD_GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => onSelectCity(guide.city)}
              className="group cursor-pointer rounded-lg border border-[#EDE5D8] overflow-hidden bg-[#F7F2EA] flex flex-col justify-between hover:shadow-md hover:border-[#E05A38]/40 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#fea619]">
                    {guide.city}
                  </div>
                  <div className="font-serif text-lg font-bold leading-tight">
                    {guide.name}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#59413c] leading-relaxed line-clamp-2">
                  {guide.tagline}
                </p>

                <div className="pt-2 border-t border-[#EDE5D8] flex items-center justify-between text-xs">
                  <span className="font-mono text-[#78716C]">
                    {guide.venueCount} verified venues
                  </span>
                  <span className="font-semibold text-[#E05A38] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Explore
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
