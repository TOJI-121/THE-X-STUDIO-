"use client";

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Mail, MessageCircle, ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const MethodologyBento = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const tools = [
    { name: 'Email', icon: <Mail className="w-6 h-6 text-[#FFAA40]" /> },
    { name: 'WhatsApp', icon: <MessageCircle className="w-6 h-6 text-[#25D366]" /> },
    { 
      name: 'Discord', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#5865F2">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ) 
    },
    { 
      name: 'Slack', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M6 14.5C6 15.8807 4.88071 17 3.5 17C2.11929 17 1 15.8807 1 14.5C1 13.1193 2.11929 12 3.5 12H6V14.5Z" fill="#36C5F0"/>
          <path d="M7 14.5C7 13.1193 8.11929 12 9.5 12C10.8807 12 12 13.1193 12 14.5V19.5C12 20.8807 10.8807 22 9.5 22C8.11929 22 7 20.8807 7 19.5V14.5Z" fill="#36C5F0"/>
          <path d="M9.5 6C8.11929 6 7 4.88071 7 3.5C7 2.11929 8.11929 1 9.5 1C10.8807 1 12 2.11929 12 3.5V6H9.5Z" fill="#2EB67D"/>
          <path d="M9.5 7C10.8807 7 12 8.11929 12 9.5C12 10.8807 10.8807 12 9.5 12H4.5C3.11929 12 2 10.8807 2 9.5C2 8.11929 3.11929 7 4.5 7H9.5Z" fill="#2EB67D"/>
        </svg>
      )
    },
    { 
      name: 'Notion', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.449.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854l-1.168-.093c-.093-.42.14-1.026.793-1.073l3.455-.234 4.764 7.279V9.294l-1.215-.14c-.093-.514.28-.886.747-.933l3.222-.186z"/>
        </svg>
      )
    },
    { 
      name: 'Figma', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
          <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
          <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
          <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
          <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
        </svg>
      )
    }
  ];

  const skills = [
    'React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'GSAP', 
    'Node.js', 'Vercel', 'Figma', 'SEO', 'Performance', 'Accessibility'
  ];

  return (
    <section 
      ref={sectionRef}
      id="how-i-work" 
      className="py-20 px-6 md:px-12 lg:px-16 bg-black overflow-hidden relative"
    >
      <motion.div 
        className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FFAA40]/10 blur-[120px] pointer-events-none"
        style={{ y: glowY }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#9C40FF]/10 blur-[100px] pointer-events-none"
        style={{ y: glow2Y }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="grid grid-cols-1 min-[907px]:grid-cols-2 min-[1390px]:grid-cols-3 gap-6 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          <motion.div 
            className="bg-black/80 backdrop-blur-xl border border-[#353739] rounded-[32px] p-8 flex flex-col transition-all duration-300 hover:border-[#555759] relative overflow-hidden group"
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#FFAA40]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <h3 className="font-display text-xl uppercase tracking-tight text-[#f2f2f2] mb-2 leading-none relative z-10">How We Work</h3>
            <p className="font-body text-sm text-[#b3b3b3] mb-7 font-light relative z-10">
              Simple, transparent communication. We&apos;re available via
            </p>
            
            <div className="grid grid-cols-2 [@media(min-width:353px)]:grid-cols-3 gap-4 mb-8 flex-1 content-center relative z-10">
              {tools.map((tool, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex flex-col items-center justify-center gap-2 w-full h-24 border border-[#353739] rounded-2xl hover:border-[#555759] transition-all duration-200 group/tool cursor-pointer bg-black/50"
                  whileHover={{ scale: 1.05, borderColor: "#FFAA40" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tool.icon}
                  <span className="font-body text-xs text-[#b3b3b3] font-light group-hover/tool:text-white transition-colors">{tool.name}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.button 
              className="w-full px-6 py-3 border border-[#353739] rounded-full font-display text-xs uppercase tracking-wider text-[#f2f2f2] cursor-pointer hover:border-[#555759] transition-colors relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get In Touch</span>
            </motion.button>
          </motion.div>

          <motion.div className="flex flex-col gap-6" variants={cardVariants}>
            <motion.div 
              className="bg-black/80 backdrop-blur-xl border border-[#353739] rounded-[32px] p-6 flex items-center transition-all duration-300 hover:border-[#555759] group relative overflow-hidden"
              whileHover={{ y: -3 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <motion.div 
                className="flex-shrink-0 w-24 h-24 flex items-center justify-center mr-6 relative z-10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <BarChart3 className="w-16 h-16 text-[#3b82f6] opacity-80 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <div className="flex flex-col relative z-10">
                <h4 className="font-display text-xl uppercase tracking-tight text-[#f2f2f2] mb-1">Results</h4>
                <p className="text-[#b3b3b3] font-body font-light text-sm leading-snug">
                  High-performance websites<br />that convert and engage
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 flex-1">
              <motion.div 
                className="bg-black/80 backdrop-blur-xl border border-[#353739] rounded-[32px] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#555759] group relative overflow-hidden"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div 
                  className="mb-6 relative z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ShieldCheck className="w-12 h-12 text-[#22c55e]" />
                </motion.div>
                <h4 className="font-display text-lg uppercase tracking-tight text-[#f2f2f2] mb-2 relative z-10">Reliable</h4>
                <p className="text-[#b3b3b3] font-body font-light text-xs leading-relaxed relative z-10">
                  Production-ready<br />code with best<br />practices
                </p>
              </motion.div>

              <motion.div 
                className="bg-black/80 backdrop-blur-xl border border-[#353739] rounded-[32px] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#555759] group relative overflow-hidden"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#ffa040]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div 
                  className="mb-6 relative z-10"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-12 h-12 text-[#ffa040]" />
                </motion.div>
                <h4 className="font-display text-lg uppercase tracking-tight text-[#f2f2f2] mb-2 relative z-10">Fast</h4>
                <p className="text-[#b3b3b3] font-body font-light text-xs leading-relaxed relative z-10">
                  Quick turnaround<br />without compromising<br />quality
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-black/80 backdrop-blur-xl border border-[#353739] rounded-[32px] p-8 flex flex-col transition-all duration-300 hover:border-[#555759] min-[907px]:order-4 min-[1390px]:order-3 overflow-hidden relative group"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#9C40FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <h3 className="font-display text-xl uppercase tracking-tight text-[#f2f2f2] mb-6 relative z-10">Our Stack</h3>
            
            <div className="flex-1 flex flex-col justify-center gap-4 relative z-10">
              <div className="flex flex-wrap gap-2 py-4">
                {skills.map((skill, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-2 px-4 py-2 border border-[#353739] rounded-full bg-white/5 whitespace-nowrap cursor-pointer hover:border-[#9C40FF] transition-colors"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    whileHover={{ scale: 1.08, borderColor: "#9C40FF" }}
                  >
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#FFAA40] to-[#9C40FF] opacity-80"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="font-body text-xs text-[#f2f2f2]">{skill}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-6 border-t border-[#353739]">
                <p className="text-xs text-[#b3b3b3] font-body mb-2 font-light">Need something specific?</p>
                <motion.button 
                  className="flex items-center gap-2 font-display text-sm uppercase tracking-wider text-white group/btn"
                  whileHover={{ x: 5 }}
                >
                  Let&apos;s Talk 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default MethodologyBento;
