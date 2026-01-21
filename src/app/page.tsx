"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import MethodologyBento from "@/components/sections/methodology-bento";
import ServicesCards from "@/components/sections/services-cards";
import CaseStudies from "@/components/sections/case-studies";
import SkillsGrid from "@/components/sections/skills-grid";
import AboutMeBento from "@/components/sections/about-me-bento";
import ContactFooter from "@/components/sections/contact-footer";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          const offset = isHovering ? 30 : 10;
          cursorRef.current.style.transform = `translate(${mousePos.current.x - offset}px, ${mousePos.current.y - offset}px)`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px)`;
        }
        rafRef.current = undefined;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovering = !!(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      );
      setIsHovering(hovering);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        style={{
          width: isHovering ? 60 : 20,
          height: isHovering ? 60 : 20,
          borderColor: isHovering ? "#FFAA40" : "white",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot hidden md:block"
      />
    </>
  );
}

function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <svg width="80" height="80" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradient" x1="0" y1="240" x2="480" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFAA40"/>
              <stop offset="1" stopColor="#9C40FF"/>
            </linearGradient>
          </defs>
          <path 
            d="M240 240C240 255.759 236.896 271.363 230.866 285.922C229.017 290.385 226.903 294.723 224.541 298.915L471.014 291.277C475.931 291.125 480 295.07 480 299.989C480 304.916 475.919 308.864 470.995 308.701L223.629 300.508C218.452 309.375 212.147 317.56 204.855 324.853C193.713 335.996 180.486 344.835 165.928 350.865C151.37 356.896 135.766 360 120.009 360C104.252 360 88.6486 356.896 74.0908 350.865C59.5329 344.835 46.3052 335.996 35.1631 324.853C24.021 313.71 15.1824 300.481 9.15234 285.922C3.12227 271.363 0.0185547 255.759 0.0185547 240H240ZM0 180.011C0 175.084 4.0807 171.136 9.00488 171.299L256.37 179.493C261.547 170.626 267.853 162.44 275.145 155.147C286.287 144.004 299.514 135.165 314.072 129.135C328.63 123.104 344.234 120 359.991 120C375.748 120 391.351 123.104 405.909 129.135C420.467 135.165 433.695 144.004 444.837 155.147C455.979 166.29 464.818 179.519 470.848 194.078C476.878 208.637 479.981 224.241 479.981 240L240 240C240 224.241 243.104 208.637 249.134 194.078C250.982 189.615 253.096 185.277 255.458 181.086L8.98633 188.723C4.06917 188.875 8.51239e-05 184.93 0 180.011Z" 
            fill="url(#logoGradient)"
          />
        </svg>
      </div>

      <div className="w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, #FFAA40, #9C40FF, #3b82f6)",
          }}
        />
      </div>

      <p className="mt-4 font-display text-xs tracking-[0.3em] text-white/50">
        LOADING
      </p>
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 50);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="loader" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {showContent && (
        <main className="grain-overlay">
          <CustomCursor />
          <Navbar />
          <HeroSection />
          <MethodologyBento />
          <ServicesCards />
          <CaseStudies />
          <SkillsGrid />
          <AboutMeBento />
          <ContactFooter />
        </main>
      )}
    </>
  );
}
