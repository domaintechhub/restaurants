import React from 'react';
import { Search, Calendar, Users, MapPin, X, SlidersHorizontal } from 'lucide-react';
import { PriceTier } from '../types';

interface SearchAndFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedPrice: PriceTier | 'all';
  setSelectedPrice: (price: PriceTier | 'all') => void;
  partySize: number;
  setPartySize: (size: number) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  totalResults: number;
  onResetFilters: () => void;
}

export const CUISINES = [
  'All Venues',
  'Wood-Fired & Hearth',
  'Natural Wine & Crudo',
  'Chef\'s Tasting Counter',
  'Secluded Terraces',
  'Historic Bistros',
];

export const CITIES = [
  'All Destinations',
  'Barcelona',
  'Paris',
  'Rome',
  'London',
  'San Francisco',
];

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCuisine,
  setSelectedCuisine,
  selectedCity,
  setSelectedCity,
  selectedPrice,
  setSelectedPrice,
  partySize,
  setPartySize,
  selectedDate,
  setSelectedDate,
  totalResults,
  onResetFilters,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCuisine !== 'All Venues' ||
    selectedCity !== 'All Destinations' ||
    selectedPrice !== 'all';

  return (
    <div className="bg-[#FFFFFF] border-b border-[#EDE5D8] py-6 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Main Search & Booking parameters strip */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-2 bg-[#F7F2EA] rounded-lg border border-[#EDE5D8]">
          
          {/* Keyword search input */}
          <div className="md:col-span-4 relative flex items-center bg-white rounded-md border border-[#EDE5D8] px-3.5 py-2.5">
            <Search className="w-4 h-4 text-[#78716C] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, hearths, sommelier cellars..."
              className="w-full text-xs sm:text-sm text-[#1C1917] placeholder-[#78716C] bg-transparent outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#78716C] hover:text-[#1C1917] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City / Destination selector */}
          <div className="md:col-span-3 relative flex items-center bg-white rounded-md border border-[#EDE5D8] px-3.5 py-2.5">
            <MapPin className="w-4 h-4 text-[#B45309] mr-2 shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-xs sm:text-sm text-[#1C1917] bg-transparent outline-none cursor-pointer"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Reservation Date */}
          <div className="md:col-span-3 relative flex items-center bg-white rounded-md border border-[#EDE5D8] px-3.5 py-2.5">
            <Calendar className="w-4 h-4 text-[#E05A38] mr-2 shrink-0" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-xs sm:text-sm text-[#1C1917] bg-transparent outline-none cursor-pointer"
            />
          </div>

          {/* Party Size */}
          <div className="md:col-span-2 relative flex items-center bg-white rounded-md border border-[#EDE5D8] px-3.5 py-2.5">
            <Users className="w-4 h-4 text-[#78716C] mr-2 shrink-0" />
            <select
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className="w-full text-xs sm:text-sm text-[#1C1917] bg-transparent outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 8].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Category Segmented Control & Price Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          
          {/* Functional Button Tabs / Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {CUISINES.map((cuisine) => {
              const isActive = selectedCuisine === cuisine;
              return (
                <button
                  key={cuisine}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`cursor-pointer px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#1C1917] text-white shadow-xs font-semibold'
                      : 'bg-[#F7F2EA] text-[#59413c] hover:bg-[#EDE5D8] hover:text-[#1C1917]'
                  }`}
                >
                  {cuisine}
                </button>
              );
            })}
          </div>

          {/* Price Tier & Filter Reset */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 bg-[#F7F2EA] p-1 rounded-md border border-[#EDE5D8]">
              {(['all', '$$', '$$$', '$$$$'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedPrice(tier)}
                  className={`cursor-pointer px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                    selectedPrice === tier
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  {tier === 'all' ? 'All $' : tier}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="cursor-pointer text-xs text-[#E05A38] hover:text-[#A83213] font-medium flex items-center gap-1 underline"
              >
                Reset
              </button>
            )}
          </div>

        </div>

        {/* Results Count & Typographic Separator */}
        <div className="flex items-center justify-between text-xs text-[#78716C] pt-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B45309]" />
            <span className="font-medium text-[#1C1917]">Showing {totalResults} Curated Venues</span>
            <span aria-hidden="true">·</span>
            <span>All tables verified by editorial team</span>
          </div>
          <span className="hidden sm:inline font-mono tabular-nums">Instant confirmation available</span>
        </div>

      </div>
    </div>
  );
};
