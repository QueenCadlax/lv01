import React, { useState, useEffect } from 'react';
import { Stay } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, Calendar, Globe, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AreaDominationBadge } from './Shared';

function AccordionPostal() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left py-2" style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Additional Information {open ? '▲' : '▼'}
      </button>
      {open && (
        <div style={{ marginTop: 8, color: TEXT_MUTED, fontSize: 14 }}>
          <div style={{ fontWeight: 700, color: TEXT_WHITE, marginBottom: 6 }}>Postal Address</div>
          <div>Walkersons Hotel & Spa</div>
          <div>P.O. Box 185</div>
          <div>Dullstroom</div>
          <div>1110</div>
        </div>
      )}
    </div>
  );
}

interface StaysDetailLuxuryProps {
  stay: Stay;
  navigate?: (view: string, cat?: string, id?: string) => void;
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

const GOLD = '#C9A24D';
const PANEL_BLACK = '#0B0B0B';
const BG_BLACK = '#000000';
const BORDER = '#2a2a2a';
const TEXT_MUTED = '#8B8B8B';
const TEXT_WHITE = '#FFFFFF';

export default React.memo(function StaysDetailLuxury({ 
  stay, 
  navigate,
  favorites = [],
  toggleFavorite
}: StaysDetailLuxuryProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (stay?.id) {
      setIsFavorited(favorites.includes(stay.id));
    }
  }, [stay?.id, favorites]);

