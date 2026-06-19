import React from 'react';
import { MapPin } from 'lucide-react';
import { NightlifeVenue } from '../types';

interface NightlifeCardProps {
  venue: NightlifeVenue;
  onView: (id: string) => void;
  onContact?: (venue: NightlifeVenue) => void;
}

const NightlifeCard: React.FC<NightlifeCardProps> = React.memo(({ venue, onView }) => {
  return (
    <div className="relative">
      <div className="bg-[#141414] rounded-lg overflow-hidden border border-white/5">
        <div className="h-44 overflow-hidden relative">
          <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-serif text-white">{venue.name}</h3>
              <div className="text-sm text-gray-400">{venue.subcategory}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 text-xs text-gray-300">
            <MapPin size={12} className="text-gray-300" />
            <span>{typeof venue.location === 'string' ? venue.location : venue.location?.area}</span>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-300 mb-3 line-clamp-2">{venue.vibeDescription}</div>
            <div className="flex gap-2 flex-wrap">
              {(venue.tags || []).slice(0, 3).map((t, i) => (
                <span key={i} className="text-xs bg-black/40 text-gray-300 px-2 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button onClick={() => onView(venue.id)} className="w-full text-sm bg-[#D4AF37] text-black px-4 py-3 rounded-full font-medium">Reserve Table →</button>
          </div>
        </div>
      </div>
    </div>
  );
});

NightlifeCard.displayName = 'NightlifeCard';
export default NightlifeCard;
