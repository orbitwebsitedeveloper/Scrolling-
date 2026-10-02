/**
 * AboutUsModal
 * A comprehensive, luxury editorial "About Us" page/modal for Oceanora.
 * Follows Oceanora branding with dark theme, gold accents, high-contrast serif typography,
 * architectural heritage, core pillars, leadership team (including Martin), and milestones.
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
} from 'lucide-react';

import martinPortrait from '@/src/assets/images/agent_martin_portrait_1790919567086.jpg';
import imgCliffside from '@/src/assets/images/user_03_cliffside_villa_1790917821486.jpg';
import imgLiving from '@/src/assets/images/estate_living_pavilion_1790917427402.jpg';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl transition-all animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#090909] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-white">
        {/* Top Header Bar */}
        <header className="shrink-0 px-6 sm:px-10 py-5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl border border-amber-400/50 flex items-center justify-center p-2 bg-amber-500/10">
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

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 text-xs">
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
                    ? 'bg-white text-black font-medium shadow-sm'
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
        <div className="flex md:hidden items-center justify-around p-2 border-b border-white/10 bg-black/60 text-xs shrink-0 overflow-x-auto">
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
              className={`px-3 py-1 rounded-full whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 space-y-10 custom-scrollbar">
          {/* TAB 1: OUR STORY */}
          {activeTab === 'story' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="max-w-3xl">
                <p className="text-amber-300 text-xs font-semibold tracking-[0.3em] uppercase mb-2 font-mono">
                  THE OCEANORA LEGACY
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal leading-tight">
                  Crafting Architectural Sanctuaries Between Ocean and Sky
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/75 font-light leading-relaxed">
                  Founded over a decade ago along the rugged coastal bluffs, Oceanora was established with a single, uncompromising vision: to create the world’s most transcendent residential estates that exist in effortless harmony with the untamed power of the ocean.
                </p>
              </div>

              {/* Visual Showcase Card */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/15">
                <img
                  src={imgCliffside}
                  alt="Oceanora Estate Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-amber-300 text-xs uppercase tracking-widest font-mono">
                      Architectural Masterpiece
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-white mt-0.5">
                      The Cliffside Cantilever Pavilion
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    <MapPin size={12} className="text-amber-300" />
                    <span>Malibu Coastal Ridge, CA</span>
                  </div>
                </div>
              </div>

              {/* Three Pillars Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-300 mb-4">
                    <Compass size={20} />
                  </div>
                  <h4 className="text-base font-serif text-white">Unrivaled Sites</h4>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    Every residence is situated on privately held, ultra-rare promontories offering unencumbered 180° to 360° ocean horizons.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-300 mb-4">
                    <Layers size={20} />
                  </div>
                  <h4 className="text-base font-serif text-white">Sublime Materials</h4>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    Sourced from the finest quarries in Italy and Brazil, seamlessly blending monolithic stone, thermal glass, and marine-grade steel.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-300 mb-4">
                    <Award size={20} />
                  </div>
                  <h4 className="text-base font-serif text-white">Pritzker-Grade Design</h4>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    Honored with premier international architectural awards for seamless indoor-outdoor engineering and acoustic serenity.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PHILOSOPHY */}
          {activeTab === 'philosophy' && (
            <div className="space-y-8 animate-fadeIn">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-4"
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

          {/* TAB 3: LEADERSHIP */}
          {activeTab === 'leadership' && (
            <div className="space-y-8 animate-fadeIn">
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

              {/* Key Leader Feature: Martin */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-black to-black border border-amber-500/30 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xl">
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
                    <span className="text-xs text-white/60">Over $1.2B in Acquisitions</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                    Martin
                  </h3>
                  <p className="text-amber-300/90 text-xs font-sans mt-0.5">
                    Luxury Real Estate Specialist & Private Client Director
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-white/75 font-light leading-relaxed max-w-xl">
                    With over 18 years representing premier high-net-worth families, tech founders, and private trusts across Malibu, Beverly Hills, Miami, and coastal Brazil, Martin leads our bespoke client advisory with discretion and precision.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        onBookConsultation();
                      }}
                      className="px-5 py-2 rounded-full bg-amber-400 text-black text-xs font-semibold tracking-wide hover:bg-amber-300 transition-colors cursor-pointer"
                    >
                      Book Consultation with Martin
                    </button>
                  </div>
                </div>
              </div>

              {/* Other Key Team Members */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center font-serif text-xl text-amber-300 shrink-0">
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

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center font-serif text-xl text-amber-300 shrink-0">
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

          {/* TAB 4: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="max-w-3xl">
                <p className="text-amber-300 text-xs font-semibold tracking-[0.3em] uppercase mb-2 font-mono">
                  OUR JOURNEY
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal leading-tight">
                  A Decade of Architectural Milestones
                </h2>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l border-amber-400/30 space-y-8">
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
                  <div key={idx} className="relative group">
                    {/* Glowing timeline dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-amber-400 border-4 border-black" />
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

        {/* Bottom CTA Bar */}
        <footer className="shrink-0 px-6 sm:px-10 py-4 border-t border-white/10 bg-black/60 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
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
