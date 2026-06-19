import React from 'react';
import { X } from 'lucide-react';

// A lightweight car/vehicle modal template — returns to auto/car template
const CarModal: React.FC<{ open: boolean; onClose: () => void; car?: any }> = ({ open, onClose, car }) => {
  if (!open) return null;

  const gold = '#C9A24D';
  const BG = '#000000';
  const PANEL = '#0B0B0B';
  const TEXT = '#FFFFFF';
  const MUTED = '#8B8B8B';

  // Default placeholder car if none provided
  const vehicle = car || {
    title: '2022 Mercedes-Benz S-Class',
    subtitle: 'S 450 L — Luxury • Automatic • 3.0L V6',
    price: 'R1,199,000',
    location: 'Mbombela',
    images: ['https://via.placeholder.com/800x500?text=Car+Image+1', 'https://via.placeholder.com/800x500?text=Car+Image+2'],
    description: 'A meticulously maintained S-Class with full service history, premium leather and the latest driver assistance features.',
    features: ['Full Service History', 'Leather Seats', 'Sunroof', 'Adaptive Cruise', 'Lane Assist', 'Apple CarPlay']
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(201,162,77,0.08)' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="text-sm" style={{ color: MUTED }}>{vehicle.title}</div>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-white/5 transition" aria-label="Close">
              <X color={gold} />
            </button>
          </div>

          {/* Body: Gallery + Specs */}
          <div className="px-6 py-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left: image */}
              <div className="w-full rounded-md overflow-hidden" style={{ background: PANEL }}>
                <img src={vehicle.images[0]} alt={vehicle.title} style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }} />
                <div className="flex gap-2 p-3 bg-black/30">
                  {vehicle.images.map((src: string, i: number) => (
                    <img key={i} src={src} alt={`thumb-${i}`} style={{ width: 72, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid rgba(255,255,255,0.03)' }} />
                  ))}
                </div>
              </div>

              {/* Right: details */}
              <div>
                <div style={{ color: gold, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Vehicle</div>
                <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6, fontFamily: 'serif' }}>{vehicle.title}</h2>
                <div style={{ color: MUTED, marginBottom: 12 }}>{vehicle.subtitle} · {vehicle.location}</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: gold }}>{vehicle.price}</div>
                  <div style={{ color: MUTED, fontSize: 13 }}>Condition: Used • Mileage: 48,000 km</div>
                </div>

                <p style={{ color: TEXT, marginBottom: 12 }}>{vehicle.description}</p>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ color: gold, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Features</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {vehicle.features.map((f: string) => (
                      <div key={f} style={{ height: 34, padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,162,77,0.08)', color: '#F5F3EE', fontSize: 12, textTransform: 'none', display: 'inline-flex', alignItems: 'center' }}>{f}</div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href={`tel:+27130000000`} className="px-4 py-2 rounded-md font-semibold" style={{ background: gold, color: '#0b0b0b' }}>Contact Seller</a>
                  <button className="px-4 py-2 rounded-md font-semibold" style={{ border: '1px solid rgba(255,255,255,0.04)', color: gold, background: 'transparent' }}>Request Test Drive</button>
                  <button className="px-3 py-2 rounded-md font-medium" style={{ color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.02)' }}>View Gallery</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
