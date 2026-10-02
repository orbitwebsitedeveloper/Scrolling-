/**
 * AgentMartinSection
 * Recreates the exact design inspiration from WA_1790919342259.png:
 * - Brand geometric monogram logo
 * - "MEET YOUR AGENT" kicker + giant editorial serif "Martin"
 * - Circular portrait of agent Martin with gold accent ring and live badge
 * - "Luxury Real Estate Specialist" subtitle & social buttons (Facebook, Instagram, Phone, Mail)
 * - 4 interactive portfolio cards:
 *     01: Cliffside Estate (Malibu, California)
 *     02: Oceanview Villa (Miami, Florida)
 *     03: Hillside Mansion (Beverly Hills, California)
 *     04: Waterfront Residence (Palm Beach, Florida)
 * - Direct consultation modal to schedule private viewings with Martin
 */

import React, { useState } from 'react';
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  Calendar,
  X,
  Check,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Star,
} from 'lucide-react';

import martinPortrait from '@/src/assets/images/agent_martin_portrait_1790919567086.jpg';
import imgCliffside from '@/src/assets/images/user_03_cliffside_villa_1790917821486.jpg';
import imgOceanview from '@/src/assets/images/user_04_terrace_glide_1790917833950.jpg';
import imgHillside from '@/src/assets/images/estate_exterior_facade_1790917401381.jpg';
import imgWaterfront from '@/src/assets/images/estate_infinity_terrace_1790917438724.jpg';

interface AgentMartinSectionProps {
  scrollProgress: number;
  onNavigateHome: () => void;
  onNavigateNext: () => void;
}

