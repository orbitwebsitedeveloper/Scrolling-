/**
 * OceanoraFooterSection
 * Recreates the exact design inspiration from WA_1790919837793.png:
 * - Floating frosted glass newsletter card with gold border:
 *     "— STAY CONNECTED" kicker
 *     "Exceptional homes, extraordinary living." headline
 *     "Subscribe to receive exclusive property updates, luxury insights and off-market opportunities."
 *     Pill input with bronze/gold "Subscribe ->" button & privacy note
 * - Multi-column luxury footer grid:
 *     Col 1: Brand emblem monogram, OCEANORA LUXURY REAL ESTATE, mission, social icons
 *     Col 2: EXPLORE (Properties, Off-Market Listings, New Developments, Sell Your Property, Luxury Collections)
 *     Col 3: ABOUT (About Us, Our Story, Our Team, Careers, Press & Media)
 *     Col 4: RESOURCES (Market Insights, Buying Guide, Selling Guide, Investors, FAQ)
 *     Col 5: CONTACT (Address, Phone, Email, Hours)
 * - Sub-footer: Copyright, Privacy Policy, Terms of Use, Cookies Policy, Language selector, Diamond sparkle
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Lock,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Check,
  X,
} from 'lucide-react';

interface OceanoraFooterSectionProps {
  scrollProgress: number;
  onNavigateTop: () => void;
  onOpenConsultation?: () => void;
}

export default function OceanoraFooterSection({
  scrollProgress,
  onNavigateTop,
  onOpenConsultation,
}: OceanoraFooterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Visibility based on scroll progress:
  // Fades in starting at 0.74, fully opaque from 0.82 to 1.00
  const startRange = 0.74;
  const fullRange = 0.84;
  let opacity = 0;

  if (scrollProgress >= startRange) {
    if (scrollProgress >= fullRange) {
      opacity = 1;
    } else {
      opacity = (scrollProgress - startRange) / (fullRange - startRange);
    }
  }

  const isHidden = opacity <= 0.01;
  const translateY = Math.max(0, (1 - opacity) * 40);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const handleLinkClick = (title: string) => {
    setActiveModal(title);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-500 overflow-y-auto ${
          isHidden ? 'opacity-0 select-none' : 'opacity-100'
        }`}
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}px, 0)`,
        }}
      >
        <div className="min-h-full flex flex-col justify-end bg-gradient-to-t from-black via-black/95 to-black/60 pt-16 sm:pt-24 px-4 sm:px-8 md:px-12 lg:px-16 pb-8 pointer-events-auto">
          {/* ========================================================================= */}
          {/* 1. FLOATING NEWSLETTER DOCK (Matching WA_1790919837793.png)               */}
          {/* ========================================================================= */}
          <div className="w-full max-w-7xl mx-auto mb-12 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl border border-amber-500/40 bg-black/55 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
              {/* Subtle gold glow accent */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Kicker & Headline */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-[1.5px] bg-amber-400" />
                    <p className="text-amber-300 font-semibold text-[11px] tracking-[0.25em] uppercase font-sans">
                      STAY CONNECTED
                    </p>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight">
                    Exceptional homes, <br className="hidden sm:inline" />
                    extraordinary living.
                  </h3>
                </div>

                {/* Center: Narrative note */}
                <div className="lg:col-span-3">
                  <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                    Subscribe to receive exclusive property updates, luxury insights and off-market opportunities.
                  </p>
                </div>

                {/* Right: Pill Input with Bronze Subscribe Button */}
                <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
                  {isSubscribed ? (
                    <div className="w-full py-3 px-5 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center gap-2 text-amber-300 text-xs font-medium">
                      <Check size={16} />
                      <span>Thank you. You have been added to our private dossier.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="w-full">
                      <div className="relative rounded-full border border-white/20 bg-black/60 p-1.5 flex items-center shadow-inner hover:border-white/40 transition-colors">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full pl-4 pr-2 py-2 text-xs text-white placeholder:text-white/40 bg-transparent outline-none font-sans"
                        />
                        <button
                          type="submit"
                          className="shrink-0 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#A77B38] to-[#8C642B] hover:from-[#B88A40] hover:to-[#9E7233] text-white text-xs font-medium flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
                        >
                          <span>Subscribe</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2.5 pl-3 text-[11px] text-white/50">
                        <Lock size={10} className="text-amber-300/80" />
                        <span>We respect your privacy</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. MAIN MULTI-COLUMN LUXURY FOOTER                                        */}
          {/* ========================================================================= */}
          <div className="w-full max-w-7xl mx-auto pt-6 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
              {/* Column 1: Brand & Mission (4 cols on lg) */}
              <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
                {/* Brand Emblem */}
                <div
                  onClick={onNavigateTop}
                  className="cursor-pointer group flex items-center gap-3.5 mb-4"
                  title="Scroll to Top"
                >
                  <div className="w-12 h-12 rounded-xl bg-black/60 border border-amber-400/40 flex items-center justify-center p-2.5 group-hover:border-amber-400 transition-colors shadow-lg">
                    {/* Intertwined Gold Luxury Monogram */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F5C518"
                      strokeWidth="2"
                      className="w-full h-full"
                    >
                      <path d="M4 4l8 8 8-8" />
                      <path d="M4 20l8-8 8 8" />
                      <circle cx="12" cy="12" r="2" fill="#F5C518" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold tracking-[0.3em] uppercase text-white font-sans">
                      OCEANORA
                    </h4>
                    <p className="text-[10px] tracking-[0.35em] text-amber-300 uppercase font-sans mt-0.5">
                      LUXURY REAL ESTATE
                    </p>
                  </div>
                </div>

                <div className="w-10 h-[1px] bg-amber-400/60 my-3" />

                <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed max-w-sm font-sans mb-6">
                  Redefining luxury real estate through exceptional properties, world-class service and timeless experiences.
                </p>

                {/* Social Media Pill Icons */}
                <div className="flex items-center gap-3">
                  {[
                    { icon: <Facebook size={14} />, label: 'Facebook' },
                    { icon: <Instagram size={14} />, label: 'Instagram' },
                    { icon: <Youtube size={14} />, label: 'YouTube' },
                    { icon: <Linkedin size={14} />, label: 'LinkedIn' },
                  ].map((s, idx) => (
                    <a
                      key={idx}
                      href={`#${s.label.toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onOpenConsultation) onOpenConsultation();
                      }}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-amber-300 hover:border-amber-400 hover:bg-white/10 transition-all cursor-pointer"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: EXPLORE (2 cols on lg) */}
              <div className="lg:col-span-2">
                <h4 className="text-amber-300 text-xs tracking-[0.25em] font-semibold uppercase mb-5 font-sans">
                  EXPLORE
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-white/75 font-light">
                  {[
                    'Properties',
                    'Off-Market Listings',
                    'New Developments',
                    'Sell Your Property',
                    'Luxury Collections',
                  ].map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleLinkClick(item)}
                        className="group flex items-center justify-between w-full hover:text-white transition-colors cursor-pointer text-left"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {item}
                        </span>
                        <ChevronRight
                          size={13}
                          className="text-white/40 group-hover:text-amber-300 transition-colors"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: ABOUT (2 cols on lg) */}
              <div className="lg:col-span-2">
                <h4 className="text-amber-300 text-xs tracking-[0.25em] font-semibold uppercase mb-5 font-sans">
                  ABOUT
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-white/75 font-light">
                  {['About Us', 'Our Story', 'Our Team', 'Careers', 'Press & Media'].map(
                    (item, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handleLinkClick(item)}
                          className="group flex items-center justify-between w-full hover:text-white transition-colors cursor-pointer text-left"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform">
                            {item}
                          </span>
                          <ChevronRight
                            size={13}
                            className="text-white/40 group-hover:text-amber-300 transition-colors"
                          />
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Column 4: RESOURCES (2 cols on lg) */}
              <div className="lg:col-span-2">
                <h4 className="text-amber-300 text-xs tracking-[0.25em] font-semibold uppercase mb-5 font-sans">
                  RESOURCES
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-white/75 font-light">
                  {[
                    'Market Insights',
                    'Buying Guide',
                    'Selling Guide',
                    'Investors',
                    'FAQ',
                  ].map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleLinkClick(item)}
                        className="group flex items-center justify-between w-full hover:text-white transition-colors cursor-pointer text-left"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {item}
                        </span>
                        <ChevronRight
                          size={13}
                          className="text-white/40 group-hover:text-amber-300 transition-colors"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 5: CONTACT (2 cols on lg) */}
              <div className="lg:col-span-2">
                <h4 className="text-amber-300 text-xs tracking-[0.25em] font-semibold uppercase mb-5 font-sans">
                  CONTACT
                </h4>
                <ul className="space-y-3.5 text-xs text-white/75 font-light">
                  <li className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-amber-300 shrink-0 mt-0.5" />
                    <span>
                      123 Ocean Drive <br />
                      Malibu, CA 90265, USA
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone size={14} className="text-amber-300 shrink-0" />
                    <span className="font-mono text-white/90">+1 (310) 555-9676</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail size={14} className="text-amber-300 shrink-0" />
                    <span className="text-white/90">concierge@oceanora.estate</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Clock size={14} className="text-amber-300 shrink-0" />
                    <span>Mon – Sun: 8:00 AM – 8:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. SUB-FOOTER BAR                                                         */}
          {/* ========================================================================= */}
          <div className="w-full max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            {/* Copyright */}
            <p>© 2026 Oceanora Agency. All rights reserved.</p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-[11px]">
              <button
                onClick={() => handleLinkClick('Privacy Policy')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => handleLinkClick('Terms of Use')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Terms of Use
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => handleLinkClick('Cookies Policy')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Cookies Policy
              </button>
            </div>

            {/* Language & Sparkle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/80 cursor-pointer hover:border-white/30 text-[11px]">
                <Globe size={12} className="text-amber-300" />
                <span>English</span>
                <ChevronDown size={11} className="text-white/50" />
              </div>

              {/* Diamond Sparkle matching reference */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white/30"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DETAILS MODAL                                                 */}
      {/* ========================================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <p className="text-amber-300 text-xs uppercase tracking-widest font-mono">
                  Oceanora Portfolio
                </p>
                <h4 className="text-xl font-serif text-white mt-1">{activeModal}</h4>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-6 text-xs sm:text-sm text-white/70 leading-relaxed space-y-3">
              <p>
                Our private advisory office curates bespoke access to {activeModal.toLowerCase()} for discerning private clients, family offices, and institutional investors.
              </p>
              <p className="text-white/50">
                To request confidential documentation or schedule an off-market briefing, please connect directly with our advisory partners.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setActiveModal(null)}
                className="text-xs text-white/60 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  if (onOpenConsultation) onOpenConsultation();
                }}
                className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Connect with Advisor
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
