import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { Business } from '../types';

interface EducationCardProps {
  institution: Business;
  onViewProfile: (id: string) => void;
}

// Extract a single, human-friendly institution type
const getInstitutionType = (institution: Business): string => {
  const sub = institution.subcategory?.toUpperCase() || '';
  if (sub.includes('UNIVERSITY')) return 'University';
  if (sub.includes('COLLEGE')) return 'Private College';
  if (sub.includes('TECHNICAL') || sub.includes('TRAINING')) return 'Training Centre';
  if (sub.includes('PRIMARY')) return 'Primary School';
  if (sub.includes('SECONDARY')) return 'Secondary School';
  if (sub.includes('TUTOR')) return 'Tutoring Academy';
  return 'Independent School';
};

const EducationCard: React.FC<EducationCardProps> = ({ institution, onViewProfile }) => {
  const institutionType = getInstitutionType(institution);
  const verified = institution.isVerified;

  return (
    <div
      role="button"
      onClick={() => onViewProfile(institution.id)}
      className="group flex flex-col bg-black rounded-2xl overflow-hidden border border-white/6 hover:shadow-lg hover:shadow-black/40 transform transition-transform duration-300 hover:-translate-y-1.5"
      style={{ minHeight: 320 }}
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-gray-900">
        <img
          src={institution.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop'}
          alt={institution.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Verified badge (subtle) */}
        {verified && (
          <div className="absolute left-3 bottom-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-[#D4AF37] font-semibold">✓ VERIFIED</div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{institutionType}</div>
          <h3 className="text-lg font-serif font-semibold text-white leading-tight mb-3 line-clamp-2">{institution.name}</h3>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-[#D4AF37]/70" />
            <span>{institution.location}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProfile(institution.id);
            }}
            className="text-sm text-[#D4AF37] font-medium inline-flex items-center gap-2 hover:underline"
          >
            View Profile
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
