import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin, ArrowLeft, Heart, Share2, MapPinIcon, Phone, Mail, Globe, Clock, Shield, Crosshair, Activity, Brain } from 'lucide-react';
import { Business } from '../types';

interface MockDoctor {
  id: string;
  name: string;
  specialty: string;
  specializations: string[];
  qualifications: Array<{ title: string; institution: string }>;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  image: string;
  images: string[];
  phone?: string;
  phone2?: string;
  email?: string;
  website?: string;
  description: string;
  yearsExperience: number;
  practiceLocations: Array<{
    name: string;
    address: string;
    city: string;
  }>;
  hours?: string;
  testimonials: Array<{ name: string; text: string; rating: number }>;
}

interface HealthDetailProps {
  id: string;
  navigate: (view: string, category?: string, id?: string) => void;
}

const HealthDetailV2: React.FC<HealthDetailProps> = ({ id, navigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const treatmentServices = [
    { name: 'Radiation Therapy', icon: Shield },
    { name: 'Chemotherapy', icon: Activity },
    { name: 'Immunotherapy', icon: Brain },
    { name: 'Nuclear Medicine', icon: Crosshair },
    { name: 'Stereotactic Radiosurgery', icon: Crosshair },
  ];

  const doctors: MockDoctor[] = [
    {
      id: 'b_dr_joseph_oncology',
      name: 'Dr Joseph Mthombeni',
      specialty: 'Specialist Radiation & Clinical Oncologist',
      specializations: [
        'Prostate Cancer',
        'Breast Cancer',
        'Lung Cancer',
        'Brain Tumours',
        'Gastrointestinal Oncology',
        'Gynaecological Oncology',
        'Paediatric Oncology',
        'Musculoskeletal Oncology',
        'Ocular Oncology',
      ],
      qualifications: [
        { title: 'FC Rad Onc (SA)', institution: 'College of Radiation & Clinical Oncologists of South Africa' },
        { title: 'MMed Radiation Oncology', institution: 'University of the Free State' },
        { title: 'MBChB', institution: 'Sefako Makgatho University' },
      ],
      rating: 4.9,
      reviews: 47,
      location: 'Mbombela',
      verified: true,
      image: 'https://drjmoncology.co.za/storage/2023/10/dr-jospeh-mthombeni-profile.png',
      images: ['https://drjmoncology.co.za/storage/2023/10/dr-jospeh-mthombeni-profile.png'],
      phone: '+27 13 880 2039',
      phone2: '+27 81 484 0239',
      email: 'info@drjmoncology.co.za',
      website: 'drjmoncology.co.za',
      description: 'Dr Joseph Mthombeni is a Specialist Radiation and Clinical Oncologist with a special interest in the diagnosis and management of prostate cancer. His practice focuses on comprehensive cancer care through radiation therapy, chemotherapy, immunotherapy and advanced oncology treatment planning while preserving quality of life.',
      yearsExperience: 12,
      hours: 'Monday – Friday: 08:00 – 16:30',
      practiceLocations: [
        { name: 'Main Practice', address: 'Unit 01, 24 Russell Street', city: 'Mbombela' },
        { name: 'Sessional Rooms', address: 'Hoedspruit Medical Centre', city: 'Hoedspruit' },
      ],
      testimonials: [
        { name: 'Alice Ndlovu', text: 'Compassionate and highly professional', rating: 5 },
      ],
    },
  ];

  const doctor = doctors.find((d) => d.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!doctor) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Specialist not found</h2>
          <button
            onClick={() => navigate('health')}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Back to Specialists
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % doctor.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + doctor.images.length) % doctor.images.length);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* NAVIGATION BAR */}
      <div className="sticky top-0 z-40 bg-black border-b border-yellow-400/20">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => navigate('health')}
            className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      {/* HERO SECTION WITH IMAGE */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black pt-12 pb-24">
        {/* BACKGROUND GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-black pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT: PROFESSIONAL IMAGE - MAGAZINE COVER STYLE */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* IMAGE FRAME WITH LUXURY STYLING */}
                <div className="relative bg-black rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl border border-yellow-400/20">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  {/* SUBTLE OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* FLOATING CREDENTIALS CARD */}
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-800 to-black border border-yellow-400/30 rounded-xl p-6 shadow-xl max-w-xs">
                  <div className="text-xs font-medium text-yellow-400 mb-2 tracking-wider">SPECIALIST ONCOLOGIST</div>
                  <p className="text-sm font-light text-white">FC Rad Onc (SA)</p>
                  <p className="text-xs text-gray-400 mt-2">Fellow of the College of Radiation & Clinical Oncologists</p>
                </div>
              </div>
            </div>

            {/* RIGHT: HERO CONTENT */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* LUXURY BADGE */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full border border-yellow-400/40 w-fit">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-yellow-400 tracking-wider">LOWVELDHUB VERIFIED</span>
              </div>

              {/* NAME - MAGAZINE HEADLINE */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-7xl font-light text-white leading-tight tracking-tight">
                  {doctor.name}
                </h1>
              </div>

              {/* SPECIALTY - PREMIUM STYLING */}
              <div className="space-y-4 border-l-4 border-yellow-400 pl-6">
                <p className="text-2xl font-light text-gray-100 leading-relaxed">
                  {doctor.specialty}
                </p>
              </div>

              {/* AT A GLANCE - AUTHORITY SECTION */}
              <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-6 space-y-3">
                <p className="text-xs font-medium text-yellow-400 tracking-wider">AT A GLANCE</p>
                <div className="space-y-2 text-sm text-white font-light">
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-yellow-400 rounded-full" />Radiation & Clinical Oncology Specialist</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-yellow-400 rounded-full" />FC Rad Onc (SA) | MMed Radiation Oncology</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-yellow-400 rounded-full" />Prostate Cancer Specialist</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-yellow-400 rounded-full" />Serving Mpumalanga, Eswatini & Mozambique</p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-3 pt-2">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">{doctor.location}, Mpumalanga</p>
                  <p className="text-sm text-gray-400 mt-1">Regional Coverage: Southern Africa</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button className="px-8 py-3 bg-yellow-400 text-black rounded-lg font-medium hover:bg-white transition-colors flex-1 sm:flex-none">
                  Request Consultation
                </button>
                <button className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-lg font-medium hover:bg-yellow-400/10 transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-none">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>

              {/* SOCIAL ACTIONS - HERO TOP RIGHT */}
              <div className="flex gap-2 pt-2 -mx-1">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="p-2 hover:bg-yellow-400/10 rounded-lg transition-colors"
                  title="Save Profile"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`} />
                </button>
                <button
                  className="p-2 hover:bg-yellow-400/10 rounded-lg transition-colors"
                  title="Share Profile"
                >
                  <Share2 className="w-4 h-4 text-gray-500 hover:text-yellow-400" />
                </button>
                <button
                  className="p-2 hover:bg-yellow-400/10 rounded-lg transition-colors"
                  title="Directions"
                >
                  <MapPinIcon className="w-4 h-4 text-gray-500 hover:text-yellow-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* QUOTE SECTION - COMPACT LUXURY */}
          <section className="py-12 lg:py-16 border-y border-yellow-400/20">
            <blockquote className="text-center space-y-4">
              <p className="text-lg lg:text-xl font-light text-white leading-relaxed tracking-tight">
                There is a <span className="text-yellow-400 font-medium">"can"</span> in cancer because we can beat it.
              </p>
              <p className="text-xs text-gray-400 font-light tracking-wider">— DR JOSEPH MTHOMBENI</p>
            </blockquote>
          </section>

          {/* WHY LOWVELDHUB RECOMMENDS - CURATION NOT LISTING */}
          <section className="space-y-8 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl p-12">
            <div>
              <p className="text-xs font-medium text-yellow-400 tracking-wider mb-4">LOWVELDHUB INSIGHT</p>
              <h2 className="text-3xl font-light text-white">Why We Recommend This Specialist</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  <span className="text-yellow-400 font-medium">Fellowship-trained specialist</span> with advanced credentials from the College of Radiation & Clinical Oncologists
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  <span className="text-yellow-400 font-medium">Advanced oncology expertise</span> across multiple cancer types with specialized focus on prostate cancer management
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  <span className="text-yellow-400 font-medium">Multi-location practice</span> with established presence in Mbombela and Hoedspruit for regional accessibility
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  <span className="text-yellow-400 font-medium">Serving Southern Africa</span> with cross-border expertise across Mpumalanga, Eswatini, and Mozambique
                </p>
              </div>
            </div>
          </section>

          {/* PROFESSIONAL PROFILE SECTION */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-white">Professional Profile</h2>
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              {doctor.description}
            </p>
          </section>

          {/* AREAS OF EXPERTISE - LUXURY CHIPS */}
          <section className="space-y-8">
            <h2 className="text-3xl font-light text-white">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {doctor.specializations.map((spec, idx) => (
                <div
                  key={idx}
                  className="px-5 py-2.5 bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 rounded-full text-sm font-light hover:bg-yellow-400/20 hover:border-yellow-400/60 transition-all cursor-default"
                >
                  {spec}
                </div>
              ))}
            </div>
          </section>

          {/* TREATMENT SERVICES - WITH ICONS */}
          <section className="space-y-8">
            <h2 className="text-3xl font-light text-white">Treatment Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatmentServices.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 border-2 border-yellow-400/30 rounded-xl hover:border-yellow-400 hover:bg-yellow-400/5 transition-all bg-black/50 group"
                  >
                    <IconComponent className="w-6 h-6 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-white font-light text-base leading-relaxed">{service.name}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PROFESSIONAL QUALIFICATIONS */}
          <section className="space-y-8">
            <h2 className="text-3xl font-light text-white">Professional Qualifications</h2>
            <div className="space-y-6">
              {doctor.qualifications.map((qual, idx) => (
                <div key={idx} className="border-l-4 border-yellow-400 pl-6 bg-yellow-400/5 p-6 rounded-r-lg hover:bg-yellow-400/10 transition-colors">
                  <h3 className="text-lg font-light text-white mb-2">{qual.title}</h3>
                  <p className="text-gray-400 text-sm font-light">{qual.institution}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PRACTICE LOCATIONS WITH MAP INTEGRATION */}
          <section className="space-y-8">
            <h2 className="text-3xl font-light text-white">Practice Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {doctor.practiceLocations.map((location, idx) => (
                <div key={idx} className="space-y-4">
                  {/* LOCATION CARD */}
                  <div className="border-2 border-yellow-400/30 rounded-lg p-8 hover:border-yellow-400 hover:bg-yellow-400/5 transition-colors bg-black/50">
                    <h3 className="text-lg font-light text-white mb-6">{location.name}</h3>
                    <div className="space-y-3 text-gray-400 text-sm font-light mb-6">
                      <p className="text-white font-light">{location.address}</p>
                      <p>{location.city}, South Africa</p>
                    </div>
                    <button className="text-sm font-light text-yellow-400 hover:text-yellow-300 flex items-center gap-2 transition-colors">
                      View on Google Maps
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* EMBEDDED MAP - PLACEHOLDER */}
                  <div className="w-full h-64 rounded-lg border border-yellow-400/20 bg-gray-900/50 flex items-center justify-center overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyANKZCWVzR_J8_8Ysqb0TgKW8UQO7I-6B4&q=${encodeURIComponent(location.address + ', ' + location.city)}`}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT SECTION - CONCIERGE LEVEL */}
          <section className="space-y-8">
            <h2 className="text-3xl font-light text-white">Book a Consultation</h2>
            <div className="space-y-6">
              <p className="text-gray-300 font-light">Need to speak with Dr Mthombeni's practice?</p>
              
              {/* CONTACT ACTIONS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CALL */}
                <a
                  href={`tel:${doctor.phone}`}
                  className="group p-6 border border-yellow-400/20 rounded-lg bg-black/50 hover:bg-yellow-400/10 hover:border-yellow-400/40 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400 mb-1">Call Practice</p>
                      <p className="text-white font-light">{doctor.phone}</p>
                    </div>
                  </div>
                </a>

                {/* WHATSAPP */}
                <button className="group p-6 border border-yellow-400/20 rounded-lg bg-black/50 hover:bg-yellow-400/10 hover:border-yellow-400/40 transition-all text-left">
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400 mb-1">WhatsApp</p>
                      <p className="text-white font-light">Quick message to practice</p>
                    </div>
                  </div>
                </button>

                {/* EMAIL */}
                <a
                  href={`mailto:${doctor.email}`}
                  className="group p-6 border border-yellow-400/20 rounded-lg bg-black/50 hover:bg-yellow-400/10 hover:border-yellow-400/40 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400 mb-1">Email Practice</p>
                      <p className="text-white font-light text-sm truncate">{doctor.email}</p>
                    </div>
                  </div>
                </a>

                {/* WEBSITE */}
                <a
                  href={`https://${doctor.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 border border-yellow-400/20 rounded-lg bg-black/50 hover:bg-yellow-400/10 hover:border-yellow-400/40 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <Globe className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400 mb-1">Visit Website</p>
                      <p className="text-white font-light text-sm">{doctor.website}</p>
                    </div>
                  </div>
                </a>
              </div>

              {/* PRACTICE HOURS CARD */}
              <div className="mt-8 p-8 border-l-4 border-yellow-400 bg-yellow-400/5 rounded-r-lg">
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-400 mb-3">PRACTICE HOURS</p>
                    <p className="text-white font-light text-lg mb-2">{doctor.hours}</p>
                    <p className="text-sm text-gray-400 font-light">Closed Weekends & Public Holidays</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER SPACING */}
      <div className="h-12" />
    </div>
  );
};

export default HealthDetailV2;
