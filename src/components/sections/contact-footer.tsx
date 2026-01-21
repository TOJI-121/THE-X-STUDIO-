"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Mail, Instagram, Github, Copy, ExternalLink, Check, Loader2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
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

const ContactFooter = () => {
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("thexstudiodev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer 
      ref={sectionRef}
      id="contact" 
      className="w-full bg-black pt-24 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden relative"
    >
      <motion.div 
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FFAA40]/8 blur-[120px] pointer-events-none"
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
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#9C40FF]/8 blur-[100px] pointer-events-none"
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

      <div className="max-w-[1550px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          <motion.div 
            className="flex flex-col justify-start"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] tracking-tight text-white mb-6"
              variants={itemVariants}
            >
              LET&apos;S BUILD<br />TOGETHER
            </motion.h2>
            <motion.p 
              className="font-body text-[#b3b3b3] text-lg max-w-md leading-relaxed mb-12"
              variants={itemVariants}
            >
              Turn your vision into reality with a creative partner who crafts modern, high-performance websites.
            </motion.p>

            <motion.div 
              className="flex flex-col gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className="group flex items-center justify-between p-5 rounded-2xl border border-[#353739] bg-black/60 backdrop-blur-xl hover:border-[#FFAA40] transition-all duration-300 cursor-pointer relative overflow-hidden"
                onClick={handleCopyEmail}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#FFAA40]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white border border-[#353739] group-hover:border-[#FFAA40] transition-all"
                    whileHover={{ rotate: 10 }}
                  >
                    <Mail size={18} />
                  </motion.div>
                  <span className="font-body text-sm text-[#b3b3b3] group-hover:text-white transition-colors">
                    thexstudiodev@gmail.com
                  </span>
                </div>
                <button className="text-[#b3b3b3] hover:text-white transition-colors relative z-10">
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </motion.div>

              <motion.a 
                href="https://www.instagram.com/stvr_toxi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-2xl border border-[#353739] bg-black/60 backdrop-blur-xl hover:border-[#9C40FF] transition-all duration-300 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#9C40FF]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white border border-[#353739] group-hover:border-[#9C40FF] transition-all"
                    whileHover={{ rotate: -10 }}
                  >
                    <Instagram size={18} />
                  </motion.div>
                  <span className="font-body text-sm text-[#b3b3b3] group-hover:text-white transition-colors">
                    @stvr_toxi
                  </span>
                </div>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ExternalLink size={18} className="text-[#b3b3b3] group-hover:text-white transition-colors relative z-10" />
                </motion.div>
              </motion.a>

              <motion.a 
                href="https://github.com/TOJI-121" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-2xl border border-[#353739] bg-black/60 backdrop-blur-xl hover:border-[#3b82f6] transition-all duration-300 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white border border-[#353739] group-hover:border-[#3b82f6] transition-all"
                    whileHover={{ rotate: 10 }}
                  >
                    <Github size={18} />
                  </motion.div>
                  <span className="font-body text-sm text-[#b3b3b3] group-hover:text-white transition-colors">
                    @TOJI-121
                  </span>
                </div>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <ExternalLink size={18} className="text-[#b3b3b3] group-hover:text-white transition-colors relative z-10" />
                </motion.div>
              </motion.a>

              <motion.a 
                href="https://discord.gg/VSs3XrZu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-2xl border border-[#353739] bg-black/60 backdrop-blur-xl hover:border-[#5865F2] transition-all duration-300 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white border border-[#353739] group-hover:border-[#5865F2] transition-all"
                    whileHover={{ rotate: -10 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </motion.div>
                  <span className="font-body text-sm text-[#b3b3b3] group-hover:text-white transition-colors">
                    Discord Server
                  </span>
                </div>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.75 }}
                >
                  <ExternalLink size={18} className="text-[#b3b3b3] group-hover:text-white transition-colors relative z-10" />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <motion.div 
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <label className="font-body text-sm text-white font-medium ml-1">Name</label>
                <motion.input 
                  type="text" 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-black/60 backdrop-blur-xl border rounded-xl px-5 py-4 text-[#f2f2f2] placeholder:text-[#3a3a3a] focus:outline-none transition-all duration-300 font-body ${focusedField === "name" ? "border-[#FFAA40]" : "border-[#353739]"}`}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              <motion.div 
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <label className="font-body text-sm text-white font-medium ml-1">Email</label>
                <motion.input 
                  type="email" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-black/60 backdrop-blur-xl border rounded-xl px-5 py-4 text-[#f2f2f2] placeholder:text-[#3a3a3a] focus:outline-none transition-all duration-300 font-body ${focusedField === "email" ? "border-[#9C40FF]" : "border-[#353739]"}`}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              <motion.div 
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label className="font-body text-sm text-white font-medium ml-1">Message</label>
                <motion.textarea 
                  rows={6}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full bg-black/60 backdrop-blur-xl border rounded-xl px-5 py-4 text-[#f2f2f2] placeholder:text-[#3a3a3a] focus:outline-none transition-all duration-300 font-body resize-none ${focusedField === "message" ? "border-[#3b82f6]" : "border-[#353739]"}`}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              <motion.div 
                className="relative mt-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-4 rounded-xl font-display text-xs tracking-[0.2em] text-white border border-[#353739] bg-black/60 backdrop-blur-xl z-10 overflow-hidden hover:border-white transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {submitStatus === "success" ? "MESSAGE SENT!" : submitStatus === "error" ? "FAILED - TRY AGAIN" : "SEND A MESSAGE"}
                  </span>
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 via-purple-500 to-blue-400"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  />
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        <motion.div 
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#353739] to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-6 font-body text-[12px] text-[#555759]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <p>Copyright © 2025 THE X STUDIO</p>
          
          <div className="flex items-center gap-8">
            <motion.a 
              href="https://github.com/TOJI-121" 
              className="flex items-center gap-2 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              <Github size={14} /> Github
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/stvr_toxi" 
              className="flex items-center gap-2 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              <Instagram size={14} /> Instagram
            </motion.a>
          </div>

          <span className="text-[#555759]">
            India — IST (UTC +5:30)
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default ContactFooter;
