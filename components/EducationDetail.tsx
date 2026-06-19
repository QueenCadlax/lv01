import React, { useEffect, useState } from 'react';
import { Business, Category, ListingTier } from '../types';
import { ArrowLeft, Phone, Globe, MapPin, Star, Check, Share2 } from 'lucide-react';

interface EducationDetailProps {
  institution: Business | null;
  navigate: (view: string, category?: string, id?: string) => void;
  businesses: Business[];
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

// Simple slideshow used for premium hero
const PremiumSlideshow: React.FC<{ images: string[] }> = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full h-full relative">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`slide-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
};

const EducationDetail: React.FC<EducationDetailProps> = ({ institution, navigate, businesses, favorites = [], toggleFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [institution?.id]);

  useEffect(() => {
    if (institution?.id) setIsFavorited(favorites.includes(institution.id));
  }, [institution?.id, favorites]);

  if (!institution) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-black">
        <div className="container mx-auto px-6">
          <button onClick={() => navigate('education')} className="flex items-center gap-2 text-[#D4AF37] mb-6"> <ArrowLeft /> Back to Education</button>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Institution not found</p>
          </div>
        </div>
      </div>
    );
  }

  const isVerified = institution.tier === ListingTier.Elite || institution.tier === ListingTier.Platinum;

  const related = businesses.filter(b => b.category === Category.EducationAndSkills && b.id !== institution.id).slice(0,3);

  const programList = (institution.amenities && institution.amenities.length>0) ? institution.amenities.slice(0,6) : ['Engineering','IT','Business','Science','Management','Innovation'];

  const features = institution.highlights && institution.highlights.length >=4 ? institution.highlights.slice(0,4) : ['Undergraduate Programmes','Industry Partnerships','Applied Sciences','Career-Focused Learning'];

  const handleFavorite = () => {
    if (toggleFavorite && institution.id) {
      toggleFavorite(institution.id);
      setIsFavorited(!isFavorited);
    }
  };

  // Special premium editorial for Curro Nelspruit Primary School
  if (institution.id === 'edu_curro_nels') {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-black text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-8">
            <button onClick={() => navigate('education')} className="flex items-center gap-2 text-[#D4AF37] font-medium"><ArrowLeft /> Back to Education</button>
          </div>

          {/* HERO: slideshow left, editorial right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#000000] to-[#000000] border border-white/5 h-[420px]">
              {/* simple slideshow */}
              <PremiumSlideshow images={institution.gallery || [institution.image]} />
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-[#C9A24D] text-xs uppercase tracking-[0.2em] mb-3">{institution.premiumStat || 'PLATINUM EDUCATION'}</div>
                <h1 className="text-4xl md:text-5xl font-serif font-light text-[#C9A24D] mb-3">{institution.name}</h1>
                <div className="flex items-center gap-4 text-[#d9d9d9] mb-4">
                  {isVerified && <div className="flex items-center gap-2 text-[#C9A24D]"><Check /> <span className="font-semibold">PLATINUM EDUCATION</span></div>}
                  <div className="flex items-center gap-2 text-gray-400"><MapPin/> <span>{institution.location}</span></div>
                </div>

                <p className="text-[#d9d9d9] max-w-xl">{institution.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`#contact`} className="inline-flex items-center gap-2 bg-[#C9A24D] text-black px-5 py-3 rounded-full font-semibold">Enquire</a>
                <a href={institution.website || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 rounded-full">Website</a>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(institution.location)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 rounded-full">Directions</a>
                <a href={`tel:${institution.phone || ''}`} className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 rounded-full">Call</a>
              </div>
            </div>
          </div>

          {/* Section: Our Approach */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#C9A24D] mb-4">OUR APPROACH</h2>
            <div className="h-px bg-[#C9A24D] w-24 mb-6" />
            <p className="text-[#d9d9d9] max-w-3xl">Curro Nelspruit provides an independent education built on the national CAPS curriculum while encouraging creativity, self-discovery and project-based learning.
            Small class sizes allow teachers to give every learner personal attention while Robotics, practical learning and modern teaching methods prepare children for a rapidly changing world.
            The campus combines academic excellence with sport, culture and technology in a secure environment designed for confident lifelong learning.</p>
          </section>

          {/* Section: The Curro Experience (glass cards) */}
          <section className="mb-12">
            <h3 className="text-2xl font-serif font-light text-[#C9A24D] mb-4">THE CURRO EXPERIENCE</h3>
            <div className="h-px bg-[#C9A24D] w-24 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {(institution.amenities || []).slice(0,8).map((a, i) => (
                <div key={i} className="p-6 bg-white/3 backdrop-blur rounded-xl border border-white/6 shadow-sm hover:translate-y-[-4px] transition-transform">
                  <div className="text-lg font-semibold text-white mb-2">{a}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Why Parents Choose Curro */}
          <section className="mb-12">
            <h3 className="text-2xl font-serif font-light text-[#C9A24D] mb-4">WHY PARENTS CHOOSE CURRO</h3>
            <div className="h-px bg-[#C9A24D] w-24 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {(institution.highlights || ['Personal Attention','Future Skills','Balanced Education','Safe Environment']).slice(0,4).map((h, i) => (
                <div key={i} className="p-6 bg-black/40 rounded-xl border border-white/6">
                  <div className="text-lg font-semibold text-white mb-2">{h}</div>
                  <p className="text-gray-400 text-sm">{['Small classes ensure every learner receives individual guidance.','Robotics, research projects and practical learning encourage innovation.','Academics, sport and culture develop well-rounded learners.','A modern campus designed for confident and happy learning.'][i]}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Support Programmes (tags) */}
          <section className="mb-12">
            <h3 className="text-2xl font-serif font-light text-[#C9A24D] mb-4">SUPPORT PROGRAMMES</h3>
            <div className="h-px bg-[#C9A24D] w-24 mb-6" />
            <div className="flex flex-wrap gap-3">
              {(institution.supportPrograms || []).map((s, i) => (
                <div key={i} className="px-4 py-2 rounded-full bg-white/6 text-gray-200 text-sm">{s}</div>
              ))}
            </div>
          </section>

          {/* Quick Facts */}
          <section className="mb-12">
            <h3 className="text-2xl font-serif font-light text-[#C9A24D] mb-4">QUICK FACTS</h3>
            <div className="h-px bg-[#C9A24D] w-24 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-black/40 rounded-xl border border-white/6">
                <div className="text-gray-400 text-sm">Grades</div>
                <div className="text-white font-semibold">{institution.quickFacts?.grades}</div>
              </div>
              <div className="p-6 bg-black/40 rounded-xl border border-white/6">
                <div className="text-gray-400 text-sm">Languages</div>
                <div className="text-white font-semibold">{institution.quickFacts?.languages}</div>
              </div>
              <div className="p-6 bg-black/40 rounded-xl border border-white/6">
                <div className="text-gray-400 text-sm">Class Size</div>
                <div className="text-white font-semibold">{institution.quickFacts?.classSize}</div>
              </div>
              <div className="p-6 bg-black/40 rounded-xl border border-white/6">
                <div className="text-gray-400 text-sm">School Hours</div>
                <div className="text-white font-semibold">{institution.quickFacts?.schoolHours}</div>
              </div>
            </div>
          </section>

          {/* Perfect For */}
          <section className="mb-12">
            <h3 className="text-2xl font-serif font-light text-[#C9A24D] mb-4">PERFECT FOR</h3>
            <div className="flex flex-wrap gap-3">
              {(institution.perfectFor || []).map((p, i) => (
                <div key={i} className="px-4 py-2 rounded-full bg-white/6 text-gray-200 text-sm">{p}</div>
              ))}
            </div>
          </section>

          {/* Location + Buttons */}
          <section className="mb-20">
            <h3 className="text-2xl font-serif font-light text-[#C9A24D] mb-4">LOCATION</h3>
            <div className="h-px bg-[#C9A24D] w-24 mb-6" />
            <p className="text-[#d9d9d9] mb-4">{institution.location}</p>
            <div className="flex items-center gap-3">
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(institution.location)}`} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-full bg-[#D4AF37] text-black font-semibold">Directions</a>
              <a href={institution.website || '#'} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-full border border-white/10">Website</a>
              <a href={`#contact`} className="px-5 py-3 rounded-full border border-white/10">Enquire</a>
            </div>
          </section>

        </div>
      </div>
    );
  }
  return (
    <div className="pt-24 pb-20 min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back */}
        <div className="mb-8">
          <button onClick={() => navigate('education')} className="flex items-center gap-2 text-[#D4AF37] font-medium"><ArrowLeft /> Back to Education</button>
        </div>

        {/* HERO - Image Left, Details Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div className="rounded-2xl overflow-hidden h-96 bg-gradient-to-br from-[#D4AF37]/10 to-black border border-[#D4AF37]/20">
            <img src={institution.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop'} alt={institution.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-3">{institution.subcategory || 'Education'}</div>
              <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-3">{institution.name}</h1>

              <div className="flex items-center gap-4 text-gray-300 mb-4">
                {isVerified && <div className="flex items-center gap-2 text-[#D4AF37]"><Check /> <span className="font-semibold">Verified Institution</span></div>}
                {/* Ratings intentionally hidden for Education listings */}
                <div className="flex items-center gap-2 text-gray-400"><MapPin/> <span>{institution.location}</span></div>
              </div>

              <p className="text-gray-300 max-w-2xl">{institution.tagline || institution.description || 'Preparing tomorrow’s leaders through applied learning and industry partnerships.'}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={institution.website || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-5 py-3 rounded-full font-semibold">Visit Website</a>
              <a href={`tel:${institution.phone || ''}`} className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 rounded-full">Call</a>
              <button onClick={handleFavorite} className={`inline-flex items-center gap-2 border border-white/10 px-4 py-3 rounded-full ${isFavorited ? 'bg-white/5' : ''}`}>{isFavorited ? 'Saved' : 'Save'}</button>
              <button className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 rounded-full"><Share2/>Share</button>
            </div>
          </div>
        </div>

        {/* STATS SNAPSHOT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div>
            <div className="text-[#D4AF37] text-2xl font-light mb-1">{institution.premiumStat || 'Established'}</div>
            <div className="text-gray-400 text-sm">Highlight</div>
          </div>
          <div>
            <div className="text-[#D4AF37] text-2xl font-light mb-1">{institution.reviewCount || '—'}</div>
            <div className="text-gray-400 text-sm">Reviews</div>
          </div>
          <div>
            <div className="text-[#D4AF37] text-2xl font-light mb-1">{programList.length}</div>
            <div className="text-gray-400 text-sm">Programs</div>
          </div>
          <div>
            <div className="text-[#D4AF37] text-2xl font-light mb-1">{institution.reviewCount ? `${institution.reviewCount}+` : '—'}</div>
            <div className="text-gray-400 text-sm">Learners</div>
          </div>
        </div>

        {/* WHY STUDENTS CHOOSE - similar to services card layout */}
        <div className="border-t border-white/6 pt-12 mb-16">
          <h2 className="text-2xl font-serif font-light mb-6">Why Students Choose {institution.name.split(' ')[0]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 bg-white/2 rounded-xl border border-white/6">
                <div className="text-sm text-gray-300 mb-2 uppercase tracking-wider">{['Undergraduate','Partnerships','Applied Sciences','Career'][i]}</div>
                <div className="text-lg font-semibold">{f}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PROGRAMS / ACADEMIC AREAS */}
        <div className="border-t border-white/6 pt-12 mb-16">
          <h3 className="text-xl font-serif font-light mb-6">Academic Areas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {programList.map((p, idx) => (
              <div key={idx} className="p-4 bg-white/2 rounded-lg text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">{p.charAt(0)}</div>
                <div className="text-sm text-gray-300">{p}</div>
              </div>
            ))}
          </div>
        </div>

        {/* GALLERY */}
        <div className="border-t border-white/6 pt-12 mb-16">
          <h3 className="text-xl font-serif font-light mb-6">Campus Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(institution.gallery && institution.gallery.length>0 ? institution.gallery : [institution.image]).slice(0,6).map((g, i) => (
              <div key={i} className="h-44 md:h-56 overflow-hidden rounded-lg bg-gray-900">
                {g ? <img src={g} alt={`gallery-${i}`} className="w-full h-full object-cover" /> : null}
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="border-t border-white/6 pt-12 mb-16">
          <h3 className="text-xl font-serif font-light mb-6">Student Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(institution.testimonials && institution.testimonials.length>0 ? institution.testimonials : [{text:'The practical approach prepared me for my first job.',author:'CS Graduate'},{text:'Industry exposure gave me real experience.',author:'Engineering Student'}]).map((t:any, i:number) => (
              <div key={i} className="p-6 bg-white/2 rounded-xl border border-white/6">
                <div className="text-[#D4AF37] mb-3">★★★★★</div>
                <p className="italic text-gray-300 mb-3">"{t.text}"</p>
                <div className="text-sm text-gray-400">{t.author}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ADMISSION CTA */}
        <div className="border-t border-white/6 pt-12 mb-16 text-center">
          <h3 className="text-2xl font-serif font-light mb-4">Ready to start your journey?</h3>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-semibold">Apply Now</button>
            <button onClick={() => navigate('education', undefined, institution.id)} className="border border-white/10 px-5 py-3 rounded-full">Request Information</button>
            <a href={institution.website||'#'} className="border border-white/10 px-5 py-3 rounded-full">Visit Campus</a>
          </div>
        </div>

        {/* MAP + SIMILAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden border border-white/6">
              <iframe title="map" src={`https://www.google.com/maps?q=${encodeURIComponent(institution.name+' '+institution.location)}&output=embed`} className="w-full h-72 border-0" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Similar Institutions</h4>
            <div className="space-y-4">
              {related.map(r => (
                <button key={r.id} onClick={() => navigate('education-detail', Category.EducationAndSkills, r.id)} className="w-full text-left p-3 bg-white/2 rounded-lg flex items-center gap-3">
                  <div className="w-16 h-12 bg-gray-800 rounded overflow-hidden">{r.image && <img src={r.image} alt={r.name} className="w-full h-full object-cover" />}</div>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-gray-400">{r.location}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center pb-12">
          <button onClick={() => navigate('directory', 'EDUCATION & INSTITUTIONS')} className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-semibold">Explore Education →</button>
        </div>
      </div>
    </div>
  );
};

export default EducationDetail;
