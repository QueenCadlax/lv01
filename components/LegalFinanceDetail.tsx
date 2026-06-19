import React, { useMemo, useState } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Award,
  Briefcase,
} from 'lucide-react';
import { Business } from '../types';

interface LegalFinanceDetailProps {
  id?: string;
  navigate: (view: string, category?: string, id?: string) => void;
  businesses: Business[];
}

interface MockProfessional {
  id: string;
  name: string;
  type: string;
  specialization: string;
  description: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  services: string[];
  expertise: string;
  established?: number;
  verified?: boolean;
  trustPoints?: string[];
  clientProfile?: string[];
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  galleryImages?: string[];
}

const LegalFinanceDetail: React.FC<LegalFinanceDetailProps> = ({ id, navigate, businesses }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = ['overview', 'services', 'industries', 'about'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the professional
  const professional = useMemo(() => {
    const mockProfessionals: MockProfessional[] = [
      {
        id: 'du-toit-smuts-partners',
        name: 'Du Toit-Smuts & Partners Attorneys',
        type: 'Full Service Law Firm',
        specialization: 'Corporate, Property & Commercial Law',
        description: 'One of the largest and most established law firms in Mpumalanga, serving private, corporate and government clients since 1976.',
        rating: 4.9,
        reviewCount: 178,
        location: 'Mbombela',
        image: 'https://www.facebook.com/photo.php?fbid=745462050914924&set=pb.100063534074721.-2207520000&type=3',
        galleryImages: [
          'https://www.facebook.com/photo.php?fbid=745462050914924&set=pb.100063534074721.-2207520000&type=3',
          'https://www.dtsmp.co.za/wp-content/uploads/2023/08/bee-compliant-final-231x300.png',
          'https://www.dtsmp.co.za/wp-content/uploads/2023/08/bee-compliant-final-231x300.png',
          'https://www.dtsmp.co.za/wp-content/uploads/2023/08/bee-compliant-final-231x300.png'
        ],
        services: [
          'Property Law & Conveyancing',
          'Corporate Advisory',
          'Litigation & Dispute Resolution',
          'Commercial Contracts',
          'Government Legal Services',
          'Banking Law'
        ],
        expertise: 'Heritage law firm with 50 years of institutional-grade legal services. Full-service firm handling complex transactions, litigation, and advisory matters for banks, government departments, property developers, and major enterprises across Southern Africa.',
        established: 1976,
        verified: true,
        trustPoints: [
          'Founded in 1976 • 50 years of continuous practice',
          'Largest law firm in Mpumalanga region',
          'Trusted by major banks and government',
          'Full-service legal expertise across all practice areas',
          'Institutional-grade client base and reputation'
        ],
        clientProfile: ['Banks', 'Government Departments', 'Property Developers', 'Large Enterprises', 'SMEs', 'Individuals'],
        address: 'Law Chambers, Van Niekerk Street, Mbombela, Mpumalanga',
        phone: '013 745 3200',
        email: 'library@dtsmp.co.za',
        website: 'www.dtsmp.co.za'
      },
    ];

    return mockProfessionals.find((p) => p.id === id);
  }, [id]);

  // Gallery images - rotate through related images
  const galleryImages = [
    professional?.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507842217343-583f20270319?w=800&h=600&fit=crop',
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  // Scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!professional) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl font-serif text-white mb-4">Professional Not Found</h1>
          <button
            onClick={() => navigate('legal-finance')}
            className="px-6 py-3 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors"
          >
            ← Back to Directory
          </button>
        </div>
      </div>
    );
  }

  const isPlatinum = professional.tier === 'platinum';
  const isElite = professional.tier === 'elite';

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 relative">
      {/* Subtle background gradient overlay - institutional polish */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Back Button - Refined micro-interaction */}
        <button
          onClick={() => navigate('legal-finance')}
          className="mb-12 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-all duration-300 text-xs font-light tracking-widest uppercase group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="group-hover:tracking-widest transition-all">Back</span>
        </button>

        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION — TWO COLUMN LAYOUT
            Gallery (Square) on Left | Text on Right
            ═══════════════════════════════════════════════════════════════ */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-start">
          {/* GALLERY - SQUARE FORMAT (Left Side) - Billion Dollar Photography */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-yellow-400/30 shadow-2xl shadow-black/50 group">
            {/* Subtle scan-line effect overlay - luxury detail */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none opacity-30" />
            
            <img
              src={professional.galleryImages?.[currentImageIndex] || galleryImages[currentImageIndex]}
              alt={professional.name}
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://www.dtsmp.co.za/wp-content/uploads/2023/08/bee-compliant-final-231x300.png'; }}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            
            {/* Corner accent - fine detail */}
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-yellow-400/60" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-yellow-400/60" />
            
            {/* Left Arrow - Premium micro-interaction */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-yellow-400/30 text-yellow-400 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Right Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-yellow-400/30 text-yellow-400 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Image Counter - Refined badge */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs px-4 py-1.5 rounded-full border border-yellow-400/20 font-light tracking-widest">
              {currentImageIndex + 1} / {professional.galleryImages?.length || galleryImages.length}
            </div>
          </div>

          {/* HERO TEXT - RIGHT SIDE */}
          <div className="flex flex-col justify-start space-y-10">
            {/* LEVEL 1: IDENTITY (DOMINANT) */}
            <div className="space-y-4">
              <h1 className="text-5xl font-light text-white leading-tight tracking-tight">{professional.name}</h1>
              <p className="text-lg text-yellow-400 font-light">{professional.specialization}</p>
              <p className="text-sm text-gray-400 font-light tracking-wide">
                {professional.location} · Established {professional.established} · <span className="text-yellow-400">✓ Verified</span>
              </p>
            </div>

            {/* LEVEL 2: POSITIONING (SECONDARY) */}
            <p className="text-sm text-gray-300 font-light leading-relaxed max-w-sm">
              Institutional legal firm serving corporate, government, and private clients across Southern Africa.
            </p>

            {/* LEVEL 3: ACTION (CTA ROW) */}
            <div className="flex gap-2 flex-wrap pt-4">
              <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-sm font-light transition-all duration-300 text-xs tracking-widest uppercase shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:translate-y-[-2px] active:translate-y-0">
                Call
              </button>
              <button className="px-4 py-2 bg-transparent text-yellow-400 rounded-sm font-light transition-all duration-300 text-xs tracking-widest uppercase border border-yellow-400 hover:bg-yellow-400/10 hover:shadow-lg hover:shadow-yellow-400/10 hover:translate-y-[-2px] active:translate-y-0">
                Email
              </button>
              <button className="px-4 py-2 bg-transparent text-yellow-400 rounded-sm font-light transition-all duration-300 text-xs tracking-widest uppercase border border-yellow-400 hover:bg-yellow-400/10 hover:shadow-lg hover:shadow-yellow-400/10 hover:translate-y-[-2px] active:translate-y-0">
                Consult
              </button>
              <button className="px-4 py-2 bg-transparent text-white rounded-sm font-light transition-all duration-300 text-xs tracking-widest uppercase border border-white/40 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-400/10">
                Website
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SNAPSHOT STRIP — REPLACES SERVICES HEADER
            ═══════════════════════════════════════════════════════════════ */}
        
        <div className="mb-20 pt-16 border-t border-yellow-400/20 relative">
          {/* Subtle accent bar */}
          <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-yellow-400 to-transparent" />
          
          <div className="space-y-4">
            <p className="text-xs text-yellow-400 font-light tracking-widest uppercase">A Legacy Built Since 1976</p>
            <p className="text-sm text-gray-300 font-light leading-relaxed max-w-2xl">
              Du Toit-Smuts & Partners Attorneys has grown from a local practice in Mbombela into one of Mpumalanga's most recognized legal institutions, trusted by financial institutions, government departments, property developers, businesses and private clients across the region.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            EXPERTISE GRID — PURE CAPABILITY (NO HEADER, NO DESCRIPTION)
            ═══════════════════════════════════════════════════════════════ */}
        
        <div className="mb-20 pt-16 border-t border-yellow-400/20 relative">
          {/* Subtle accent bar */}
          <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-yellow-400 to-transparent" />
          
          <p className="text-xs text-yellow-400 font-light tracking-widest uppercase mb-8">Areas of Practice</p>
          
          <div className="grid grid-cols-2 gap-8 max-w-2xl">
            {[
              'Mergers & Acquisitions',
              'Corporate Advisory',
              'Property Law',
              'Commercial Contracts',
              'Litigation',
              'Banking Law',
              'Government Services',
              'Conveyancing'
            ].map((service, idx) => (
              <div key={idx} className="group cursor-pointer">
                <p className="text-sm text-white font-light group-hover:text-yellow-400 transition-colors duration-300">
                  {service}
                </p>
                <div className="h-px w-0 bg-gradient-to-r from-yellow-400 to-transparent group-hover:w-full transition-all duration-500 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TRUST LINE (SINGLE, STRONG)
            ═══════════════════════════════════════════════════════════════ */}
        
        <div className="mb-20 pt-16 border-t border-yellow-400/20 relative">
          {/* Subtle accent bar */}
          <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-yellow-400 to-transparent" />
          
          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-2xl">
            Trusted by banks, government institutions, property developers, enterprises, SMEs, and private clients.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            CONTACT — STRUCTURED, INSTITUTIONAL
            ═══════════════════════════════════════════════════════════════ */}
        
        <div className="pt-16 border-t border-yellow-400/20 relative">
          {/* Subtle accent bar */}
          <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-yellow-400 to-transparent" />
          
          <p className="text-xs text-yellow-400 font-light tracking-widest uppercase mb-8">Contact the Firm</p>
          
          <div className="space-y-10 mb-8 max-w-2xl">
            {/* Office */}
            <div>
              <p className="text-xs text-gray-500 font-light tracking-widest uppercase mb-2">Office</p>
              <p className="text-sm text-white font-light">Law Chambers, Van Niekerk Street</p>
              <p className="text-sm text-white font-light mb-3">Mbombela, Mpumalanga</p>
              <a href="#map" className="text-yellow-400 hover:text-yellow-300 font-light text-xs tracking-widest uppercase transition-all duration-300 hover:translate-x-1 inline-block">
                View on Map →
              </a>
            </div>
            
            {/* Telephone */}
            <div>
              <p className="text-xs text-gray-500 font-light tracking-widest uppercase mb-2">Telephone</p>
              <a href={`tel:${professional.phone}`} className="text-sm text-white font-light hover:text-yellow-400 transition-colors duration-300">
                {professional.phone}
              </a>
            </div>
            
            {/* Email */}
            <div>
              <p className="text-xs text-gray-500 font-light tracking-widest uppercase mb-2">Email</p>
              <a href={`mailto:${professional.email}`} className="text-sm text-white font-light hover:text-yellow-400 transition-colors duration-300">
                {professional.email}
              </a>
            </div>
            
            {/* Website */}
            <div>
              <p className="text-xs text-gray-500 font-light tracking-widest uppercase mb-2">Website</p>
              <a href={`https://${professional.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-white font-light hover:text-yellow-400 transition-colors duration-300">
                {professional.website}
              </a>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <a href={`tel:${professional.phone}`} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-sm font-light transition-all duration-300 text-xs tracking-widest uppercase shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:translate-y-[-2px] active:translate-y-0">
              Call
            </a>
            <a href={`mailto:${professional.email}`} className="px-4 py-2 bg-transparent text-yellow-400 rounded-sm font-light transition-all duration-300 text-xs tracking-widest uppercase border border-yellow-400 hover:bg-yellow-400/10 hover:shadow-lg hover:shadow-yellow-400/10 hover:translate-y-[-2px] active:translate-y-0">
              Email
            </a>
            <a href={`https://${professional.website}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-transparent text-white rounded-sm font-light transition-all duration-300 text-xs tracking-widest uppercase border border-white/40 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-400/10">
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalFinanceDetail;
