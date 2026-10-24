import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Clock,
  Wine,
  Users,
  Calendar,
  CheckCircle2,
  Sparkles,
  Bookmark,
  Share2,
} from 'lucide-react';
import { Venue, TimeSlot, Booking } from '../types';

interface VenueDetailModalProps {
  venue: Venue;
  initialSlot?: TimeSlot | null;
  initialPartySize?: number;
  initialDate?: string;
  isSaved: boolean;
  onToggleSave: (venueId: string) => void;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const VenueDetailModal: React.FC<VenueDetailModalProps> = ({
  venue,
  initialSlot,
  initialPartySize = 2,
  initialDate,
  isSaved,
  onToggleSave,
  onClose,
  onConfirmBooking,
}) => {
  const [selectedSeatingArea, setSelectedSeatingArea] = useState<string>(
    venue.seatingAreas[0]?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    initialDate || new Date().toISOString().split('T')[0]
  );
  const [partySize, setPartySize] = useState<number>(initialPartySize);
  const [selectedTime, setSelectedTime] = useState<string>(
    initialSlot?.time || venue.availableSlots[0]?.time || '19:30'
  );
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'chef'>('overview');
  const [formError, setFormError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setFormError('Please enter the primary guest name.');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setFormError('Please enter a valid confirmation email address.');
      return;
    }
    if (!guestPhone.trim()) {
      setFormError('Please provide a contact phone number.');
      return;
    }

    setFormError('');

    const newBooking: Booking = {
      id: `TH-${Math.floor(10000 + Math.random() * 90000)}`,
      venueId: venue.id,
      venueName: venue.name,
      venueImage: venue.heroImage,
      venueNeighborhood: `${venue.neighborhood}, ${venue.city}`,
      date: selectedDate,
      time: selectedTime,
      partySize,
      seatingArea:
        venue.seatingAreas.find((s) => s.id === selectedSeatingArea)?.name ||
        'Standard Seating',
      guestName,
      guestEmail,
      guestPhone,
      dietaryNotes,
      occasion,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    onConfirmBooking(newBooking);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      <div className="relative bg-[#FFFFFF] rounded-xl border border-[#EDE5D8] max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col my-auto">
        
        {/* Sticky Modal Header Bar */}
        <div className="sticky top-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md px-6 py-4 border-b border-[#EDE5D8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg md:text-xl font-bold text-[#1C1917]">
              {venue.name}
            </span>
            <span aria-hidden="true" className="text-[#EDE5D8]">/</span>
            <span className="text-xs font-semibold text-[#B45309]">{venue.neighborhood}, {venue.city}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share venue"
              className="p-2 rounded-full hover:bg-[#F7F2EA] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleSave(venue.id)}
              title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
              className="p-2 rounded-full hover:bg-[#F7F2EA] text-[#78716C] transition-colors cursor-pointer"
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? 'fill-[#E05A38] text-[#E05A38]' : 'text-[#78716C]'}`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F7F2EA] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {copiedLink && (
          <div className="bg-[#2E7D32] text-white text-xs text-center py-1.5 font-medium">
            Link copied to clipboard
          </div>
        )}

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-6 bg-[#F7F2EA]/50 border-b border-[#EDE5D8]">
          <div className="md:col-span-2 aspect-[16/10] rounded-lg overflow-hidden border border-[#EDE5D8]">
            <img
              src={venue.heroImage}
              alt={venue.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex flex-col gap-2">
            {venue.secondaryImages.map((img, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-lg overflow-hidden border border-[#EDE5D8]"
              >
                <img
                  src={img}
                  alt={`${venue.name} gallery ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Body: 2 Columns (7 cols left info, 5 cols right booking module) */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Venue Editorial & Menu */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Metadata */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#78716C]">
                <span className="font-semibold text-[#B45309]">{venue.cuisine}</span>
                <span aria-hidden="true">·</span>
                <span>{venue.priceTier}</span>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1 text-[#F59E0B] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
                  <span className="text-[#1C1917] font-mono">{venue.rating.toFixed(2)}</span>
                </div>
                <span>({venue.reviewCount} editorial reviews)</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
                {venue.name}
              </h2>
              <p className="text-sm font-serif italic text-[#59413c]">
                &ldquo;{venue.tagline}&rdquo;
              </p>
            </div>

            {/* Tab navigation inside modal */}
            <div className="flex items-center gap-4 border-b border-[#EDE5D8] pb-2 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`cursor-pointer pb-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-[#E05A38] text-[#1C1917]'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Philosophy &amp; Space
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`cursor-pointer pb-2 transition-colors ${
                  activeTab === 'menu'
                    ? 'border-b-2 border-[#E05A38] text-[#1C1917]'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Sample Tasting Menu
              </button>
              <button
                onClick={() => setActiveTab('chef')}
                className={`cursor-pointer pb-2 transition-colors ${
                  activeTab === 'chef'
                    ? 'border-b-2 border-[#E05A38] text-[#1C1917]'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                The Kitchen Team
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-sm text-[#59413c] leading-relaxed">
                <p>{venue.description}</p>
                <div className="p-4 bg-[#F7F2EA] rounded-md border border-[#EDE5D8] space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                    <span><strong>Location:</strong> {venue.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                    <span><strong>Service Hours:</strong> {venue.openingHours}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wine className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                    <span><strong>Cellar &amp; Corkage:</strong> {venue.corkagePolicy}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-4">
                <div className="text-xs text-[#78716C] italic">
                  Seasonal courses subject to daily market deliveries and foraged arrivals.
                </div>
                <div className="divide-y divide-[#EDE5D8] border-y border-[#EDE5D8]">
                  {venue.sampleMenu.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B45309]">
                          {item.course}
                        </div>
                        <div className="font-serif font-semibold text-sm text-[#1C1917]">
                          {item.dish}
                        </div>
                        <div className="text-xs text-[#78716C] flex items-center gap-1">
                          <Wine className="w-3 h-3 text-[#B45309]" />
                          <span>Pairing: {item.winePairing}</span>
                        </div>
                      </div>
                      <div className="font-mono text-sm font-semibold text-[#1C1917] shrink-0">
                        €{item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'chef' && (
              <div className="p-5 bg-[#F7F2EA] rounded-lg border border-[#EDE5D8] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif text-lg font-bold">
                    {venue.chef.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1C1917]">{venue.chef.name}</h3>
                    <p className="text-xs text-[#B45309] font-medium">{venue.chef.title}</p>
                  </div>
                </div>
                <p className="text-xs text-[#59413c] leading-relaxed">
                  {venue.chef.bio}
                </p>
              </div>
            )}

          </div>

          {/* Right Column: Contiguous Table Booking Module */}
          <div className="lg:col-span-5 bg-[#FDFBF7] p-6 rounded-xl border border-[#EDE5D8] shadow-xs sticky top-24">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE5D8]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  Instant Table Reservation
                </h3>
                <p className="text-xs text-[#78716C]">Guaranteed editorial booking window</p>
              </div>
              <Sparkles className="w-4 h-4 text-[#E05A38]" />
            </div>

            <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
              
              {/* Seating Area Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1C1917]">
                  Select Seating Area
                </label>
                <div className="space-y-2">
                  {venue.seatingAreas.map((area) => (
                    <label
                      key={area.id}
                      className={`cursor-pointer block p-3 rounded-md border text-xs transition-colors ${
                        selectedSeatingArea === area.id
                          ? 'border-[#E05A38] bg-white shadow-xs'
                          : 'border-[#EDE5D8] bg-[#F7F2EA] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1C1917]">{area.name}</span>
                        <input
                          type="radio"
                          name="seatingArea"
                          value={area.id}
                          checked={selectedSeatingArea === area.id}
                          onChange={() => setSelectedSeatingArea(area.id)}
                          className="accent-[#E05A38]"
                        />
                      </div>
                      <p className="text-[11px] text-[#78716C] mt-1">{area.description}</p>
                      <span className="inline-block mt-1 text-[10px] text-[#B45309] font-medium">
                        {area.atmosphere}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date & Party Size */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E05A38]" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-md border border-[#EDE5D8] bg-white text-[#1C1917] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#78716C]" />
                    Guests
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-md border border-[#EDE5D8] bg-white text-[#1C1917] outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map((size) => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-[#1C1917] flex items-center justify-between">
                  <span>Available Time Slot</span>
                  <span className="text-[10px] text-[#2E7D32]">Confirmed Seats</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {venue.availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot.time}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`cursor-pointer p-2 rounded text-xs font-mono text-center border transition-all ${
                        selectedTime === slot.time
                          ? 'bg-[#1C1917] text-white border-[#1C1917] font-bold'
                          : 'bg-white text-[#1C1917] border-[#EDE5D8] hover:border-[#E05A38]'
                      }`}
                    >
                      <div>{slot.time}</div>
                      <div className="text-[10px] text-[#78716C] font-sans">
                        {slot.type}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Information */}
              <div className="space-y-2 pt-2">
                <input
                  type="text"
                  placeholder="Primary Guest Full Name *"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-md border border-[#EDE5D8] bg-white text-[#1C1917] outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-md border border-[#EDE5D8] bg-white text-[#1C1917] outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-md border border-[#EDE5D8] bg-white text-[#1C1917] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full text-xs p-2 rounded-md border border-[#EDE5D8] bg-white text-[#1C1917] outline-none"
                  >
                    <option value="Casual Dining">Casual Dining</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Birthday Celebration">Birthday</option>
                    <option value="Business Dinner">Business Dinner</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Dietary requirements (optional)"
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-md border border-[#EDE5D8] bg-white text-[#1C1917] outline-none"
                  />
                </div>
              </div>

              {formError && (
                <div className="text-xs text-[#BA1A1A] font-medium bg-[#FFDAD6]/40 p-2 rounded">
                  {formError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="cursor-pointer w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#E05A38] hover:bg-[#C64726] active:bg-[#A83213] rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Reservation · No Fee</span>
              </button>

              <p className="text-[10px] text-center text-[#78716C]">
                Free cancellation up to 4 hours before service time.
              </p>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
