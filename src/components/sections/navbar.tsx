"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [activeSegment, setActiveSegment] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "How I Work", href: "#how-i-work", id: "how-i-work" },
    { name: "Case Studies", href: "#case-studies", id: "case-studies" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "About me", href: "#about-me", id: "about-me" },
    { name: "Contact", href: "#contact", id: "contact", icon: <Globe className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map((link) => link.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of [...sections].reverse()) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSegment(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { opacity: 0, y: -20, filter: "blur(10px)" }
  };

  return (
    <>
      <motion.nav 
        className="fixed top-7 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.ul 
          className="glass-panel rounded-full flex items-center justify-center gap-2 px-2 py-2 relative"
          animate={{ 
            scale: isScrolled ? 0.95 : 1,
            backdropFilter: isScrolled ? "blur(20px)" : "blur(12px)"
          }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <li key={link.id} className="relative z-10 rounded-full">
              <a
                href={link.href}
                className={`relative z-10 block cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                  activeSegment === link.id
                    ? "text-foreground mix-blend-difference"
                    : "text-[#b3b3b3] hover:text-foreground"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  setActiveSegment(link.id);
                }}
              >
                <span className="flex items-center gap-2">
                  {link.icon}
                  {link.name}
                </span>
              </a>
              {activeSegment === link.id && (
                <motion.div 
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  layoutId="activeTab"
                  style={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </li>
          ))}
        </motion.ul>
      </motion.nav>

      <motion.div 
        className="fixed top-7 left-6 z-50 md:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
          <a href="#home">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                <Image
                  alt="Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/0275218d-55f8-481b-8dc7-0a2ce728d4c4/the-x-white-1768964250150.png?width=8000&height=8000&resize=contain"
            />
          </motion.div>
        </a>
      </motion.div>

      <motion.div 
        className="fixed top-7 right-6 z-50 md:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.button
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center p-3 rounded-full glass-panel"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6 text-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl md:hidden overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex flex-col items-center justify-center h-full gap-8 px-6"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  variants={mobileItemVariants}
                  className="text-3xl font-display font-bold text-foreground hover:text-[#b3b3b3] transition-colors relative"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ x: 10 }}
                >
                  <span className="absolute -left-8 text-sm text-muted-foreground font-body font-light">
                    0{i + 1}
                  </span>
                  {link.name.toUpperCase()}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg width="0" height="0" className="hidden">
        <defs>
          <filter id="glass-distortion" width="100%" height="100%">
            <feTurbulence baseFrequency="0.01 0.1" numOctaves="1" result="noise" seed="1" />
            <feGaussianBlur in="noise" stdDeviation="2" result="blur" />
            <feDisplacementMap in="SourceGraphic" in2="blur" scale="20" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default Navbar;