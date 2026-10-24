import React from 'react';
import { Check, Calendar, Clock, MapPin, Users, Download, ArrowRight, X } from 'lucide-react';
import { Booking } from '../types';

interface BookingConfirmationModalProps {
  booking: Booking;
  onClose: () => void;
  onViewMyBookings: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
  onViewMyBookings,
}) => {
  // Generate downloadable .ics calendar file
  const handleDownloadIcs = () => {
    const [year, month, day] = booking.date.split('-');
    const [hours, minutes] = booking.time.split(':');
    
    // Start datetime formatted for iCal: YYYYMMDDTHHMMSS
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
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="relative bg-[#FFFFFF] rounded-xl border border-[#EDE5D8] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#78716C] hover:text-[#1C1917] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Confirmation Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto mb-2">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider">
            Table Confirmed
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
            We Look Forward to Welcoming You
          </h2>
          <p className="text-xs text-[#78716C]">
            Your booking reference has been dispatched to{' '}
            <strong className="text-[#1C1917]">{booking.guestEmail}</strong>
          </p>
        </div>

        {/* The Gastronomic Pass Card */}
        <div className="p-5 bg-[#FDFBF7] rounded-lg border border-[#EDE5D8] space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5D8]">
            <div>
              <div className="text-[11px] font-mono text-[#78716C]">PASS ID</div>
              <div className="font-mono text-base font-bold text-[#E05A38] tracking-wider">
                {booking.id}
              </div>
            </div>
            <span className="text-xs font-semibold text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded">
              Confirmed
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-serif text-lg font-bold text-[#1C1917]">
              {booking.venueName}
            </div>
            <div className="flex items-center gap-1.5 text-[#59413c]">
              <MapPin className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
              <span>{booking.venueNeighborhood}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EDE5D8]/60">
              <div className="flex items-center gap-1.5 text-[#1C1917]">
                <Calendar className="w-3.5 h-3.5 text-[#E05A38]" />
                <span className="font-mono">{booking.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#1C1917]">
                <Clock className="w-3.5 h-3.5 text-[#E05A38]" />
                <span className="font-mono">{booking.time}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#1C1917]">
                <Users className="w-3.5 h-3.5 text-[#78716C]" />
                <span>{booking.partySize} {booking.partySize === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              <div className="text-[#59413c] truncate">
                <span>{booking.seatingArea}</span>
              </div>
            </div>

            {booking.dietaryNotes && (
              <div className="pt-2 text-[11px] text-[#78716C]">
                <strong>Dietary Notes:</strong> {booking.dietaryNotes}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleDownloadIcs}
            className="cursor-pointer w-full py-2.5 px-4 text-xs font-semibold text-[#1C1917] bg-[#F7F2EA] hover:bg-[#EDE5D8] rounded-md transition-colors flex items-center justify-center gap-2 border border-[#EDE5D8]"
          >
            <Download className="w-4 h-4 text-[#B45309]" />
            <span>Add to Apple / Google Calendar (.ics)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onClose}
              className="cursor-pointer py-2.5 px-3 text-xs font-semibold text-[#78716C] hover:text-[#1C1917] rounded-md transition-colors border border-transparent hover:border-[#EDE5D8] text-center"
            >
              Close Window
            </button>
            <button
              onClick={onViewMyBookings}
              className="cursor-pointer py-2.5 px-3 text-xs font-semibold text-white bg-[#E05A38] hover:bg-[#C64726] rounded-md transition-colors flex items-center justify-center gap-1"
            >
              <span>Manage Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
