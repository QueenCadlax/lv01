import React, { useState, useEffect } from 'react';
import { Business, ListingTier, MPUMALANGA_AREAS, Category } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, ChevronLeft, ChevronRight, Heart, Share2, Globe, CheckCircle, MapPin as MapIcon } from 'lucide-react';

interface HomeDetailViewProps {
  homeId: string | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  businesses: Business[];
  favorites?: Set<string> | string[];
  toggleFavorite?: (id: string) => void;
}

const HomeDetailView: React.FC<HomeDetailViewProps> = ({ 
  homeId, 
  navigate, 
  businesses, 
  favorites,
  toggleFavorite 
}) => {
  // Convert favorites to Set if it's an array (for backward compatibility)
  const favoritesSet = React.useMemo(() => {
    if (favorites instanceof Set) {
      return favorites;
    }
    if (Array.isArray(favorites)) {
      return new Set(favorites);
    }
    return new Set();
  }, [favorites]);
  
  const home = businesses.find(b => b.id === homeId);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [homeId]);

  useEffect(() => {
    if (homeId) {
      setIsFavorited(favoritesSet.has(homeId));
    }
  }, [homeId, favoritesSet]);

  if (!home) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-12">
        <div className="container mx-auto px-4 text-center">
          <button 
            onClick={() => navigate('directory')}
            className="flex items-center gap-2 text-gold-600 hover:text-gold-700 mb-8 mx-auto"
          >
            <ArrowLeft size={18} /> Back to Directory
          </button>
          <p className="text-gray-600 text-lg">Property not found</p>
        </div>
      </div>
    );
  }

  const gallery = [home.image, home.image, home.image, home.image, home.image];
  const similarHomes = businesses
    .filter(b => b.category === Category.Homes && b.location === home.location && b.id !== home.id)
    .slice(0, 4);

  const handleFavoriteToggle = () => {
    if (toggleFavorite && homeId) {
      toggleFavorite(homeId);
      setIsFavorited(!isFavorited);
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I'm interested in ${home.name}`;
    window.open(`https://wa.me/27123456789?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Extract estate/suburb from location (format: "Estate Name, City")
  const locationParts = home.location?.split(',') || [];
  const estate = locationParts[0]?.trim() || 'Premium Estate';
  const city = locationParts[1]?.trim() || 'Mpumalanga';

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('directory')}
            className="flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleFavoriteToggle}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <Heart
                size={24}
                className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gray-800 group">
            <img 
              src={gallery[slideIdx]} 
              alt={`${home.name} ${slideIdx + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setSlideIdx((i) => (i - 1 + gallery.length) % gallery.length)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full transition-all z-30 shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setSlideIdx((i) => (i + 1) % gallery.length)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full transition-all z-30 shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIdx(idx)}
                  className={`h-2 rounded-full transition ${
                    idx === slideIdx ? 'bg-gold-400 w-8' : 'bg-white/40 w-2 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Supporting Images Gallery */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            {gallery.slice(1, 5).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIdx(idx + 1)}
                className="relative h-24 rounded-lg overflow-hidden hover:opacity-75 transition"
              >
                <img src={img} alt={`Gallery ${idx + 2}`} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 ring-2 transition ${
                  slideIdx === idx + 1 ? 'ring-gold-400' : 'ring-transparent'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Property Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="mb-4">
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{estate}</p>
            <h1 className="text-5xl font-serif font-bold text-black mt-2 mb-4">{home.name}</h1>
            <div className="flex items-baseline gap-4">
              <p className="text-3xl font-bold text-gold-600">R {(home.price || 8500000).toLocaleString()}</p>
              <button className="text-gold-600 hover:text-gold-700 font-medium underline">View financing options</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleFavoriteToggle}
              className="px-6 py-3 border-2 border-gold-400 text-gold-600 rounded-lg font-semibold hover:bg-gold-50 transition"
            >
              <Heart size={18} className="inline mr-2" fill={isFavorited ? 'currentColor' : 'none'} />
              {isFavorited ? 'Saved' : 'Save'}
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        {/* Property Statistics */}
        <div className="max-w-4xl mx-auto mb-12 grid grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-black mb-2">{home.bedrooms || 5}</div>
            <p className="text-gray-600 font-medium">Bedrooms</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-black mb-2">{home.bathrooms || 4}</div>
            <p className="text-gray-600 font-medium">Bathrooms</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
            <div className="text-2xl font-bold text-black mb-2">{(home as any).squareFeet || 1250} m²</div>
            <p className="text-gray-600 font-medium">Living Area</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
            <div className="text-2xl font-bold text-black mb-2">{home.garages || 3}</div>
            <p className="text-gray-600 font-medium">Garages</p>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto border-t border-gray-300 mb-12" />

        {/* Property Overview */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-serif font-bold text-black mb-6">Property Overview</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{home.description}</p>
        </div>

        {/* Amenities Section */}
        {home.tags && home.tags.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-serif font-bold text-black mb-6">Key Features & Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {home.tags.map((tag, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <CheckCircle className="text-gold-600 flex-shrink-0" size={20} />
                  <span className="text-gray-700 font-medium">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="max-w-4xl mx-auto border-t border-gray-300 mb-12" />

        {/* Location Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-serif font-bold text-black mb-6">Location</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 uppercase font-medium mb-2">Estate</p>
              <p className="text-lg text-black font-semibold">{estate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 uppercase font-medium mb-2">Area</p>
              <p className="text-lg text-black font-semibold">{city}</p>
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="mt-6 h-80 bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapIcon className="text-gray-400 mx-auto mb-3" size={40} />
              <p className="text-gray-600">Interactive map coming soon</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto border-t border-gray-300 mb-12" />

        {/* Agent Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-serif font-bold text-black mb-8">Meet Your Agent</h2>
          <div className="border-2 border-gold-200 rounded-2xl p-8 bg-gradient-to-br from-gold-50 to-white">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Agent Avatar */}
              <div className="md:w-1/3">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold-300 to-gold-400 flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {(home.author || 'Agent')?.charAt(0).toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-gold-600" size={18} />
                  <p className="text-sm text-gray-700 font-medium">Verified Agent</p>
                </div>
              </div>

              {/* Agent Info */}
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-black mb-1">{home.author || 'Premium Agent'}</h3>
                <p className="text-gold-600 font-semibold mb-4">Real Estate Professional</p>
                <p className="text-gray-700 mb-6">Specialist in luxury properties across Mpumalanga with over 15 years of experience in high-end real estate transactions.</p>
                
                {/* Agency Info */}
                <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                  <p className="text-xs text-gray-600 uppercase font-medium mb-1">Agency</p>
                  <p className="text-lg font-bold text-black">Pam Golding Properties</p>
                </div>

                {/* Contact Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {home.phone && (
                    <a
                      href={`tel:${home.phone}`}
                      className="flex items-center justify-center gap-2 py-3 rounded-lg bg-black text-white hover:bg-gray-800 font-semibold transition"
                    >
                      <Phone size={18} />
                      Call
                    </a>
                  )}
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 font-semibold transition"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </button>
                  {home.email && (
                    <a
                      href={`mailto:${home.email}`}
                      className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-gray-300 text-black hover:bg-gray-50 font-semibold transition"
                    >
                      Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto border-t border-gray-300 mb-12" />

        {/* Similar Properties Section */}
        {similarHomes.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-black mb-8">Similar Properties in {city}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarHomes.map((similar) => (
                <button
                  key={similar.id}
                  onClick={() => navigate('home-detail', undefined, similar.id)}
                  className="group text-left hover:opacity-75 transition"
                >
                  <div className="relative h-64 rounded-xl overflow-hidden mb-4 bg-gray-200 border border-gray-300">
                    <img
                      src={similar.image}
                      alt={similar.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-black text-lg mb-2 group-hover:text-gold-600 transition">{similar.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{similar.location}</p>
                  <p className="text-xl font-bold text-gold-600">R {(similar.price || 8500000).toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeDetailView;
