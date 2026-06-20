import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, CheckCircle, Phone, MessageSquare, ChevronRight, X } from 'lucide-react';
import { Business, Category, ListingTier, MPUMALANGA_AREAS } from '../types';

interface ServicesPageProps {
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  businesses: Business[];
  categoryKey?: Category;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ navigate, businesses, categoryKey }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState(
    categoryKey === Category.SecurityProtectionAndResponse ? 'All Security Services' :
    categoryKey === Category.PetsVeterinaryAndAnimalCare ? 'All Pet Services' :
    categoryKey === Category.SportsFitnessAndRecreation ? 'All Fitness Services' :
    categoryKey === Category.EventsExperiencesAndOccasions ? 'All Event Services' :
    categoryKey === Category.DigitalMediaAndTechnology ? 'All Digital Services' :
    categoryKey === Category.ShoppingAndRetail ? 'All Shopping' :
    categoryKey === Category.TransportChauffeursFleet ? 'All Transport Services' :
    'All Services'
  );
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Service types for filtering
  const serviceTypes = categoryKey === Category.SecurityProtectionAndResponse ? [
    'All Security Services',
    'Armed Response',
    'Private Security',
    'VIP Protection',
    'CCTV & Surveillance',
    'Access Control',
    'Alarm Systems',
    'Estate Security',
    'Event Security'
  ] : categoryKey === Category.PetsVeterinaryAndAnimalCare ? [
    'All Pet Services',
    'Veterinary Clinics & Hospitals',
    'Pet Grooming & Boarding',
    'Pet Training & Behavior',
    'Emergency Vet',
    'Mobile Vet',
    'Pet Pharmacy',
    'Pet Nutrition & Diet'
  ] : categoryKey === Category.SportsFitnessAndRecreation ? [
    'All Fitness Services',
    'Gyms & Fitness Centers',
    'Personal Trainers',
    'Yoga, Pilates & Martial Arts',
    'Group Classes',
    'CrossFit & Functional Training',
    'Swimming & Aquatics',
    'Sports Clubs & Coaching'
  ] : categoryKey === Category.EventsExperiencesAndOccasions ? [
    'All Event Services',
    'Event Venues & Halls',
    'Wedding Planners & Coordinators',
    'Corporate Events & Conferences',
    'Catering & Food Service',
    'AV & Production',
    'Event Staffing',
    'Event Decor & Lighting'
  ] : categoryKey === Category.DigitalMediaAndTechnology ? [
    'All Digital Services',
    'Software & App Development',
    'Web & Design Studios',
    'Digital Marketing Agencies',
    'UX/UI & Product Design',
    'E-commerce Development',
    'SEO & Content Strategy',
    'Cloud & DevOps'
  ] : categoryKey === Category.ShoppingAndRetail ? [
    'All Shopping',
    'Boutiques & Fashion',
    'Home & Decor Stores',
    'Grocers & Markets',
    'Furniture & Homeware',
    'Gift & Specialty Stores',
    'Artisan & Local Producers',
    'Luxury Retail'
  ] : categoryKey === Category.TransportChauffeursFleet ? [
    'All Transport Services',
    'Service & Repairs',
    'Panel Beaters',
    'Tyres & Wheel Alignment',
    'Car Detailing & Valet',
    'Luxury EV Dealerships',
    'Car Hire & Rentals',
    'Spare Parts & Accessories'
  ] : [
    'All Services',
    'Electricians',
    'Plumbers',
    'Builders / Contractors',
    'Painters',
    'Cleaning Services',
    'Security Services',
    'Garden Services / Landscaping',
    'Appliance Repair',
    'HVAC / Air Conditioning',
    'IT Support',
    'CCTV Installation',
    'Hairdressers',
    'Barbers',
    'Makeup Artists',
  ];

  // Get services for the requested categoryKey (fallback to ProfessionalServices)
  const allServices = useMemo(() => {
    // Force-empty services list per product request to show 0 cards on Services pages.
    // To restore normal behaviour, replace this with the original filter above.
    return [] as Business[];
  }, [businesses, categoryKey]);

  // Filter services based on all criteria
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesSearch =
        searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesServiceType =
        selectedServiceType === 'All Services' ||
        service.description?.includes(selectedServiceType) ||
        service.name.toLowerCase().includes(selectedServiceType.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All Areas' || service.location.includes(selectedLocation);

      return matchesSearch && matchesServiceType && matchesLocation;
    });
  }, [allServices, searchQuery, selectedServiceType, selectedLocation]);

  // Top rated from filtered results
  const topRated = useMemo(() =>
    [...filteredServices].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6),
    [filteredServices]
  );

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      {/* ===== HERO SECTION — LUXURY POSITIONING ===== */}
      <section className="bg-black border-b border-white/10 relative">
        {/* Subtle gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight">
              {categoryKey === Category.SecurityProtectionAndResponse ? 'SECURITY & PROTECTION' :
              categoryKey === Category.PetsVeterinaryAndAnimalCare ? 'PETS & ANIMAL CARE' :
              categoryKey === Category.SportsFitnessAndRecreation ? 'SPORTS & RECREATION' :
              categoryKey === Category.EventsExperiencesAndOccasions ? 'EVENTS & EXPERIENCES' :
              categoryKey === Category.DigitalMediaAndTechnology ? 'DIGITAL, MEDIA & TECHNOLOGY' :
              categoryKey === Category.ShoppingAndRetail ? 'SHOPPING' :
              categoryKey === Category.TransportChauffeursFleet ? 'TRANSPORT & MOBILITY' : 'HOME & BUSINESS SERVICES'}
                </h1>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-2">
              {categoryKey === Category.SecurityProtectionAndResponse
                ? "Discover Mpumalanga's most trusted private security companies, armed response teams, VIP protection specialists and surveillance experts."
                : categoryKey === Category.PetsVeterinaryAndAnimalCare
                ? "Discover Mpumalanga's most trusted veterinary clinics, pet groomers, boarding and trainers."
                : categoryKey === Category.SportsFitnessAndRecreation
                ? "Find top gyms, personal trainers, classes and sports clubs across Mpumalanga to help you stay fit and active."
                : categoryKey === Category.EventsExperiencesAndOccasions
                ? "Discover Mpumalanga's best event venues, wedding planners and corporate event specialists."
                : categoryKey === Category.DigitalMediaAndTechnology
                ? "Find leading software teams, web studios and digital agencies driving results for Mpumalanga businesses."
                : categoryKey === Category.ShoppingAndRetail
                ? "Discover Mpumalanga's finest boutiques, homestores and fresh markets — handpicked retailers serving the Lowveld." 
                : "Connect with Mpumalanga's most trusted service professionals."
              }
            </p>
            <p className="text-sm text-gray-400 font-light mb-8">
              {categoryKey === Category.SecurityProtectionAndResponse
                ? 'Verified security professionals for homes, businesses, estates and events.'
                : categoryKey === Category.PetsVeterinaryAndAnimalCare
                ? 'Trusted veterinary and pet care services for companions, farms and estates.'
                : categoryKey === Category.SportsFitnessAndRecreation
                ? 'Gyms, trainers, studios and clubs offering expert coaching, classes and membership options.'
                : categoryKey === Category.EventsExperiencesAndOccasions
                ? 'Event venues, planners and production specialists for weddings, corporate events and live experiences.'
                : categoryKey === Category.DigitalMediaAndTechnology
                ? 'Software, web and digital teams offering development, design and marketing services.'
                : categoryKey === Category.ShoppingAndRetail
                ? 'Boutiques, home & decor stores and markets offering curated goods, local crafts and premium retail experiences.'
                : categoryKey === Category.TransportChauffeursFleet
                ? 'Trusted auto services including mechanical repairs, panel beaters, tyre specialists and detailing.'
                : 'Electricians, plumbers, contractors, cleaning specialists and skilled trades.'
              }
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-12">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={categoryKey === Category.SecurityProtectionAndResponse ? 'Search security companies, armed response, CCTV, VIP protection...' :
                  categoryKey === Category.PetsVeterinaryAndAnimalCare ? 'Search vets, grooming, boarding, training...' :
                  categoryKey === Category.SportsFitnessAndRecreation ? 'Search gyms, trainers, yoga, pilates, classes...' :
                  categoryKey === Category.EventsExperiencesAndOccasions ? 'Search venues, wedding planners, corporate events, AV...' :
                  categoryKey === Category.DigitalMediaAndTechnology ? 'Search software agencies, web studios, marketing agencies...' :
                  categoryKey === Category.ShoppingAndRetail ? 'Search boutiques, homeware, markets, gifts...' :
                  categoryKey === Category.TransportChauffeursFleet ? 'Search service & repairs, panel beaters, tyres, detailing...' : 'Search services, providers, trades…'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-sm border border-yellow-400/20 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all font-light"
              />
            </div>

            {/* CATEGORY PILLS */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {serviceTypes.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedServiceType(category)}
                  className={`px-4 py-2 rounded-full text-xs font-light tracking-wider transition-all duration-300 border ${
                    selectedServiceType === category
                      ? 'bg-yellow-400 text-black border-yellow-400'
                      : 'bg-transparent text-yellow-400 border-yellow-400/40 hover:border-yellow-400/70'
                  }`}
                >
                  {category}
                </button>
              ))}
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

              {/* Service Type Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">
                  Service Type
                </label>
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {serviceTypes.map((type) => (
                    <option key={type} value={type} className="bg-slate-900">
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
                  setSelectedServiceType('All Services');
                  setSelectedLocation('All Areas');
                }}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-colors border border-white/20"
              >
                Reset Filters
              </button>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400">
                  Found <span className="text-white font-bold">{filteredServices.length}</span> providers
                </p>
              </div>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-3">
            {/* TRUSTED SERVICE PROVIDERS SECTION */}
            <div>
              <div className="mb-8 pb-8 border-b border-yellow-400/20 relative">
                <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-yellow-400 to-transparent" />
                <p className="text-xs text-yellow-400 font-light tracking-widest uppercase mb-2">
                  {categoryKey === Category.PetsVeterinaryAndAnimalCare ? 'TRUSTED VETERINARY & PET CARE PROVIDERS' :
                   categoryKey === Category.SportsFitnessAndRecreation ? 'TRUSTED SPORTS, FITNESS & RECREATION PROVIDERS' :
                   categoryKey === Category.EventsExperiencesAndOccasions ? 'TRUSTED EVENT, VENUE & PLANNING PROVIDERS' :
                   categoryKey === Category.ShoppingAndRetail ? 'TRUSTED RETAIL & SHOPPING PROVIDERS' :
                   categoryKey === Category.TransportChauffeursFleet ? 'TRUSTED TRANSPORT & AUTO SERVICE PROVIDERS' : 'TRUSTED SERVICE PROVIDERS'}
                </p>
                <p className="text-sm text-gray-400 font-light">
                  {categoryKey === Category.PetsVeterinaryAndAnimalCare ? `Found ${filteredServices.length} pet & animal care providers` :
                   categoryKey === Category.SportsFitnessAndRecreation ? `Found ${filteredServices.length} fitness & recreation providers` :
                   categoryKey === Category.EventsExperiencesAndOccasions ? `Found ${filteredServices.length} event & planning providers` :
                   categoryKey === Category.ShoppingAndRetail ? `Found ${filteredServices.length} retailers & shops` :
                   categoryKey === Category.TransportChauffeursFleet ? `Found ${filteredServices.length} transport & auto service providers` : `Showing ${filteredServices.length} providers`}
                </p>
              </div>

              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredServices.slice(0, 1).map((provider, idx) => (
                    <div
                      key={provider.id}
                      className="bg-black border border-yellow-400/20 rounded-sm overflow-hidden hover:border-yellow-400/40 transition-all cursor-pointer group"
                      onClick={() => navigate('service-detail', categoryKey || Category.ProfessionalServices, provider.id)}
                    >
                      {/* IMAGE - SQUARE DOMINANT */}
                      <div className="w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                        {provider.image && (
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      
                      {/* MINIMAL TEXT INFO */}
                      <div className="p-4 space-y-2">
                        <h3 className="text-base text-white font-light group-hover:text-yellow-400 transition-colors">
                          {provider.name}
                        </h3>
                        <p className="text-xs text-yellow-400 font-light tracking-widest uppercase">
                          {provider.description?.split('\n')[0]?.substring(0, 40) || 'Professional Services'}
                        </p>
                        <p className="text-xs text-gray-400 font-light line-clamp-2">
                          {provider.description?.split('\n')[1] || provider.description?.substring(0, 60) || ''}
                        </p>
                        <p className="text-xs text-gray-500 font-light pt-2">
                          {provider.location}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('service-detail', categoryKey || Category.ProfessionalServices, provider.id);
                          }}
                          className="text-yellow-400 hover:text-yellow-300 font-light text-xs tracking-widest uppercase transition-all duration-300 hover:translate-x-1 inline-block pt-1"
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-400 font-light mb-6">No providers found matching your filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedServiceType('All Services');
                      setSelectedLocation('All Areas');
                    }}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-sm transition-all font-light text-xs tracking-widest uppercase"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* CTA SECTION — LUXURY POSITIONING */}
            <div className="mt-20 pt-20 border-t border-yellow-400/20 relative">
              <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-yellow-400 to-transparent" />
              
              <div className="max-w-2xl">
                <p className="text-xs text-yellow-400 font-light tracking-widest uppercase mb-4">GROW WITH LOWVELDHUB</p>
                <h2 className="text-4xl font-light text-white mb-4 leading-tight">
                  {categoryKey === Category.PetsVeterinaryAndAnimalCare ? 'Grow Your Pet Care Business with LowveldHub' :
                   categoryKey === Category.ShoppingAndRetail ? 'Grow Your Retail Business with LowveldHub' : 'List Your Business on LowveldHub'}
                </h2>
                <p className="text-sm text-gray-300 font-light leading-relaxed mb-8 max-w-xl">
                  {categoryKey === Category.PetsVeterinaryAndAnimalCare
                    ? 'Connect with pet owners, estates, businesses and organisations actively searching for trusted veterinary and pet care professionals across Mpumalanga.'
                    : categoryKey === Category.ShoppingAndRetail
                    ? 'Connect with shoppers, interior designers and homeowners searching for boutiques, homeware, gifts and premium retail experiences across Mpumalanga.'
                    : "Join Mpumalanga's premium business ecosystem and connect with customers actively searching for trusted service providers."
                  }
                </p>
                <button
                  onClick={() => navigate('premium-add-business')}
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-sm font-light transition-all text-xs tracking-widest uppercase shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:translate-y-[-2px]"
                >
                  {categoryKey === Category.PetsVeterinaryAndAnimalCare ? 'List Your Pet Service' :
                   categoryKey === Category.ShoppingAndRetail ? 'List Your Retail Store' : 'Apply For Listing'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
