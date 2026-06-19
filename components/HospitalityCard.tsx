import React from 'react';
import { Phone, MessageCircle, Mail, Globe } from 'lucide-react';
import { GOLD, PANEL_BLACK, BORDER, TEXT_WHITE, TEXT_MUTED } from './designTokens';

interface Props {
  item: any;
  isPlatinum?: boolean;
  onRequest?: () => void;
}

const OPEN_GREEN = '#2ECC71';
const CLOSED_RED = '#E74C3C';

function buildMapUrl(item: any) {
  try {
    const lat = item.location?.lat;
    const lng = item.location?.lng;
    if (lat && lng) return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const parts: string[] = [];
    if (typeof item.location === 'string') parts.push(item.location);
    else {
      if (item.location?.address) parts.push(item.location.address);
      if (item.location?.area) parts.push(item.location.area);
      if (item.location?.city) parts.push(item.location.city);
    }
    parts.push('Mbombela');
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(parts.filter(Boolean).join(' '));
  } catch (e) {
    return 'https://www.google.com/maps';
  }
}

export default function HospitalityCard({ item, isPlatinum, onRequest }: Props) {
  const isOpenNow = (() => {
    const businessHours = item.businessHours || {
      Mon: { open: '11:00', close: '23:00' },
      Tue: { open: '11:00', close: '23:00' },
      Wed: { open: '11:00', close: '23:00' },
      Thu: { open: '11:00', close: '00:00' },
      Fri: { open: '11:00', close: '01:00' },
      Sat: { open: '09:00', close: '01:00' },
      Sun: { open: '09:00', close: '23:00' },
    };
    try {
      const now = new Date();
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
      const hours = businessHours[day as keyof typeof businessHours];
      if (!hours) return false;
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      return currentTime >= hours.open && currentTime <= hours.close;
    } catch (e) {
      return false;
    }
  })();

  const mapUrl = buildMapUrl(item);

  return (
    <div style={{ borderRadius: 24, overflow: 'hidden', border: `1px solid rgba(201,162,77,0.15)`, padding: 20, background: PANEL_BLACK }}>
      {/* Price / rate top */}
      <div style={{ color: GOLD, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{item.priceLevel || item.rate || item.price || 'From R12,800'}</div>
      <div className="text-sm" style={{ color: TEXT_MUTED, marginBottom: 12 }}>per night • Verified availability</div>

      <button onClick={onRequest} className="w-full px-6 py-4 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-3" style={{ background: GOLD, color: '#000000', marginBottom: 12, fontSize: 15, border: 'none' }}>
        Request to Book
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a href={`https://wa.me/${(item.contactOptions?.call || '').replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="w-full py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2" style={{ border: `1px solid ${GOLD}`, color: GOLD, background: 'transparent' }}>
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>
        <a href={`tel:${item.contactOptions?.call || ''}`} className="w-full py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2" style={{ border: `1px solid ${GOLD}`, color: GOLD, background: 'transparent' }}>
          <Phone size={16} />
          <span>Call</span>
        </a>
        <a href={`mailto:${item.contactOptions?.email || ''}`} className="w-full py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2" style={{ border: `1px solid ${GOLD}`, color: GOLD, background: 'transparent' }}>
          <Mail size={16} />
          <span>Message</span>
        </a>
      </div>

      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid rgba(255,255,255,0.02)` }}>
        <div style={{ color: TEXT_MUTED, fontSize: 13, marginBottom: 6 }}>Need assistance? Our hospitality concierge can coordinate private dining and bespoke experiences.</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '8px 12px', borderRadius: 10, background: 'transparent', color: GOLD, border: `1px solid rgba(201,162,77,0.06)`, fontWeight: 700 }}>Concierge →</button>
          <a href={(item.contactOptions?.website || item.website || '#')} target="_blank" rel="noreferrer" style={{ padding: '8px 12px', borderRadius: 10, background: 'transparent', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.03)', fontWeight: 700 }}>Details →</a>
        </div>
      </div>
    </div>
  );
}
