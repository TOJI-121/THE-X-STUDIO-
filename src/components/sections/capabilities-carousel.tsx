"use client";

import React from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";

/**
 * CapabilitiesCarousel Component
 * Displays a marquee-style horizontal scrolling skill rows.
 * Featured stack: Python, TypeScript, React, LangChain, etc.
 */

const stackRow1 = [
  { name: "Python", icon: "python" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "Vite", icon: "vite" },
];

const stackRow2 = [
  { name: "LangChain", icon: "langchain" },
  { name: "OpenAI API", icon: "openai" },
  { name: "Hugging Face", icon: "huggingface" },
  { name: "OpenCV", icon: "opencv" },
  { name: "Pinecone", icon: "pinecone" },
  { name: "Prisma", icon: "prisma" },
];

const SkillBadge = ({ name, icon }: { name: string; icon: string }) => {
  // Mapping for custom SVGs
  const langchainAsset = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/langchain.svg";

  const renderIcon = () => {
    if (icon === "langchain") {
      return <Image src={langchainAsset} alt="LangChain" width={24} height={24} className="w-6 h-6 object-contain" />;
    }
    
    // For others, we use simplified colored shapes mimicking the original logo colors if assets aren't explicit
    // Python (Blue/Yellow), TS (Blue), React (Cyan), NextJs (Black/White circle), OpenAI (Green), HF (Yellow)
    const iconColors: Record<string, string> = {
      python: "bg-blue-500",
      typescript: "bg-blue-600",
      react: "bg-cyan-400",
      nextjs: "bg-white",
      fastapi: "bg-emerald-500",
      vite: "bg-purple-500",
      openai: "bg-green-600",
      huggingface: "bg-yellow-400",
      opencv: "bg-red-500",
      pinecone: "bg-black",
      prisma: "bg-slate-300",
    };

    return (
      <div className={`w-5 h-5 rounded-sm ${iconColors[icon] || "bg-gray-500"} flex items-center justify-center text-[8px] font-bold text-black uppercase`}>
        {name.substring(0, 1)}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 border border-[#353739] rounded-full bg-black/20 whitespace-nowrap">
      <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
        {renderIcon()}
      </div>
      <span className="font-body text-sm text-[#f2f2f2]">{name}</span>
    </div>
  );
};

export default function CapabilitiesCarousel() {
  return (
    <div className="bg-black border border-[#353739] rounded-[2rem] p-6 h-full flex flex-col justify-between overflow-hidden relative group hover:border-[#555759] transition-colors duration-300">
      <div className="mb-8">
        <h3 className="font-display text-xl tracking-tight text-[#f2f2f2] uppercase font-bold">Capabilities</h3>
      </div>

      <div className="flex-1 flex flex-col gap-6 justify-center relative -mx-6">
        {/* Left/Right Fades for Marquee */}
        <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Marquee Left */}
        <div className="flex overflow-hidden">
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[...stackRow1, ...stackRow1].map((skill, idx) => (
              <SkillBadge key={`${skill.name}-r1-${idx}`} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>

        {/* Row 2 - Marquee Right (or staggered) */}
        <div className="flex overflow-hidden">
          <div className="flex gap-3 animate-marquee-reverse whitespace-nowrap">
             {[...stackRow2, ...stackRow2].map((skill, idx) => (
              <SkillBadge key={`${skill.name}-r2-${idx}`} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="font-body text-xs text-[#b3b3b3] mb-2 font-light">Don&apos;t see your stack?</p>
        <button className="flex items-center gap-2 group/btn cursor-pointer">
          <span className="font-display text-base font-bold text-white uppercase tracking-tight">Let&apos;s Talk</span>
          <MoveRight className="w-4 h-4 text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}