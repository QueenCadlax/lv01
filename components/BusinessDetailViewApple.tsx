import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, ChevronLeft, ChevronRight, Heart, Share2, Globe, Calendar } from 'lucide-react';

interface BusinessDetailViewProps {
  businessId: string | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  businesses: Business[];
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

const BusinessDetailViewApple: React.FC<BusinessDetailViewProps> = ({ 
  businessId, 
  navigate, 
  businesses, 
  favorites = [], 
  toggleFavorite 
}) => {
  const business: Business | undefined = businesses.find(b => b.id === businessId);
  const [isFavorited, setIsFavorited] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [businessId]);

  useEffect(() => {
    setIsFavorited(favorites.includes(businessId || ''));
  }, [businessId, favorites]);

  const images = [
    business?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    business?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    business?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
  ];

  const handleFavoriteToggle = () => {
    if (toggleFavorite && businessId) {
      toggleFavorite(businessId);
      setIsFavorited(!isFavorited);
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I'm interested in ${business?.name}`;
    window.open(`https://wa.me/27123456789?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-2xl mx-auto px-4">
          <button onClick={() => navigate('directory')} className="flex items-center gap-2 text-white hover:text-[#D4AF37] mb-6">
            <ArrowLeft size={20} /> Back
          </button>
          <p className="text-[#D4AF37]/70 text-lg">Business not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* ===== IMAGE SLIDESHOW (Full width, minimal controls) ===== */}
      <section className="relative w-full" style={{ aspectRatio: '16 / 9', maxHeight: '70vh', overflow: 'hidden' }}>
        {/* Back button - overlay on image */}
        <button
          onClick={() => navigate('directory')}
          className="absolute top-6 left-6 z-50 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm shadow-lg flex items-center justify-center transition"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Main image with fade transition */}
        <div className="relative w-full h-full">
          <img
            src={images[slideIdx]}
            alt={`${business.name} ${slideIdx + 1}`}
            className="w-full h-full object-cover transition-opacity duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop';
            }}
          />
        </div>

        {/* Gradient overlay at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Image counter & indicators (bottom center) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className={`transition-all ${
                i === slideIdx ? 'bg-white w-8 h-2 rounded-full' : 'bg-white/50 w-2 h-2 rounded-full hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Prev/Next arrows - minimal style */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSlideIdx((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm shadow-lg flex items-center justify-center transition"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={() => setSlideIdx((i) => (i + 1) % images.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm shadow-lg flex items-center justify-center transition"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </>
        )}
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header with title, rating, and action buttons */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {business.name}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              {business.rating > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold text-white">{business.rating.toFixed(1)}</span>
                  <span className="text-[#D4AF37]">★</span>
                  <span className="text-[#D4AF37]/70">({business.reviewCount || 0} reviews)</span>
                </div>
              )}
              <span className="text-[#D4AF37]/30 text-sm">•</span>
              <span className="text-white">{business.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleFavoriteToggle}
              className="p-3 rounded-full hover:bg-[#D4AF37]/10 transition"
            >
              <Heart
                size={24}
                className={isFavorited ? 'fill-red-500 text-red-500' : 'text-[#D4AF37]/50'}
              />
            </button>
            <button className="p-3 rounded-full hover:bg-[#D4AF37]/10 transition">
              <Share2 size={24} className="text-[#D4AF37]/50" />
            </button>
          </div>
        </div>

        {/* Category and description */}
        <div className="mb-8 pb-8 border-b border-[#D4AF37]/30">
          <div className="text-sm text-[#D4AF37] mb-3">
            {business.category} • {business.subcategory || 'Service'}
          </div>
          <p className="text-lg text-white leading-relaxed">
            {business.description || `${business.name} is a premium ${business.category} offering exceptional services in ${business.location}.`}
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Details and info */}
          <div className="md:col-span-2 space-y-8">
            {/* Key details grid */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-[#D4AF37]">Type</div>
                  <div className="text-lg text-white font-medium">{business.subcategory || business.category}</div>
                </div>
                <div>
                  <div className="text-sm text-[#D4AF37]">Location</div>
                  <div className="text-lg text-white font-medium">{business.location}</div>
                </div>
                <div>
                  <div className="text-sm text-[#D4AF37]">Status</div>
                  <div className="text-lg text-white font-medium">{business.isOpenNow ? '✓ Open Now' : 'Check Hours'}</div>
                </div>
                <div>
                  <div className="text-sm text-[#D4AF37]">Verified</div>
                  <div className="text-lg text-white font-medium">{business.isVerified ? '✓ Yes' : 'Pending'}</div>
                </div>
              </div>
            </div>

            {/* Amenities / Features */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">What's offered</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Premium Service',
                  'Professional Staff',
                  'Quality Assured',
                  'Local Expertise',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <span className="text-xs text-[#D4AF37]">✓</span>
                    </div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About section */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">About</h2>
              <p className="text-white leading-relaxed mb-4">
                {business.description || `${business.name} is a carefully curated business that meets LOWVELDHUB's standards for quality, professionalism, and customer service.`}
              </p>
              <p className="text-white leading-relaxed">
                Located in {business.location}, this establishment is dedicated to providing exceptional experiences to all guests and clients. Every detail is crafted to ensure satisfaction and create memorable moments.
              </p>
            </div>
          </div>

          {/* Right: Booking panel (sticky) */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-black rounded-2xl border border-[#D4AF37]/30 p-6 shadow-lg">
              {/* Price display (if available) */}
              <div className="mb-6">
                <div className="text-sm text-[#D4AF37]">Contact</div>
                <div className="text-3xl font-semibold text-white">{business.name}</div>
              </div>

              {/* Main CTA */}
              <button className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-semibold mb-3 hover:bg-[#E5C158] transition">
                <Calendar size={18} className="inline mr-2" />
                Book Now
              </button>

              {/* Secondary CTAs */}
              <div className="space-y-2">
                {business.phone && (
                  <button
                    onClick={() => window.location.href = `tel:${business.phone}`}
                    className="w-full text-white border border-[#D4AF37]/30 py-3 rounded-xl font-semibold hover:bg-[#D4AF37]/10 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone size={18} /> Call
                  </button>
                )}
                <button
                  onClick={handleWhatsApp}
                  className="w-full text-white border border-[#D4AF37]/30 py-3 rounded-xl font-semibold hover:bg-[#D4AF37]/10 transition flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle size={18} /> WhatsApp
                </button>
                {business.website && (
                  <button
                    onClick={() => window.open(business.website, '_blank')}
                    className="w-full text-white border border-[#D4AF37]/30 py-3 rounded-xl font-semibold hover:bg-[#D4AF37]/10 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Globe size={18} /> Website
                  </button>
                )}
              </div>

              {/* Curated info box removed per design request */}

              {/* Location link */}
              <button
                onClick={() => window.open(`https://www.google.com/maps?q=${business.location}`, '_blank')}
                className="w-full text-blue-600 py-3 rounded-xl font-semibold hover:text-blue-700 transition flex items-center justify-center gap-2 mt-4"
              >
                <MapPin size={18} /> View on Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAP SECTION ===== */}
      <div className="border-t border-[#D4AF37]/30 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Location</h2>
          <div className="rounded-xl overflow-hidden border border-[#D4AF37]/30 shadow-sm" style={{ height: 400 }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDNRrKfVCDonNTxeMX3HxZpbgV9wTUzYAE&q=${encodeURIComponent(business.location + ', Mpumalanga')}`}
            />
          </div>
          <p className="text-[#D4AF37]/70 text-sm mt-4">{business.location}, Mpumalanga</p>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="border-t border-[#D4AF37]/30 bg-black mt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-3">Support</h3>
              <div className="space-y-2">
                <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-sm block">Contact Us</a>
                <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-sm block">Help Center</a>
                <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-sm block">Safety</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">About</h3>
              <div className="space-y-2">
                <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-sm block">About LOWVELDHUB</a>
                <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-sm block">Careers</a>
                <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-sm block">Press</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-sm block">Terms</a>
                <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-sm block">Privacy</a>
                <a href="#" className="text-[#D4AF37]/70 hover:text-[#D4AF37] text-sm block">Cookies</a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#D4AF37]/30 pt-6 text-center text-sm text-[#D4AF37]/70">
            <p>© 2026 LOWVELDHUB. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailViewApple;
