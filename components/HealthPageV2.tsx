import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, CheckCircle, Phone, Mail, Globe, MessageCircle, ChevronRight } from 'lucide-react';
import { MPUMALANGA_AREAS } from '../types';

interface HealthProvider {
  id: string;
  name: string;
  specialty: string;
  type: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  image: string;
  phone?: string;
  email?: string;
  website?: string;
  description: string;
}

interface HealthPageV2Props {
  navigate: (view: string, category?: string, id?: string) => void;
}

const HealthPageV2: React.FC<HealthPageV2Props> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Specialty types for filtering
  const specialties = [
    'All Specialties',
    'General Practitioner',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Gynecologist',
    'Orthopedic Surgeon',
    'Dentist',
    'Pharmacist',
    'Physiotherapist',
    'Psychiatrist',
    'Optometrist',
    'Neurologist',
    'ENT Specialist',
    'Oncologist',
  ];

  // Mock health providers with detailed data
  const providers: HealthProvider[] = [
    {
      id: 'b_dr_joseph_oncology',
      name: 'Dr Joseph Mthombeni',
      specialty: 'Radiation & Clinical Oncologist',
      type: 'Radiation & Clinical Oncology',
      rating: 4.9,
      reviews: 47,
      location: 'Mbombela',
      verified: true,
      image: 'https://drjmoncology.co.za/storage/2023/10/dr-jospeh-mthombeni-profile.png',
      phone: '+27 13 880 2039',
      email: 'info@drjmoncology.co.za',
      website: 'https://drjmoncology.co.za',
      description: 'Verified Specialist in Radiation & Clinical Oncology. 12+ years experience in comprehensive cancer care. Multi-location practice serving Mbombela & Hoedspruit.',
    },
  ];

  // Filter providers
  const filteredProviders = useMemo(() => {
    return providers.filter(provider => {
      const matchesSearch =
        searchQuery === '' ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === 'All Specialties' ||
        provider.specialty === selectedSpecialty;

      const matchesLocation =
        selectedLocation === 'All Areas' || provider.location === selectedLocation;

      return matchesSearch && matchesSpecialty && matchesLocation;
    });
  }, [searchQuery, selectedSpecialty, selectedLocation]);

  // Top rated from filtered
  const topRated = useMemo(
    () => [...filteredProviders].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4),
    [filteredProviders]
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
              <span className="text-yellow-400">Find Trusted Doctors</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Explore verified medical professionals and specialists across Mpumalanga.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors, specialties, clinics…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        {/* MAIN CONTENT - Filter + Results */}
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

              {/* Specialty Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {specialties.map((spec) => (
                    <option key={spec} value={spec} className="bg-slate-900">
                      {spec}
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
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {MPUMALANGA_AREAS.map((area) => (
                    <option key={area} value={area} className="bg-slate-900">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('All Specialties');
                  setSelectedLocation('All Areas');
                }}
                className="w-full py-2 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-lg transition-colors font-semibold text-sm"
              >
                Reset Filters
              </button>

              {/* Result Count */}
              <p className="text-xs text-gray-400 mt-6 text-center">
                {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-3">
            {/* RESULTS HEADER */}
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-white mb-2">Specialists</h2>
              <p className="text-gray-400">
                {filteredProviders.length} specialist{filteredProviders.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* SINGLE UNIFIED GRID */}
            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="bg-black border border-white/20 rounded-xl overflow-hidden hover:border-yellow-400/80 transition-all cursor-pointer group hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/20"
                    onClick={() => navigate('health-detail', undefined, provider.id)}
                  >
                    {/* Professional Headshot */}
                    <div className="h-52 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                      {provider.image && (
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* Premium Info Section */}
                    <div className="p-5 space-y-3">
                      {/* Doctor Name & Title */}
                      <div>
                        <h3 className="font-serif text-base font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:via-yellow-400 group-hover:to-yellow-500 transition-all mb-1.5">
                          {provider.name}
                        </h3>
                        <p className="text-xs text-white font-semibold leading-relaxed">
                          {provider.specialty}
                        </p>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                        <span className="text-yellow-400/60">📍</span>
                        <span className="text-xs text-gray-400">{provider.location}</span>
                      </div>

                      {/* Premium CTA Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('health-detail', undefined, provider.id);
                        }}
                        className="w-full py-2.5 mt-1 bg-yellow-400/90 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-all text-xs tracking-wide hover:shadow-lg hover:shadow-yellow-400/30"
                      >
                        View Profile →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No specialists found matching your filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialty('All Specialties');
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

export default HealthPageV2;
