"use client";

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Palette, Code2, Rocket, ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Custom Website Design",
    description: "We design modern, responsive websites that reflect your brand identity while prioritizing usability, performance, and conversion.",
    icon: <Palette className="w-5 h-5" />,
    color: "#FFAA40",
  },
  {
    title: "Frontend Development",
    description: "Clean, scalable, and maintainable frontend development using modern frameworks. Ensures fast loading times and seamless user experience.",
    icon: <Code2 className="w-5 h-5" />,
    color: "#9C40FF",
  },
  {
    title: "Deployment & Optimization",
    description: "Full deployment workflow, performance tuning, and optimization for SEO and speed. Your website remains reliable and production-ready.",
    icon: <Rocket className="w-5 h-5" />,
    color: "#22C55E",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      className="min-w-[85%] md:min-w-0 snap-center"
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
    >
      <div
        className="bg-black/80 backdrop-blur-xl border border-[#353739] rounded-[2rem] p-8 flex flex-col gap-6 transition-all duration-300 group cursor-pointer relative overflow-hidden h-full hover:border-[#555759]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.color}15, transparent 60%)`
          }}
        />
        
        <motion.div 
          className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all relative z-10"
          style={{ color: service.color }}
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: index * 0.5
          }}
        >
          {service.icon}
        </motion.div>
        
        <div className="flex flex-col gap-3 relative z-10">
          <h3 className="font-display text-[#ffffff] text-lg font-semibold tracking-tight">
            {service.title}
          </h3>
          <p className="font-body text-[#b3b3b3] text-sm leading-relaxed font-light">
            {service.description}
          </p>
        </div>

        <div className="mt-auto pt-4 relative z-10">
          <motion.div 
            className="h-[2px] w-0 group-hover:w-full rounded-full transition-all duration-500"
            style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }}
          />
        </div>

        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: service.color }}
        />
      </div>
    </motion.div>
  );
}

const ServicesCards = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const containerY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="w-full bg-black py-12 px-6 overflow-hidden relative">
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#FFAA40]/8 via-[#9C40FF]/8 to-[#22C55E]/8 blur-[80px] pointer-events-none"
        style={{ scale: glowScale }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div 
        className="max-w-[1550px] mx-auto relative z-10"
        style={{ y: containerY }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div 
          className="bg-black/60 backdrop-blur-2xl border border-[#353739] rounded-[2rem] p-8 md:p-10 transition-all duration-300 hover:border-[#555759] relative overflow-hidden"
          whileHover={{ borderColor: "#555759" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#FFAA40]/5 via-transparent to-[#9C40FF]/5 opacity-0 hover:opacity-100 transition-opacity duration-500"
          />

          <motion.div 
            className="flex items-center justify-between mb-10 relative z-10"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-display text-[#ffffff] text-xl md:text-2xl tracking-tight flex items-center gap-3">
              <span>OUR SERVICES</span>
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 opacity-70" />
              </motion.span>
            </h2>
          </motion.div>

          <motion.div 
            className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ perspective: "1000px" }}
          >
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 pt-12 border-t border-[#353739] grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div>
              <h4 className="font-display text-[#ffffff] text-lg mb-2 tracking-tight">
                LET&apos;S BUILD TOGETHER
              </h4>
              <p className="font-body text-[#b3b3b3] text-sm font-light">
                Reserved for growth projects this quarter.
              </p>
            </div>
              <div className="flex flex-col md:items-end gap-2">
                <span className="font-body text-[10px] text-[#b3b3b3] uppercase tracking-[0.2em]">Email</span>
                <motion.a 
href="mailto:thexstudiodev@gmail.com" 
                    className="font-body text-[#ffffff] text-base md:text-lg hover:text-[#b3b3b3] transition-colors flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    thexstudiodev@gmail.com
                </motion.a>
              </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ServicesCards;
