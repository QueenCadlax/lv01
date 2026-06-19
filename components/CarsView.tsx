import React, { useMemo, useState } from 'react';
import { Search, Crown, MapPin, Car } from 'lucide-react';
import { SectionTitle } from './Shared';
import { AreaSelector } from './NewFeatures';
import CarFilters, { defaultFilters } from './CarFilters';
import CarModal from './CarModal';
import VehicleCard from './VehicleCard';
import DealershipCard from './DealershipCard.tsx';
import { carListings, dealerships } from '../data/seeds';

const CarsView = ({ navigate, favorites, toggleFavorite, onChat, activeArea, setActiveArea }: any) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'dealerships'>('listings');
  const [filters, setFilters] = useState(defaultFilters);
  const [openCar, setOpenCar] = useState<any | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = useMemo(() => {
    return carListings.filter(car => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesSearch = car.title.toLowerCase().includes(q) ||
                              car.dealer?.toLowerCase().includes(q) ||
                              car.fuel?.toLowerCase().includes(q) ||
                              car.transmission?.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      if (activeArea !== 'All Areas' && car.location !== activeArea) return false;
      if (filters.brand && !car.title.startsWith(filters.brand)) return false;
      if (filters.model && !car.title.toLowerCase().includes(filters.model.toLowerCase())) return false;
      if (filters.yearMin && Number(car.year) < filters.yearMin) return false;
      if (filters.yearMax && Number(car.year) > filters.yearMax) return false;
      if (filters.priceMin) {
        const p = Number((car.price || '').replace(/[^0-9]/g, ''));
        if (!isNaN(p) && p < filters.priceMin) return false;
      }
      if (filters.priceMax) {
        const p = Number((car.price || '').replace(/[^0-9]/g, ''));
        if (!isNaN(p) && p > filters.priceMax) return false;
      }
      if (filters.dealerTypes && filters.dealerTypes.length > 0) {
        const dealerType = car.isPremium ? 'Premium' : car.isVerified ? 'Verified' : 'Local';
        if (!filters.dealerTypes.includes(dealerType)) return false;
      }
      if (filters.mileageMax && car.mileage) {
        const m = Number((car.mileage || '').replace(/[^0-9]/g, ''));
        if (!isNaN(m) && m > filters.mileageMax) return false;
      }
      if (filters.fuel && filters.fuel.length > 0 && car.fuel && !filters.fuel.includes(car.fuel)) return false;
      if (filters.transmission && filters.transmission.length > 0 && car.transmission && !filters.transmission.includes(car.transmission)) return false;
      return true;
    });
  }, [searchTerm, activeArea, filters]);

  const filteredDealers = dealerships.filter(d => activeArea === 'All Areas' || d.location === activeArea);

  return (
    <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
      <SectionTitle title="Automotive" subtitle="Mpumalanga's Premier Showroom" />

      <div className="mb-8 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by brand, model, fuel type, transmission..."
            className="w-full px-4 py-3 pl-11 rounded-lg bg-white/10 border border-gold-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button onClick={() => setActiveTab('listings')} className={`px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'listings' ? 'bg-gold-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Vehicle Listings</button>
          <button onClick={() => setActiveTab('dealerships')} className={`px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'dealerships' ? 'bg-gold-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Elite Dealerships</button>
        </div>
        <AreaSelector activeArea={activeArea} onChange={setActiveArea} />
      </div>

      {activeTab === 'listings' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <CarFilters cars={carListings} filters={filters} setFilters={setFilters} onApply={() => { setMobileFiltersOpen(false); }} />
          </div>

          <div className="col-span-1 lg:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-400">{filteredCars.length} Cars</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileFiltersOpen(true)} className="lg:hidden px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-white">Filters</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars.slice(0, 4).map(car => (
                <div key={car.id}>
                  <VehicleCard car={car} isFavorite={favorites.includes(car.id)} onToggleFavorite={toggleFavorite} onView={(id:any) => setOpenCar(car)} />
                </div>
              ))}
            </div>
          </div>

          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden bg-black/60 p-4">
              <div className="max-w-md mx-auto">
                <CarFilters cars={carListings} filters={filters} setFilters={setFilters} onApply={() => setMobileFiltersOpen(false)} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {filteredDealers.map(dealer => (
            <DealershipCard key={dealer.id} dealership={dealer} />
          ))}
        </div>
      )}

      <CarModal open={!!openCar} onClose={() => setOpenCar(null)} car={openCar} />
    </div>
  );
};

export default CarsView;
