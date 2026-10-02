# Estate Cinematic Scroll Animation

An immersive, smooth scroll animation real estate experience for a luxury coastal architectural estate. Built with React, TypeScript, Tailwind CSS, and a 60 FPS HTML5 Canvas interpolation engine.

## ✨ Experience Journey

The walkthrough follows an uninterrupted narrative journey:

1. **Pacific Coastal Reef**: Submerged perspective with scuba diver and sunbeams piercing turquoise waters.
2. **Surfacing at Infinity Pool**: Breaking the water line directly at the edge of the coastal infinity pool.
3. **Cliffside Villa Reveal**: Panoramic sunset drone perspective of the multi-tiered modern cliffside estate.
4. **Infinity Pool Promenade**: Gliding along the stone pool terrace toward the expansive glass doors.
5. **Sunset Living Pavilion**: Entering the grand open-plan living room with curved sectional sofa and ocean sunset horizon.
6. **Grand Entrance Foyer**: Monolithic black marble waterfall wall and limestone atrium.
7. **Chef's Culinary Pavilion**: Minimalist oak kitchen and marble dining island with sculptural lighting.
8. **Master Sanctuary Suite**: Low-profile platform bed with panoramic cantilevered ocean balcony.
9. **Twilight Fire Terrace**: Sunken lounge and linear fire pit overlooking the dusk ocean horizon under starry skies.

---

## 🚀 Features

- **60 FPS Canvas Animation Engine**: Smooth lerp damping (`progress += delta * 0.075`) ensures fluid, weighted camera glide across mouse wheel, touch drag, and arrow keys.
- **Cinematic Motion Dynamics**: Each frame features camera movements (dolly zoom, horizontal pan, subtle vertical tilt) with cubic-eased crossfading and natural optical vignetting.
- **Auto-Cruise & Spacebar**: Press **Space** or the play button to glide smoothly through the full estate automatically.
- **Procedural Ambient Soundscape**: Subtle ocean breeze and harmonic drone generated in real-time via Web Audio API (zero external audio file dependencies).
- **Minimalist Aesthetic**: Unobtrusive, auto-hiding controls (fading out after 2.8s of inactivity) for cruise, soundscape, and fullscreen mode.
- **Universal Input**: Mouse wheel, touch drag scrubbing, keyboard navigation (Arrow keys + Spacebar), and fullscreen mode.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Audio**: Web Audio API (Procedural Synthesizer)

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`.

---

## ⌨️ Controls & Shortcuts

| Input | Action |
| --- | --- |
| **Scroll Wheel / Trackpad** | Scrub camera through the estate |
| **Click & Drag / Touch** | Scrub animation directly on canvas |
| **Spacebar** | Toggle automated cinematic cruise mode |
| **Up / Left Arrow** | Step backward smoothly |
| **Down / Right Arrow** | Step forward smoothly |
