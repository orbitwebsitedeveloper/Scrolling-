/**
 * AboutUsModal
 * A comprehensive, luxury editorial "About Us" page/modal for Oceanora.
 * Features:
 * - Stunning Hero section with background architectural image and dark gradient overlay
 * - Overall background: Rich dark gradient with frosted glassmorphism effect (backdrop-blur-2xl, ambient glowing halos, translucent borders)
 * - Tabs for Our Story, Philosophy, Leadership (featuring Agent Martin), and Milestones
 * - Glassmorphic feature cards and direct interaction triggers
 */

import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ShieldCheck,
  Compass,
  Award,
  Sparkles,
  Layers,
  MapPin,
  CheckCircle2,
  Calendar,
  Building2,
  TrendingUp,
  Globe2,
} from 'lucide-react';

import martinPortrait from '@/src/assets/images/agent_martin_portrait_1790919567086.jpg';
import imgCliffside from '@/src/assets/images/user_03_cliffside_villa_1790917821486.jpg';
import imgLiving from '@/src/assets/images/estate_living_pavilion_1790917427402.jpg';
import imgFacade from '@/src/assets/images/estate_exterior_facade_1790917401381.jpg';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreResidences: () => void;
  onBookConsultation: () => void;
}

export default function AboutUsModal({
  isOpen,
  onClose,
  onExploreResidences,
  onBookConsultation,
}: AboutUsModalProps) {
  const [activeTab, setActiveTab] = useState<'story' | 'philosophy' | 'leadership' | 'milestones'>('story');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl transition-all animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container with Gradient Background & Glassmorphism Effect */}
      <div className="relative z-10 w-full max-w-5xl h-[92vh] bg-gradient-to-br from-[#16161a]/95 via-[#0c0c0e]/95 to-[#060608]/98 backdrop-blur-2xl border border-white/20 rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col text-white">
        {/* Ambient Subtle Luminous Gradients behind glass */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* ========================================================================= */}
        {/* TOP HEADER: Monogram, Title, Nav Tabs & Close Button                      */}
        {/* ========================================================================= */}
        <header className="relative z-20 shrink-0 px-6 sm:px-10 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl border border-amber-400/50 flex items-center justify-center p-2 bg-amber-500/15 shadow-sm shadow-amber-500/20">
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
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-white font-sans">
                OCEANORA
              </span>
              <span className="text-[10px] text-amber-300 tracking-widest uppercase block font-mono">
                About Our Atelier
              </span>
            </div>
          </div>

          {/* Navigation Tabs (Frosted Pill) */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 backdrop-blur-md border border-white/15 text-xs shadow-inner">
            {(
              [
                { id: 'story', label: 'Our Story' },
                { id: 'philosophy', label: 'Philosophy' },
                { id: 'leadership', label: 'Leadership' },
                { id: 'milestones', label: 'Milestones' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-black font-medium shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close About Us"
          >
            <X size={20} />
          </button>
        </header>

        {/* Mobile Tab Pill Bar */}
        <div className="flex md:hidden items-center justify-around p-2 border-b border-white/10 bg-black/60 backdrop-blur-md text-xs shrink-0 overflow-x-auto">
          {(
            [
              { id: 'story', label: 'Story' },
              { id: 'philosophy', label: 'Philosophy' },
              { id: 'leadership', label: 'Leadership' },
              { id: 'milestones', label: 'Milestones' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black font-semibold shadow-sm'
                  : 'text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* SCROLLABLE BODY CONTENT                                                   */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto space-y-10 custom-scrollbar relative z-10">
          {/* ======================================================================= */}
          {/* HERO BANNER SECTION WITH BACKGROUND IMAGE & DARK GRADIENT OVERLAY        */}
          {/* ======================================================================= */}
          <div className="relative w-full min-h-[300px] sm:min-h-[360px] md:min-h-[400px] flex items-end p-6 sm:p-12 overflow-hidden border-b border-white/10">
            {/* Background Architectural Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={imgFacade}
                alt="Oceanora Estate Architecture"
                className="w-full h-full object-cover scale-105 brightness-95"
              />
              {/* Dark Multi-layer Gradient Overlay for Drama and Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-black/75 to-black/45" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            </div>

            {/* Hero Content on top of Background Image */}
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[1.5px] bg-amber-400" />
                <span className="text-amber-300 text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase font-mono">
                  THE OCEANORA ATELIER · EST. 2014
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal leading-tight drop-shadow-md">
                Crafting Architectural Sanctuaries Between Ocean and Sky
              </h1>

              <p className="mt-3 text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-2xl drop-shadow-sm">
                Founded over a decade ago along the rugged coastal bluffs of Malibu and Rio de Janeiro, Oceanora creates the world’s most transcendent private residential estates in harmony with the sea.
              </p>

              {/* Glassmorphism Key Stats Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-2.5 shadow-lg">
                  <Building2 size={14} className="text-amber-300" />
                  <span className="text-xs text-white/90 font-mono">
                    <strong className="text-white">12</strong> Private Promontories
                  </span>
                </div>

                <div className="px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-2.5 shadow-lg">
                  <TrendingUp size={14} className="text-amber-300" />
                  <span className="text-xs text-white/90 font-mono">
                    <strong className="text-white">$1.2B+</strong> Acquisitions Closed
                  </span>
                </div>

                <div className="px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-2.5 shadow-lg">
                  <Globe2 size={14} className="text-amber-300" />
                  <span className="text-xs text-white/90 font-mono">
                    Malibu · Miami · Rio de Janeiro
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* TAB 1: OUR STORY                                                        */}
          {/* ======================================================================= */}
          {activeTab === 'story' && (
            <div className="px-6 sm:px-12 pb-10 space-y-8 animate-fadeIn">
              {/* Secondary Feature Card with Glassmorphism */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
                <div className="relative w-full md:w-1/2 h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/20 shrink-0">
                  <img
                    src={imgCliffside}
                    alt="Cliffside Cantilever"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                    <span>Cliffside Cantilever Villa</span>
                    <span className="text-amber-300">Malibu Ridge</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-amber-300 text-xs uppercase tracking-widest font-mono font-semibold">
                    Architectural Distinction
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white">
                    Where Raw Nature Inspires Modernist Form
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                    Rather than imposing monolithic concrete upon the terrain, every Oceanora residence is sculpted around natural bedrock formations, wave acoustics, and solar arcs to deliver perpetual ocean views from every room.
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        onExploreResidences();
                      }}
                      className="text-xs text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Explore Active Listings</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Three Pillars Grid with Glassmorphic Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.07] transition-all duration-300 group shadow-lg">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-4 group-hover:scale-105 transition-transform">
                    <Compass size={22} />
                  </div>
                  <h4 className="text-base font-serif text-white group-hover:text-amber-300 transition-colors">
                    Unrivaled Promontories
                  </h4>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    Every residence is situated on privately held, ultra-rare promontories offering unencumbered 180° to 360° ocean horizons and absolute coastal privacy.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.07] transition-all duration-300 group shadow-lg">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-4 group-hover:scale-105 transition-transform">
                    <Layers size={22} />
                  </div>
                  <h4 className="text-base font-serif text-white group-hover:text-amber-300 transition-colors">
                    Sublime Materials
                  </h4>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    Sourced from premier quarries in Italy and Brazil, seamlessly blending monolithic travertine, marine-grade titanium, and thermo-insulated glass.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.07] transition-all duration-300 group shadow-lg">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-4 group-hover:scale-105 transition-transform">
                    <Award size={22} />
                  </div>
                  <h4 className="text-base font-serif text-white group-hover:text-amber-300 transition-colors">
                    Pritzker-Grade Design
                  </h4>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    Honored with premier international architectural awards for seamless indoor-outdoor motorized pocket walls and acoustic wave balancing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 2: PHILOSOPHY                                                       */}
          {/* ======================================================================= */}
          {activeTab === 'philosophy' && (
            <div className="px-6 sm:px-12 pb-10 space-y-8 animate-fadeIn">
              <div className="max-w-3xl">
                <p className="text-amber-300 text-xs font-semibold tracking-[0.3em] uppercase mb-2 font-mono">
                  DESIGN CONSTITUTION
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal leading-tight">
                  Where Natural Elements Dictate Architectural Form
                </h2>
                <p className="mt-4 text-sm text-white/75 font-light leading-relaxed">
                  We reject the standard tropes of sterile, cookie-cutter luxury. At Oceanora, the wind patterns, solar azimuths, coastal tides, and bedrock geology shape every single angle of our structures.
                </p>
              </div>

              {/* Glassmorphic Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    title: '1. Biophilic Resonance',
                    desc: 'Blurring the barrier between living room and Pacific swells with floor-to-ceiling motorized pocket glass walls.',
                  },
                  {
                    title: '2. Acoustic Engineering',
                    desc: 'Custom-calibrated spatial acoustics that tune the soothing roar of breaking waves into ambient background serenity.',
                  },
                  {
                    title: '3. Sustainable Longevity',
                    desc: 'Geothermal heating for cantilevered infinity pools, integrated solar micro-grids, and zero-carbon seawater cooling.',
                  },
                  {
                    title: '4. Absolute Confidentiality',
                    desc: 'Private subterranean vehicular tunnels, discrete helipad landings, and encrypted smart home security protocols.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.06] transition-all flex gap-4 shadow-lg"
                  >
                    <CheckCircle2 size={20} className="text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-serif text-white">{item.title}</h4>
                      <p className="mt-1.5 text-xs text-white/70 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 3: LEADERSHIP (Featuring Agent Martin)                              */}
          {/* ======================================================================= */}
          {activeTab === 'leadership' && (
            <div className="px-6 sm:px-12 pb-10 space-y-8 animate-fadeIn">
              <div className="max-w-3xl">
                <p className="text-amber-300 text-xs font-semibold tracking-[0.3em] uppercase mb-2 font-mono">
                  OUR LEADERSHIP & ADVISORY
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal leading-tight">
                  Guided by Specialists in Architecture & Private Acquisition
                </h2>
                <p className="mt-4 text-sm text-white/75 font-light leading-relaxed">
                  Our multidisciplinary leadership team brings together world-class architects, private client directors, and coastal environmental engineers.
                </p>
              </div>

              {/* Key Leader Feature: Martin with Circular Portrait and Glassmorphic Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-black/60 to-black/80 backdrop-blur-2xl border border-amber-500/35 flex flex-col md:flex-row items-center gap-6 sm:gap-8 shadow-2xl">
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xl shadow-black/80">
                    <img
                      src={martinPortrait}
                      alt="Martin - Luxury Real Estate Specialist"
                      className="w-full h-full object-cover object-top rounded-full border-2 border-black"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center">
                    <ShieldCheck size={14} className="text-black stroke-[3]" />
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-amber-300 text-xs uppercase tracking-widest font-mono font-semibold">
                      Senior Partner
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-xs text-white/70 font-mono">Over $1.2B in Acquisitions</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                    Martin
                  </h3>
                  <p className="text-amber-300/90 text-xs font-sans mt-0.5">
                    Luxury Real Estate Specialist & Private Client Director
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-xl">
                    With over 18 years representing premier high-net-worth families, tech founders, and private trusts across Malibu, Beverly Hills, Miami, and coastal Brazil, Martin leads our bespoke client advisory with discretion and precision.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        onBookConsultation();
                      }}
                      className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold tracking-wide hover:bg-amber-300 transition-colors cursor-pointer shadow-md"
                    >
                      Book Consultation with Martin
                    </button>
                  </div>
                </div>
              </div>

              {/* Other Key Team Members in Frosted Glass Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center gap-4 hover:border-amber-400/40 transition-colors shadow-lg">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-serif text-lg text-amber-300 shrink-0">
                    ER
                  </div>
                  <div>
                    <h4 className="text-base font-serif text-white">Elena Rostova</h4>
                    <p className="text-xs text-amber-300/80">Lead Architectural Principal</p>
                    <p className="text-[11px] text-white/60 font-light mt-1">
                      Pritzker Prize Nominee, former Lead Partner at Foster & Partners.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center gap-4 hover:border-amber-400/40 transition-colors shadow-lg">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-serif text-lg text-amber-300 shrink-0">
                    GT
                  </div>
                  <div>
                    <h4 className="text-base font-serif text-white">Gabriel Thorne</h4>
                    <p className="text-xs text-amber-300/80">Coastal Geotechnical Director</p>
                    <p className="text-[11px] text-white/60 font-light mt-1">
                      Pioneered subterranean cantilever foundations for coastal promontories.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: MILESTONES                                                       */}
          {/* ======================================================================= */}
          {activeTab === 'milestones' && (
            <div className="px-6 sm:px-12 pb-10 space-y-8 animate-fadeIn">
              <div className="max-w-3xl">
                <p className="text-amber-300 text-xs font-semibold tracking-[0.3em] uppercase mb-2 font-mono">
                  OUR JOURNEY
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal leading-tight">
                  A Decade of Architectural Milestones
                </h2>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l border-amber-400/40 space-y-8">
                {[
                  {
                    year: '2014',
                    title: 'The Founding of Oceanora',
                    desc: 'Established as a private coastal design atelier in Rio de Janeiro and Malibu.',
                  },
                  {
                    year: '2018',
                    title: 'The Cantilevered Pool Breakthrough',
                    desc: 'Patented our dual-counterweight pool system that projects 75ft out over the ocean bluff.',
                  },
                  {
                    year: '2022',
                    title: 'Global Architecture Excellence Trophy',
                    desc: 'Awarded Villa of the Decade for the Pacific Horizon Sanctuary.',
                  },
                  {
                    year: '2026',
                    title: 'The New Oceanora Private Residence Collection',
                    desc: 'Unveiling 12 exclusive, ultra-prime oceanfront estates crafted for generational legacy.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative group p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-colors shadow-md"
                  >
                    {/* Glowing timeline dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-amber-400 border-4 border-[#0c0c0e] shadow-sm shadow-amber-400" />
                    <span className="text-xs font-mono font-semibold text-amber-300 tracking-wider">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-serif text-white mt-0.5">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-white/70 font-light mt-1 leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM FROSTED GLASS CTA FOOTER                                           */}
        {/* ========================================================================= */}
        <footer className="relative z-20 shrink-0 px-6 sm:px-10 py-4 border-t border-white/10 bg-black/50 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-white/50">
            Oceanora Private Client Advisory · Discretion Guaranteed
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onExploreResidences();
              }}
              className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              View Residences
            </button>
            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-amber-300 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Schedule Showing</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
