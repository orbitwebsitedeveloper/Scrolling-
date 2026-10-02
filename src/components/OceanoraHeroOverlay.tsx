/**
 * OceanoraHeroOverlay
 * Authentic luxury hero section UI matching the design inspiration
 * Featuring:
 * - Brand header: Oceanora emblem + spaced typography & hamburger menu
 * - Main hero typography with dramatic golden "L" and editorial serif "uxury"
 * - Spaced kicker, sub-line, and vertical gold-bordered quote
 * - "Explore Trips" & "Watch Film" CTA buttons
 * - Bottom dock: Social links, contact capsule (+55 21 0000-0000 / Rio de Janeiro), and "Scroll to Explore" with animated arrow
 * - Parallax fade-out on scroll to smoothly reveal the real estate animation sequence
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  Instagram,
  Facebook,
  Youtube,
  Phone,
  MapPin,
  Menu,
  X,
  ArrowDown,
} from 'lucide-react';

interface OceanoraHeroOverlayProps {
  scrollProgress: number;
  onExplore: () => void;
  onWatchFilm: () => void;
  isPlaying: boolean;
  onOpenMenu?: () => void;
  onOpenAboutUs?: () => void;
}

export default function OceanoraHeroOverlay({
  scrollProgress,
  onExplore,
  onWatchFilm,
  isPlaying,
  onOpenMenu,
  onOpenAboutUs,
}: OceanoraHeroOverlayProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Physical scroll calculation:
  // At progress 0: translateY = 0vh, opacity = 1
  // As progress goes from 0 to 0.16: physically scrolls UP to -105vh and fades out smoothly
  const exitProgress = Math.min(scrollProgress / 0.15, 1.2);
  const translateY = -exitProgress * 105; // Physically scrolls up off the top
  const opacity = Math.max(0, 1 - Math.pow(exitProgress, 1.4));
  const isHidden = opacity <= 0.01;

  return (
    <>
      {/* Hero Layer (Fixed, sits directly over the canvas) */}
      <div
        className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-150 ${
          isHidden ? 'opacity-0 select-none' : 'opacity-100'
        }`}
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}vh, 0)`,
          willChange: 'transform, opacity',
        }}
      >
        <div className="relative w-full h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 py-8 sm:py-10">
          {/* Top Bar: Brand Logo & Navigation */}
          <header className="w-full flex items-center justify-between pointer-events-auto">
            {/* Logo Lockup */}
            <div
              onClick={onExplore}
              className="flex items-center gap-3.5 group cursor-pointer"
            >
              {/* Wave circle icon */}
              <div className="w-10 h-10 rounded-full border border-amber-300/80 flex items-center justify-center p-2 group-hover:border-amber-300 transition-colors shadow-sm shadow-amber-500/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F5C518"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="w-full h-full"
                >
                  <path d="M2 8c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5" />
                  <path d="M2 12c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5" />
                  <path d="M2 16c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5" />
                </svg>
              </div>

              {/* Brand text */}
              <span className="text-white text-xs sm:text-sm font-medium tracking-[0.4em] uppercase font-sans">
                OCEANORA
              </span>
            </div>

            {/* Menu Trigger */}
            <button
              onClick={() => {
                if (onOpenMenu) {
                  onOpenMenu();
                } else {
                  setMenuOpen(true);
                }
              }}
              className="w-10 h-10 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer group"
              aria-label="Open Navigation"
            >
              <div className="flex flex-col items-end gap-1.5">
                <span className="w-6 h-[1.5px] bg-white group-hover:w-7 transition-all duration-300" />
                <span className="w-4 h-[1.5px] bg-white group-hover:w-7 transition-all duration-300" />
                <span className="w-6 h-[1.5px] bg-white group-hover:w-7 transition-all duration-300" />
              </div>
            </button>
          </header>

          {/* Main Hero Content (Center-Left) */}
          <div className="max-w-3xl my-auto pt-6 sm:pt-0 pointer-events-auto">
            {/* Top gold category kicker */}
            <p className="text-amber-300 text-[11px] sm:text-xs font-semibold tracking-[0.38em] uppercase mb-4 drop-shadow-sm">
              LUXURY SCUBA EXPEDITIONS
            </p>

            {/* Sub-kicker */}
            <p className="text-white/90 text-xs sm:text-sm tracking-[0.5em] uppercase font-serif mb-1 sm:mb-2">
              D E S C U B R A
            </p>

            {/* Giant Display Title: "Luxury" with Golden Initial */}
            <div className="relative flex items-baseline select-none">
              {/* Small "DO" / "THE" prefix superscript */}
              <span className="text-white/90 text-xs sm:text-base font-serif tracking-widest mr-3 sm:mr-4 self-center mb-6">
                DO
              </span>

              {/* Huge Golden "L" */}
              <h1 className="font-serif leading-[0.88] tracking-tight flex items-baseline">
                <span className="text-[#F6C61A] text-7xl sm:text-9xl md:text-[10rem] lg:text-[11.5rem] font-bold drop-shadow-lg">
                  L
                </span>
                {/* Elegant White "uxury" in high-contrast editorial serif */}
                <span className="text-white text-6xl sm:text-8xl md:text-[8.5rem] lg:text-[10rem] font-normal tracking-[-0.02em] font-serif italic drop-shadow-md relative">
                  uxury
                  {/* Subtle golden jewel dot accent above y */}
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F6C61A] ml-2 -translate-y-8 sm:-translate-y-12 animate-pulse" />
                </span>
              </h1>
            </div>

            {/* Spaced Date / Sub-line */}
            <p className="text-white/80 text-[11px] sm:text-xs tracking-[0.45em] uppercase mt-2 sm:mt-3 font-medium">
              2 2 · D E · A B R I L
            </p>

            {/* Left-Bordered Narrative Quote */}
            <div className="mt-6 sm:mt-8 border-l-2 border-[#F6C61A] pl-4 sm:pl-5 py-0.5">
              <p className="text-white/90 text-[11px] sm:text-xs tracking-[0.25em] font-medium uppercase leading-relaxed font-sans max-w-sm">
                O COMEÇO DE <br />
                UMA NOVA ERA EM <br />
                SOLO <span className="text-amber-300 font-semibold">BRASILEIRO</span>.
              </p>
            </div>

            {/* Action Buttons: "Explore Trips" and "Watch Film" */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              {/* Primary "Explore Trips" pill button */}
              <button
                onClick={onExplore}
                className="group relative px-6 sm:px-7 py-3.5 rounded-full border border-amber-400/70 bg-black/40 backdrop-blur-md text-white text-xs sm:text-sm font-medium tracking-wider flex items-center gap-3 hover:border-amber-300 hover:bg-amber-400/15 hover:shadow-lg hover:shadow-amber-400/20 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                {/* Small wave icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F6C61A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="w-4 h-4"
                >
                  <path d="M2 10c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5" />
                  <path d="M2 14c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5" />
                </svg>

                <span>Explore Trips</span>

                <ArrowRight
                  size={15}
                  className="text-amber-300 group-hover:translate-x-1 transition-transform"
                />
              </button>

              {/* Secondary "Watch Film" button */}
              <button
                onClick={onWatchFilm}
                className="group px-5 sm:px-6 py-3.5 rounded-full border border-white/25 bg-black/40 backdrop-blur-md text-white/90 text-xs sm:text-sm font-medium tracking-wider flex items-center gap-3 hover:border-white/60 hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full border border-white/60 flex items-center justify-center text-white">
                  <Play size={10} className="fill-white ml-0.5" />
                </div>
                <span>{isPlaying ? 'Pause Experience' : 'Watch Film'}</span>
              </button>
            </div>
          </div>

          {/* Bottom Dock / Widgets */}
          <footer className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4 pointer-events-auto border-t border-white/10">
            {/* Left: Social Media handles */}
            <div className="flex items-center gap-4 text-white/80 text-xs">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="hover:text-amber-300 transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="hover:text-amber-300 transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="hover:text-amber-300 transition-colors p-1"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
              <span className="text-white/40">/</span>
              <span className="text-[11px] tracking-[0.25em] font-medium text-white/70 uppercase">
                OCEANORA
              </span>
            </div>

            {/* Center: Glass capsule with Contact & Address */}
            <div className="flex items-center gap-4 px-5 py-2.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white/80 text-[11px] tracking-wider shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Phone size={10} />
                </div>
                <span className="font-mono text-white/90">+55 21 0000-0000</span>
              </div>

              <span className="w-[1px] h-3 bg-white/20" />

              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-amber-300" />
                <span className="text-white/80 uppercase font-sans">
                  RUA DAS ONDAS, 210 RIO DE JANEIRO, RJ
                </span>
              </div>
            </div>

            {/* Right: "Scroll to Explore" with diamond sparkle & animated arrow */}
            <div
              onClick={onExplore}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Four-pointed diamond star */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-amber-300/80 group-hover:text-amber-300 group-hover:scale-110 transition-all"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>

              <div className="h-6 w-[1px] bg-white/20" />

              <span className="text-[10px] tracking-[0.3em] font-semibold uppercase text-white/90 group-hover:text-amber-300 transition-colors">
                SCROLL TO EXPLORE
              </span>

              <div className="w-6 h-6 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:border-amber-400 group-hover:translate-y-0.5 transition-all">
                <ArrowDown size={11} className="animate-bounce" />
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Slide-out Menu Drawer for hamburger */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md transition-opacity">
          <div className="w-full max-w-md h-full bg-[#080808] border-l border-white/10 p-8 flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-white/10">
                <span className="text-xs font-medium tracking-[0.4em] uppercase text-white">
                  OCEANORA
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-6 text-xl sm:text-2xl font-serif">
                {[
                  '01. Oceanic Villa & Grounds',
                  '02. Underwater Reef Sanctuary',
                  '03. Infinity Sunset Pool',
                  '04. Grand Living Pavilion',
                  '05. Private Master Penthouse',
                  '06. Book Private Tour',
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href="#explore"
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      onExplore();
                    }}
                    className="hover:text-amber-300 transition-colors py-1 cursor-pointer"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-white/10 text-xs text-white/60 space-y-2">
              <p className="text-amber-300 uppercase tracking-widest text-[11px] font-semibold">
                Private Inquiries
              </p>
              <p>+55 21 0000-0000 · concierge@oceanora.estate</p>
              <p className="text-[10px] text-white/40 pt-2">
                Rua das Ondas, 210, Rio de Janeiro, RJ · Brazil
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
