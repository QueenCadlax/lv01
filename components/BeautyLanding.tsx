import React from 'react';
import { BeautyIcon } from './CategoryIcons';

type Props = {
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
};

export default function BeautyLanding({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-[#FAF8F6] text-[#181818]">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1600"
          alt="Luxury spa editorial"
          className="object-cover w-full h-full brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAF8F6]/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-3xl text-center p-6">
            <h1 className="text-5xl md:text-7xl font-serif font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>LOWVELD BEAUTY</h1>
            <p className="text-xl md:text-2xl text-[#333] mb-6">Glow. Relax. Indulge.</p>
            <p className="text-base md:text-lg text-[#444] mb-8">Discover the region's finest salons, spas, clinics and wellness experiences.</p>
            <button
              onClick={() => navigate('directory', undefined)}
              className="px-8 py-3 rounded-full bg-[#C9A86A] text-black font-semibold shadow-lg hover:brightness-95 transition"
            >
              Explore Beauty
            </button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-32 relative z-20">
        {/* Section 1 - Book Your Next Self-Care Day */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif mb-4">Book Your Next Self-Care Day</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Luxury Spa Escape',
                blurb: '90+ treatments • Massage • Facial • Sauna',
                cta: 'Book →',
                image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200',
              },
              {
                title: 'Hair Transformation',
                blurb: 'Braids • Colour • Extensions',
                cta: 'Explore →',
                image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
              },
              {
                title: 'Medical Aesthetics',
                blurb: 'Skin • Botox • Laser',
                cta: 'View Clinics →',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
              },
            ].map((card) => (
              <article key={card.title} className="rounded-2xl bg-white shadow-md overflow-hidden">
                <div className="h-56 md:h-72 bg-gray-200">
                  <img src={card.image} alt={card.title} className="object-cover w-full h-full" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{card.blurb}</p>
                  <button onClick={() => navigate('directory', undefined)} className="text-sm font-medium text-[#C9A86A]">{card.cta}</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 2 - The Beauty Collection */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif mb-4">The Beauty Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Luxury Spas', subtitle: 'Find your perfect escape', cta: 'Explore →', image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=1400' },
              { title: 'Hair Studios', subtitle: 'Colour specialists & premium salons', cta: 'Explore →', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1400' },
              { title: 'Nail Studios', subtitle: 'Modern manicures and nail art', cta: 'Explore →', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1400' },
              { title: 'Skin Clinics', subtitle: 'Professional skincare and treatments', cta: 'Explore →', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400' },
            ].map((g) => (
              <div key={g.title} className="rounded-2xl overflow-hidden bg-white shadow-sm">
                <img src={g.image} alt={g.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-1">{g.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{g.subtitle}</p>
                  <button onClick={() => navigate('directory', undefined)} className="px-4 py-2 rounded bg-[#C9A86A] text-black font-semibold">{g.cta}</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 - Trending This Week */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif mb-4">Trending This Week</h2>
          <div className="overflow-x-auto no-scrollbar flex gap-4 py-2">
            {[
              { name: 'The Glow Room', treatment: 'Hydra Facial', image: 'https://images.unsplash.com/photo-1544455760-3b6a9d0b7b6b?auto=format&fit=crop&q=80&w=800' },
              { name: 'Maison Hair', treatment: 'Luxury Blowout', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800' },
              { name: 'Botanical Spa', treatment: 'Couples Massage', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800' },
            ].map((t) => (
              <div key={t.name} className="min-w-[260px] bg-white rounded-2xl shadow-md overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-600">{t.treatment}</p>
                  <button onClick={() => navigate('business-detail', undefined, 'beauty_placeholder')} className="mt-3 text-sm text-[#C9A86A] font-medium">Book Treatment →</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 - Browse Beauty (icons) */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif mb-4">Browse Beauty</h2>
          <div className="flex gap-4 overflow-x-auto py-3 no-scrollbar">
            {['Spa','Hair','Nails','Skin','Makeup','Brows & Lashes','Wellness','Fitness','Yoga','Aesthetics'].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2 px-4">
                <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-2xl">{s === 'Spa' ? '💆' : s === 'Hair' ? '💇' : s === 'Nails' ? '💅' : s === 'Skin' ? '✨' : s === 'Makeup' ? '💄' : s === 'Brows & Lashes' ? '👁' : s === 'Wellness' ? '🌿' : s === 'Fitness' ? '🏋️' : s === 'Yoga' ? '🧘' : '🩺'}</div>
                <div className="text-sm text-gray-700">{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 - Featured Beauty Destinations */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif mb-4">Featured Beauty Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'The Sanctuary Spa', desc: 'Luxury countryside spa • Private suites • Infinity pool • Signature massages', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1400' },
              { name: 'Maison Hair Studio', desc: 'Luxury colour, extensions & signature styling', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1400' },
            ].map((d) => (
              <div key={d.name} className="rounded-3xl overflow-hidden bg-white shadow-lg">
                <img src={d.image} alt={d.name} className="w-full h-80 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{d.name}</h3>
                  <p className="text-gray-600 mb-4">{d.desc}</p>
                  <button onClick={() => navigate('business-detail', undefined, 'beauty_placeholder')} className="px-5 py-3 rounded bg-[#C9A86A] text-black font-semibold">Book Experience →</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 - Before & After */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif mb-4">Before & After</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Hair transformation', before: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600', after: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=600' },
              { title: 'Skin treatment', before: 'https://images.unsplash.com/photo-1544455760-3b6a9d0b7b6b?auto=format&fit=crop&q=80&w=600', after: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600' },
              { title: 'Nail redesign', before: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=600', after: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="grid grid-cols-2">
                  <img src={item.before} alt="before" className="object-cover w-full h-56" />
                  <img src={item.after} alt="after" className="object-cover w-full h-56" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">{item.title}</h4>
                  <button onClick={() => navigate('directory', undefined)} className="mt-2 text-sm text-[#C9A86A]">View Gallery</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7 - Beauty Stories */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif mb-4">Beauty Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'The Best Spas in Mpumalanga', cta: 'Read →' },
              { title: '10 Bridal Makeup Artists', cta: 'Read →' },
              { title: 'Luxury Hair Salons Worth Visiting', cta: 'Read →' },
              { title: 'Winter Skincare Guide', cta: 'Read →' },
            ].map((s) => (
              <article key={s.title} className="rounded-lg bg-white p-6 shadow-sm">
                <h4 className="font-semibold mb-3">{s.title}</h4>
                <p className="text-sm text-gray-600 mb-4">Short teaser text designed to be SEO-friendly and magazine-like. Creates strong editorial signals.</p>
                <button onClick={() => navigate('stories')} className="text-[#C9A86A] font-medium">{s.cta}</button>
              </article>
            ))}
          </div>
        </section>

        {/* Section 8 - Wellness Escapes */}
        <section className="mb-24">
          <h2 className="text-3xl font-serif mb-4">Wellness Escapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Weekend Spa Retreats', blurb: 'Mountain spas • Hot stone massages • Nature experiences', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1400' },
              { title: 'Cinematic Wellness Journeys', blurb: 'Curated spa & nature packages', image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=1400' },
            ].map((w) => (
              <div key={w.title} className="rounded-3xl overflow-hidden bg-white shadow-lg">
                <img src={w.image} alt={w.title} className="w-full h-72 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{w.title}</h3>
                  <p className="text-gray-600 mb-4">{w.blurb}</p>
                  <button onClick={() => navigate('directory', undefined)} className="px-4 py-2 rounded bg-[#C9A86A] text-black font-semibold">Explore →</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
