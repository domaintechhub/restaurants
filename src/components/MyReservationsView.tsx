import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Download, Trash2, ArrowRight, Bookmark, UtensilsCrossed } from 'lucide-react';
import { Booking, Venue } from '../types';

interface MyReservationsViewProps {
  bookings: Booking[];
  savedVenues: Venue[];
  onCancelBooking: (bookingId: string) => void;
  onSelectVenue: (venue: Venue) => void;
  onRemoveSaved: (venueId: string) => void;
  onExploreVenues: () => void;
}

export const MyReservationsView: React.FC<MyReservationsViewProps> = ({
  bookings,
  savedVenues,
  onCancelBooking,
  onSelectVenue,
  onRemoveSaved,
  onExploreVenues,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'wishlist'>('bookings');

  const handleDownloadIcs = (booking: Booking) => {
    const [year, month, day] = booking.date.split('-');
    const [hours, minutes] = booking.time.split(':');
    
    const startStr = `${year}${month}${day}T${hours || '19'}${minutes || '00'}00`;
    const endHour = String(Number(hours || '19') + 2).padStart(2, '0');
    const endStr = `${year}${month}${day}T${endHour}${minutes || '00'}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Terra & Hearth//Gastronomic Editorial//EN',
      'BEGIN:VEVENT',
      `UID:${booking.id}@terrahearth.editorial`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:Dinner at ${booking.venueName} (${booking.seatingArea})`,
      `DESCRIPTION:Table reserved for ${booking.partySize} guests. Booking ref: ${booking.id}. Guest: ${booking.guestName}. Occasion: ${booking.occasion || 'Dining'}.`,
      `LOCATION:${booking.venueName}, ${booking.venueNeighborhood}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Reservation-${booking.venueName.replace(/\s+/g, '-')}-${booking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-[70vh]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#EDE5D8]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309]">
            Gastronomic Journal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-1">
            My Table Reservations &amp; Wishlist
          </h1>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 bg-[#F7F2EA] p-1 rounded-md border border-[#EDE5D8]">
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`cursor-pointer px-4 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeSubTab === 'bookings'
                ? 'bg-white text-[#1C1917] shadow-xs'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Confirmed Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveSubTab('wishlist')}
            className={`cursor-pointer px-4 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeSubTab === 'wishlist'
                ? 'bg-white text-[#1C1917] shadow-xs'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Saved Dining Rooms ({savedVenues.length})
          </button>
        </div>
      </div>

      {/* Bookings Tab */}
      {activeSubTab === 'bookings' && (
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-xl border border-[#EDE5D8] max-w-lg mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F7F2EA] text-[#B45309] flex items-center justify-center mx-auto">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                No Active Reservations
              </h2>
              <p className="text-xs text-[#78716C] max-w-sm mx-auto leading-relaxed">
                You have not booked any tables yet. Discover our curated hearths, natural wine cellars, and chef counters.
              </p>
              <button
                onClick={onExploreVenues}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#E05A38] hover:bg-[#C64726] rounded-md transition-colors shadow-sm"
              >
                <span>Browse Curated Hearths</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg border border-[#EDE5D8] p-6 shadow-xs flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[#EDE5D8]">
                      <span className="font-mono text-xs font-bold text-[#E05A38]">
                        PASS: {booking.id}
                      </span>
                      <span className="text-[11px] font-semibold text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded">
                        Confirmed Table
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <img
                        src={booking.venueImage}
                        alt={booking.venueName}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-md object-cover border border-[#EDE5D8] shrink-0"
                      />
                      <div className="space-y-1">
                        <h3 className="font-serif text-lg font-bold text-[#1C1917] leading-tight">
                          {booking.venueName}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
                          <MapPin className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                          <span>{booking.venueNeighborhood}</span>
                        </div>
                        <div className="text-xs font-medium text-[#1C1917] pt-1">
                          {booking.seatingArea}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-3 bg-[#FDFBF7] rounded border border-[#EDE5D8] text-xs">
                      <div>
                        <div className="text-[10px] text-[#78716C] flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#E05A38]" /> Date
                        </div>
                        <div className="font-mono font-semibold text-[#1C1917] mt-0.5">
                          {booking.date}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#78716C] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#E05A38]" /> Time
                        </div>
                        <div className="font-mono font-semibold text-[#1C1917] mt-0.5">
                          {booking.time}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#78716C] flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#78716C]" /> Party
                        </div>
                        <div className="font-semibold text-[#1C1917] mt-0.5">
                          {booking.partySize} {booking.partySize === 1 ? 'Guest' : 'Guests'}
                        </div>
                      </div>
                    </div>

                    {booking.guestName && (
                      <div className="text-[11px] text-[#78716C]">
                        Reserved under: <strong className="text-[#1C1917]">{booking.guestName}</strong> ({booking.guestPhone})
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#EDE5D8] flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleDownloadIcs(booking)}
                      className="cursor-pointer text-xs font-semibold text-[#1C1917] hover:text-[#E05A38] flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Calendar Invite (.ics)</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you wish to cancel your reservation at ${booking.venueName}?`)) {
                          onCancelBooking(booking.id);
                        }
                      }}
                      className="cursor-pointer text-xs font-semibold text-[#BA1A1A] hover:text-[#93000A] flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wishlist Tab */}
      {activeSubTab === 'wishlist' && (
        <div>
          {savedVenues.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-xl border border-[#EDE5D8] max-w-lg mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F7F2EA] text-[#B45309] flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs text-[#78716C] max-w-sm mx-auto leading-relaxed">
                Click the bookmark icon on any restaurant card to save venues to your personal dining journal.
              </p>
              <button
                onClick={onExploreVenues}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#E05A38] hover:bg-[#C64726] rounded-md transition-colors shadow-sm"
              >
                <span>Browse Curated Hearths</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-white rounded-lg border border-[#EDE5D8] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#E05A38]/40 transition-colors"
                >
                  <div className="relative aspect-[16/10] bg-[#F7F2EA]">
                    <img
                      src={venue.heroImage}
                      alt={venue.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => onRemoveSaved(venue.id)}
                      className="cursor-pointer absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-[#BA1A1A] hover:bg-white transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-[#78716C]">
                        {venue.neighborhood}, {venue.city} · {venue.priceTier}
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#1C1917] mt-0.5">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-[#59413c] line-clamp-2 mt-1">
                        {venue.tagline}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectVenue(venue)}
                      className="cursor-pointer w-full py-2 px-3 text-xs font-semibold text-white bg-[#E05A38] hover:bg-[#C64726] rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Reserve Table</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
