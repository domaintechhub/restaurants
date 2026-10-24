import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroEditorial } from './components/HeroEditorial';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { VenueCard } from './components/VenueCard';
import { VenueDetailModal } from './components/VenueDetailModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { EditorialArticleModal } from './components/EditorialArticleModal';
import { CriticsNotebook } from './components/CriticsNotebook';
import { NeighborhoodGuides } from './components/NeighborhoodGuides';
import { MyReservationsView } from './components/MyReservationsView';
import { JournalFeedView } from './components/JournalFeedView';
import { Footer } from './components/Footer';
import { VENUES } from './data/venues';
import { FEATURED_ARTICLE, EDITORIAL_ARTICLES } from './data/articles';
import { Venue, Article, Booking, TimeSlot, PriceTier } from './types';
import { Check, Info } from 'lucide-react';

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'TH-73921',
    venueId: 'asador-malva',
    venueName: 'Asador Malva',
    venueImage: '/src/assets/images/culinary_hero_hearth_1792839864518.jpg',
    venueNeighborhood: 'Eixample, Barcelona',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '20:15',
    partySize: 2,
    seatingArea: 'The Hearth Counter',
    guestName: 'Alexandre Mercer',
    guestEmail: 'a.mercer@editorial.guide',
    guestPhone: '+34 612 894 120',
    dietaryNotes: 'Shellfish enthusiast, no cilantro',
    occasion: 'Anniversary',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'journal' | 'critics' | 'neighborhoods' | 'reservations'>('explore');
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All Venues');
  const [selectedCity, setSelectedCity] = useState('All Destinations');
  const [selectedPrice, setSelectedPrice] = useState<PriceTier | 'all'>('all');
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // Modals & Selections
  const [activeVenueModal, setActiveVenueModal] = useState<Venue | null>(null);
  const [activeSlotForModal, setActiveSlotForModal] = useState<TimeSlot | null>(null);
  const [activeArticleModal, setActiveArticleModal] = useState<Article | null>(null);
  const [activeBookingConfirmation, setActiveBookingConfirmation] = useState<Booking | null>(null);

  // Saved / Wishlist
  const [savedVenueIds, setSavedVenueIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('th_saved_venues');
      return stored ? JSON.parse(stored) : ['asador-malva', 'l-ambre-et-sel'];
    } catch {
      return ['asador-malva', 'l-ambre-et-sel'];
    }
  });

  // Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('th_bookings');
      return stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Toast feedback state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('th_saved_venues', JSON.stringify(savedVenueIds));
    } catch {
      // ignore
    }
  }, [savedVenueIds]);

  useEffect(() => {
    try {
      localStorage.setItem('th_bookings', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Toggle bookmark
  const handleToggleSave = (venueId: string) => {
    setSavedVenueIds((prev) => {
      if (prev.includes(venueId)) {
        showToast('Removed from your dining wishlist', 'info');
        return prev.filter((id) => id !== venueId);
      } else {
        showToast('Saved to your gastronomic wishlist');
        return [...prev, venueId];
      }
    });
  };

  // Filtered venues calculation
  const filteredVenues = useMemo(() => {
    return VENUES.filter((venue) => {
      // Cuisine filter
      if (selectedCuisine !== 'All Venues' && venue.cuisine !== selectedCuisine) {
        return false;
      }

      // City filter
      if (selectedCity !== 'All Destinations' && venue.city !== selectedCity) {
        return false;
      }

      // Price filter
      if (selectedPrice !== 'all' && venue.priceTier !== selectedPrice) {
        return false;
      }

      // Search query (name, signature dish, description, chef name, neighborhood)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = venue.name.toLowerCase().includes(query);
        const matchesDish = venue.signatureDish.toLowerCase().includes(query);
        const matchesNeighborhood = venue.neighborhood.toLowerCase().includes(query);
        const matchesCity = venue.city.toLowerCase().includes(query);
        const matchesChef = venue.chef.name.toLowerCase().includes(query);
        const matchesTags = venue.tags.some((t) => t.toLowerCase().includes(query));

        if (!matchesName && !matchesDish && !matchesNeighborhood && !matchesCity && !matchesChef && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCuisine, selectedCity, selectedPrice, searchQuery]);

  // Handle slot click from VenueCard
  const handleSelectTimeSlot = (venue: Venue, slot: TimeSlot) => {
    setActiveSlotForModal(slot);
    setActiveVenueModal(venue);
  };

  // Handle venue selection
  const handleSelectVenue = (venue: Venue) => {
    setActiveSlotForModal(null);
    setActiveVenueModal(venue);
  };

  // Confirm booking
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setActiveVenueModal(null);
    setActiveBookingConfirmation(newBooking);
    showToast(`Table confirmed at ${newBooking.venueName}! Ref: ${newBooking.id}`);
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast('Reservation successfully cancelled.', 'info');
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('All Venues');
    setSelectedCity('All Destinations');
    setSelectedPrice('all');
  };

  // City selection from footer / guides
  const handleSelectCityFilter = (city: string) => {
    setSelectedCity(city);
    setActiveTab('explore');
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  // Cuisine selection from footer
  const handleSelectCuisineFilter = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    setActiveTab('explore');
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  // Quick reserve button in header
  const handleOpenQuickReserve = () => {
    // Open Asador Malva or first venue modal directly
    setActiveVenueModal(VENUES[0]);
  };

  const savedVenues = useMemo(() => {
    return VENUES.filter((v) => savedVenueIds.includes(v.id));
  }, [savedVenueIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917] selection:bg-[#ffdad2] selection:text-[#3c0700]">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#1C1917] text-white text-xs font-semibold rounded-lg shadow-xl border border-[#EDE5D8]/20 transition-all duration-300">
          {toast.type === 'success' ? (
            <Check className="w-4 h-4 text-[#fea619]" />
          ) : (
            <Info className="w-4 h-4 text-[#ffb4a2]" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Primary Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingCount={bookings.length}
        savedCount={savedVenueIds.length}
        onOpenQuickReserve={handleOpenQuickReserve}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        
        {/* VIEW 1: Main Editorial Discovery & Reservation Hub */}
        {activeTab === 'explore' && (
          <div>
            <HeroEditorial
              article={FEATURED_ARTICLE}
              featuredVenue={VENUES[0]}
              onReadArticle={(art) => setActiveArticleModal(art)}
              onReserveVenue={handleSelectVenue}
            />

            <div id="search-section">
              <SearchAndFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCuisine={selectedCuisine}
                setSelectedCuisine={setSelectedCuisine}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                partySize={partySize}
                setPartySize={setPartySize}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                totalResults={filteredVenues.length}
                onResetFilters={handleResetFilters}
              />
            </div>

            {/* Venues Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {filteredVenues.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-[#EDE5D8] max-w-lg mx-auto p-8 space-y-4">
                  <div className="font-serif text-2xl font-bold text-[#1C1917]">
                    No Tables Match Your Search
                  </div>
                  <p className="text-xs text-[#78716C]">
                    We couldn\'t find dining rooms matching the chosen criteria. Try resetting your search filters to explore all available venues.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="cursor-pointer px-4 py-2 text-xs font-semibold text-white bg-[#E05A38] hover:bg-[#C64726] rounded-md transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVenues.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      isSaved={savedVenueIds.includes(venue.id)}
                      onToggleSave={handleToggleSave}
                      onSelectVenue={handleSelectVenue}
                      onSelectTimeSlot={handleSelectTimeSlot}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Gastronomic Field Notes Strip */}
            <CriticsNotebook
              venues={VENUES}
              onSelectVenue={handleSelectVenue}
            />

            {/* City Districts Showcase */}
            <NeighborhoodGuides
              onSelectCity={handleSelectCityFilter}
            />
          </div>
        )}

        {/* VIEW 2: The Journal Articles */}
        {activeTab === 'journal' && (
          <JournalFeedView
            onSelectArticle={(art) => setActiveArticleModal(art)}
            venues={VENUES}
            onBookVenue={handleSelectVenue}
          />
        )}

        {/* VIEW 3: Critics Notebook */}
        {activeTab === 'critics' && (
          <div className="py-6">
            <CriticsNotebook
              venues={VENUES}
              onSelectVenue={handleSelectVenue}
            />
          </div>
        )}

        {/* VIEW 4: City Districts */}
        {activeTab === 'neighborhoods' && (
          <div className="py-6">
            <NeighborhoodGuides
              onSelectCity={handleSelectCityFilter}
            />
          </div>
        )}

        {/* VIEW 5: My Bookings & Wishlist */}
        {activeTab === 'reservations' && (
          <MyReservationsView
            bookings={bookings}
            savedVenues={savedVenues}
            onCancelBooking={handleCancelBooking}
            onSelectVenue={handleSelectVenue}
            onRemoveSaved={handleToggleSave}
            onExploreVenues={() => setActiveTab('explore')}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectCity={handleSelectCityFilter}
        onSelectCuisine={handleSelectCuisineFilter}
      />

      {/* MODAL 1: Venue Detail & Contiguous Reservation Flow */}
      {activeVenueModal && (
        <VenueDetailModal
          venue={activeVenueModal}
          initialSlot={activeSlotForModal}
          initialPartySize={partySize}
          initialDate={selectedDate}
          isSaved={savedVenueIds.includes(activeVenueModal.id)}
          onToggleSave={handleToggleSave}
          onClose={() => {
            setActiveVenueModal(null);
            setActiveSlotForModal(null);
          }}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* MODAL 2: Booking Confirmation Pass */}
      {activeBookingConfirmation && (
        <BookingConfirmationModal
          booking={activeBookingConfirmation}
          onClose={() => setActiveBookingConfirmation(null)}
          onViewMyBookings={() => {
            setActiveBookingConfirmation(null);
            setActiveTab('reservations');
          }}
        />
      )}

      {/* MODAL 3: Magazine Article Reader */}
      {activeArticleModal && (
        <EditorialArticleModal
          article={activeArticleModal}
          pairedVenue={VENUES.find((v) => v.id === activeArticleModal.pairedVenueId)}
          onClose={() => setActiveArticleModal(null)}
          onBookVenue={(venue) => {
            setActiveArticleModal(null);
            handleSelectVenue(venue);
          }}
        />
      )}

    </div>
  );
}
