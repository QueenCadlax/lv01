import React from 'react';
// Support both Eatery and NightlifeVenue shapes
import { MapPin, Star } from 'lucide-react';

const EateryCard: React.FC<{ eatery: any; onView: (id: string) => void; onContact?: (eatery: any) => void }> = React.memo(({ eatery, onView }) => {
  return (
    <article
      onClick={() => onView(eatery.id)}
      className="group relative bg-black rounded-[20px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-1 flex flex-col h-full"
      style={{ border: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Image - hero */}
      <div className="w-full" style={{ aspectRatio: '17 / 10', overflow: 'hidden' }}>
        <img
          src={eatery.images?.[0] || eatery.image || ''}
          alt={eatery.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ display: 'block' }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col" style={{ gap: '10px' }}>
        {/* Business Name */}
        <h3 className="mt-1 text-xl md:text-2xl font-serif text-white leading-tight" style={{ lineHeight: 1.05, fontWeight: 400 }}>{eatery.name}</h3>

        {/* Metadata: Category then Location (location on its own line) */}
        <div className="mt-2">
          <div className="text-sm text-gray-400">{eatery.category || eatery.subcategory}</div>
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            <span className="truncate">{typeof eatery.location === 'string' ? eatery.location : eatery.location?.area}</span>
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-auto flex items-center justify-end">
          <button
            onClick={(e) => { e.stopPropagation(); onView(eatery.id); }}
            className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-all"
            style={{ background: 'transparent', padding: 0 }}
            aria-label={`Explore ${eatery.name}`}
          >
            <span className="underline decoration-transparent hover:decoration-current transition-all" style={{ textDecorationThickness: '1px' }}>Explore</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </article>
  );
});

EateryCard.displayName = 'EateryCard';
export default EateryCard;
