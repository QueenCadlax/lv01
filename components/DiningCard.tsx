import React from 'react';
import { Phone, MessageCircle, Instagram, Facebook, Globe } from 'lucide-react';
import { GOLD, PANEL_BLACK, BORDER, TEXT_WHITE, TEXT_MUTED } from './designTokens';

type LocationShape = any;

interface Props {
  item: any; // Eatery or Business
  isPlatinum?: boolean;
  onReserve?: () => void;
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

export default function DiningCard({ item, isPlatinum, onReserve }: Props) {
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
    <div style={{ borderRadius: 24, overflow: 'hidden', border: `1px solid rgba(212,175,55,0.06)`, padding: 28, background: `linear-gradient(180deg, rgba(11,11,11,0.6), ${PANEL_BLACK})` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: TEXT_WHITE, marginBottom: 4 }}>{item.name}</div>
          <div style={{ color: TEXT_MUTED, marginBottom: 6 }}>{typeof item.location === 'string' ? item.location : `${item.location?.area || ''} · ${item.location?.city || ''}`}</div>
          <div style={{ color: isOpenNow ? OPEN_GREEN : CLOSED_RED, fontSize: 13, fontWeight: 700 }}>{isOpenNow ? 'Open Daily' : 'Closed'}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <button onClick={onReserve} style={{ background: GOLD, color: '#000', padding: '12px 20px', borderRadius: 12, fontWeight: 800, fontSize: 16 }}>Reserve a Table</button>
          <a href={(item.contactOptions?.website || item.website || '#')} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>Website →</a>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
        <a href={`tel:${item.contactOptions?.call || ''}`} className="inline-flex items-center gap-3" style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', color: TEXT_WHITE, border: '1px solid rgba(255,255,255,0.03)', minWidth: 140 }}>
          <Phone size={16} color={TEXT_WHITE} /> <div style={{ fontWeight: 700 }}>Call</div>
        </a>

        <a href={`https://wa.me/${(item.contactOptions?.call || '').replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3" style={{ padding: '10px 14px', borderRadius: 12, background: 'transparent', color: TEXT_WHITE, border: '1px solid rgba(255,255,255,0.03)', minWidth: 140 }}>
          <MessageCircle size={16} color={TEXT_WHITE} /> <div style={{ fontWeight: 700 }}>WhatsApp</div>
        </a>

        <a href={'https://www.instagram.com/'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3" style={{ padding: '10px 14px', borderRadius: 12, background: 'transparent', color: TEXT_WHITE, border: '1px solid rgba(255,255,255,0.03)', minWidth: 140 }}>
          <Instagram size={16} color={TEXT_WHITE} /> <div style={{ fontWeight: 700 }}>Instagram</div>
        </a>

        <a href={mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3" style={{ padding: '10px 14px', borderRadius: 12, background: 'transparent', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.03)', minWidth: 140 }}>
          <Globe size={16} color={TEXT_WHITE} /> <div style={{ fontWeight: 700 }}>Directions</div>
        </a>
      </div>

      <div style={{ marginTop: 6, paddingTop: 12, borderTop: `1px solid rgba(255,255,255,0.02)` }}>
        <div style={{ color: TEXT_MUTED, fontSize: 13, marginBottom: 6 }}>Need assistance? Contact our concierge for bespoke requests, private dining and events.</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '8px 12px', borderRadius: 10, background: 'transparent', color: GOLD, border: `1px solid rgba(212,175,55,0.06)`, fontWeight: 700 }}>Concierge →</button>
          <a href={mapUrl} target="_blank" rel="noreferrer" style={{ padding: '8px 12px', borderRadius: 10, background: 'transparent', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.03)', fontWeight: 700 }}>Directions →</a>
        </div>
      </div>
    </div>
  );
}