  const price = stay?.pricePerNight || 7400;
  // Prefer the full images array from the seed; fall back to the single image if not present
  const images: string[] = (stay?.images && stay.images.length > 0)
    ? stay.images
    : [stay?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'];

  const isPlatinum = typeof (stay as any).collection === 'string' && (stay as any).collection.toLowerCase().includes('platinum');

  // Autoplay hero slideshow every 1 second as requested
  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    const id = setInterval(() => {
      setHeroSlide((s) => (s + 1) % images.length);
    }, 1000); // 1000ms = 1 second
    return () => clearInterval(id);
  }, [images.length]);

  // Reset slide index when the stay changes
  useEffect(() => {
    setHeroSlide(0);
  }, [stay?.id]);

  const handleFavoriteToggle = () => {
    if (toggleFavorite && stay?.id) {
      toggleFavorite(stay.id);
      setIsFavorited(!isFavorited);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in your property: ${stay?.name}`;
    window.open(`https://wa.me/27123456789?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!stay) {
    return (
      <div style={{ paddingTop: 96, minHeight: '100vh', background: BG_BLACK }}>
        <div className="container mx-auto px-6">
          <button onClick={() => navigate?.('stays')} className="flex items-center gap-2 text-[#C9A24D] hover:text-amber-400 mb-6">
            <ArrowLeft size={20} /> Back to Stays
          </button>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Property not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: BG_BLACK, color: TEXT_WHITE, minHeight: '100vh' }}>
      {/* ============ BACK BUTTON ============ */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate?.('stays')}
          className="p-2 rounded-full hover:bg-white/5 transition"
          style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${BORDER}`, color: TEXT_WHITE }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* ============ 1. SPLIT HERO (EDITORIAL) - Eatery style single slideshow hero ============ */}
      <section className="relative" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="container mx-auto" style={{ maxWidth: 1400 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Gallery slideshow (kept behavior) */}
            <div style={{ borderRadius: 24, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ height: 620, background: 'black' }}>
                  <img src={images[heroSlide]} alt={`${stay.name} hero`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>

                {/* Nav arrows */}
                <button
                  onClick={() => setHeroSlide((s) => (s - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
                  style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${BORDER}` }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setHeroSlide((s) => (s + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
                  style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${BORDER}` }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Right: Info card (Eatery-style editorial) */}
            <div>
              {isPlatinum ? (
                // PLATINUM editorial content
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 360, textAlign: 'center', gap: 8 }}>
                    <div style={{ display: 'inline-block', padding: '6px 12px', background: 'transparent', border: `1px solid rgba(212,175,55,0.08)`, borderRadius: 6, color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
                      PLATINUM COLLECTION
                    </div>

                    <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.02, margin: '6px 0 8px', fontFamily: 'serif', fontWeight: 700 }}>{stay.name}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: TEXT_MUTED, fontSize: 13, marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: TEXT_WHITE }}>{stay.location}</div>
                    </div>

                    <div style={{ color: TEXT_MUTED, fontSize: 14, marginBottom: 12 }}>Luxury Country Estate • Spa • Fine Dining</div>

                    <p style={{ color: TEXT_WHITE, fontSize: 16, lineHeight: 1.6, marginBottom: 18, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
                      {stay.description}
                    </p>
                  </div>
                </>
              ) : (
                // Default editorial layout
                <>
                  <h2 style={{ fontSize: 28, marginBottom: 6 }}>{stay.name}</h2>
                  <div style={{ color: GOLD, fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{'Hotel'}</div>

                  <div style={{ color: TEXT_MUTED, fontSize: 14, marginBottom: 12 }}>{stay.location}</div>

                  <p style={{ color: TEXT_WHITE, fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{stay.description}</p>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
                    <button className="px-5 py-3 rounded-md font-semibold" style={{ background: GOLD, color: BG_BLACK }}>Book Stay</button>
                    <a href={(stay as any).website || '#'} target="_blank" rel="noreferrer" className="px-4 py-3 rounded-md font-semibold" style={{ border: `1px solid rgba(212,175,55,0.06)`, color: GOLD }}>Website →</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAIN CONTENT (TWO-COLUMN LAYOUT) ============ */}
      <div className="border-t" style={{ borderColor: BORDER, background: BG_BLACK }}>
        <div className="container mx-auto max-w-6xl px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ===== LEFT COLUMN: GALLERY + DETAILS ===== */}
            <div className="lg:col-span-2 space-y-8">

              {/* Gallery removed per request - hero remains the single slideshow */}

              {/* OUR STORY */}
              <div>
                <div style={{ marginBottom: 18, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  OUR STORY
                </div>
                <div style={{ color: TEXT_WHITE, fontSize: 15, lineHeight: 1.8, marginBottom: 18 }}>
                  <p className="mb-6">
                    For more than three decades Walkersons has welcomed travellers seeking quiet luxury, beautiful landscapes and genuine country hospitality.
                  </p>
                  <p>
                    Surrounded by rolling hills, trout dams and walking trails, the estate combines elegant accommodation, award-worthy dining and one of Mpumalanga's most relaxing spa experiences.
                  </p>
                </div>
              </div>

              {/* THE EXPERIENCE (2-column list) */}
              <div>
                <div style={{ marginBottom: 18, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  THE EXPERIENCE
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: 18 }}>
                  {[
                    '800 Hectare Country Estate',
                    '27 Luxury Rooms & Suites',
                    'Fine Country Dining',
                    'Walkersons Spa',
                    'Trout Fishing',
                    'Walking Trails',
                    'Horse Riding',
                    'Country Bar & Lounge'
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: GOLD, boxShadow: '0 0 0 4px rgba(201,162,77,0.06)' }} />
                      <div style={{ color: TEXT_MUTED, fontSize: 15 }}>{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOCATION - Editorial + Map + Getting There + Private Arrivals */}
              <div>
                <div style={{ marginBottom: 12, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  LOCATION
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ marginBottom: 16 }}>
                  <div>
                    <div style={{ color: TEXT_WHITE, fontSize: 15, lineHeight: 1.7, marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{'Walkersons Private Estate'}</div>
                      <div style={{ color: TEXT_MUTED, marginBottom: 4 }}>Dullstroom</div>
                      <div style={{ color: TEXT_MUTED, marginBottom: 4 }}>Mpumalanga</div>
                      <div style={{ color: TEXT_MUTED, marginBottom: 8 }}>South Africa</div>

                      <div style={{ color: TEXT_MUTED, fontSize: 13, marginBottom: 8 }}>
                        <div>GPS Coordinates</div>
                        <div style={{ marginTop: 6, fontWeight: 700 }}>-25.369170</div>
                        <div style={{ fontWeight: 700 }}>30.187378</div>
                      </div>

                      <div>
                        <button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=-25.369170,30.187378`, '_blank')} className="py-2 px-4 rounded-md font-semibold" style={{ border: `1px solid rgba(201,162,77,0.12)`, color: GOLD, background: 'transparent' }}>📍 Open Directions</button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="rounded-lg" style={{ overflow: 'hidden', borderRadius: 12, border: `1px solid ${BORDER}` }}>
                      <div style={{ height: 220, background: 'black' }}>
                        <iframe
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDNRrKfVCDonNTxeMX3HxZpbgV9wTUzYAE&q=${encodeURIComponent('Walkersons Private Estate, Dullstroom')}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* FULL WIDTH: GETTING THERE */}
                <div className="rounded-lg" style={{ border: `1px solid ${BORDER}`, background: PANEL_BLACK, padding: 18, marginBottom: 14 }}>
                  <div style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>GETTING THERE</div>
                  <div style={{ color: TEXT_WHITE, fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>By Road</div>
                    <ul style={{ color: TEXT_MUTED, marginLeft: 18, lineHeight: 1.8 }}>
                      <li>Approximately 2¾ hours from Johannesburg or Pretoria</li>
                      <li>Travel towards Dullstroom via the R540</li>
                      <li>Continue approximately 10km towards Lydenburg</li>
                      <li>Turn right at Walkersons Private Estate</li>
                      <li>Follow the tarred road to Security Reception</li>
                      <li>Continue following Hotel signage</li>
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=-25.369170,30.187378`, '_blank')} className="py-2 px-4 rounded-md" style={{ border: `1px solid ${GOLD}`, color: GOLD, background: 'transparent' }}>Google Maps</button>
                    <button onClick={() => window.open(`https://www.waze.com/ul?ll=-25.369170,30.187378&navigate=yes`, '_blank')} className="py-2 px-4 rounded-md" style={{ border: `1px solid ${GOLD}`, color: GOLD, background: 'transparent' }}>Waze</button>
                  </div>
                </div>

                {/* SMALL LUXURY CARD: PRIVATE ARRIVALS */}
                <div className="rounded-lg" style={{ border: `1px solid ${BORDER}`, background: 'linear-gradient(180deg, rgba(11,11,11,1), rgba(8,8,8,1))', padding: 16, marginBottom: 14 }}>
                  <div style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>PRIVATE ARRIVALS</div>
                  <div style={{ color: TEXT_WHITE, fontSize: 15, marginBottom: 8 }}>Helipad Available</div>
                  <div style={{ color: TEXT_MUTED, fontSize: 14 }}>Guests arriving by helicopter can arrange direct estate access in advance with the reservations team.</div>
                </div>

                {/* OPTIONAL ACCORDION: Additional Information */}
                <AccordionPostal />
              </div>
            </div>

            {/* ===== RIGHT COLUMN: ELEGANT BOOKING CARD ===== */}
            <div className="lg:col-span-1">
              <div className="sticky top-24" style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 28 }}>
                <div style={{ textAlign: 'center', marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>BOOK YOUR STAY</div>
                </div>

                <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: 6, paddingTop: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: TEXT_MUTED, letterSpacing: '0.06em', marginBottom: 6 }}>FROM</div>
                  <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 2 }}>R3 710</div>
                  <div style={{ fontSize: 13, color: TEXT_MUTED, marginBottom: 12 }}>per person sharing</div>
                </div>

                <div style={{ display: 'flex', gap: 10, flexDirection: 'column', marginBottom: 12 }}>
                  <button className="py-3 rounded-md font-semibold" style={{ background: GOLD, color: BG_BLACK }}>Book Stay</button>
                  <button onClick={handleWhatsApp} className="py-3 rounded-md font-semibold" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>WhatsApp</button>
                  <button onClick={() => window.location.href = `tel:+27825550000`} className="py-3 rounded-md font-semibold" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>Call</button>
                  <button onClick={() => window.location.href = `mailto:info@walkersons.co.za?subject=Booking%20Enquiry%20${encodeURIComponent(stay.name)}`} className="py-3 rounded-md font-semibold" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>Email</button>
                </div>

                <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12, marginTop: 8 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div style={{ color: TEXT_MUTED, fontSize: 13 }}>Hotel</div>
                    <div style={{ color: TEXT_MUTED, fontSize: 13, textAlign: 'right' }}>27 Luxury Rooms</div>
                    <div style={{ color: TEXT_MUTED, fontSize: 13 }}>Spa</div>
                    <div style={{ color: TEXT_MUTED, fontSize: 13, textAlign: 'right' }}>2 Restaurants</div>
                    <div style={{ color: TEXT_MUTED, fontSize: 13 }}>800ha Estate</div>
                    <div style={{ color: TEXT_MUTED, fontSize: 13, textAlign: 'right' }}>Trout Fishing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discover section removed as requested */}
    </div>
  );
});
