import React from 'react';
import { Bookmark, CalendarCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'explore' | 'journal' | 'critics' | 'neighborhoods' | 'reservations';
  setActiveTab: (tab: 'explore' | 'journal' | 'critics' | 'neighborhoods' | 'reservations') => void;
  bookingCount: number;
  savedCount: number;
  onOpenQuickReserve: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookingCount,
  savedCount,
  onOpenQuickReserve,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EDE5D8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark in display serif */}
        <button
          onClick={() => setActiveTab('explore')}
          className="text-left font-serif text-2xl md:text-3xl font-semibold tracking-tight text-[#1C1917] hover:text-[#E05A38] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          TERRA &amp; HEARTH
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#78716C]">
          <button
            onClick={() => setActiveTab('explore')}
            className={`cursor-pointer whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all ${
              activeTab === 'explore'
                ? 'border-[#E05A38] text-[#1C1917] font-semibold'
                : 'border-transparent hover:text-[#1C1917] hover:border-[#EDE5D8]'
            }`}
          >
            Venues &amp; Tables
          </button>

          <button
            onClick={() => setActiveTab('journal')}
            className={`cursor-pointer whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all ${
              activeTab === 'journal'
                ? 'border-[#E05A38] text-[#1C1917] font-semibold'
                : 'border-transparent hover:text-[#1C1917] hover:border-[#EDE5D8]'
            }`}
          >
            The Journal
          </button>

          <button
            onClick={() => setActiveTab('critics')}
            className={`cursor-pointer whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all ${
              activeTab === 'critics'
                ? 'border-[#E05A38] text-[#1C1917] font-semibold'
                : 'border-transparent hover:text-[#1C1917] hover:border-[#EDE5D8]'
            }`}
          >
            Critic\'s Notebook
          </button>

          <button
            onClick={() => setActiveTab('neighborhoods')}
            className={`cursor-pointer whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all ${
              activeTab === 'neighborhoods'
                ? 'border-[#E05A38] text-[#1C1917] font-semibold'
                : 'border-transparent hover:text-[#1C1917] hover:border-[#EDE5D8]'
            }`}
          >
            City Districts
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`cursor-pointer whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'reservations'
                ? 'border-[#E05A38] text-[#1C1917] font-semibold'
                : 'border-transparent hover:text-[#1C1917] hover:border-[#EDE5D8]'
            }`}
          >
            <span>My Bookings</span>
            {bookingCount > 0 && (
              <span className="text-[11px] font-semibold text-[#E05A38] bg-[#F7F2EA] px-1.5 py-0.2 rounded">
                {bookingCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('reservations')}
            title="Saved dining rooms"
            className="hidden sm:flex items-center gap-1.5 text-xs text-[#78716C] hover:text-[#1C1917] transition-colors px-2 py-1.5 rounded"
          >
            <Bookmark className="w-4 h-4 text-[#B45309]" />
            <span className="font-medium">{savedCount}</span>
          </button>

          <button
            onClick={onOpenQuickReserve}
            className="cursor-pointer px-4 py-2 text-xs md:text-sm font-semibold text-white bg-[#E05A38] hover:bg-[#C64726] active:bg-[#A83213] rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Reserve a Table</span>
          </button>
        </div>

      </div>

      {/* Mobile nav bar row for screen sizes < 768px */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-[#EDE5D8] overflow-x-auto scrollbar-none text-xs font-medium text-[#78716C]">
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'explore' ? 'text-[#E05A38] font-bold' : ''}`}
        >
          Venues
        </button>
        <button
          onClick={() => setActiveTab('journal')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'journal' ? 'text-[#E05A38] font-bold' : ''}`}
        >
          Journal
        </button>
        <button
          onClick={() => setActiveTab('critics')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'critics' ? 'text-[#E05A38] font-bold' : ''}`}
        >
          Field Notes
        </button>
        <button
          onClick={() => setActiveTab('neighborhoods')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'neighborhoods' ? 'text-[#E05A38] font-bold' : ''}`}
        >
          Districts
        </button>
        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-2 py-1 whitespace-nowrap flex items-center gap-1 ${activeTab === 'reservations' ? 'text-[#E05A38] font-bold' : ''}`}
        >
          <span>Bookings</span>
          {bookingCount > 0 && <span className="text-[#E05A38]">({bookingCount})</span>}
        </button>
      </div>
    </header>
  );
};
