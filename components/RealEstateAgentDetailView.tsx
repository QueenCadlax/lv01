import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, ChevronLeft, ChevronRight, Heart, Share2, Globe, Calendar, Star } from 'lucide-react';

interface AgentDetailViewProps {
  agentId: string | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  businesses: Business[];
  favorites?: Set<string>;
  toggleFavorite?: (id: string) => void;
}

const RealEstateAgentDetailView: React.FC<AgentDetailViewProps> = ({ 
  agentId, 
  navigate, 
  businesses, 
  favorites = new Set(), 
  toggleFavorite 
}) => {
  const agent = businesses.find(b => b.id === agentId);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [agentId]);

  useEffect(() => {
    if (agentId) {
      setIsFavorited(favorites.has(agentId));
    }
  }, [agentId, favorites]);

  if (!agent) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-12">
        <div className="container mx-auto px-4 text-center">
          <button 
            onClick={() => navigate('property')}
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8 mx-auto"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <p className="text-gray-400 text-lg">Agent not found</p>
        </div>
      </div>
    );
  }

  const gallery = [agent.image, agent.image, agent.image];
  const agentListings = businesses
    .filter(b => b.description?.includes(agent.name) || false)
    .slice(0, 4);

  const handleFavoriteToggle = () => {
    if (toggleFavorite && agentId) {
      toggleFavorite(agentId);
      setIsFavorited(!isFavorited);
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I'm interested in learning more about your real estate services`;
    window.open(`https://wa.me/27123456789?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate('property')}
          className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8"
        >
          <ArrowLeft size={18} /> Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gallery Section - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden group mb-6 bg-black/80 border border-gold-500/30">
              <img 
                src={gallery[slideIdx]} 
                alt={`${agent.name} ${slideIdx + 1}`}
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

              {/* Tier Badge */}
              {agent.tier && (
                <div className="absolute top-4 left-4 z-30">
                  <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
                    agent.tier === 'Platinum' 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white' 
                      : 'bg-gradient-to-r from-gold-500 to-gold-400 text-black'
                  }`}>
                    {agent.tier}
                  </span>
                </div>
              )}
            </div>

            {/* Agent Bio & Expertise */}
            <div className="bg-white/5 border border-gold-500/30 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-serif text-gold-400 mb-4">About {agent.name}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {agent.description || `${agent.name} is a dedicated real estate professional with extensive experience in luxury property markets. Specializing in premium residential and commercial properties across Mpumalanga, ${agent.name} combines market expertise with personalized service to help clients find their perfect property.`}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gold-500/20">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Properties Sold</div>
                  <div className="text-3xl font-bold text-gold-400">120+</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Years Experience</div>
                  <div className="text-3xl font-bold text-gold-400">8+</div>
                </div>
              </div>
            </div>

            {/* Expertise & Services */}
            <div className="bg-white/5 border border-gold-500/30 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-serif text-gold-400 mb-6">Services & Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Luxury Homes',
                  'Residential',
                  'Commercial',
                  'Investment Properties',
                  'Property Management',
                  'Market Analysis',
                  'Negotiation',
                  'Legal Guidance',
                  'Financing Assistance',
                ].map((service, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gold-400">✓</span>
                    </div>
                    <span className="text-gray-300 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent's Listings */}
            {agentListings.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-serif text-gold-400 mb-6">Featured Listings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agentListings.map(listing => (
                    <div 
                      key={listing.id}
                      onClick={() => navigate('property-detail', undefined, listing.id)}
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
                          src={listing.image} 
                          alt={listing.name}
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
                            {listing.name}
                          </h3>
                          
                          {/* Location - subtle gray */}
                          <div style={{ fontSize: 11, color: '#A0A0A0', marginBottom: 6, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500 }}>
                            {listing.location}
                          </div>
                          
                          {/* Price - bold gold, largest */}
                          <div style={{ fontSize: 17, fontWeight: 700, color: '#C9A24D', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.2px', marginBottom: 8 }}>
                            R {(listing.price || 8500000).toLocaleString()}
                          </div>

                          {/* Features row - minimal style */}
                          <div style={{ fontSize: 11, color: '#D0D0D0', marginBottom: 8, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500, letterSpacing: '0.3px' }}>
                            {listing.reviewCount || 5} Beds • {Math.ceil((listing.rating || 4) * 1)} Baths
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
              {/* Agent Header */}
              <div className="pb-6 border-b border-gold-500/20">
                <h1 className="text-3xl font-serif text-gold-400 mb-2">{agent.name}</h1>
                <p className="text-sm text-gray-400 mb-3">Real Estate Professional</p>
                <div className="flex items-center gap-1 text-gold-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(agent.rating || 4) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">{agent.reviewCount || 0} verified reviews</p>
              </div>

              {/* Specialization */}
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Specialization</div>
                <div className="text-white font-semibold">Luxury Residential & Commercial</div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 pb-6 border-b border-gold-500/20">
                <MapPin size={18} className="text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Serves</div>
                  <p className="text-white">{agent.location}</p>
                </div>
              </div>

              {/* Agency Info */}
              <div className="bg-gradient-to-br from-gold-500/10 to-gold-500/5 border border-gold-500/30 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2 text-sm">Agency</h3>
                <p className="text-gold-400 font-bold text-sm mb-1">Deo Volente Properties</p>
                <p className="text-xs text-gray-400">Premium Real Estate Solutions</p>
              </div>

              {/* Primary CTA */}
              <button className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-gold-500/50 transition-all flex items-center justify-center gap-2">
                <Calendar size={18} />
                Schedule Consultation
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

              {/* Credentials */}
              <div className="p-4 bg-white/5 rounded-lg border border-gold-500/20">
                <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-widest">Credentials</p>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li>✓ Real Estate License</li>
                  <li>✓ Property Law Specialist</li>
                  <li>✓ LOWVELDHUB Verified</li>
                </ul>
              </div>

              {/* Share Button */}
              <button className="w-full text-white border border-gold-500/30 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm">
                <Share2 size={16} /> Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 bg-white/5 border border-gold-500/30 rounded-2xl p-12">
          <h2 className="text-2xl font-serif text-gold-400 mb-8 text-center">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Johnson', text: 'James was incredibly professional and found us our dream home. Highly recommended!' },
              { name: 'David Chen', text: 'Excellent market knowledge and negotiation skills. Made the selling process smooth and stress-free.' },
              { name: 'Emma Thompson', text: 'Outstanding service from start to finish. James truly cares about his clients\'s satisfaction.' },
            ].map((testimonial, i) => (
              <div key={i} className="bg-black/40 border border-gold-500/20 rounded-xl p-6">
                <div className="flex text-gold-400 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-4 italic">"{testimonial.text}"</p>
                <p className="text-white font-semibold text-sm">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-gold-500/10 to-gold-500/5 border border-gold-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-serif text-gold-400 mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact {agent.name} today for a personalized consultation and discover how we can help you achieve your real estate goals.
          </p>
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-gold-500/50 transition-all"
          >
            <MessageCircle size={20} />
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateAgentDetailView;
