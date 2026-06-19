import React, { useState, useEffect } from 'react';
import { Business, ListingTier, MPUMALANGA_AREAS } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, ChevronLeft, ChevronRight, Heart, Share2, Globe, Calendar } from 'lucide-react';

interface PropertyDetailViewProps {
  propertyId: string | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  businesses: Business[];
  favorites?: Set<string>;
  toggleFavorite?: (id: string) => void;
}

const EstatePropertyDetailView: React.FC<PropertyDetailViewProps> = ({ 
  propertyId, 
  navigate, 
  businesses, 
  favorites,
  toggleFavorite 
}) => {
  // Ensure favorites is always a Set
  const favoritesSet = favorites instanceof Set ? favorites : new Set();
  
  const property = businesses.find(b => b.id === propertyId);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) {
      setIsFavorited(favoritesSet.has(propertyId));
    }
  }, [propertyId, favoritesSet]);

  if (!property) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-12">
        <div className="container mx-auto px-4 text-center">
          <button 
            onClick={() => navigate('estate')}
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8 mx-auto"
          >
            <ArrowLeft size={18} /> Back to Estates
          </button>
          <p className="text-gray-400 text-lg">Property not found</p>
        </div>
      </div>
    );
  }

  const gallery = [property.image, property.image, property.image];
  const similarProperties = businesses
    .filter(b => b.location === property.location && b.id !== property.id)
    .slice(0, 4);

  const handleFavoriteToggle = () => {
    if (toggleFavorite && propertyId) {
      toggleFavorite(propertyId);
      setIsFavorited(!isFavorited);
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I'm interested in ${property.name}`;
    window.open(`https://wa.me/27123456789?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate('estate')}
          className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8"
        >
          <ArrowLeft size={18} /> Back to Estates
        </button>
  
  const property = businesses.find(b => b.id === propertyId);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) {
      setIsFavorited(favoritesSet.has(propertyId));
    }
  }, [propertyId, favoritesSet]);

  if (!property) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-12">
        <div className="container mx-auto px-4 text-center">
          <button 
            onClick={() => navigate('estate')}
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8 mx-auto"
          >
            <ArrowLeft size={18} /> Back to Estates
          </button>
          <p className="text-gray-400 text-lg">Property not found</p>
        </div>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    if (toggleFavorite && propertyId) {
      toggleFavorite(propertyId);
      setIsFavorited(!isFavorited);
    }
  };

  const similarProperties = businesses
    .filter(p => p.id !== propertyId && p.location === property.location)
    .slice(0, 4);

  const nextSlide = () => {
    const images = property.image ? [property.image, ...(property.gallery || [])] : [];
    setSlideIdx((prev) => (prev + 1) % Math.max(images.length, 1));
  };

  const prevSlide = () => {
    const images = property.image ? [property.image, ...(property.gallery || [])] : [];
    setSlideIdx((prev) => (prev - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));
  };

  const images = property.image ? [property.image, ...(property.gallery || [])] : [];
  const currentImage = images.length > 0 ? images[slideIdx] : '/placeholder.jpg';

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate('estate')}
          className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8"
        >
          <ArrowLeft size={18} /> Back to Estates
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-gold-500/10 to-transparent rounded-2xl overflow-hidden aspect-video group">
                <img 
                  src={currentImage} 
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all z-10"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all z-10"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Favorite button overlay */}
                <button
                  onClick={handleFavoriteToggle}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-10"
                >
                  <Heart 
                    size={24} 
                    fill={isFavorited ? "currentColor" : "none"}
                    className={isFavorited ? 'text-gold-400' : ''}
                  />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideIdx(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === slideIdx ? 'border-gold-400' : 'border-gold-400/30 hover:border-gold-400/60'
                      }`}
                    >
                      <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/40 border border-gold-400/20 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Bedrooms</p>
                <p className="text-2xl font-serif text-gold-400">{property.reviewCount || 5}</p>
              </div>
              <div className="bg-black/40 border border-gold-400/20 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Bathrooms</p>
                <p className="text-2xl font-serif text-gold-400">{Math.ceil((property.rating || 4) * 1)}</p>
              </div>
              <div className="bg-black/40 border border-gold-400/20 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Type</p>
                <p className="text-xl font-serif text-gold-400">Residential</p>
              </div>
              <div className="bg-black/40 border border-gold-400/20 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Status</p>
                <p className="text-xl font-serif text-gold-400">Available</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-black/40 border border-gold-400/20 rounded-2xl p-6">
              <h3 className="text-2xl font-serif text-gold-400 mb-6">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Modern Kitchen',
                  'Swimming Pool',
                  'Garage',
                  'Garden',
                  'Security Gate',
                  'Patio'
                ].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gold-400/50" />
                    <span className="text-gray-300">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-6">Similar Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarProperties.map((prop) => (
                    <div
                      key={prop.id}
                      onClick={() => navigate('estate-detail', undefined, prop.id)}
                      className="bg-black/40 border border-gold-400/20 rounded-xl overflow-hidden cursor-pointer hover:border-gold-400/60 transition-all group"
                    >
                      <div className="h-48 overflow-hidden bg-gradient-to-br from-gold-500/10 to-transparent">
                        <img 
                          src={prop.image} 
                          alt={prop.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-gold-400 font-serif mb-2">{prop.name}</h4>
                        <p className="text-sm text-gray-400 mb-3">R {(prop.price || 8500000).toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{prop.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-4">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-gold-500/10 to-black/40 border border-gold-400/50 rounded-2xl p-6 sticky top-32">
              <p className="text-gray-400 text-sm mb-2">Price</p>
              <h2 className="text-4xl font-serif text-gold-400 mb-6">R {(property.price || 8500000).toLocaleString()}</h2>

              {/* Agent Card */}
              <div className="bg-black/60 border border-gold-400/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500/30 to-transparent border border-gold-400/50 flex items-center justify-center">
                    <span className="text-gold-400 font-serif font-bold">JW</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{property.description || 'James Whitmore'}</p>
                    <p className="text-xs text-gray-400">Estate Agent</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-gold-500/50 transition-all flex items-center justify-center gap-2">
                  <Calendar size={18} /> Book Viewing
                </button>
                <button className="w-full bg-black border border-gold-400/50 text-gold-400 font-bold py-3 rounded-lg hover:bg-gold-400/10 transition-all flex items-center justify-center gap-2">
                  <Phone size={18} /> Call Agent
                </button>
                <button className="w-full bg-black border border-gold-400/50 text-gold-400 font-bold py-3 rounded-lg hover:bg-gold-400/10 transition-all flex items-center justify-center gap-2">
                  <MessageCircle size={18} /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-black/40 border border-gold-400/20 rounded-2xl overflow-hidden h-96">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.8342341234!2d30.75!3d-25.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1940d6b8b5b5b5b5%3A0x0!2s${property.location}!5e0!3m2!1sen!2sza!4v1234567890`}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ borderRadius: '1rem' }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EstatePropertyDetailView;

  const gallery = [property.image, property.image, property.image];
  const similarProperties = businesses
    .filter(b => b.location === property.location && b.id !== property.id)
    .slice(0, 4);

  const handleFavoriteToggle = () => {
    if (toggleFavorite && propertyId) {
      toggleFavorite(propertyId);
      setIsFavorited(!isFavorited);
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I'm interested in ${property.name}`;
    window.open(`https://wa.me/27123456789?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate('estate')}
          className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8"
        >
          <ArrowLeft size={18} /> Back to Estates
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gallery Section - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden group mb-6 bg-black/80 border border-gold-500/30">
              <img 
                src={gallery[slideIdx]} 
                alt={`${property.name} ${slideIdx + 1}`}
                className="w-full h-full object-cover transition-opacity duration-700"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Navigation Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setSlideIdx((i) => (i - 1 + gallery.length) % gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-30"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setSlideIdx((i) => (i + 1) % gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-30"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Favorite Button */}
              <button
                onClick={handleFavoriteToggle}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all z-30"
              >
                <Heart 
                  size={24} 
                  fill={isFavorited ? "currentColor" : "none"}
                  className={isFavorited ? 'text-gold-400' : 'text-white'}
                />
              </button>

              {/* Image Counter */}
              {gallery.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm text-white">
                  {slideIdx + 1} / {gallery.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSlideIdx(idx)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === slideIdx ? 'border-gold-400' : 'border-white/20'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Property Details */}
            <div className="mt-8 bg-white/5 border border-gold-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-serif text-gold-400 mb-6">About This Property</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Bedrooms</div>
                  <div className="text-2xl font-bold text-white">{property.reviewCount || 5}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Bathrooms</div>
                  <div className="text-2xl font-bold text-white">{Math.ceil((property.rating || 4) * 1)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Property Type</div>
                  <div className="text-lg font-semibold text-white">Residential</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Status</div>
                  <div className="text-lg font-semibold text-gold-400">For Sale</div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {property.description || `${property.name} is a premium property featuring exceptional architecture, modern amenities, and stunning views of ${property.location}. This luxury residence combines elegance with functionality, offering the perfect sanctuary for discerning buyers.`}
              </p>
            </div>

            {/* Features / Amenities */}
            <div className="mt-8 bg-white/5 border border-gold-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-serif text-gold-400 mb-6">What's Offered</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Modern Kitchen',
                  'Swimming Pool',
                  'Garage',
                  'Garden',
                  'Security System',
                  'Air Conditioning',
                  'Entertainment Area',
                  'Guest Suite',
                  'Premium Fixtures',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gold-400">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-serif text-gold-400 mb-6">Similar Properties in {property.location}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarProperties.map(prop => (
                    <div 
                      key={prop.id}
                      onClick={() => navigate('business-detail', undefined, prop.id)}
                      className="group cursor-pointer overflow-hidden flex flex-col h-full"
                      style={{ 
                        background: '#000000', 
                        border: '1px solid rgba(201,162,77,0.25)', 
                        borderRadius: '12px', 
                        transition: 'all 320ms cubic-bezier(0.4, 0, 0.2, 1)',
                        overflow: 'hidden'
                      }}
                    >
                      {/* IMAGE SECTION - 65% height */}
                      <div style={{ height: '65%', position: 'relative', overflow: 'hidden' }}>
                        <img 
                          src={prop.image} 
                          alt={prop.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            transformOrigin: 'center', 
                            transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' 
                          }}
                          className="group-hover:transform group-hover:scale-105"
                        />
                        {/* Subtle overlay accent */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,77,0.5), transparent)', pointerEvents: 'none' }} />
                      </div>

                      {/* CONTENT SECTION - 35% height */}
                      <div style={{ padding: '16px 14px 14px 14px', color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '35%', fontSize: 14 }}>
                        {/* Main content */}
                        <div style={{ minHeight: 0 }}>
                          {/* Property Title - serif, prominent */}
                          <h3 style={{ 
                            margin: 0, 
                            fontSize: 15, 
                            fontWeight: 600, 
                            color: '#FFFFFF', 
                            lineHeight: '1.25', 
                            display: '-webkit-box', 
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: 'vertical', 
                            overflow: 'hidden', 
                            marginBottom: 6, 
                            fontFamily: "'Georgia', 'Garamond', serif", 
                            letterSpacing: '-0.3px' 
                          }}>
                            {prop.name}
                          </h3>
                          
                          {/* Location - subtle gray */}
                          <div style={{ fontSize: 11, color: '#A0A0A0', marginBottom: 6, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500 }}>
                            {prop.location}
                          </div>
                          
                          {/* Price - bold gold, largest */}
                          <div style={{ fontSize: 17, fontWeight: 700, color: '#C9A24D', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.2px', marginBottom: 8 }}>
                            R {(prop.price || 8500000).toLocaleString()}
                          </div>

                          {/* Features row - minimal style */}
                          <div style={{ fontSize: 11, color: '#D0D0D0', marginBottom: 8, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500, letterSpacing: '0.3px' }}>
                            {prop.reviewCount || 5} Beds • {Math.ceil((prop.rating || 4) * 1)} Baths
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details Sidebar - 1/3 width (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/5 border border-gold-500/30 rounded-2xl p-8 space-y-6">
              {/* Price Display */}
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">List Price</div>
                <div className="text-4xl font-bold text-gold-400">R 8,500,000</div>
                <div className="text-sm text-gray-400 mt-2">${(8500000 / 19).toFixed(0)} USD</div>
              </div>

              {/* Property Header */}
              <div className="pb-6 border-b border-gold-500/20">
                <div className="text-sm text-gray-400 mb-2">Luxury Property</div>
                <h1 className="text-2xl font-serif text-white leading-tight">{property.name}</h1>
                <div className="flex items-center gap-2 text-gold-400 mt-2">
                  <MapPin size={16} />
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>

              {/* Rating */}
              {property.rating > 0 && (
                <div className="pb-6 border-b border-gold-500/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gold-400">{property.rating.toFixed(1)}</span>
                    <span className="text-gold-400">★★★★★</span>
                    <span className="text-sm text-gray-400">({property.reviewCount || 0} reviews)</span>
                  </div>
                </div>
              )}

              {/* Agent Info */}
              <div className="bg-gradient-to-br from-gold-500/10 to-gold-500/5 border border-gold-500/30 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-3">Listed By</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-gold-400">JW</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">James Whitmore</p>
                    <p className="text-xs text-gray-400">Deo Volente Properties</p>
                  </div>
                </div>
              </div>

              {/* Primary CTA */}
              <button className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-gold-500/50 transition-all flex items-center justify-center gap-2">
                <Calendar size={18} />
                Book Viewing
              </button>

              {/* Secondary CTAs */}
              <div className="space-y-2">
                <button
                  onClick={() => window.location.href = 'tel:+27123456789'}
                  className="w-full text-white border border-gold-500/30 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Phone size={16} /> Call Agent
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="w-full text-white border border-gold-500/30 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle size={16} /> WhatsApp
                </button>
              </div>

              {/* Curation Badge */}
              <div className="p-4 bg-white/5 rounded-lg border border-gold-500/20">
                <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-widest">LOWVELDHUB CURATED</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  All properties meet our premium standards for luxury, location, and investment potential.
                </p>
              </div>

              {/* Share Button */}
              <button className="w-full text-white border border-gold-500/30 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm">
                <Share2 size={16} /> Share Listing
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white/5 border border-gold-500/30 rounded-2xl overflow-hidden">
          <div className="h-96 bg-black/60">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDNRrKfVCDonNTxeMX3HxZpbgV9wTUzYAE&q=${encodeURIComponent(property.location + ', Mpumalanga')}`}
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-serif text-gold-400 mb-2">Location</h2>
            <p className="text-gray-300">{property.location}, Mpumalanga, South Africa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstatePropertyDetailView;
