import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, CheckCircle, Phone, Mail, Globe, MessageCircle, ChevronRight } from 'lucide-react';
import { MPUMALANGA_AREAS } from '../types';

interface LegalFinanceProfessional {
  id: string;
  name: string;
  type: string;
  specialization: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  image: string;
  phone?: string;
  email?: string;
  description: string;
}

interface LegalFinancePageV2Props {
  navigate: (view: string, category?: string, id?: string) => void;
}

const LegalFinancePageV2: React.FC<LegalFinancePageV2Props> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('All Services');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Service types for filtering
  const serviceTypes = [
    'All Services',
    'Corporate Lawyers',
    'Criminal Lawyers',
    'Family Lawyers',
    'Property Lawyers',
    'Immigration Lawyers',
    'Labour Lawyers',
    'Accountants',
    'Tax Consultants',
    'Auditors',
    'Financial Advisors',
    'Wealth Managers',
    'Insurance Brokers',
  ];

  // Mock professionals with premium positioning
  const professionals: LegalFinanceProfessional[] = [
    {
      id: 'du-toit-smuts-partners',
      name: 'Du Toit-Smuts & Partners Attorneys',
      type: 'Full Service Law Firm',
      specialization: 'Corporate, Property & Commercial Law',
      rating: 4.9,
      reviews: 178,
      location: 'Mbombela',
      verified: true,
  image: 'https://www.facebook.com/photo.php?fbid=745462050914924&set=pb.100063534074721.-2207520000&type=3',
      phone: '013 745 3200',
      email: 'library@dtsmp.co.za',
      description: 'One of the largest and most established law firms in Mpumalanga, serving private, corporate and government clients since 1976.',
    },
  ];

  // Filter professionals
  const filteredProfessionals = useMemo(() => {
    return professionals.filter(prof => {
      const matchesSearch =
        searchQuery === '' ||
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesServiceType =
        selectedServiceType === 'All Services' ||
        prof.specialization.includes(selectedServiceType) ||
        prof.type.toLowerCase().includes(selectedServiceType.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All Areas' || prof.location.includes(selectedLocation);

      return matchesSearch && matchesServiceType && matchesLocation;
    });
  }, [searchQuery, selectedServiceType, selectedLocation]);

  // Top rated from filtered
  const topRated = useMemo(
    () => [...filteredProfessionals].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4),
    [filteredProfessionals]
  );

  // Scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-black border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-yellow-400 mb-4 tracking-tight">
              LEGAL & FINANCE
            </h1>
            <p className="text-lg text-gray-300 font-light mb-8 leading-relaxed">
              Trusted advisors, law firms, accountants and financial specialists across Mpumalanga.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search professionals, services, firms…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        {/* FILTER SECTION - Compact, sticky sidebar */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTER SIDEBAR */}
          <div className="lg:col-span-1">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="lg:hidden w-full mb-4 py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white font-semibold hover:bg-white/10 transition-colors"
            >
              {showMobileFilter ? '✕ Close Filters' : '⊕ Show Filters'}
            </button>

            {/* Filter Container */}
            <div
              className={`${
                showMobileFilter ? 'block' : 'hidden'
              } lg:block bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24 h-fit`}
            >
              <h3 className="text-white font-bold text-lg mb-6">Filters</h3>

              {/* Service Type Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">
                  Service Type
                </label>
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  className="w-full bg-black border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {serviceTypes.map((type) => (
                    <option key={type} value={type} className="bg-black text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-black border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {MPUMALANGA_AREAS.map((area) => (
                    <option key={area} value={area} className="bg-black text-white">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedServiceType('All Services');
                  setSelectedLocation('All Areas');
                }}
                className="w-full py-2 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-lg transition-colors font-semibold text-sm"
              >
                Reset Filters
              </button>

              {/* Result Count */}
              <p className="text-xs text-gray-400 mt-6 text-center">
                {filteredProfessionals.length} professional{filteredProfessionals.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-3">
            {/* DIRECTORY HEADER */}
            <div className="mb-16">
              <h2 className="text-4xl font-light text-white mb-2 tracking-tight">Legal & Finance Professionals</h2>
              <p className="text-sm text-gray-400 font-light">{filteredProfessionals.length} Professional{filteredProfessionals.length !== 1 ? 's' : ''}</p>
            </div>

            {/* UNIFIED PROFESSIONAL GRID - ONE SECTION ONLY */}
            {filteredProfessionals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProfessionals.map((prof) => (
                  <div
                    key={prof.id}
                    className="bg-black border border-white/20 rounded-2xl overflow-hidden hover:border-yellow-400/60 transition-all cursor-pointer group flex flex-col"
                    onClick={() => navigate('legal-finance-detail', undefined, prof.id)}
                  >
                    {/* IMAGE - 60% of card height */}
                    <div className="h-48 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden flex-shrink-0">
                      {prof.image && (
                        <img
                          src={prof.image}
                          alt={prof.name}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://www.dtsmp.co.za/wp-content/uploads/2023/08/bee-compliant-final-231x300.png'; }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* TEXT CONTENT - 40% of card height */}
                    <div className="p-5 space-y-2.5 flex flex-col flex-grow">
                      {/* Service Category - Small, Muted */}
                      <p className="text-xs text-yellow-400/80 font-light tracking-widest uppercase">
                        {prof.specialization}
                      </p>

                      {/* Firm Name - HERO TEXT - Appears ONCE */}
                      <h3 className="text-lg font-light text-white group-hover:text-yellow-400 transition-colors leading-tight">
                        {prof.name}
                      </h3>

                      {/* Location - Subtle */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{prof.location}</span>
                      </div>

                      {/* Description - Brief positioning */}
                      <p className="text-xs text-gray-400 font-light leading-relaxed pt-1 flex-grow">
                        {prof.description}
                      </p>

                      {/* Button - Fixed to bottom */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('legal-finance-detail', undefined, prof.id);
                        }}
                        className="w-full mt-auto pt-2 py-2 bg-yellow-400/90 hover:bg-yellow-400 text-black font-light rounded-lg transition-colors text-xs tracking-wide"
                      >
                        View Profile →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No professionals found matching your filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedServiceType('All Services');
                    setSelectedLocation('All Areas');
                  }}
                  className="mt-4 px-6 py-2 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-lg transition-colors font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalFinancePageV2;
