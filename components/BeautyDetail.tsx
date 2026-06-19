import React, { useState, useEffect, useRef } from 'react';
import { Business, ListingTier } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, Calendar, Globe, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

const GOLD = '#C9A24D';
const PANEL_BLACK = '#0B0B0B';
const BG_BLACK = '#000000';
const BORDER = '#2a2a2a';
const TEXT_MUTED = '#8B8B8B';
const TEXT_WHITE = '#FFFFFF';

interface BeautyDetailProps {
  business: Business;
  navigate?: (view: string, cat?: string, id?: string) => void;
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

export default function BeautyDetail({ business, navigate, favorites = [], toggleFavorite }: BeautyDetailProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroImgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [business?.id]);

  useEffect(() => {
    if (business?.id) {
      setIsFavorited(favorites.includes(business.id));
    }
  }, [business?.id, favorites]);

  // Debug: log when this detail view mounts for a specific business
  useEffect(() => {
    if (business?.id) {
      // eslint-disable-next-line no-console
      console.debug('BeautyDetail mounted for:', business.id);
    }
  }, [business?.id]);

  const images: string[] = (business?.gallery && business.gallery.length > 0)
    ? business.gallery
    : (business?.images && business.images.length > 0)
      ? business.images
      : [business?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'];

  const isPlatinum = business?.tier === ListingTier.Platinum || false;

  // Autoplay hero slideshow every 1 second (keeps editorial feel)
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const id = setInterval(() => setHeroSlide((s) => (s + 1) % images.length), 1000);
    return () => clearInterval(id);
  }, [images.length]);

  // Hero parallax/scale on scroll
  useEffect(() => {
    const onScroll = () => {
      const el = heroImgRef.current;
      if (!el) return;
      const scrolled = window.scrollY;
      const max = 200; // px after which scale hits 1.0
      const t = Math.min(scrolled / max, 1);
      const scale = 1.05 - (0.05 * t);
      el.style.transform = `scale(${scale})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setHeroSlide(0);
  }, [business?.id]);

  const handleWhatsApp = () => {
    const number = business?.phone ? business.phone.replace(/[^0-9]/g, '') : undefined;
    const message = `Hi! I'm interested in ${business?.name}`;
    if (number) window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!business) return null;

  const booking = (business.extra && (business.extra.bookingCard || business.extra.booking)) || null;

  return (
    <div style={{ background: BG_BLACK, color: TEXT_WHITE, minHeight: '100vh' }}>
      {/* Debug badge to confirm this component is rendered (remove in production) */}
      <div style={{ position: 'fixed', top: 12, right: 12, zIndex: 60, padding: '6px 10px', borderRadius: 8, background: 'rgba(0,0,0,0.5)', border: `1px solid rgba(255,255,255,0.06)`, color: GOLD, fontSize: 12, fontWeight: 700 }}>Beauty</div>
      {/* Ambient radial background */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', right: '-20%', top: '-10%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(201,162,77,0.06), transparent 30%)' }} />
        <div style={{ position: 'absolute', left: '-10%', bottom: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle at 70% 70%, rgba(0,0,0,0.3), transparent 40%)' }} />
      </div>
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate?.('services')}
          className="p-2 rounded-full hover:bg-white/5 transition"
          style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${BORDER}`, color: TEXT_WHITE }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* HERO — stays/hospitality split editorial */}
      <section className="relative" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="container mx-auto" style={{ maxWidth: 1400 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Gallery slideshow */}
            <div style={{ borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ height: 620, background: 'black' }}>
                  <img src={images[heroSlide]} alt={`${business.name} hero`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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

            {/* Right: Info card - editorial */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 420, textAlign: 'center', gap: 8 }}>
                <div style={{ display: 'inline-block', padding: '6px 12px', background: 'transparent', border: `1px solid rgba(212,175,55,0.08)`, borderRadius: 6, color: '#C9A24D', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {isPlatinum ? 'PLATINUM COLLECTION' : 'PREMIUM'}
                </div>

                <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.02, margin: '6px 0 8px', fontFamily: 'serif', fontWeight: 700 }}>{business.name}</h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: TEXT_MUTED, fontSize: 13, marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, color: TEXT_WHITE }}>{business.location}</div>
                </div>

                <div style={{ color: TEXT_MUTED, fontSize: 14, marginBottom: 12 }}>{business.subcategory || business.category}</div>

                <p style={{ color: TEXT_WHITE, fontSize: 16, lineHeight: 1.6, marginBottom: 18, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
                  {business.extra?.hero?.copy || business.description}
                </p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
                  <button onClick={() => window.location.href = booking?.bookHref || `tel:${business.phone}`} className="px-6 py-3 rounded-full font-semibold" style={{ background: GOLD, color: BG_BLACK }}>Book Now</button>
                  <a href={(business.extra && business.extra.bookingCard && business.extra.bookingCard.ctas && business.extra.bookingCard.ctas.find((c: any) => /brochure/i.test(c.label))?.url) || '#'} className="px-5 py-3 rounded-full font-semibold border border-white/10" style={{ color: TEXT_WHITE }}>Brochure</a>
                  <button onClick={handleWhatsApp} className="px-5 py-3 rounded-full font-semibold border border-white/10" style={{ color: TEXT_WHITE }}>WhatsApp</button>
                </div>

                {/* subtle info row under hero buttons */}
                <div style={{ marginTop: 16, display: 'flex', gap: 24, justifyContent: 'center', color: TEXT_MUTED, fontSize: 12, flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: TEXT_MUTED }}>Open Daily</div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{business.extra?.openingHours || 'Open Daily'}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: TEXT_MUTED }}>Luxury Spa</div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>Private Suites</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: TEXT_MUTED }}>Bookings</div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>Essential • Couples Welcome</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t" style={{ borderColor: BORDER, background: BG_BLACK }}>
        <div className="container mx-auto max-w-6xl px-8 py-[80px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-[56px]">
              {/* STORY - magazine style */}
              <section>
                <div style={{ marginBottom: 12, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>THE ESCAPE</div>
                  <h2 style={{ fontFamily: 'serif', fontSize: 24, marginBottom: 10, color: TEXT_WHITE }}>
                    "Nature has always been the finest therapist."
                  </h2>
                  <div style={{ maxWidth: 700, color: TEXT_MUTED, fontSize: 16, lineHeight: 1.7 }}>
                    {business.extra?.aboutLongShort || 'Hidden along the Sabie River, Rose Spa blends luxury wellness with untouched nature, creating an experience where every treatment restores body, mind and spirit.'}
                  </div>
              </section>

              {/* SIGNATURE EXPERIENCES as editorial pills */}
              <section>
                <div style={{ marginBottom: 12, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>CURATED RITUALS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {(business.extra?.highlights || [
                    'Signature Massage Rituals',
                    'Luxury Facial Journeys',
                    'Couples Escape Experiences',
                    'Body Renewal Rituals',
                    'Nature Wellness Sessions',
                    'Private Spa Packages',
                    'Holistic Therapies',
                    'Curated Wellness Treatments'
                  ]).map((t: string, i: number) => (
                    <div key={i} className="experience-pill" style={{ padding: '10px 14px', borderRadius: 999, background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: TEXT_WHITE, transition: 'transform .25s ease, box-shadow .25s ease', cursor: 'pointer' }}>
                      {t}
                    </div>
                  ))}
                </div>
              </section>

              {/* LOCATION — split layout with map */}
              <section>
                <div style={{ marginBottom: 12, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>DISCOVER THE LOCATION</div>
                <div style={{ maxWidth: 700, color: TEXT_MUTED, fontSize: 16, lineHeight: 1.7, marginBottom: 12 }}>
                  {business.extra?.locationIntro || `Nestled within Summerfields Estate, ${business.name} overlooks the Sabie River and indigenous gardens, creating one of Mpumalanga's most tranquil wellness destinations.`}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ alignItems: 'start' }}>
                  <div>
                    <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}`, background: PANEL_BLACK }}>
                      <div style={{ height: 300 }}>
                        {business.extra?.mapsEmbed ? (
                          <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen src={business.extra?.mapsEmbed} />
                        ) : (
                          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_MUTED }}>Map preview</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <ul style={{ color: TEXT_WHITE, lineHeight: 1.9 }}>
                      <li>Sabie River</li>
                      <li>Bush & Mountain Views</li>
                      <li>Private Estate</li>
                      <li>Indigenous Gardens</li>
                    </ul>

                    <div style={{ marginTop: 12 }}>
                      <button onClick={() => window.open(business.extra?.mapsUrl || '#', '_blank')} className="py-2 px-4 rounded-md font-semibold" style={{ border: `1px solid ${GOLD}`, color: GOLD, background: 'transparent' }}>Open Directions →</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* BOOKING CARD — upgraded */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24" style={{ padding: 28 }}>
                <div style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderRadius: 16, background: 'linear-gradient(180deg, rgba(11,11,11,0.7), rgba(11,11,11,0.6))', border: `1px solid rgba(255,255,255,0.06)`, padding: 22, boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>
                  <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>BOOK YOUR EXPERIENCE</div>
                    <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 8 }}>Starting from</div>
                    <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{booking?.price || business.extra?.price || 'R1 299'}</div>
                      <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 4 }}>Luxury Spa Experiences</div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexDirection: 'column', marginTop: 16 }}>
                    <button onClick={() => window.location.href = (booking && (booking.bookHref || booking.ctas?.[0]?.url)) || `tel:${business.phone}`} className="py-3 rounded-md font-semibold" style={{ background: GOLD, color: BG_BLACK, boxShadow: '0 10px 30px rgba(201,162,77,0.12)' }}>Book Now</button>
                    <button onClick={handleWhatsApp} className="py-3 rounded-md font-semibold" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>WhatsApp</button>
                    <a href={(business.extra && business.extra.bookingCard && business.extra.bookingCard.ctas && business.extra.bookingCard.ctas.find((c: any) => /brochure/i.test(c.label))?.url) || '#'} className="py-3 rounded-md font-semibold text-center" style={{ border: `1px solid rgba(255,255,255,0.06)`, color: TEXT_WHITE }}>Download Brochure</a>
                  </div>

                  <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12, marginTop: 12, color: TEXT_MUTED, fontSize: 13 }}>
                    <div style={{ fontWeight: 700 }}>PRIVATE SPA EXPERIENCES</div>
                    <div>from {booking?.price || business.extra?.price || 'R1 299'} • per guest</div>
                    <div>Bookings essential</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Luxury footer CTA */}
      <div style={{ marginTop: 40, padding: '60px 0', backgroundImage: `url(${images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.6))' }} />
        <div className="container mx-auto" style={{ maxWidth: 1200, position: 'relative', zIndex: 10 }}>
          <div style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 12, padding: 28, border: `1px solid rgba(255,255,255,0.06)`, textAlign: 'center', color: TEXT_WHITE }}>
            <div style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>PLATINUM COLLECTION</div>
            <h3 style={{ fontFamily: 'serif', fontSize: 26, marginBottom: 8 }}>Where luxury wellness meets the rhythm of nature.</h3>
            <p style={{ color: TEXT_MUTED, marginBottom: 16 }}>Reserve your escape.</p>
            <button onClick={() => window.location.href = booking?.bookHref || `tel:${business.phone}`} className="px-6 py-3 rounded-full font-semibold" style={{ background: GOLD, color: BG_BLACK }}>Reserve Your Experience</button>
          </div>
        </div>
      </div>
    </div>
  );
}
