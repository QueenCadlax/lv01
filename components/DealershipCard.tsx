import React from 'react';
import { MapPin, Car, Crown } from 'lucide-react';

interface Dealership {
  banner?: string;
  logo?: string;
  name?: string;
  location?: string;
  isPremium?: boolean;
}

const DealershipCard: React.FC<{ dealership: Dealership }> = ({ dealership }) => {
  return (
    <div className="group relative glass-card rounded-xl overflow-hidden cursor-pointer h-72 w-full md:w-80 flex-shrink-0 border border-white/10 hover:border-gold-500/50 transition-all">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
      <div className="absolute inset-0">
        {dealership.banner && (
          <>
            <img
              src={dealership.banner}
              alt={dealership.name}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </>
        )}
      </div>

      {dealership.isPremium && (
        <div className="absolute top-0 right-0 p-3 z-20">
          <div className="bg-gold-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-gold-500/20 flex items-center gap-1">
            <Crown size={12} /> PREMIUM PARTNER
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center z-20 transition-transform duration-300 group-hover:-translate-y-2">
        <div className="w-16 h-16 rounded-full border-2 border-gold-500/50 overflow-hidden mb-3 bg-black shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300">
          {dealership.logo && <img src={dealership.logo} alt="Logo" className="w-full h-full object-cover" />}
        </div>
        <h3 className="text-xl font-serif text-white group-hover:text-gold-400 transition-colors relative z-10">{dealership.name}</h3>
        <div className="flex items-center gap-1 text-gold-500 text-xs mb-1">
          <MapPin size={12} /> {dealership.location}
        </div>
        <div className="flex gap-1 text-gray-300 text-[10px] tracking-widest uppercase mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
          <Car size={12} /> View Details
        </div>
      </div>
    </div>
  );
};

export default DealershipCard;
