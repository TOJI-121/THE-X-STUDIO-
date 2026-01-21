"use client";

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const SKILLS_DATA = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'frontend' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'frontend' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'frontend' },
  { name: 'Framer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg', category: 'frontend' },
  { name: 'GSAP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'frontend' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'backend' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', category: 'backend' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'backend' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'backend' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'devops' },
  { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png', category: 'devops' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'design' },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', category: 'backend' },
  { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', category: 'frontend' },
  { name: 'Netlify', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg', category: 'devops' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', category: 'backend' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'frontend' },
];

const SkillsGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="w-full bg-[#000000] py-24 md:py-32 px-6 overflow-hidden relative"
    >
      <motion.div 
        className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FFAA40]/8 blur-[120px] pointer-events-none"
        style={{ y: glowY }}
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
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#9C40FF]/8 blur-[100px] pointer-events-none"
        style={{ y: glow2Y }}
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

      <div className="container mx-auto max-w-[1550px] relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p 
            className="font-body text-xs font-medium tracking-[0.2em] text-[#b3b3b3] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Our Tech Stack
          </motion.p>
          <motion.h2 
            className="font-display text-[#ffffff] text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[0.9] max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Modern Tools for Modern Websites
          </motion.h2>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-t border-[#353739]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {SKILLS_DATA.map((skill, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center justify-center p-8 md:p-12 border-r border-b border-[#353739] transition-all duration-300 hover:bg-[#ffffff]/[0.05] group relative min-h-[160px] cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#FFAA40]/15 to-[#9C40FF]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div 
                  className="relative w-10 h-10 md:w-12 md:h-12 mb-6 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 flex items-center justify-center z-10 transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    className="object-contain w-full h-full"
                    loading="lazy"
                  />
                </motion.div>
                <span className="font-body text-[13px] font-medium text-[#b3b3b3] group-hover:text-[#ffffff] transition-colors duration-300 uppercase tracking-wider relative z-10">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <span className="font-body text-sm text-[#b3b3b3] font-light">Need something specific?</span>
            <motion.button 
              className="px-6 py-2 border border-[#353739] rounded-full bg-transparent group cursor-pointer hover:border-[#FFAA40] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-display text-xs font-semibold text-[#ffffff] uppercase tracking-wider flex items-center gap-2">
                Let&apos;s Talk 
                <motion.span 
                  className="text-lg"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsGrid;
