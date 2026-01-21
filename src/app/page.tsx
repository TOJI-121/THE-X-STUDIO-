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
        <img 
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/0275218d-55f8-481b-8dc7-0a2ce728d4c4/the-x-white-1768964250150.png?width=8000&height=8000&resize=contain" 
          alt="Logo" 
          width={80} 
          height={80}
        />
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
