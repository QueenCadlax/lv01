import React, { useState, useMemo, useCallback } from 'react';
import { nightlifeVenues } from '../data/nightlifeSeeds';
import { NightlifeVenue, MPUMALANGA_AREAS, Category, CategorySubcategories } from '../types';
import { SectionTitle } from './Shared';
import { Search } from 'lucide-react';

// New experience-first Nightlife page: "Lowveld After Dark"
const CHIPS = ['Tonight', 'This Weekend', 'Rooftops', 'Live Music', 'Cocktails', 'Clubs'];

const sampleHeroVideo = 'https://storage.googleapis.com/lowveld-assets/nightlife-hero.mp4';

const NightlifePage: React.FC<{ navigate: (view: string, category?: string, id?: string) => void }> = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChip, setActiveChip] = useState<string>('Tonight');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return nightlifeVenues.filter((v: NightlifeVenue) => {
      if (selectedArea) {
        const area = typeof v.location === 'string' ? v.location : (v.location && (v.location.area || v.location.city));
        if (!area || !area.toLowerCase().includes(selectedArea.toLowerCase())) return false;
      }
      if (q.length > 0) {
        const inName = (v.name || '').toLowerCase().includes(q);
        const inDesc = (v.description || '').toLowerCase().includes(q);
        const inTags = (v.tags || []).some((t: string) => t.toLowerCase().includes(q));
        if (!(inName || inDesc || inTags)) return false;
      }
          // Chip filtering: 'Tonight' prefers venues that operate late or explicitly have lateNight feature
          if (activeChip === 'Tonight') {
            if (v.features && v.features.lateNight === false) return false;
            if ((v.tags || []).includes('daytime-only')) return false;
      }
      if (activeChip === 'Rooftops') {
        if (!((v.tags || []).includes('rooftop') || (v.subcategory || '').toLowerCase().includes('rooftop'))) return false;
      }
      // This Weekend and other chips left permissive
      return true;
    });
  }, [searchTerm, selectedArea, activeChip]);

  const getLocationLabel = (v: NightlifeVenue) => {
    if (!v) return '';
    if (typeof v.location === 'string') return v.location;
    return v.location?.city || v.location?.area || '';
  };

  const handleView = useCallback((id?: string) => { if (id) navigate('nightlife-detail', undefined, id); }, [navigate]);

  // Small presentational card used across sections. Single CTA: Reserve Table →
  const MiniCard: React.FC<{ v: any }> = ({ v }) => (
    <div className="bg-[#141414] rounded-lg overflow-hidden shadow-lg border border-white/5">
      <div className="h-44 md:h-56 bg-gray-800 relative">
        <img src={v.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200'} alt={v.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute left-4 bottom-4">
          <div className="text-white font-semibold text-lg">{v.name}</div>
          <div className="text-gray-300 text-sm mt-1">{getLocationLabel(v)}</div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="text-sm text-gray-300">{(v.tags || []).slice(0,2).join(' • ')}</div>
        <button onClick={() => handleView(v.id)} className="ml-4 text-sm text-[#090909] bg-[#D4AF37] px-3 py-2 rounded-full font-medium">Reserve Table →</button>
      </div>
    </div>
  );

  // Trending big card
  const TrendingCard: React.FC<{ v: any }> = ({ v }) => (
    <div className="relative rounded-lg overflow-hidden shadow-lg border border-white/5 h-72">
      <img src={v.image || 'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&q=80&w=1600'} alt={v.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute left-6 bottom-6 text-white">
        <h3 className="text-2xl font-semibold mb-1">{v.name}</h3>
        <div className="text-sm text-gray-300 mb-3">{getLocationLabel(v)}</div>
        <button onClick={() => handleView(v.id)} className="text-sm bg-[#D4AF37] text-black px-4 py-2 rounded-full font-medium">Reserve Table →</button>
      </div>
    </div>
  );

  // Editorial stories (static for now)
  const stories = [
    { id: 's1', title: '10 Rooftops Worth Visiting', img: 'https://images.unsplash.com/photo-1505765051321-2c0c9b6b3b0f' },
    { id: 's2', title: 'Best Live Music This Month', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba' },
    { id: 's3', title: 'Where to Dress to Impress', img: 'https://images.unsplash.com/photo-1529068755536-a5ade1e0c2c6' },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      {/* HERO: cinematic video background with chips + CTA */}
      <section className="relative h-[60vh] md:h-[68vh] overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={sampleHeroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-3">Lowveld After Dark</h1>
          <p className="text-gray-300 max-w-2xl mb-6">Cinematic nights. Curated experiences. Reserve your evening at Mpumalanga's finest venues.</p>

          <div className="flex items-center gap-3 flex-wrap">
            {CHIPS.map(c => (
              <button key={c} onClick={() => setActiveChip(c)} className={`px-4 py-2 rounded-full text-sm font-medium ${activeChip===c? 'bg-[#D4AF37] text-black' : 'bg-black/40 text-gray-200'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-16">
        {/* Tonight in Mpumalanga */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Tonight in Mpumalanga</h2>
            <div className="flex items-center gap-3">
              <div className="bg-[#141414] rounded-full px-3 py-2 border border-white/5 flex items-center gap-2">
                <Search className="text-gray-300" size={18} />
                <input placeholder="Search tonight" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="bg-transparent outline-none text-gray-200 text-sm" />
              </div>
              <select onChange={(e)=>setSelectedArea(e.target.value || null)} className="bg-[#141414] text-gray-200 px-3 py-2 rounded-full border border-white/5">
                <option value="">All Areas</option>
                {MPUMALANGA_AREAS.slice(0,8).map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-6 w-max">
              {filtered.slice(0, 8).map(v => (
                <div key={v.id} className="w-[320px]">
                  <MiniCard v={v} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Places: large immersive cards */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Trending Places</h2>
            <button className="text-sm text-gray-300">See all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(() => {
              const top = nightlifeVenues.filter(v => v.tier === 'Platinum' || v.tier === 'Elite');
              const rest = nightlifeVenues.filter(v => !(v.tier === 'Platinum' || v.tier === 'Elite'));
              const combined = [...top, ...rest].slice(0, 3);
              return combined.map(v => <TrendingCard key={v.id} v={v} />);
            })()}
          </div>
        </section>

        {/* Browse Experiences */}
        <section className="mb-12">
          <SectionTitle title="Browse Experiences" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6">
            {['Cocktail Bars','Live Music','Rooftops','Nightclubs','Wine Bars','Comedy'].map(exp => (
              <button key={exp} className="flex flex-col items-center gap-2 p-4 bg-[#141414] rounded-lg border border-white/5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-2xl text-[#D4AF37] font-bold">✦</div>
                <div className="text-sm text-gray-200">{exp}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Happening This Weekend - simple timeline */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Happening This Weekend</h2>
            <div className="text-sm text-gray-400">Fri • Sat • Sun</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Friday','Saturday','Sunday'].map((day, idx) => (
              <div key={day} className="bg-[#121212] rounded-lg p-4 border border-white/5">
                <div className="text-lg font-semibold mb-3">{day}</div>
                <div className="space-y-3">
                  {nightlifeVenues.slice(idx*2, idx*2+3).map(v => (
                    <div key={v.id} className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded bg-gray-700 overflow-hidden">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{v.name}</div>
                                      <div className="text-xs text-gray-400">{getLocationLabel(v)} • {v.tags && v.tags[0]}</div>
                      </div>
                      <div className="text-sm text-gray-300">8:00 PM</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rooftop Collection */}
        <section className="mb-12">
          <div className="relative rounded-lg overflow-hidden h-56">
            <img src={nightlifeVenues.find(v=> (v.tags||[]).includes('rooftop'))?.image || nightlifeVenues[0]?.image} alt="Rooftops" className="w-full h-full object-cover brightness-75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-semibold mb-2">Rooftop Collection</h3>
                <p className="text-gray-300 mb-4">Curated rooftop bars for sunset cocktails and skyline views.</p>
                <button onClick={() => setActiveChip('Rooftops')} className="bg-[#D4AF37] text-black px-5 py-2 rounded-full font-medium">Explore Rooftops →</button>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Stories */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Editorial</h2>
            <button className="text-sm text-gray-300">See all stories</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map(s => (
              <div key={s.id} className="bg-[#141414] rounded-lg overflow-hidden border border-white/5">
                <img src={s.img} alt={s.title} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <div className="text-lg font-semibold mb-2">{s.title}</div>
                  <div className="text-sm text-gray-400">Curated by Lowveld Editors</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NightlifePage;
