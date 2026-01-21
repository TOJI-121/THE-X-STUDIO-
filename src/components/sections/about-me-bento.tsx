"use client";

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import { Github, Instagram, Palette, Code2, Rocket } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const AboutMeBento = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const glow2X = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={sectionRef}
      id="about-me" 
      className="py-20 px-6 md:px-12 lg:px-16 bg-background text-foreground overflow-hidden relative"
    >
      <motion.div 
        className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#FFAA40]/8 blur-[120px] pointer-events-none"
        style={{ x: glowX }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#9C40FF]/8 blur-[100px] pointer-events-none"
        style={{ x: glow2X }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="max-w-[1550px] mx-auto relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[minmax(180px,auto)]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          <motion.div 
            className="col-span-1 md:col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-[#FFAA40] group cursor-pointer relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#FFAA40]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <motion.div className="mb-4 relative z-10">
              <Palette className="w-8 h-8 text-[#FFAA40]" />
            </motion.div>
            <h3 className="font-display text-xl font-bold leading-none uppercase tracking-tight relative z-10">
              Creative<br />Design
            </h3>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-[#9C40FF] group cursor-pointer relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#9C40FF]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <motion.div className="mb-4 relative z-10">
              <Code2 className="w-8 h-8 text-[#9C40FF]" />
            </motion.div>
            <h3 className="font-display text-xl font-bold leading-none uppercase tracking-tight relative z-10">
              Clean<br />Code
            </h3>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-[#22c55e] group cursor-pointer relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <motion.div className="mb-4 relative z-10">
              <Rocket className="w-8 h-8 text-[#22c55e]" />
            </motion.div>
            <h3 className="font-display text-xl font-bold leading-none uppercase tracking-tight relative z-10">
              Fast<br />Delivery
            </h3>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#3b82f6] relative overflow-hidden group"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <h3 className="font-display text-base font-bold uppercase tracking-tight leading-[1.1] relative z-10">
              India<br />Based<br />Studio
            </h3>
            <div className="mt-4 relative z-10">
              <span className="text-[10px] text-muted-foreground font-body">IST (UTC +5:30)</span>
            </div>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-2 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#9C40FF] row-span-2 relative overflow-hidden group"
            variants={cardVariants}
            whileHover={{ y: -8 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#9C40FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <div className="relative z-10">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-4">
                Our<br />Philosophy
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;Every website we create is a strategic asset—designed to convert, engage, and elevate your brand.&rdquo;
              </p>
            </div>
            <div className="mt-6 flex justify-end relative z-10">
              <motion.div 
                className="p-2 border border-border rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 15 }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Rocket className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center items-center transition-all duration-300 hover:border-border-hover relative overflow-hidden group"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-5 h-5 bg-gradient-to-tr from-[#FFAA40] to-[#9C40FF] rounded-sm"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
<span className="font-display font-bold text-sm tracking-widest uppercase">THE X STUDIO</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Code Crafted</span>
              </div>
            </motion.div>

            <motion.div 
              className="col-span-1 md:col-span-3 lg:col-span-4 border border-border rounded-[3rem] bg-black overflow-hidden relative group transition-all duration-300 hover:border-border-hover row-span-2"
              variants={cardVariants}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row h-full">
<div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black flex items-center justify-center">
                    <div className="text-6xl md:text-8xl font-display font-bold bg-gradient-to-br from-[#FFAA40] to-[#9C40FF] bg-clip-text text-transparent">
                      TX
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center border-l border-border/50 relative">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#FFAA40]/10 via-transparent to-[#9C40FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
<motion.h2 
                      className="font-display text-2xl md:text-3xl font-bold tracking-tight uppercase leading-[0.9] mb-4 relative z-10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      THE X STUDIO
                    </motion.h2>
                    <motion.p 
                      className="font-display text-muted-foreground text-xs uppercase tracking-widest mb-8 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      Founder & Creative Director
                    </motion.p>
                  <div className="flex items-center gap-4 relative z-10">
<motion.a 
                        href="https://github.com/TOJI-121" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 border border-border rounded-full hover:bg-white/10 transition-all hover:border-[#FFAA40]"
                        whileHover={{ scale: 1.15, rotate: 10 }}
                      >
                        <Github className="w-5 h-5 text-white" />
                      </motion.a>
                      <motion.a 
                        href="https://www.instagram.com/stvr_toxi" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 border border-border rounded-full hover:bg-white/10 transition-all hover:border-[#9C40FF]"
                        whileHover={{ scale: 1.15, rotate: -10 }}
                      >
                        <Instagram className="w-5 h-5 text-white" />
                      </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

          <motion.div 
            className="col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-between relative transition-all duration-300 hover:border-[#3b82f6] overflow-hidden group"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="flex flex-col items-center justify-center h-full gap-4 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Palette className="w-8 h-8 text-[#3b82f6]" />
              </motion.div>
              <span className="font-body text-xs text-muted-foreground font-medium uppercase">Modern Design</span>
            </div>
          </motion.div>

          <motion.div 
            className="col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-between relative transition-all duration-300 hover:border-[#ffa040] overflow-hidden group"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#ffa040]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="flex flex-col items-center justify-center h-full gap-4 relative z-10">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code2 className="w-8 h-8 text-[#ffa040]" />
              </motion.div>
              <span className="font-body text-xs text-muted-foreground font-medium uppercase text-center">Responsive</span>
            </div>
          </motion.div>

          <motion.div 
            className="col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center items-center gap-2 group transition-all duration-300 hover:border-[#ef4444] cursor-pointer relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.05 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#ef4444]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="font-display font-bold text-[10px] uppercase text-center leading-tight relative z-10">High<br/>Performance</span>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Rocket className="w-6 h-6 text-[#ef4444] relative z-10" />
            </motion.div>
          </motion.div>

          <motion.div 
            className="col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center items-center gap-2 group transition-all duration-300 hover:border-[#9c40ff] cursor-pointer relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.05 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#9c40ff]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-6 h-6 text-[#9c40ff] relative z-10" />
            </motion.div>
            <span className="font-display font-bold text-[10px] uppercase text-center leading-tight relative z-10">SEO<br/>Optimized</span>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-3 lg:col-span-4 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center items-center transition-all duration-300 hover:border-border-hover relative overflow-hidden group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3 
              className="font-display text-sm md:text-base font-bold uppercase tracking-[0.2em] text-center relative z-10"
              animate={{ 
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Reserved for growth projects this quarter
            </motion.h3>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-1 border border-border rounded-[2rem] bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-border-hover relative overflow-hidden group"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="font-display text-xs font-bold uppercase tracking-tight leading-tight relative z-10">
              Global<br />Clients<br />Welcome
            </h3>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutMeBento;
