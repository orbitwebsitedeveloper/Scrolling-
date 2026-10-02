/**
 * CliffsideEleganceSection
 * Recreates the exact design inspiration from WA_1790918771782.jpg:
 * - Outer rounded architectural boundary frame
 * - Top navigation bar: Monogram + Segmented nav pills + Utility actions + "Enquire Now ->"
 * - Huge subtle "O C E A N O R A" watermark typography
 * - Left hero text: "CLIFFSIDE LUXURY", "Where Elegance Meets the Ocean", dual CTAs
 * - Right stacked glassmorphic cards: Panoramic Views, World Class Design, Concierge Service
 * - Bottom 4-column frosted glass stats dock: 12+ Residences, 30,000+ Sq. Ft, 180° Views, 24/7 Concierge
 * - Fully interactive: "View Residences" modal, "Enquire Now" modal, video toggle, and smooth navigation
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  Pause,
  Eye,
  Diamond,
  Bell,
  X,
  Check,
  Send,
  SlidersHorizontal,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ambientSound } from '@/src/utils/audio';

interface CliffsideEleganceSectionProps {
  scrollProgress: number;
  onNavigateHome: () => void;
  onNavigateNext: () => void;
  onWatchVideo: () => void;
  isPlaying: boolean;
}

export default function CliffsideEleganceSection({
  scrollProgress,
  onNavigateHome,
  onNavigateNext,
  onWatchVideo,
  isPlaying,
}: CliffsideEleganceSectionProps) {
  const [activeTab, setActiveTab] = useState<'Home' | 'About' | 'Residences' | 'Lifestyle' | 'Gallery' | 'Contact'>('Residences');
  const [isResidencesModalOpen, setIsResidencesModalOpen] = useState(false);
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(true);
  const [enquirySent, setEnquirySent] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    residence: 'Villa Solaris (12,500 sq.ft)',
    message: '',
  });

  // Section visibility based on scroll progress:
  // Active between 0.16 and 0.48 scroll progress
  // Fades in gently around 0.15, stays crisp until 0.44, fades out by 0.50
  const startRange = 0.16;
  const endRange = 0.46;
  let opacity = 0;

  if (scrollProgress >= 0.14 && scrollProgress <= 0.48) {
    if (scrollProgress < startRange) {
      // Fade in
      opacity = (scrollProgress - 0.14) / (startRange - 0.14);
    } else if (scrollProgress > endRange) {
      // Fade out
      opacity = 1 - (scrollProgress - endRange) / (0.48 - endRange);
    } else {
      opacity = 1;
    }
  }

  const isHidden = opacity <= 0.01;
  const translateY = Math.sin((scrollProgress - 0.3) * Math.PI) * -15; // gentle float

  const handleToggleSound = () => {
    const active = ambientSound.toggle();
    setIsSoundMuted(!active);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
    setTimeout(() => {
      setEnquirySent(false);
      setIsEnquireModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        residence: 'Villa Solaris (12,500 sq.ft)',
        message: '',
      });
    }, 2000);
  };

  return (
    <>
      {/* Elegance Section Layer */}
      <div
        className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-500 p-3 sm:p-5 md:p-6 ${
          isHidden ? 'opacity-0 select-none' : 'opacity-100'
        }`}
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}px, 0)`,
        }}
      >
        {/* Outer Architectural Border Frame (Matches WA_1790918771782.jpg) */}
        <div className="relative w-full h-full rounded-[24px] sm:rounded-[32px] border border-white/20 overflow-hidden flex flex-col justify-between p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-[0.5px]">
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40 rounded-tl-[24px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-[24px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-[24px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40 rounded-br-[24px] pointer-events-none" />

          {/* Huge Subtle Watermark Background Typography: "O C E A N O R A" */}
          <div className="absolute top-16 sm:top-20 left-0 right-0 flex justify-center items-center pointer-events-none select-none overflow-hidden z-0">
            <span className="text-white/[0.12] font-sans font-light tracking-[0.24em] text-6xl sm:text-8xl md:text-[11rem] lg:text-[13.5rem] leading-none whitespace-nowrap drop-shadow-sm">
              OCEANORA
            </span>
          </div>

          {/* ========================================================================= */}
          {/* TOP BAR: Monogram + Segmented Nav Pill + Utility Icons + "Enquire Now ->" */}
          {/* ========================================================================= */}
          <header className="relative z-20 w-full flex items-center justify-between gap-3 pointer-events-auto">
            {/* Left: Custom Architectural Monogram Logo */}
            <div
              onClick={onNavigateHome}
              className="flex items-center gap-3 cursor-pointer group"
              title="Return to Introduction"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2 group-hover:bg-white/20 transition-all shadow-sm">
                {/* Architectural "A/O" Monogram Glyph */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-full h-full text-white"
                >
                  <path d="M12 2L4 20h3.5l2-5h5l2 5H20L12 2z" />
                  <path d="M10 13h4" />
                  <circle cx="12" cy="14" r="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                </svg>
              </div>
            </div>

            {/* Center: Segmented Frosted Glass Navigation Pill */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
              {(
                [
                  'Home',
                  'About',
                  'Residences',
                  'Lifestyle',
                  'Gallery',
                  'Contact',
                ] as const
              ).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      if (tab === 'Home') onNavigateHome();
                      if (tab === 'Residences' || tab === 'Gallery') setIsResidencesModalOpen(true);
                      if (tab === 'Contact') setIsEnquireModalOpen(true);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>

            {/* Right: Utility Controls & "Enquire Now ->" Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Sound Toggle */}
              <button
                onClick={handleToggleSound}
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                title={isSoundMuted ? 'Unmute Ambient Sound' : 'Mute Sound'}
                aria-label="Sound Toggle"
              >
                {isSoundMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* Residences Gallery View Button */}
              <button
                onClick={() => setIsResidencesModalOpen(true)}
                className="hidden sm:flex w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                title="View Architectural Collections"
                aria-label="Collections"
              >
                <SlidersHorizontal size={15} />
              </button>

              {/* Primary "Enquire Now" Pill Button with Dark Circular Arrow Icon */}
              <button
                onClick={() => setIsEnquireModalOpen(true)}
                className="group px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-slate-900 font-medium text-xs sm:text-sm tracking-tight flex items-center gap-2.5 hover:bg-white/95 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span>Enquire Now</span>
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={11} />
                </div>
              </button>
            </div>
          </header>

          {/* ========================================================================= */}
          {/* MAIN BODY: Left Hero Typography + Right Stacked Glass Feature Cards       */}
          {/* ========================================================================= */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 my-auto pt-6 sm:pt-4 pointer-events-auto">
            {/* Left Hero Text Block */}
            <div className="max-w-xl text-left">
              {/* Gold Kicker */}
              <p className="text-amber-300 text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-3 drop-shadow-sm font-sans">
                CLIFFSIDE LUXURY
              </p>

              {/* Main Headline (High-Contrast Clean Editorial) */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-tight text-white font-serif drop-shadow-md">
                Where Elegance <br />
                Meets the Ocean
              </h2>

              {/* Description Paragraph */}
              <p className="mt-4 sm:mt-5 text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-md font-sans">
                A rare collection of oceanfront residences crafted for those who value timeless design and exceptional living.
              </p>

              {/* Dual Action Buttons */}
              <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4">
                {/* View Residences Button */}
                <button
                  onClick={() => setIsResidencesModalOpen(true)}
                  className="group px-6 py-3 rounded-full bg-white text-slate-950 font-semibold text-xs sm:text-sm tracking-tight flex items-center gap-3 hover:bg-slate-100 active:scale-95 transition-all shadow-lg cursor-pointer"
                >
                  <span>View Residences</span>
                  <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight size={12} />
                  </div>
                </button>

                {/* Watch Video Button */}
                <button
                  onClick={onWatchVideo}
                  className="group px-5 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium flex items-center gap-2.5 hover:border-white/50 hover:bg-black/60 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <div className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center text-white group-hover:border-white">
                    {isPlaying ? <Pause size={10} /> : <Play size={10} className="fill-white ml-0.5" />}
                  </div>
                  <span>{isPlaying ? 'Pause Experience' : 'Watch Video'}</span>
                </button>
              </div>
            </div>

            {/* Right: Stacked Frosted Glass Feature Cards (3 cards, exact match to WA_1790918771782.jpg) */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3.5 sm:gap-4 shrink-0">
              {/* Card 1: Panoramic Views */}
              <div
                onClick={() => setIsResidencesModalOpen(true)}
                className="group p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 w-full sm:w-64 lg:w-72 hover:border-white/40 hover:bg-black/55 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <div className="flex items-center gap-2.5 text-white/90 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
                    <Eye size={15} />
                  </div>
                  <h3 className="text-sm font-medium text-white tracking-tight">
                    Panoramic Views
                  </h3>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed pl-9">
                  Uninterrupted 180° horizon over the Pacific coastal bluffs.
                </p>
              </div>

              {/* Card 2: World Class Design */}
              <div
                onClick={() => setIsResidencesModalOpen(true)}
                className="group p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 w-full sm:w-64 lg:w-72 hover:border-white/40 hover:bg-black/55 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <div className="flex items-center gap-2.5 text-white/90 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
                    <Diamond size={15} />
                  </div>
                  <h3 className="text-sm font-medium text-white tracking-tight">
                    World Class Design
                  </h3>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed pl-9">
                  Award-winning architecture with seamless indoor-outdoor living.
                </p>
              </div>

              {/* Card 3: Concierge Service */}
              <div
                onClick={() => setIsEnquireModalOpen(true)}
                className="group p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 w-full sm:w-64 lg:w-72 hover:border-white/40 hover:bg-black/55 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <div className="flex items-center gap-2.5 text-white/90 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
                    <Bell size={15} />
                  </div>
                  <h3 className="text-sm font-medium text-white tracking-tight">
                    Concierge Service
                  </h3>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed pl-9">
                  Bespoke 24/7 private concierge for effortless living.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM DOCK: 4-Column Frosted Glass Stats Capsule Bar                     */}
          {/* ========================================================================= */}
          <div className="relative z-10 w-full pt-4 pointer-events-auto">
            <div className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 py-4 sm:py-5 px-6 sm:px-10 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
                {/* Metric 1 */}
                <div className="flex flex-col items-center justify-center px-3 pt-2 md:pt-0">
                  <span className="text-2xl sm:text-3xl font-light font-sans text-white tracking-tight">
                    12+
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/75 font-normal tracking-wide mt-0.5">
                    Exclusive Residences
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col items-center justify-center px-3 pt-2 md:pt-0">
                  <span className="text-2xl sm:text-3xl font-light font-sans text-white tracking-tight">
                    30,000+
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/75 font-normal tracking-wide mt-0.5">
                    Sq. Ft. Of Living Space
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col items-center justify-center px-3 pt-2 md:pt-0">
                  <span className="text-2xl sm:text-3xl font-light font-sans text-white tracking-tight">
                    180°
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/75 font-normal tracking-wide mt-0.5">
                    Oceanfront Views
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="flex flex-col items-center justify-center px-3 pt-2 md:pt-0">
                  <span className="text-2xl sm:text-3xl font-light font-sans text-white tracking-tight">
                    24/7
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/75 font-normal tracking-wide mt-0.5">
                    Private Concierge
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL 1: VIEW RESIDENCES SHOWCASE DRAWER                      */}
      {/* ========================================================================= */}
      {isResidencesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0c0c0c] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <p className="text-amber-300 text-xs tracking-widest uppercase font-semibold">
                  Exclusive Portfolio
                </p>
                <h3 className="text-2xl font-serif text-white mt-1">
                  The Cliffside Residences
                </h3>
              </div>
              <button
                onClick={() => setIsResidencesModalOpen(false)}
                className="p-2 text-white/60 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Residence Cards */}
            <div className="mt-6 space-y-4">
              {[
                {
                  title: 'Villa Solaris · Main Cliffside Estate',
                  specs: '6 Beds · 8 Baths · 12,500 Sq. Ft.',
                  highlight: 'Private 75ft Cantilevered Infinity Pool & Sunset Deck',
                  price: '$28,500,000',
                },
                {
                  title: 'The Horizon Penthouse Suite',
                  specs: '4 Beds · 5 Baths · 7,800 Sq. Ft.',
                  highlight: 'Rooftop Sky Lounge & 360° Pacific Vista',
                  price: '$18,200,000',
                },
                {
                  title: 'The Coral Pavilion Sanctuary',
                  specs: '5 Beds · 6 Baths · 9,200 Sq. Ft.',
                  highlight: 'Direct Ocean Access & Private Sub-Level Grotto',
                  price: '$22,000,000',
                },
              ].map((res, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-base font-medium text-white">{res.title}</h4>
                    <p className="text-xs text-white/60 mt-1 font-mono">{res.specs}</p>
                    <p className="text-xs text-amber-300/80 mt-1">{res.highlight}</p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                    <span className="text-sm font-semibold font-mono text-white">{res.price}</span>
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, residence: res.title }));
                        setIsResidencesModalOpen(false);
                        setIsEnquireModalOpen(true);
                      }}
                      className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-amber-300 transition-colors cursor-pointer"
                    >
                      Request Dossier
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span>Private viewings arranged strictly by appointment</span>
              <button
                onClick={() => {
                  setIsResidencesModalOpen(false);
                  onNavigateNext();
                }}
                className="text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Continue Interior Walkthrough</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL 2: ENQUIRE NOW MODAL                                    */}
      {/* ========================================================================= */}
      {isEnquireModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div>
                <p className="text-amber-300 text-xs tracking-widest uppercase font-semibold">
                  Private Concierge
                </p>
                <h3 className="text-xl font-serif text-white mt-1">
                  Enquire for Residence Dossier
                </h3>
              </div>
              <button
                onClick={() => setIsEnquireModalOpen(false)}
                className="p-2 text-white/60 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {enquirySent ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <Check size={24} />
                </div>
                <h4 className="text-lg font-serif">Inquiry Confirmed</h4>
                <p className="text-xs text-white/60 mt-1 max-w-xs">
                  Our private client director will contact you directly within 24 hours with full architectural portfolios.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Alexander Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Selected Residence of Interest
                  </label>
                  <select
                    value={formData.residence}
                    onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Villa Solaris (12,500 sq.ft)">Villa Solaris · Main Cliffside Estate ($28.5M)</option>
                    <option value="The Horizon Penthouse (7,800 sq.ft)">The Horizon Penthouse Suite ($18.2M)</option>
                    <option value="The Coral Pavilion (9,200 sq.ft)">The Coral Pavilion Sanctuary ($22.0M)</option>
                    <option value="Complete Estate Private Buyout">Complete Estate Private Acquisition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Special Requests / Preferred Timeline
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specific architectural requirements or confidential viewing schedule..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Transmit Private Enquiry</span>
                    <Send size={12} />
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
