"use client";

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, MoveRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const techStackItems = [
  { name: 'Next.js', icon: <span className="text-2xl font-bold bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-display">N</span> },
  { name: 'React', icon: <div className="w-8 h-8 rounded-full bg-[#61DAFB]/20 flex items-center justify-center"><span className="text-[#61DAFB] text-lg">⚛</span></div> },
  { name: 'Tailwind', icon: <div className="w-8 h-8 rounded-full bg-[#38BDF8]/20 flex items-center justify-center"><span className="text-[#38BDF8] text-sm font-bold">TW</span></div> },
  { name: 'TypeScript', icon: <div className="w-8 h-8 bg-[#3178C6] rounded-sm flex items-center justify-center"><span className="text-white text-xs font-bold">TS</span></div> },
  { name: 'Framer', icon: <div className="w-8 h-8 rounded-full bg-[#0055FF]/20 flex items-center justify-center"><span className="text-[#0055FF] text-lg">F</span></div> },
  { name: 'Vercel', icon: <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><span className="text-white text-lg">▲</span></div> },
];

const CaseStudies = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const glow2X = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={sectionRef}
      id="case-studies" 
      className="py-20 px-6 md:px-12 lg:px-16 bg-black w-full overflow-hidden relative"
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span 
            className="text-[12px] font-body font-light tracking-[0.2em] text-[#b3b3b3] uppercase block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Case Study
          </motion.span>
          <motion.h2 
            className="text-[clamp(2.5rem,5vw,4rem)] font-heading font-bold text-foreground leading-none tracking-tight m-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            NURA SAGE
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div 
            className="lg:col-span-8 flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="relative aspect-video rounded-[32px] overflow-hidden border border-[#353739] bg-[#0a0a0a] group hover:border-[#555759] transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
            >
              <iframe
                src="https://nura-sage.vercel.app/"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                title="Nura Sage Website Preview"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <motion.a 
                href="https://nura-sage.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-8 left-8 z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.div 
                  className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center gap-2"
                  whileHover={{ scale: 1.05, borderColor: "#FFAA40" }}
                >
                  <span className="font-display text-xs uppercase tracking-wider text-white">View Live</span>
                  <ExternalLink className="w-4 h-4 text-white" />
                </motion.div>
              </motion.a>
            </motion.div>

            <motion.div 
              className="bg-black/80 backdrop-blur-xl border border-[#353739] rounded-[32px] p-8 flex flex-wrap items-center justify-around gap-8 hover:border-[#555759] transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {techStackItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  whileHover={{ scale: 1.15, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <motion.div 
                    className="w-10 h-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-[12px] font-body text-[#b3b3b3]">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-4 bg-black/80 backdrop-blur-xl border border-[#353739] rounded-[32px] p-10 flex flex-col justify-between h-full hover:border-[#555759] transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, x: 80, rotateY: -10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: parallaxY }}
            whileHover={{ y: -10, borderColor: "#9C40FF" }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#9C40FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <div className="relative z-10">
              <motion.h3 
                className="text-2xl font-heading font-bold text-foreground mb-4 uppercase tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                BUSINESS WEBSITE
              </motion.h3>
              <motion.p 
                className="text-[13px] font-body text-[#b3b3b3] mb-8 leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
              >
                A professionally designed website for a growing business to establish credibility, engage users, and generate leads.
              </motion.p>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <h4 className="text-[12px] font-heading font-semibold text-foreground tracking-[0.1em] mb-4 uppercase">PROBLEM</h4>
                  <ul className="space-y-3">
                    {['Inconsistent branding', 'Low user engagement', 'Limited online visibility'].map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="text-[14px] font-body text-[#b3b3b3] font-light flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.9 + i * 0.1 }}
                      >
                        <motion.span 
                          className="mt-1.5 w-1.5 h-1.5 bg-white/40 rounded-full shrink-0"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.0 }}
                >
                  <h4 className="text-[12px] font-heading font-semibold text-foreground tracking-[0.1em] mb-4 uppercase">SOLUTION</h4>
                  <ul className="space-y-3">
                    {[
                      'Clean, minimal UI with clear hierarchy',
                      'Fully responsive design for all devices',
                      'Optimized for speed, usability, and conversions'
                    ].map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="text-[14px] font-body text-[#b3b3b3] font-light flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.1 + i * 0.1 }}
                      >
                        <motion.span 
                          className="mt-1.5 w-1.5 h-1.5 bg-white/40 rounded-full shrink-0"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2 }}
                >
                  <h4 className="text-[12px] font-heading font-semibold text-foreground tracking-[0.1em] mb-4 uppercase">IMPACT</h4>
                  <ul className="space-y-3">
                    <motion.li 
                      className="text-[14px] font-body text-[#60a5fa] font-medium flex items-start gap-2"
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0"
                        animate={{ 
                          boxShadow: ["0 0 0px #60a5fa", "0 0 10px #60a5fa", "0 0 0px #60a5fa"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Strengthened brand perception
                    </motion.li>
                    <motion.li 
                      className="text-[14px] font-body text-[#22c55e] font-medium flex items-start gap-2"
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"
                        animate={{ 
                          boxShadow: ["0 0 0px #22c55e", "0 0 10px #22c55e", "0 0 0px #22c55e"]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      Increased user engagement
                    </motion.li>
                    <motion.li 
                      className="text-[14px] font-body text-[#FFAA40] font-medium flex items-start gap-2"
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="mt-1.5 w-1.5 h-1.5 bg-[#FFAA40] rounded-full shrink-0"
                        animate={{ 
                          boxShadow: ["0 0 0px #FFAA40", "0 0 10px #FFAA40", "0 0 0px #FFAA40"]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      Ready for digital marketing
                    </motion.li>
                  </ul>
                </motion.div>
              </div>
            </div>

            <motion.div 
              className="mt-12 flex items-center justify-end relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 }}
            >
              <motion.a 
                href="https://nura-sage.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group/link text-[14px] font-heading font-semibold text-foreground uppercase tracking-widest hover:opacity-80 transition-opacity"
                whileHover={{ x: 5 }}
              >
                VIEW PROJECT
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <MoveRight size={20} />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
