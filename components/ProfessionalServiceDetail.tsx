import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Globe,
  MapPin,
  Check,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ProfessionalServiceDetailProps {
  service: Business | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

const ProfessionalServiceDetail: React.FC<ProfessionalServiceDetailProps> = ({
  service,
  navigate,
  favorites = [],
  toggleFavorite,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service?.id]);

  // Slideshow state (matches EateryDetail pattern)
  const [heroSlide, setHeroSlide] = useState(0);
  const images: string[] = (service.images && service.images.length > 0) ? service.images : (service.image ? [service.image] : []);

  useEffect(() => {
    // autoplay every 3s by default (can be reduced)
    const ms = 3000;
    if (images.length <= 1) return;
    const id = setInterval(() => setHeroSlide((s) => (s + 1) % images.length), ms);
    return () => clearInterval(id);
  }, [images.length]);

  if (!service) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-black">
        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate('services')}
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-6"
          >
            <ArrowLeft size={20} /> Back to Services
          </button>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Service provider not found</p>
          </div>
        </div>
      </div>
    );
  }

  // Display values
  const servicesList =
    (service.services && service.services.length > 0 && service.services) ||
    [
      'Emergency Callouts',
      'Residential Installations',
      'Commercial Electrical',
      'Solar Systems',
      'Generator Backup',
      'Fault Finding',
      'Maintenance',
      'Compliance Certificates',
    ];

  const areas =
    (service.areas && service.areas.length > 0 && service.areas) ||
    ['Mbombela', 'White River', 'Sabie', 'Hazyview', 'Kaapsehoop', 'Graskop', 'Nelspruit', 'KaNyamazane'];

  const whatsappHref = service.phone ? `https://wa.me/${service.phone.replace(/[^0-9]/g, '')}` : undefined;

  const isPlatinum = (service.tier && service.tier.toString().toLowerCase().includes('platinum')) || false;

  return (
    <div style={{ background: '#000000', color: '#ffffff', minHeight: '100vh' }}>
      {/* BACK BUTTON - absolute like EateryDetail */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate('services')}
          className="p-2 rounded-full hover:bg-white/5 transition"
          style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(26,26,26,0.6)', color: '#ffffff' }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <section className="relative" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="container mx-auto" style={{ maxWidth: 1400 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Gallery slideshow */}
            <div style={{ borderRadius: 24, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ height: 420, background: 'black' }}>
                  <img src={images[heroSlide] || service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>

                {/* Nav arrows */}
                <button
                  onClick={() => setHeroSlide((s) => (s - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(26,26,26,0.6)' }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setHeroSlide((s) => (s + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(26,26,26,0.6)' }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Right: Info card - match EateryDetail editorial layout exactly for PLATINUM */}
            <div>
              {isPlatinum ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 360, textAlign: 'center', gap: 8 }}>
                    <div style={{ display: 'inline-block', padding: '6px 12px', background: 'transparent', border: '1px solid rgba(212,175,55,0.08)', borderRadius: 6, color: '#C9A24D', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
                      PLATINUM VERIFIED
                    </div>

                    <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.02, margin: '6px 0 8px', fontFamily: 'serif', fontWeight: 700, color: '#C9A24D' }}>{service.name}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8B8B8B', fontSize: 13, marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: '#ffffff' }}>{service.location}</div>
                    </div>

                    <div style={{ color: '#8B8B8B', fontSize: 14, marginBottom: 12 }}>{service.category || ''}</div>

                    <p style={{ color: '#d9d9d9', fontSize: 16, lineHeight: 1.6, marginBottom: 18, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
                      {service.description || 'Trusted electrical specialists delivering residential, commercial and industrial solutions throughout the Lowveld.'}
                    </p>
                  </div>
                </>
              ) : (
                // Non-platinum default panel (kept simple)
                <>
                  <div style={{ display: 'inline-block', padding: '6px 12px', background: 'transparent', border: '1px solid rgba(212,175,55,0.08)', borderRadius: 6, color: '#C9A24D', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                    SERVICE PROVIDER
                  </div>

                  <h2 style={{ fontSize: 28, marginBottom: 6, color: '#C9A24D' }}>{service.name}</h2>
                  <div style={{ color: '#C9A24D', fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{service.subcategory || service.category || 'Professional Services'}</div>

                  <div style={{ color: '#8B8B8B', fontSize: 14, marginBottom: 12 }}>{service.location}</div>

                  <p style={{ color: '#d9d9d9', fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{service.description || 'Professional services with local expertise.'}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main grid: content + sticky sidebar (match Eatery detail flow) */}
        <div className="container mx-auto mt-10" style={{ maxWidth: 1400 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Content column (span 2) */}
            <div className="md:col-span-2 space-y-12">
              {/* ABOUT */}
              <section>
                <h2 className="text-2xl font-serif font-light mb-3" style={{ color: '#C9A24D' }}>About</h2>
                <div className="h-0.5 w-16 bg-gradient-to-r from-gold-500 to-transparent mb-8" />
                <p className="text-gray-300 max-w-3xl leading-relaxed">
                  Professional electrical contractors serving homes, businesses and industrial facilities across Mpumalanga. From emergency repairs to complete installations, every project is completed by licensed technicians with a commitment to safety, reliability and long-term quality.
                </p>
              </section>

              {/* SERVICES — if serviceCards exist render premium cards, else pills */}
              <section>
                <h3 className="text-xl font-medium text-white mb-4" style={{ color: '#C9A24D' }}>Services</h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-gold-500 to-transparent mb-8" />
                {service.serviceCards && service.serviceCards.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.serviceCards.map((card, i) => (
                      <div key={i} className="bg-white/4 border border-white/8 rounded-2xl p-5">
                        <div className="text-sm text-gold-400 font-semibold mb-2">{card.title}</div>
                        <ul className="text-gray-200 leading-relaxed list-none space-y-1">
                          {card.items.map((it, j) => (
                            <li key={j} className="text-sm">{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 max-h-28 overflow-hidden">
                    {servicesList.map((s, idx) => (
                      <div key={idx} className="px-3 py-1.5 bg-white/6 text-gray-200 rounded-full text-sm">
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* WHY CHOOSE US — omitted for premium editorial profiles (use Company Snapshot instead) */}
              {!service.serviceCards && (
                <section>
                  <h3 className="text-xl font-medium mb-4" style={{ color: '#C9A24D' }}>Why clients choose them</h3>
                  <div className="h-0.5 w-16 bg-gradient-to-r from-gold-500 to-transparent mb-8" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Licensed Professionals',
                      'Fast Emergency Response',
                      'Transparent Quotations',
                      'Commercial & Residential',
                      'Local Lowveld Team',
                      'Fully Insured',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 text-gold-400"><Check size={18} /></div>
                        <div className="text-gray-200 font-medium">{item}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* PROJECT SECTORS / SERVICE AREAS */}
              <section>
                <h3 className="text-xl font-medium mb-4" style={{ color: '#C9A24D' }}>{service.projectSectors ? 'PROJECT SECTORS' : 'Service areas'}</h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-gold-500 to-transparent mb-8" />
                <div className="flex flex-wrap gap-2">
                  {(service.projectSectors || areas).map((a, i) => (
                    <div key={i} className="px-3 py-1 rounded-full bg-white/6 text-gray-200 text-sm">{a}</div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sticky Sidebar */}
            <aside className="md:col-span-1">
              <div className="sticky top-28">
                {service.companySnapshot ? (
                  <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-4">
                    <div>
                      <div className="text-sm text-gold-400 font-semibold">{service.name.toUpperCase()}</div>
                      <div className="text-white font-medium text-lg mt-1">Contact & Company Snapshot</div>
                      <div className="text-gray-300 text-sm mt-2">{service.location}</div>
                    </div>

                    <div className="space-y-2">
                      <a href={`tel:${service.phone}`} className="w-full inline-flex items-center justify-center gap-2 bg-gold-400 text-black font-semibold px-4 py-2 rounded-lg">
                        <Phone size={16} /> Call
                      </a>
                      <a href={`mailto:${service.email}`} className="w-full inline-flex items-center justify-center gap-2 border border-white/10 px-4 py-2 rounded-lg">
                        <MessageCircle size={16} /> Email
                      </a>
                      {service.website && (
                        <a href={`https://${service.website}`} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 border border-white/10 px-4 py-2 rounded-lg">
                          <Globe size={16} /> Website
                        </a>
                      )}
                    </div>

                    <div className="pt-2 border-t border-white/6 text-gray-300 text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div>Founded</div>
                        <div className="font-medium">{service.companySnapshot.founded}</div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div>Annual Turnover</div>
                        <div className="font-medium">{service.companySnapshot.turnover}</div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div>Employees</div>
                        <div className="font-medium">{service.companySnapshot.employees}</div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div>CIDB</div>
                        <div className="font-medium">{service.companySnapshot.cidb}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>BEE</div>
                        <div className="font-medium">{service.companySnapshot.bee}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-gold-400 font-semibold">REQUEST A QUOTE</div>
                        <div className="text-white font-medium text-lg mt-1">Get an estimate in 24 hours</div>
                      </div>
                      <div className="text-gold-400 text-2xl">•</div>
                    </div>

                    <div className="space-y-2">
                      <a href={`tel:${service.phone}`} className="w-full inline-flex items-center justify-center gap-2 bg-gold-400 text-black font-semibold px-4 py-2 rounded-lg">
                        <Phone size={16} /> Call
                      </a>
                      {whatsappHref && (
                        <a href={whatsappHref} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 border border-white/10 px-4 py-2 rounded-lg">
                          <MessageCircle size={16} /> WhatsApp
                        </a>
                      )}
                      <button onClick={() => navigate('contact-us')} className="w-full inline-flex items-center justify-center gap-2 border border-white/10 px-4 py-2 rounded-lg">
                        Request Quote
                      </button>
                      {service.website && (
                        <a href={`https://${service.website}`} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 border border-white/10 px-4 py-2 rounded-lg">
                          <Globe size={16} /> Website
                        </a>
                      )}
                    </div>

                    <div className="pt-2 border-t border-white/6 text-gray-300 text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div>Available</div>
                        <div className="font-medium">24/7</div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div>Licensed</div>
                        <div className="font-medium">Yes</div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div>Verified</div>
                        <div className="font-medium">LowveldHub</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Service Area</div>
                        <div className="font-medium">Lowveld</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalServiceDetail;
