import React, { useState } from 'react';
import { Star, Bookmark, ArrowUpRight, UtensilsCrossed, Clock } from 'lucide-react';
import { Venue, TimeSlot } from '../types';

interface VenueCardProps {
  venue: Venue;
  isSaved: boolean;
  onToggleSave: (venueId: string) => void;
  onSelectVenue: (venue: Venue) => void;
  onSelectTimeSlot: (venue: Venue, slot: TimeSlot) => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  isSaved,
  onToggleSave,
  onSelectVenue,
  onSelectTimeSlot,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group bg-[#FFFFFF] rounded-lg border border-[#EDE5D8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#E05A38]/40">
      
      {/* Top Media Slot */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F2EA]">
        {!imageError ? (
          <img
            src={venue.heroImage}
            alt={`${venue.name} interior and dining`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F7F2EA] to-[#EDE5D8] text-center">
            <UtensilsCrossed className="w-10 h-10 text-[#B45309] mb-2" />
            <p className="font-serif font-semibold text-sm text-[#1C1917]">{venue.name}</p>
            <p className="text-xs text-[#78716C]">{venue.cuisine}</p>
          </div>
        )}

        {/* Floating Bookmark Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(venue.id);
          }}
          aria-label={isSaved ? 'Remove from saved wishlist' : 'Save to wishlist'}
          className="cursor-pointer absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#1C1917] hover:bg-white transition-all shadow-xs"
        >
          <Bookmark
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-[#E05A38] text-[#E05A38]' : 'text-[#78716C]'
            }`}
          />
        </button>

        {/* Guide Distinction (e.g. Michelin / Gault & Millau) rendered as elegant text strip over image bottom */}
        {venue.guideAward && (
          <div className="absolute bottom-2 left-3 text-[11px] font-semibold tracking-wide text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
            {venue.guideAward}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Unboxed Metadata Line with typographic separators */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#78716C]">
            <div className="flex items-center gap-1.5 font-medium">
              <span>{venue.neighborhood}</span>
              <span aria-hidden="true">·</span>
              <span>{venue.city}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#B45309]">{venue.cuisine}</span>
            </div>
            <span className="font-semibold text-[#1C1917]">{venue.priceTier}</span>
          </div>

          {/* Venue Name in Playfair Display serif */}
          <h2
            onClick={() => onSelectVenue(venue)}
            className="cursor-pointer font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] hover:text-[#E05A38] transition-colors leading-tight"
          >
            {venue.name}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 text-[#F59E0B] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
              <span className="text-[#1C1917] font-mono tabular-nums">{venue.rating.toFixed(2)}</span>
            </div>
            <span className="text-[#78716C] font-mono tabular-nums">({venue.reviewCount} reviews)</span>
            <span aria-hidden="true" className="text-[#EDE5D8]">·</span>
            <span className="text-xs text-[#2E7D32] font-medium">Tables Open</span>
          </div>
        </div>

        {/* Critic's Note Excerpt */}
        <p className="text-xs text-[#59413c] line-clamp-2 italic border-l-2 border-[#EDE5D8] pl-2.5 my-1">
          &ldquo;{venue.criticNote}&rdquo;
        </p>

        {/* Signature Dish highlight */}
        <div className="pt-1 text-xs">
          <span className="font-semibold text-[#1C1917]">Signature: </span>
          <span className="text-[#59413c]">{venue.signatureDish}</span>
        </div>

        {/* Live Available Time Slots */}
        <div className="space-y-2 pt-2 border-t border-[#EDE5D8]">
          <div className="flex items-center justify-between text-[11px] text-[#78716C]">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-[#E05A38]" />
              Tonight\'s Open Seats
            </span>
            <span className="font-mono tabular-nums">Instant Book</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {venue.availableSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => onSelectTimeSlot(venue, slot)}
                title={`${slot.type} (${slot.seatsLeft} seats left)`}
                className="cursor-pointer px-2.5 py-1 text-xs font-mono font-medium rounded bg-[#F7F2EA] text-[#1C1917] hover:bg-[#E05A38] hover:text-white transition-colors border border-[#EDE5D8] hover:border-[#E05A38]"
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 flex items-center gap-2">
          <button
            onClick={() => onSelectVenue(venue)}
            className="cursor-pointer flex-1 py-2 px-3 text-xs font-semibold text-center text-[#1C1917] bg-[#F7F2EA] hover:bg-[#EDE5D8] rounded-md transition-colors"
          >
            Story &amp; Menu
          </button>
          <button
            onClick={() => onSelectVenue(venue)}
            className="cursor-pointer flex-1 py-2 px-3 text-xs font-semibold text-center text-white bg-[#E05A38] hover:bg-[#C64726] rounded-md transition-colors flex items-center justify-center gap-1 shadow-xs"
          >
            <span>Book Table</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </article>
  );
};
