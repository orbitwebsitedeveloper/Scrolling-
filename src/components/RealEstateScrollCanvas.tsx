/**
 * RealEstateScrollCanvas
 * High-performance 60fps canvas-driven smooth scroll animation for luxury real estate.
 * Starting with the exact user sequence (underwater reef -> surfacing at pool -> cliffside drone -> pool terrace glide -> sunset living pavilion)
 * followed seamlessly by the interior estate tour (grand entrance -> chef kitchen -> master sanctuary -> twilight fire terrace).
 * Zero UI/UX clutter, pure cinematic visual immersion.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ESTATE_FRAMES, EstateFrame } from '@/src/utils/imageSequence';
import { ambientSound } from '@/src/utils/audio';
import OceanoraHeroOverlay from '@/src/components/OceanoraHeroOverlay';
import CliffsideEleganceSection from '@/src/components/CliffsideEleganceSection';
import AgentMartinSection from '@/src/components/AgentMartinSection';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, ArrowUp } from 'lucide-react';

interface LoadedImage {
  element: HTMLImageElement;
  frame: EstateFrame;
}

export default function RealEstateScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Loading state
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const imagesRef = useRef<LoadedImage[]>([]);

  // Smooth scroll tracking
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Interactive modes
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [uiVisible, setUiVisible] = useState<boolean>(true);
  const [progressDisplay, setProgressDisplay] = useState<number>(0);
  const [currentChapter, setCurrentChapter] = useState<{ index: number; name: string }>({
    index: 0,
    name: ESTATE_FRAMES[0]?.name || '',
  });
  const uiTimeoutRef = useRef<number | null>(null);

  // Mouse / Touch drag scrubbing
  const isDraggingRef = useRef<boolean>(false);
  const dragStartYRef = useRef<number>(0);
  const dragStartProgressRef = useRef<number>(0);

  // Handle UI autohide
  const handleUserActivity = useCallback(() => {
    setUiVisible(true);
    if (uiTimeoutRef.current) {
      window.clearTimeout(uiTimeoutRef.current);
    }
    uiTimeoutRef.current = window.setTimeout(() => {
      setUiVisible(false);
    }, 2800);
  }, []);

  // Preload all real estate frames
  useEffect(() => {
    let active = true;
    let count = 0;
    const loadedList: LoadedImage[] = [];

    ESTATE_FRAMES.forEach((frame) => {
      const img = new Image();
      img.src = frame.src;
      img.crossOrigin = 'anonymous';

      const onImageLoad = () => {
        if (!active) return;
        count++;
        setLoadedCount(count);
        loadedList.push({ element: img, frame });

        if (count === ESTATE_FRAMES.length) {
          // Sort to match original order
          loadedList.sort((a, b) => {
            const idxA = ESTATE_FRAMES.findIndex((f) => f.id === a.frame.id);
            const idxB = ESTATE_FRAMES.findIndex((f) => f.id === b.frame.id);
            return idxA - idxB;
          });
          imagesRef.current = loadedList;
          setIsReady(true);
        }
      };

      if (img.complete && img.naturalWidth !== 0) {
        onImageLoad();
      } else {
        img.onload = onImageLoad;
        img.onerror = onImageLoad; // Don't block
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // Synchronize native window scroll to targetProgress
  useEffect(() => {
    const handleScroll = () => {
      handleUserActivity();
      if (isPlaying) {
        setIsPlaying(false);
      }
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetProgressRef.current = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleUserActivity, isPlaying]);

  // Main 60FPS Canvas Render & Interpolation Loop
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      // Autoplay progression (steady cinematic cruise)
      if (isPlaying) {
        targetProgressRef.current += 0.0007;
        if (targetProgressRef.current >= 1) {
          targetProgressRef.current = 0; // seamless loop
          window.scrollTo(0, 0);
        } else {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo(0, targetProgressRef.current * maxScroll);
        }
      }

      // Smooth Lerp Damping
      const delta = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += delta * 0.075;

      const progress = Math.min(Math.max(currentProgressRef.current, 0), 1);
      setProgressDisplay(progress);

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Clear
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      const totalFrames = imagesRef.current.length;
      if (totalFrames > 0) {
        const segments = totalFrames - 1;
        const globalPos = progress * segments;
        const indexA = Math.min(Math.floor(globalPos), segments);
        const indexB = Math.min(indexA + 1, segments);
        const localT = globalPos - indexA;

        // Smooth cubic ease for crossfade
        const fadeT = localT * localT * (3 - 2 * localT);

        // Update active chapter info
        const activeIdx = Math.round(globalPos);
        const activeFrame = imagesRef.current[activeIdx]?.frame;
        if (activeFrame && currentChapter.index !== activeIdx) {
          setCurrentChapter({
            index: activeIdx,
            name: activeFrame.name,
          });
        }

        const imgA = imagesRef.current[indexA];
        const imgB = imagesRef.current[indexB];

        // Draw Image Helper with camera zoom & pan
        const drawScene = (
          imgObj: LoadedImage,
          progressInSegment: number,
          opacity: number
        ) => {
          if (!imgObj || !imgObj.element || opacity <= 0) return;
          const { element, frame } = imgObj;
          if (!element.complete || element.naturalWidth === 0) return;

          ctx.save();
          ctx.globalAlpha = Math.min(Math.max(opacity, 0), 1);

          // Calculate camera dynamics
          const currentZoom =
            frame.zoomStart +
            (frame.zoomEnd - frame.zoomStart) * progressInSegment;
          const currentPanX =
            frame.panXStart +
            (frame.panXEnd - frame.panXStart) * progressInSegment;
          const currentPanY =
            frame.panYStart +
            (frame.panYEnd - frame.panYStart) * progressInSegment;

          // Aspect cover calculations
          const imgAspect = element.naturalWidth / element.naturalHeight;
          const screenAspect = width / height;

          let renderW = width;
          let renderH = height;

          if (screenAspect > imgAspect) {
            renderW = width * currentZoom;
            renderH = (width / imgAspect) * currentZoom;
          } else {
            renderH = height * currentZoom;
            renderW = height * imgAspect * currentZoom;
          }

          const offsetX =
            (width - renderW) / 2 + currentPanX * width;
          const offsetY =
            (height - renderH) / 2 + currentPanY * height;

          ctx.drawImage(element, offsetX, offsetY, renderW, renderH);
          ctx.restore();
        };

        // Render scene A
        drawScene(imgA, localT, 1.0);

        // Render scene B smoothly blended on top
        if (indexA !== indexB && fadeT > 0.001) {
          drawScene(imgB, localT, fadeT);
        }
      }

      // Cinematic Vignette Overlay
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.45,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.22)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.65)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle top and bottom cinematic depth gradient
      const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.16);
      topGrad.addColorStop(0, 'rgba(0,0,0,0.45)');
      topGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, width, height * 0.16);

      const bottomGrad = ctx.createLinearGradient(0, height * 0.84, 0, height);
      bottomGrad.addColorStop(0, 'rgba(0,0,0,0)');
      bottomGrad.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, height * 0.84, width, height * 0.16);

      ctx.restore();

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isReady, isPlaying, currentChapter.index]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleUserActivity();
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
        e.preventDefault();
        setIsPlaying(false);
        targetProgressRef.current = Math.min(targetProgressRef.current + 0.04, 1);
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, targetProgressRef.current * maxScroll);
      } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        targetProgressRef.current = Math.max(targetProgressRef.current - 0.04, 0);
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, targetProgressRef.current * maxScroll);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUserActivity]);

  // Touch and Mouse direct drag scrubbing
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartProgressRef.current = targetProgressRef.current;
    handleUserActivity();
    if (isPlaying) setIsPlaying(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    handleUserActivity();
    if (!isDraggingRef.current) return;

    const deltaY = dragStartYRef.current - e.clientY;
    const sensitivity = 0.0014; // smooth scrub ratio
    const newProgress = Math.min(
      Math.max(dragStartProgressRef.current + deltaY * sensitivity, 0),
      1
    );

    targetProgressRef.current = newProgress;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, newProgress * maxScroll);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Toggle ambient audio
  const handleToggleSound = () => {
    handleUserActivity();
    const active = ambientSound.toggle();
    setIsMuted(!active);
  };

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    handleUserActivity();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Explore button triggers smooth scroll down into the cliffside elegance section
  const handleExplore = useCallback(() => {
    handleUserActivity();
    setIsPlaying(false);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = maxScroll * 0.26;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, [handleUserActivity]);

  // Navigate to deep interior walkthrough
  const handleNavigateInterior = useCallback(() => {
    handleUserActivity();
    setIsPlaying(false);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = maxScroll * 0.58;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, [handleUserActivity]);

  // Navigate to final walkthrough (master suite & twilight fire terrace)
  const handleNavigateFinalWalkthrough = useCallback(() => {
    handleUserActivity();
    setIsPlaying(false);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = maxScroll * 0.85;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, [handleUserActivity]);

  // Watch film triggers auto-cruise and ambient sound
  const handleWatchFilm = useCallback(() => {
    handleUserActivity();
    if (isMuted) {
      const active = ambientSound.toggle();
      setIsMuted(!active);
    }
    setIsPlaying((prev) => !prev);
  }, [handleUserActivity, isMuted]);

  // Back to top hero
  const handleBackToTop = useCallback(() => {
    handleUserActivity();
    setIsPlaying(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [handleUserActivity]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      className="relative w-full bg-[#050505]"
    >
      {/* Scroll Runway to generate native page scroll height for 9 frames */}
      <div className="h-[900vh] w-full pointer-events-none" />

      {/* Fixed Fullscreen Cinematic Viewport */}
      <div
        className="fixed inset-0 w-screen h-screen overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* HTML5 Retina Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Section 1: Oceanora Luxury Hero UI Overlay (Top Phase) */}
        <OceanoraHeroOverlay
          scrollProgress={progressDisplay}
          onExplore={handleExplore}
          onWatchFilm={handleWatchFilm}
          isPlaying={isPlaying}
        />

        {/* Section 2: Cliffside Luxury Elegance Section (Next Phase, matching WA_1790918771782.jpg) */}
        <CliffsideEleganceSection
          scrollProgress={progressDisplay}
          onNavigateHome={handleBackToTop}
          onNavigateNext={handleNavigateInterior}
          onWatchVideo={handleWatchFilm}
          isPlaying={isPlaying}
        />

        {/* Section 3: Meet Your Agent Martin & Portfolio Cards (Matching WA_1790919342259.png) */}
        <AgentMartinSection
          scrollProgress={progressDisplay}
          onNavigateHome={handleBackToTop}
          onNavigateNext={handleNavigateFinalWalkthrough}
        />

        {/* Minimal Loading State */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white/70 transition-opacity duration-700">
            <div className="w-48 h-[1px] bg-white/10 overflow-hidden mb-4">
              <div
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{
                  width: `${(loadedCount / ESTATE_FRAMES.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Delicate, unboxed scene indicator (auto-hides on inactivity, zero clutter) */}
        <div
          className={`fixed bottom-6 left-8 flex items-baseline gap-2 text-xs tracking-wider transition-opacity duration-700 pointer-events-none ${
            uiVisible && progressDisplay > 0.08 ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-white/60">
            {String(currentChapter.index + 1).padStart(2, '0')} / {String(ESTATE_FRAMES.length).padStart(2, '0')}
          </span>
          <span className="text-white/30">·</span>
          <span className="text-white/70 tracking-widest uppercase text-[11px] font-light">
            {currentChapter.name}
          </span>
        </div>

        {/* Ultra-Minimal Whisper-Quiet Progress Hairline (Right Edge) */}
        <div
          className={`fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 transition-opacity duration-700 pointer-events-none ${
            uiVisible && progressDisplay > 0.05 ? 'opacity-35 hover:opacity-80' : 'opacity-0'
          }`}
        >
          <div className="w-[1px] h-32 bg-white/20 relative rounded-full overflow-hidden">
            <div
              className="w-full bg-white absolute top-0 left-0 transition-transform duration-75 ease-out"
              style={{
                height: '100%',
                transform: `translateY(${(progressDisplay - 1) * 100}%)`,
              }}
            />
          </div>
        </div>

        {/* Minimalist Glass Control Pill (Auto-hides on inactivity) */}
        <div
          className={`fixed bottom-6 right-6 flex items-center gap-1.5 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-opacity duration-700 z-40 ${
            uiVisible ? 'opacity-60 hover:opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Back to Hero Button (shown when scrolled down) */}
          {progressDisplay > 0.08 && (
            <button
              onClick={handleBackToTop}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Return to Hero"
              aria-label="Return to Hero"
            >
              <ArrowUp size={14} />
            </button>
          )}

          {/* Autoplay / Pause */}
          <button
            onClick={() => {
              handleUserActivity();
              setIsPlaying((prev) => !prev);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            title={isPlaying ? 'Pause cruise (Space)' : 'Start auto-cruise (Space)'}
            aria-label="Play or Pause Walkthrough"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            title={isMuted ? 'Enable ambient soundscape' : 'Mute soundscape'}
            aria-label="Ambient Sound Toggle"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            aria-label="Fullscreen Toggle"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>

        {/* Bottom Horizontal Hairline Scroll Indicator */}
        <div className="fixed bottom-0 left-0 right-0 h-[2px] bg-white/5 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-white/30 via-white/70 to-white/90 transition-transform duration-75 ease-out"
            style={{
              transformOrigin: 'left',
              transform: `scaleX(${progressDisplay})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
