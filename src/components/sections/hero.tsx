"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";

export default function HeroSection() {
  const [time, setTime] = useState("--:--");
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.3]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0.3]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("thexstudiodev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -80 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const word1 = "CODE";
  const word2 = "CRAFTED";

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/0275218d-55f8-481b-8dc7-0a2ce728d4c4/From-KlickPin-CF-Wavy-Background-Roxo-_-Fundos-em-movimento-Graficos-de-movimento-Papeis-de-parede-em-movimento-1768918331283.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </motion.div>

      <motion.div 
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,170,64,0.5) 0%, transparent 70%)" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-20 blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(156,64,255,0.5) 0%, transparent 70%)" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div 
        className="relative z-10 flex h-full flex-col"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex flex-1 items-center justify-center">
          <div className="container relative z-10 px-6 md:px-16 -mt-24 md:-mt-32">
            <h1 className="hero-heading text-white font-display text-left overflow-hidden perspective-1000">
              <span className="block overflow-hidden">
                {word1.split("").map((char, i) => (
                  <motion.span
                    key={`w1-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block origin-bottom"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden mt-2">
                {word2.split("").map((char, i) => (
                  <motion.span
                    key={`w2-${i}`}
                    custom={i + word1.length + 2}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block origin-bottom"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>
        </div>

        <motion.div 
          className="container mx-auto px-6 md:px-16 pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <motion.div variants={itemVariants} className="flex flex-col gap-6 items-start">
              <div className="flex flex-col gap-3 group">
                <motion.button 
                  className="glass-panel relative z-10 flex h-[52px] cursor-pointer items-center justify-between gap-8 rounded-full pl-7 pr-1 transition-all hover:border-border-hover overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FFAA40]/20 to-[#9C40FF]/20 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="font-display text-sm font-bold uppercase tracking-wider text-white relative z-10">
                    let&apos;s connect
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white relative z-10">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </motion.button>
                
                <motion.div 
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <button 
                    onClick={handleCopyEmail}
                    className="group/copy flex items-center justify-center rounded p-1 transition-colors hover:bg-white/5"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-[#b3b3b3] group-hover/copy:text-white transition-colors" />
                    )}
                  </button>
                    <span className="font-body text-base font-light text-[#b3b3b3] cursor-pointer hover:text-white transition-colors">
                      thexstudiodev@gmail.com
                    </span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="hidden md:flex justify-end text-right"
            >
              <p className="max-w-md font-body text-[18px] font-light leading-relaxed text-[#b3b3b3]">
                <span className="block">Creative web agency crafting</span>
                <span className="block">modern, high-performance websites</span>
                <span className="block">that convert and elevate brands.</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 z-20 w-full -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 font-body text-xs md:text-sm font-light tracking-wide text-[#b3b3b3] whitespace-nowrap px-4">
            <div className="relative flex items-center justify-center mr-1">
              <motion.span 
                className="status-dot"
                animate={{
                  boxShadow: [
                    "0 0 8px #22c55e",
                    "0 0 20px #22c55e",
                    "0 0 8px #22c55e",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="absolute h-2 w-2 rounded-full bg-green-500 opacity-50 animate-ping"></span>
            </div>
            
            <div className="flex items-center gap-2 md:hidden">
              <span>India Based</span>
              <span className="opacity-30">•</span>
              <span>Growth Projects</span>
              <span className="opacity-30">•</span>
              <span className="tabular-nums">{time}</span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <span>Reserved for Growth Projects</span>
              <span className="opacity-30">•</span>
              <span>India</span>
              <span className="opacity-30">•</span>
              <span className="tabular-nums font-medium">{time} IST</span>
              <span className="opacity-30">•</span>
              <span>Global clients welcome</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