export default function AgentMartinSection({
  scrollProgress,
  onNavigateHome,
  onNavigateNext,
}: AgentMartinSectionProps) {
  const [selectedProperty, setSelectedProperty] = useState<null | {
    id: string;
    num: string;
    title: string;
    location: string;
    price: string;
    beds: string;
    baths: string;
    sqft: string;
    image: string;
  }>(null);

  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [consultDate, setConsultDate] = useState('');
  const [consultName, setConsultName] = useState('');
  const [consultContact, setConsultContact] = useState('');

  // Physical scrolling calculation for Section 3 (Agent Martin):
  // Starts below viewport (+100vh) at progress 0.38
  // Scrolls UP into view (0vh) between 0.38 and 0.54
  // Rests in center from 0.54 to 0.65
  // Scrolls UP off the screen (-105vh) between 0.65 and 0.78
  let translateY = 100; // in vh
  let opacity = 0;

  if (scrollProgress >= 0.36 && scrollProgress <= 0.80) {
    if (scrollProgress < 0.54) {
      // Entering from bottom
      const enterFraction = Math.max(0, (scrollProgress - 0.36) / (0.54 - 0.36));
      const eased = 1 - Math.pow(1 - enterFraction, 3);
      translateY = 100 - eased * 100;
      opacity = Math.min(enterFraction * 1.5, 1);
    } else if (scrollProgress <= 0.65) {
      // Centered view
      const lingerFraction = (scrollProgress - 0.54) / (0.65 - 0.54);
      translateY = -lingerFraction * 5;
      opacity = 1;
    } else {
      // Exiting off top
      const exitFraction = Math.min(1, (scrollProgress - 0.65) / (0.78 - 0.65));
      const eased = Math.pow(exitFraction, 2.2);
      translateY = -5 - eased * 100;
      opacity = Math.max(0, 1 - exitFraction * 1.3);
    }
  } else if (scrollProgress > 0.80) {
    translateY = -110;
    opacity = 0;
  } else {
    translateY = 110;
    opacity = 0;
  }

  const isHidden = opacity <= 0.01;

  const properties = [
    {
      id: '01',
      num: '01',
      title: 'Cliffside Estate',
      location: 'Malibu, California',
      price: '$34,500,000',
      beds: '6 Beds',
      baths: '8 Baths',
      sqft: '14,200 Sq. Ft.',
      image: imgCliffside,
    },
    {
      id: '02',
      num: '02',
      title: 'Oceanview Villa',
      location: 'Miami, Florida',
      price: '$26,800,000',
      beds: '5 Beds',
      baths: '7 Baths',
      sqft: '11,500 Sq. Ft.',
      image: imgOceanview,
    },
    {
      id: '03',
      num: '03',
      title: 'Hillside Mansion',
      location: 'Beverly Hills, California',
      price: '$42,000,000',
      beds: '7 Beds',
      baths: '10 Baths',
      sqft: '16,800 Sq. Ft.',
      image: imgHillside,
    },
    {
      id: '04',
      num: '04',
      title: 'Waterfront Residence',
      location: 'Palm Beach, Florida',
      price: '$29,900,000',
      beds: '5 Beds',
      baths: '6 Baths',
      sqft: '12,300 Sq. Ft.',
      image: imgWaterfront,
    },
  ];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultSubmitted(false);
      setIsConsultModalOpen(false);
      setConsultName('');
      setConsultContact('');
      setConsultDate('');
    }, 2000);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-150 p-4 sm:p-8 md:p-10 flex flex-col justify-between ${
          isHidden ? 'opacity-0 select-none' : 'opacity-100'
        }`}
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}vh, 0)`,
          willChange: 'transform, opacity',
        }}
      >
        {/* ========================================================================= */}
        {/* TOP SECTION: Monogram Logo + Meet Your Agent Martin Profile               */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-6 pointer-events-auto">
          <div className="max-w-xl">
            {/* Geometric Luxury Monogram Logo (Matching reference design top-left) */}
            <div
              onClick={onNavigateHome}
              className="flex items-center gap-3 cursor-pointer group mb-5"
              title="Return to top"
            >
              <div className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center p-2 group-hover:border-amber-400 transition-colors shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F5C518"
                  strokeWidth="2"
                  className="w-full h-full"
                >
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                  <path d="M12 12l8-5M12 12v10M12 12L4 7" stroke="rgba(255,255,255,0.7)" />
                </svg>
              </div>
            </div>

            {/* Agent Header with Circular Portrait of Martin */}
            <div className="flex items-center gap-5 sm:gap-6">
              {/* Circular Portrait Image of Agent Martin with Gold Ring */}
              <div
                onClick={() => setIsConsultModalOpen(true)}
                className="relative group cursor-pointer shrink-0"
                title="Book Consultation with Martin"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xl shadow-black/60 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-black">
                    <img
                      src={martinPortrait}
                      alt="Martin - Luxury Real Estate Specialist"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Verified specialist badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center text-black" title="Verified Specialist">
                  <ShieldCheck size={13} className="text-black stroke-[3]" />
                </div>
              </div>

              {/* Agent Title & Name */}
              <div>
                <p className="text-amber-300 text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm font-sans">
                  MEET YOUR AGENT
                </p>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal leading-tight text-white font-serif tracking-tight drop-shadow-md">
                  Martin
                </h2>
              </div>
            </div>

            {/* Subtle Divider Line & Role */}
            <div className="mt-4 flex items-center gap-3">
              <span className="w-10 h-[1.5px] bg-amber-400" />
              <p className="text-white/85 text-xs sm:text-sm font-light tracking-wide font-sans">
                Luxury Real Estate Specialist
              </p>
            </div>

            {/* Social & Contact Actions */}
            <div className="mt-4 flex items-center gap-2.5">
              <a
                href="#facebook"
                onClick={(e) => {
                  e.preventDefault();
                  setIsConsultModalOpen(true);
                }}
                className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-amber-300 hover:border-amber-400 transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>

              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  setIsConsultModalOpen(true);
                }}
                className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-amber-300 hover:border-amber-400 transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>

              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="ml-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide hover:bg-white/20 hover:border-white/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar size={13} className="text-amber-300" />
                <span>Schedule Private Appointment</span>
              </button>
            </div>
          </div>

          {/* Top Right: Agent Credentials Card */}
          <div className="hidden md:flex flex-col items-end gap-1.5 text-right p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 max-w-xs shadow-xl">
            <div className="flex items-center gap-1 text-amber-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-amber-300 text-amber-300" />
              ))}
              <span className="text-xs font-semibold text-white ml-1.5 font-mono">5.0</span>
            </div>
            <p className="text-xs text-white/90 font-medium">Over $1.2B in Closed Coastal Acquisitions</p>
            <p className="text-[11px] text-white/60 font-light">Direct Line: +1 (310) 902-8400</p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION: 4 Curated Property Portfolio Cards                        */}
        {/* ========================================================================= */}
        <div className="w-full pt-6 pointer-events-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
            {properties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => setSelectedProperty(prop)}
                className="group relative h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm cursor-pointer shadow-xl hover:border-amber-400/60 hover:shadow-amber-400/10 transition-all duration-300 flex flex-col justify-between p-4"
              >
                {/* Background Image with Hover Zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                  />
                  {/* Subtle Gradient Shade for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
                </div>

                {/* Top Badge: Number */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90 tracking-wider">
                    {prop.num}
                  </span>

                  {/* Sparkle accent on 04 */}
                  {prop.id === '04' && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-amber-300/80 animate-pulse"
                    >
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                  )}
                </div>

                {/* Bottom Details */}
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-serif text-white group-hover:text-amber-300 transition-colors drop-shadow-sm">
                    {prop.title}
                  </h3>
                  <p className="text-[11px] text-white/70 font-light mt-0.5 font-sans">
                    {prop.location}
                  </p>

                  {/* Social / Action Icons matching reference */}
                  <div className="mt-3 flex items-center gap-2 pt-2 border-t border-white/15">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white">
                      <Facebook size={11} />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white">
                      <Instagram size={11} />
                    </div>
                    <span className="ml-auto text-[10px] text-white/50 group-hover:text-amber-300 flex items-center gap-1 font-mono">
                      <span>View</span>
                      <ExternalLink size={10} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PROPERTY PREVIEW MODAL                                                    */}
      {/* ========================================================================= */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/15 rounded-3xl overflow-hidden text-white shadow-2xl">
            <div className="relative h-64 sm:h-72 w-full">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-black/40" />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-amber-300 text-xs uppercase tracking-widest font-mono font-semibold">
                    {selectedProperty.location}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif mt-1">
                    {selectedProperty.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/50 block font-sans">Offered at</span>
                  <span className="text-xl sm:text-2xl font-mono font-medium text-white">
                    {selectedProperty.price}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-center font-mono text-xs">
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-sans">Bedrooms</span>
                  <span className="text-white font-medium">{selectedProperty.beds}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-sans">Bathrooms</span>
                  <span className="text-white font-medium">{selectedProperty.baths}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-sans">Interior</span>
                  <span className="text-white font-medium">{selectedProperty.sqft}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    onNavigateNext();
                  }}
                  className="text-xs text-white/60 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Interior Walkthrough</span>
                  <ArrowRight size={12} />
                </button>

                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    setIsConsultModalOpen(true);
                  }}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-amber-300 transition-colors cursor-pointer shadow-lg"
                >
                  Schedule Showing with Martin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIRECT CONSULTATION WITH MARTIN MODAL                                     */}
      {/* ========================================================================= */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0c0c0c] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400 shrink-0">
                  <img
                    src={martinPortrait}
                    alt="Martin"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-serif">Consult with Martin</h3>
                  <p className="text-xs text-amber-300/80">Direct Confidential Advisory</p>
                </div>
              </div>
              <button
                onClick={() => setIsConsultModalOpen(false)}
                className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {consultSubmitted ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mb-4">
                  <Check size={24} />
                </div>
                <h4 className="text-lg font-serif">Appointment Requested</h4>
                <p className="text-xs text-white/60 mt-1 max-w-xs">
                  Martin's private office will reach out to confirm your private showing window.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Jonathan Sterling"
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="jonathan@domain.com or +1 (310) ..."
                    value={consultContact}
                    onChange={(e) => setConsultContact(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Preferred Date & Time Window
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Tomorrow afternoon or Weekend"
                    value={consultDate}
                    onChange={(e) => setConsultDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-amber-300 transition-colors cursor-pointer shadow-lg"
                  >
                    Confirm Private Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
