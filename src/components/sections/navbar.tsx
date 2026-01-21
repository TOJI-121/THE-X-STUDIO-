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
                src="data:image/svg+xml,%3csvg%20width='480'%20height='480'%20viewBox='0%200%20480%20480'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_619_206)'%3e%3cpath%20d='M240%20240C240%20255.759%20236.896%20271.363%20230.866%20285.922C229.017%20290.385%20226.903%20294.723%20224.541%20298.915L471.014%20291.277C475.931%20291.125%20480%20295.07%20480%20299.989C480%20304.916%20475.919%20308.864%20470.995%20308.701L223.629%20300.508C218.452%20309.375%20212.147%20317.56%20204.855%20324.853C193.713%20335.996%20180.486%20344.835%20165.928%20350.865C151.37%20356.896%20135.766%20360%20120.009%20360C104.252%20360%2088.6486%20356.896%2074.0908%20350.865C59.5329%20344.835%2046.3052%20335.996%2035.1631%20324.853C24.021%20313.71%2015.1824%20300.481%209.15234%20285.922C3.12227%20271.363%200.0185547%20255.759%200.0185547%20240H240ZM0%20180.011C0%20175.084%204.0807%20171.136%209.00488%20171.299L256.37%20179.493C261.547%20170.626%20267.853%20162.44%20275.145%20155.147C286.287%20144.004%20299.514%20135.165%20314.072%20129.135C328.63%20123.104%20344.234%20120%20359.991%20120C375.748%20120%20391.351%20123.104%20405.909%20129.135C420.467%20135.165%20433.695%20144.004%20444.837%20155.147C455.979%20166.29%20464.818%20179.519%20470.848%20194.078C476.878%20208.637%20479.981%20224.241%20479.981%20240L240%20240C240%20224.241%20243.104%20208.637%20249.134%20194.078C250.982%20189.615%20253.096%20185.277%20255.458%20181.086L8.98633%20188.723C4.06917%20188.875%208.51239e-05%20184.93%200%20180.011Z'%20fill='url(%23paint0_linear_619_206)'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_619_206'%20x1='0'%20y1='240'%20x2='480'%20y2='240'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FFAA40'/%3e%3cstop%20offset='1'%20stop-color='%239C40FF'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_619_206'%3e%3crect%20width='480'%20height='480'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
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