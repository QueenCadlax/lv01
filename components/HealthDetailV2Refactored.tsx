import React, { useState, useEffect } from 'react';
import { Phone, Mail, Globe, MessageCircle, MapPin, Star, CheckCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Business } from '../types';

interface MockDoctor {
  id: string;
  name: string;
  specialty: string;
  type: string;
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
  specializations: string[];
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
}

interface HealthDetailProps {
  id: string;
  navigate: (view: string, category?: string, id?: string) => void;
}

const HealthDetailV2: React.FC<HealthDetailProps> = ({ id, navigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dr Joseph specializations and services
  const drJosephServices = [
    'Radiation Therapy',
    'Chemotherapy',
    'Immunotherapy',
    'Nuclear Medicine',
    'Brain Tumours',
    'Breast Cancer',
    'Lung Cancer',
    'Paediatric Cancer Care',
    'Gynaecology Oncology',
    'Gastrointestinal Oncology',
    'Musculoskeletal Oncology',
    'Ocular Oncology',
    'Stereotactic Radiosurgery',
  ];

  // Mock doctors data
  const doctors: MockDoctor[] = [
    {
      id: 'hp_smith_1',
      name: 'Dr. John Smith',
      specialty: 'General Practitioner',
      type: 'Family Medicine',
      rating: 4.9,
      reviews: 124,
      location: 'Mbombela',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e323692df62a?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1612349317150-e323692df62a?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160550-112173f31c77?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160750-a9f30e7cfe04?w=1200&h=900&fit=crop',
      ],
      phone: '+27 (13) 755-1001',
      email: 'dr.smith@health.co.za',
      website: 'www.drsmith.co.za',
      description: 'General practitioner with 15+ years of experience in family medicine. Dedicated to providing comprehensive healthcare services for all ages.',
      yearsExperience: 15,
      specializations: [
        'Family Medicine',
        'Preventive Care',
        'Chronic Disease Management',
        'Minor Surgery',
        'Vaccinations',
      ],
      testimonials: [
        {
          name: 'Maria Khumalo',
          text: 'Dr. Smith is incredibly professional and caring. He takes time to explain everything and truly listens to his patients. Highly recommended!',
          rating: 5,
        },
        {
          name: 'James Koekemoer',
          text: 'Best family doctor I\'ve had. Always available and gives excellent advice. The whole family sees him now.',
          rating: 5,
        },
        {
          name: 'Sophie Ndlovu',
          text: 'Very thorough in his examinations. Makes you feel comfortable and well taken care of. Great experience every time.',
          rating: 5,
        },
      ],
    },
    {
      id: 'b_dr_joseph_oncology',
      name: 'Dr Joseph Mthombeni',
      specialty: 'Specialist Radiation & Clinical Oncologist',
      type: 'Radiation & Clinical Oncology',
      rating: 4.9,
      reviews: 47,
      location: 'Mbombela',
      verified: true,
      image: 'https://drjmoncology.co.za/storage/2023/10/dr-jospeh-mthombeni-profile.png',
      images: [
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1631217314831-e48eab2d9b92?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1576091160675-112b8cc31e92?w=1200&h=900&fit=crop',
      ],
      phone: '+27 13 880 2039',
      phone2: '+27 81 484 0239',
      email: 'info@drjmoncology.co.za',
      website: 'drjmoncology.co.za',
      description: 'Dr Joseph Mthombeni is a Specialist Radiation and Clinical Oncologist with a special interest in the early diagnosis and management of prostate cancer. He provides comprehensive cancer care including radiation therapy, chemotherapy, immunotherapy and palliative care while focusing on preserving quality of life for every patient.',
      yearsExperience: 12,
      specializations: [
        'Radiation Therapy',
        'Clinical Oncology',
        'Cancer Diagnosis',
        'Chemotherapy',
        'Immunotherapy',
        'Treatment Planning',
        'Patient Consultation',
      ],
      testimonials: [
        {
          name: 'Alice Ndlovu',
          text: 'Dr. Mthombeni is compassionate and highly professional. He explained everything clearly and made me feel confident in my treatment plan. Truly excellent care.',
          rating: 5,
        },
        {
          name: 'Robert Steyn',
          text: 'Outstanding specialist. Dr. Mthombeni has the expertise and empathy needed for such critical care. Highly recommended.',
          rating: 5,
        },
        {
          name: 'Grace Mbatha',
          text: 'Best oncologist I could have asked for. Very knowledgeable, supportive, and always available for questions. Life-saving care!',
          rating: 5,
        },
      ],
    },
  ];

  const doctor = doctors.find((d) => d.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!doctor) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-white mb-4">Doctor not found</h2>
          <button
            onClick={() => navigate('health')}
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Back to Doctors
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
    <div className="pt-24 pb-12 min-h-screen bg-black">
      {/* Back Button */}
      <div className="container mx-auto px-6 mb-12">
        <button
          onClick={() => navigate('health')}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Specialists
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION - CLEAN HIERARCHY */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          {/* Doctor Name - LARGEST */}
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-3">
            {doctor.name}
          </h1>
          
          {/* Specialty - SECONDARY */}
          <p className="text-2xl text-yellow-400 font-semibold mb-6">
            {doctor.specialty}
          </p>

          {/* Location - SMALL MUTED */}
          <div className="flex items-center gap-2 text-gray-400 mb-8">
            <MapPin className="w-5 h-5 text-yellow-400/60" />
            <p>{doctor.location}, Mpumalanga</p>
          </div>

          {/* PRIMARY CTA BUTTONS - ONLY 2 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-serif font-bold rounded-lg transition-all shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40">
              Request Consultation
            </button>
            <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. QUICK STATS STRIP */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="border-y border-yellow-400/20 py-8 mb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-yellow-400 mb-1">12+</p>
              <p className="text-xs text-gray-400">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-serif font-bold text-white mb-1">FC Rad Onc</p>
              <p className="text-xs text-gray-400">Fellow Oncology</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-serif font-bold text-white mb-1">MMed Rad Onc</p>
              <p className="text-xs text-gray-400">Master's Degree</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-serif font-bold text-white mb-1">3 Regions</p>
              <p className="text-xs text-gray-400">Service Areas</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-serif font-bold text-yellow-400 mb-1">⭐ 4.9/5</p>
              <p className="text-xs text-gray-400">Patient Rated</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        {/* ════════════════════════════════════════════════════════════ */}
        {/* 3. ABOUT SECTION */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">About {doctor.name.split(' ')[doctor.name.split(' ').length - 1]}</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {doctor.description}
          </p>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* 4. CLINICAL SPECIALTIES */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-white mb-8">Clinical Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {doctor.specializations.map((spec, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-400/10 to-transparent border border-yellow-400/30 rounded-lg hover:border-yellow-400/60 transition-all">
                <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                <p className="text-white font-semibold">{spec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* 5. TREATMENT MODALITIES */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-white mb-8">Treatment Modalities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drJosephServices.map((service, idx) => (
              <div key={idx} className="group relative bg-gradient-to-br from-black to-gray-900 border border-yellow-400/20 rounded-lg p-5 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 flex-shrink-0" />
                  <p className="text-white font-semibold text-sm group-hover:text-yellow-300 transition-colors">{service}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* 6. PRACTICE LOCATIONS */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-white mb-8">Practice Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Main Practice</h3>
              <p className="text-gray-300 text-sm mb-4">Mbombela</p>
              <p className="text-gray-400 text-xs">Unit 01, 24 Russell Street</p>
            </div>
            <div className="border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Sessional Rooms</h3>
              <p className="text-gray-300 text-sm mb-4">Hoedspruit</p>
              <p className="text-gray-400 text-xs">Available by appointment</p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* 7. QUALIFICATIONS */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-white mb-8">Professional Qualifications</h2>
          <div className="space-y-4">
            <div className="border border-white/10 rounded-lg p-6 hover:border-yellow-400/30 transition-colors">
              <p className="text-xs text-gray-400 font-semibold tracking-wide mb-2 uppercase">FC Rad Onc (SA)</p>
              <p className="text-white font-semibold">College of Radiation & Clinical Oncologists of South Africa</p>
            </div>
            <div className="border border-white/10 rounded-lg p-6 hover:border-yellow-400/30 transition-colors">
              <p className="text-xs text-gray-400 font-semibold tracking-wide mb-2 uppercase">MMed Radiation Oncology</p>
              <p className="text-white font-semibold">University of the Free State</p>
            </div>
            <div className="border border-white/10 rounded-lg p-6 hover:border-yellow-400/30 transition-colors">
              <p className="text-xs text-gray-400 font-semibold tracking-wide mb-2 uppercase">MBChB</p>
              <p className="text-white font-semibold">Sefako Makgatho University</p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* 8. CONTACT PANEL */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section>
          <div className="border-2 border-yellow-400/30 rounded-lg p-8 bg-gradient-to-br from-black to-gray-900">
            <h2 className="text-2xl font-serif font-bold text-white mb-8">Get In Touch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase mb-2">Phone</p>
                  <a href={`tel:${doctor.phone}`} className="text-xl text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">{doctor.phone}</a>
                  {doctor.phone2 && (
                    <>
                      <p className="text-gray-500 text-sm mt-1">or</p>
                      <a href={`tel:${doctor.phone2}`} className="text-lg text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">{doctor.phone2}</a>
                    </>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase mb-2">Email</p>
                  <a href={`mailto:${doctor.email}`} className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors break-all">{doctor.email}</a>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase mb-2">Website</p>
                  <a href={`https://${doctor.website}`} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">{doctor.website}</a>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase mb-4">Practice Hours</p>
                <div className="bg-black/40 rounded-lg p-6 border border-yellow-400/20">
                  <p className="text-white font-semibold mb-2">Monday – Friday</p>
                  <p className="text-3xl font-serif font-bold text-yellow-400">08:00 – 16:30</p>
                  <p className="text-xs text-gray-400 mt-4">Closed Weekends & Public Holidays</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-serif font-bold rounded-lg transition-all">Request Consultation</button>
              <button className="flex-1 px-6 py-3 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HealthDetailV2;
