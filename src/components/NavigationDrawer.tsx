/**
 * NavigationDrawer
 * Luxury slide-out navigation menu for Oceanora.
 * Opens upon clicking any hamburger menu icon on the website.
 * Features links to Home, About Us (our story, philosophy, leadership),
 * Residences, Agent Martin, Footer, and Direct Booking.
 */

import React from 'react';
import {
  X,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import martinPortrait from '@/src/assets/images/agent_martin_portrait_1790919567086.jpg';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAboutUs: () => void;
  onNavigateHome: () => void;
  onNavigateResidences: () => void;
  onNavigateAgent: () => void;
  onNavigateFooter: () => void;
  onBookConsultation: () => void;
}

export default function NavigationDrawer({
  isOpen,
  onClose,
  onOpenAboutUs,
  onNavigateHome,
  onNavigateResidences,
  onNavigateAgent,
  onNavigateFooter,
  onBookConsultation,
}: NavigationDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn">
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/15 p-6 sm:p-8 flex flex-col justify-between text-white shadow-2xl overflow-y-auto">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-amber-400/40 bg-black/40 flex items-center justify-center p-2">
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
                <span className="text-xs font-semibold tracking-[0.35em] uppercase text-white font-sans">
                  OCEANORA
                </span>
                <span className="text-[10px] text-amber-300 tracking-widest uppercase block font-mono">
                  Private Navigation
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col gap-3 font-serif">
            {/* 01. Home */}
            <button
              onClick={() => {
                onClose();
                onNavigateHome();
              }}
              className="group text-left p-3 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer border border-transparent hover:border-white/10"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-300/80 uppercase tracking-widest block font-sans">
                  01 // OVERVIEW
                </span>
                <span className="text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors">
                  Home & Oceanic Dive
                </span>
              </div>
              <ArrowRight
                size={16}
                className="text-white/40 group-hover:text-amber-300 group-hover:translate-x-1 transition-all"
              />
            </button>

            {/* 02. About Us (Highlighted with Gold Badge) */}
            <button
              onClick={() => {
                onClose();
                onOpenAboutUs();
              }}
              className="group text-left p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/40 hover:bg-amber-500/20 transition-all flex items-center justify-between cursor-pointer shadow-lg shadow-amber-500/5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block font-sans">
                    02 // OUR HERITAGE
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-400 text-black font-bold uppercase tracking-wider">
                    New Page
                  </span>
                </div>
                <span className="text-xl sm:text-2xl text-amber-300 group-hover:text-amber-200 transition-colors">
                  About Us · Atelier & Vision
                </span>
                <p className="text-[11px] text-white/70 font-sans font-light mt-0.5">
                  Story, design philosophy, milestones & leadership team
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-amber-300 group-hover:translate-x-1 transition-all"
              />
            </button>

            {/* 03. Residences */}
            <button
              onClick={() => {
                onClose();
                onNavigateResidences();
              }}
              className="group text-left p-3 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer border border-transparent hover:border-white/10"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-300/80 uppercase tracking-widest block font-sans">
                  03 // PORTFOLIO
                </span>
                <span className="text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors">
                  Cliffside Luxury Residences
                </span>
              </div>
              <ArrowRight
                size={16}
                className="text-white/40 group-hover:text-amber-300 group-hover:translate-x-1 transition-all"
              />
            </button>

            {/* 04. Meet Your Agent Martin */}
            <button
              onClick={() => {
                onClose();
                onNavigateAgent();
              }}
              className="group text-left p-3 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer border border-transparent hover:border-white/10"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-300/80 uppercase tracking-widest block font-sans">
                  04 // SPECIALIST
                </span>
                <span className="text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors">
                  Meet Your Agent: Martin
                </span>
              </div>
              <ArrowRight
                size={16}
                className="text-white/40 group-hover:text-amber-300 group-hover:translate-x-1 transition-all"
              />
            </button>

            {/* 05. Stay Connected & Footer */}
            <button
              onClick={() => {
                onClose();
                onNavigateFooter();
              }}
              className="group text-left p-3 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer border border-transparent hover:border-white/10"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-300/80 uppercase tracking-widest block font-sans">
                  05 // CONTACT
                </span>
                <span className="text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors">
                  Stay Connected & Newsletter
                </span>
              </div>
              <ArrowRight
                size={16}
                className="text-white/40 group-hover:text-amber-300 group-hover:translate-x-1 transition-all"
              />
            </button>
          </nav>

          {/* Quick Agent Card in Drawer */}
          <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400 shrink-0">
              <img
                src={martinPortrait}
                alt="Agent Martin"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-serif text-white truncate">Martin</span>
                <ShieldCheck size={12} className="text-amber-300" />
              </div>
              <p className="text-[10px] text-white/60 truncate">
                Luxury Real Estate Specialist
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="px-3 py-1.5 rounded-full bg-white text-black text-[11px] font-semibold hover:bg-amber-300 transition-colors shrink-0 cursor-pointer"
            >
              Direct Call
            </button>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="pt-6 border-t border-white/10 text-xs text-white/60 space-y-2 mt-6">
          <p className="text-amber-300 uppercase tracking-widest text-[10px] font-mono font-semibold">
            Confidential Client Inquiries
          </p>
          <div className="flex items-center gap-2 text-white/80">
            <Phone size={12} className="text-amber-300" />
            <span className="font-mono">+1 (310) 555-9676</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Mail size={12} className="text-amber-300" />
            <span>concierge@oceanora.estate</span>
          </div>
          <p className="text-[10px] text-white/40 pt-1">
            Malibu Coastal Ridge, CA · Rio de Janeiro, Brazil
          </p>
        </div>
      </div>
    </div>
  );
}
