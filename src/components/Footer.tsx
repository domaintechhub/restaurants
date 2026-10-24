import React from 'react';

interface FooterProps {
  onSelectCity: (city: string) => void;
  onSelectCuisine: (cuisine: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCity,
  onSelectCuisine,
}) => {
  return (
    <footer className="bg-[#1C1917] text-[#EDE5D8] border-t border-[#33302D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
              TERRA &amp; HEARTH
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-sm">
              An elevated editorial discovery and table reservation platform celebrating wood-fired kitchens, artisanal seafood crudos, and low-intervention cellars across urban gastronomic capitals.
            </p>
            <div className="pt-2 text-xs text-[#78716C]">
              Published quarterly in Barcelona, Paris &amp; London.
            </div>
          </div>

          {/* City Editions */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
              City Compendiums
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A29E]">
              {['Barcelona', 'Paris', 'Rome', 'London', 'San Francisco'].map((city) => (
                <li key={city}>
                  <button
                    onClick={() => onSelectCity(city)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {city} Dining Guides
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Culinary Traditions */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
              Curated Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A29E]">
              {[
                'Wood-Fired & Hearth',
                'Natural Wine & Crudo',
                'Chef\'s Tasting Counter',
                'Secluded Terraces',
                'Historic Bistros',
              ].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => onSelectCuisine(c)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Hairline divider & bottom line */}
        <div className="pt-8 border-t border-[#33302D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            &copy; {new Date().getFullYear()} Terra &amp; Hearth Editorial. All restaurant inspections conducted independently.
          </div>
          <div className="flex items-center gap-6">
            <span>Ethical Dining Charter</span>
            <span aria-hidden="true">·</span>
            <span>Cellar Verification Policy</span>
            <span aria-hidden="true">·</span>
            <span>Hospitality Partnerships</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
