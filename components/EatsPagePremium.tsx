import React, { useState, useMemo, useCallback } from 'react';
import EateryCard from './EateryCard';
import { eateries } from '../data/eatsSeeds';
import { nightlifeVenues } from '../data/nightlifeSeeds';
import { Eatery, MPUMALANGA_AREAS } from '../types';
import { Search, Star, Flame, Utensils, Music } from 'lucide-react';

const priceLabelToRange = (label: string) => {
  switch (label) {
    case '$': return [0, 100];
    case '$$': return [100, 300];
    case '$$$': return [300, 800];
    case '$$$$': return [800, 99999];
    default: return [0, 99999];
  }
};

const EatsPagePremium: React.FC<{ navigate: (view: string, category?: string, id?: string) => void, title?: string, subtitle?: string, placeholder?: string, hideShisanyama?: boolean, allListLabel?: string, nightlifeMode?: boolean }> = ({ navigate, title, subtitle, placeholder, hideShisanyama, allListLabel, nightlifeMode }) => {
  const [filters, setFilters] = useState<any>({ areas: [], cuisines: [], category: '', priceMin: 0, priceMax: 2500, verified: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeCuisineOpen, setTypeCuisineOpen] = useState(false);
  const [typeCuisineQuery, setTypeCuisineQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [areaQuery, setAreaQuery] = useState('');

  const source = nightlifeMode ? nightlifeVenues : eateries;

  const allSuggestions = useMemo(() => {
    if (nightlifeMode) {
      const names = source.map((v: any) => v.name);
      const tags = source.flatMap((v: any) => v.tags || []);
      return Array.from(new Set([...names, ...tags]));
    }
    const names = eateries.map(e => e.name);
    const cuisines = eateries.flatMap(e => e.cuisine || []);
    const dishes = eateries.flatMap(e => (e.menu || []).map(m => m.itemName));
    return Array.from(new Set([...names, ...cuisines, ...dishes]));
  }, [nightlifeMode]);

  // unique cuisines list for the filter popover
  const uniqueCuisines = useMemo(() => {
    if (nightlifeMode) {
      const types = source.flatMap((v: any) => [(v.subcategory || ''), ...(v.tags || [])]);
      return Array.from(new Set(types.filter(Boolean))).sort((a: string, b: string) => a.localeCompare(b));
    }
    const c = eateries.flatMap(e => e.cuisine || []);
    return Array.from(new Set(c)).sort((a: string, b: string) => a.localeCompare(b));
  }, [nightlifeMode]);

  const typeOptions = nightlifeMode ? ['Clubs', 'Lounges', 'Live Music', 'Rooftops', 'Bars', 'Comedy', 'VIP'] : ['Fine Dining', 'Casual', 'Fast Food', 'Cafe', 'Bar', 'Takeaway'];

  const filtered = useMemo(() => {
    let result = source.filter((e: any) => {
      if (filters.areas && filters.areas.length) {
        const area = typeof e.location === 'string' ? e.location : e.location.area;
        if (!filters.areas.includes(area)) return false;
      }
      if (filters.category && filters.category !== '' && e.category !== filters.category) return false;
      if (filters.cuisines && filters.cuisines.length) {
        if (nightlifeMode) {
          const has = filters.cuisines.every((c: string) => ((e.tags || []).concat(e.subcategory || '')).join(' ').toLowerCase().includes(c.toLowerCase()));
          if (!has) return false;
        } else {
          const has = filters.cuisines.every((c: string) => (e.cuisine || []).includes(c));
          if (!has) return false;
        }
      }
      if (filters.verified && !e.verified) return false;
      if (!nightlifeMode) {
        const [low, high] = [filters.priceMin ?? 0, filters.priceMax ?? 99999];
        const numeric = (() => {
          if (e.menu && e.menu.length) {
            const nums = e.menu.map(m => parseInt((m.price || '').replace(/\D/g,''),10) || 0).filter(n=>n>0);
            if (nums.length) return nums.reduce((a,b)=>a+b,0)/nums.length;
          }
          const pr = priceLabelToRange(e.priceRange || '');
          return (pr[0]+pr[1])/2;
        })();
        if (numeric < low || numeric > high) return false;
      }
      if (searchTerm && searchTerm.length > 1) {
        const q = searchTerm.toLowerCase();
        const inName = (e.name || '').toLowerCase().includes(q);
        if (nightlifeMode) {
          const inTags = (e.tags || []).some((t: string) => t.toLowerCase().includes(q));
          const inDesc = (e.description || '').toLowerCase().includes(q);
          if (!(inName || inTags || inDesc)) return false;
        } else {
          const inCuisine = (e.cuisine || []).some(c => c.toLowerCase().includes(q));
          const inMenu = (e.menu || []).some(m => (m.itemName || '').toLowerCase().includes(q));
          if (!(inName || inCuisine || inMenu)) return false;
        }
      }
      return true;
    });

  if (sortBy === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  else if (sortBy === 'trending') result.sort((a, b) => (((b as any).reviews?.length) || 0) - (((a as any).reviews?.length) || 0));
    else if (sortBy === 'newest') result.sort((a, b) => (b.id?.localeCompare(a.id) || 0));

    return result;
  }, [filters, searchTerm, sortBy]);

  const editorPicks = useMemo(() => eateries.filter(e => e.premiumTier === 'Elite').slice(0, 4), []);
  const trending = useMemo(() => [...eateries].sort((a,b) => ((b.reviews?.length) || 0) - ((a.reviews?.length) || 0)).slice(0, 4), []);
  const shisanyama = useMemo(() => eateries.filter(e => (e.cuisine || []).includes('Shisanyama')).slice(0, 4), []);

  // Display only the first N results in the grid for preview; keep total count accurate in the header
  const MAX_GRID = 4;
  const displayed = filtered.slice(0, MAX_GRID);

  const handleView = useCallback((id: string) => navigate(nightlifeMode ? 'nightlife-detail' : 'eatery-detail', undefined, id), [navigate, nightlifeMode]);
  const handleContact = useCallback((e: Eatery) => {
    if (e.contactOptions?.whatsapp) window.open(`https://wa.me/${e.contactOptions.whatsapp.replace(/\D/g, '')}`);
    else if (e.contactOptions?.call) window.location.href = `tel:${e.contactOptions.call}`;
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-black">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-black border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
              <span className="text-yellow-400">{title || (nightlifeMode ? 'Where Mpumalanga Goes Out' : 'Where Mpumalanga Eats')}</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              {subtitle || (nightlifeMode ? 'CLUBS & LOUNGES • LIVE MUSIC & VENUES • BARS & COCKTAIL LOUNGES' : 'Explore verified restaurants, shisanyama, and dining experiences across Mpumalanga.')}
            </p>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={placeholder || (nightlifeMode ? 'Search clubs, venues, or nightlife experiences…' : 'Search restaurants, cuisines, dishes…')}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setSuggestionsOpen(true); }}
                onFocus={() => setSuggestionsOpen(true)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
              />
            </div>
            {suggestionsOpen && searchTerm.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 mx-auto max-w-3xl bg-black/90 border border-white/10 rounded-lg p-4 z-40 max-h-64 overflow-y-auto">
                <div className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Suggestions</div>
                <div className="flex flex-wrap gap-2">
                  {allSuggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).slice(0,8).map(s => (
                    <button key={s} onClick={() => { setSearchTerm(s); setSuggestionsOpen(false); }} className="px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-yellow-400/20 transition-colors" style={{ background: 'rgba(201,162,77,0.1)', border: '1px solid rgba(201,162,77,0.2)', color: '#CFCFCF' }}>{s}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 space-y-12 md:space-y-16 py-12">
        {/* PREMIUM FILTER BAR - Redesigned: Area | Type | Cuisines (inline) | More (price/verified) | Sort */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          {/* Area selector */}
          <div className="relative">
            <button onClick={() => setAreaOpen(!areaOpen)} className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>
              {filters.areas?.length ? filters.areas[0] : 'Area'}
            </button>
            {areaOpen && (
              <div className="absolute mt-2 w-64 bg-black border border-white/10 rounded-lg p-3 shadow-lg z-40" style={{ borderColor: 'rgba(201,162,77,0.2)' }}>
                <input placeholder="Search city..." value={areaQuery} onChange={(e)=>setAreaQuery(e.target.value)} className="w-full bg-black/80 text-gray-200 px-3 py-2 rounded mb-2 border border-white/10" />
                <div className="max-h-60 overflow-auto space-y-1">
                  {MPUMALANGA_AREAS.filter(a => a.toLowerCase().includes(areaQuery.toLowerCase())).map(a => (
                    <button key={a} onClick={() => { setFilters({...filters, areas: [a]}); setAreaOpen(false); }} className="w-full text-left px-2 py-2 rounded hover:bg-white/5 text-gray-200 text-sm">{a}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Combined Type & Cuisine selector */}
            <div className="relative">
            <button onClick={() => setTypeCuisineOpen(!typeCuisineOpen)} className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>
              {(filters.category || (filters.cuisines && filters.cuisines.length)) ? ((filters.category ? `${filters.category}` : '') + (filters.cuisines && filters.cuisines.length ? (filters.category ? ` • ${filters.cuisines.length}` : `${filters.cuisines.length}`) : '')) : (nightlifeMode ? 'Type / Vibe' : 'Type / Cuisine')}
            </button>
            {typeCuisineOpen && (
              <div className="absolute mt-2 w-72 bg-black border border-white/10 rounded-lg p-3 shadow-lg z-40" style={{ borderColor: 'rgba(201,162,77,0.16)' }}>
                <input placeholder={nightlifeMode ? 'Filter types & genres...' : 'Filter types & cuisines...'} value={typeCuisineQuery} onChange={(e)=>setTypeCuisineQuery(e.target.value)} className="w-full bg-black/80 text-gray-200 px-3 py-2 rounded mb-3 border border-white/10" />

                <div className="mb-2">
                  <div className="text-xs text-gray-400 uppercase mb-2">Type</div>
                  <div className="flex flex-col gap-1">
                    {typeOptions.filter(t => t.toLowerCase().includes(typeCuisineQuery.toLowerCase()) || typeCuisineQuery === '').map(t => (
                      <button key={t} onClick={() => {
                        // toggle single type selection
                        const newCat = filters.category === t ? '' : t;
                        setFilters({...filters, category: newCat});
                      }} className="w-full text-left px-2 py-2 rounded hover:bg-white/5 text-sm" style={{ background: filters.category === t ? '#C9A24D' : 'transparent', color: filters.category === t ? '#000' : '#CFCFCF' }}>{t}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-400 uppercase mb-2">{nightlifeMode ? 'Genres & Tags' : 'Cuisines'}</div>
                  <div className="max-h-36 overflow-auto space-y-1">
                    {uniqueCuisines.filter(c => c.toLowerCase().includes(typeCuisineQuery.toLowerCase()) || typeCuisineQuery === '').map(c => {
                      const active = Array.isArray(filters.cuisines) && filters.cuisines.includes(c);
                      return (
                        <button key={c} onClick={() => {
                          const arr = Array.isArray(filters.cuisines) ? [...filters.cuisines] : [];
                          const idx = arr.indexOf(c);
                          if (idx === -1) arr.push(c); else arr.splice(idx,1);
                          setFilters({...filters, cuisines: arr});
                        }} className="w-full text-left px-2 py-2 rounded hover:bg-white/5 text-sm" style={{ background: active ? '#C9A24D' : 'transparent', color: active ? '#000' : '#CFCFCF' }}>{c}</button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-3">
                  <button onClick={() => { setFilters({...filters, cuisines: [], category: ''}); setTypeCuisineOpen(false); }} className="px-3 py-1 rounded text-sm">Clear</button>
                  <button onClick={() => setTypeCuisineOpen(false)} className="px-3 py-1 rounded bg-black/60 text-sm">Done</button>
                </div>
              </div>
            )}
          </div>

          {/* 'More' removed as requested - price & verified moved to the combined controls / Clear */}

          <div className="ml-auto flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
            <button onClick={() => { setFilters({ areas: [], cuisines: [], category: '', priceMin: 0, priceMax: 2500, verified: false }); }} className="text-xs text-gray-300 px-3 py-2 rounded-lg border border-white/10">Clear</button>
            <span className="text-xs text-gray-400 hidden sm:inline">Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-2 sm:px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-gray-200 text-xs sm:text-sm">
              <option value="rating">Rating</option>
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* FEATURED: SHISANYAMA */}
        {!hideShisanyama && shisanyama.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Utensils size={24} style={{ color: '#C9A24D' }} />
              <h2 className="text-2xl font-bold">Shisanyama Near You</h2>
              <span className="text-xs text-gray-400 ml-2">Local favorite</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {shisanyama.map(e => (
                <EateryCard key={e.id} eatery={e} onView={handleView} onContact={handleContact} />
              ))}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mt-8" />
          </section>
        )}

        {/* ALL RESTAURANTS */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {allListLabel || (nightlifeMode ? 'All Venues' : 'All Restaurants')}{' '}
            <span className="text-sm text-gray-400">
              {filtered.length > displayed.length ? `Showing ${displayed.length} of ${filtered.length} results` : `${filtered.length} results`}
            </span>
          </h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {displayed.map(e => (
                  <EateryCard key={e.id} eatery={e} onView={handleView} onContact={handleContact} />
                ))}
            </div>
          ) : (
            // For nightlife we intentionally render a minimal spacer when there are no venues
            nightlifeMode ? (
              <div className="py-12" />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🍽️</div>
                <h3 className="text-2xl font-bold mb-2">No Restaurants Found</h3>
                <p style={{ color: '#CFCFCF' }}>Try adjusting your filters or search term to discover amazing dining experiences</p>
              </div>
            )
          )}
        </section>
      </div>

      {/* Removed More Filters drawer per spec (price & verified moved into combined controls or handled by Clear) */}
    </div>
  );
};

export default EatsPagePremium;
