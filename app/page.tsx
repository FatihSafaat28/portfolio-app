"use client";
import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import * as THREE from "three";
import ProjectNotActive from "./component/project-notActive";
import ProjectActive from "./component/project-Active";

import SkillBadge from "./component/SkillBadge";
import projectList from "./helper/projectList";


const skills = [
  // Frontend
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "frontend", variant: "secondary", color: "#61DAFB" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "frontend", variant: "secondary", color: "#FFFFFF" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "frontend", variant: "secondary", color: "#3178C6" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "frontend", variant: "secondary", color: "#F7DF1E" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "frontend", variant: "secondary", color: "#E34F26" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "frontend", variant: "secondary", color: "#38B2AC" },
  
  // Backend
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "backend", variant: "default", color: "#336791" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", category: "backend", variant: "default", color: "#2D3748" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", category: "backend", variant: "default", color: "#3ECF8E" },

  // Tools
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "tools", variant: "outline", color: "#FFFFFF" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "tools", variant: "outline", color: "#F24E1E" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", category: "tools", variant: "outline", color: "#007ACC" },
] as const;

export default function Page() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number>(1);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const project = projectList;

  useEffect(() => {
    let vantaEffect: any = null;
    const initVanta = async () => {
      // @ts-ignore
      const vantaModule = await import("vanta/dist/vanta.net.min");
      const NET = vantaModule.default || vantaModule;

      if (vantaRef.current) {
        vantaEffect = NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xe3e34a,
          backgroundColor: 0x020617, // Menyesuaikan bg-slate-950 (0x020617)
          points: 15.0,
          maxDistance: 21.0,
        });
      }
    };

    initVanta();
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2, // Trigger when 20% of the section is visible
      rootMargin: "0px",
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target.id === "about") {
          setIsAboutVisible(entry.isIntersecting);
        } else if (entry.target.id === "skills") {
          setIsSkillsVisible(entry.isIntersecting);
        } else if (entry.target.id === "project") {
          setIsProjectVisible(entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <section className="h-screen w-full snap-start flex items-center justify-center">
        <main className="relative flex h-screen w-full flex-col items-center justify-center bg-slate-950 overflow-hidden">
          {/* Layer Vanta dengan Opacity */}
          <div
            ref={vantaRef}
            className="absolute inset-0 z-0 opacity-40" // Atur opacity di sini (0.4 = 40%)
          />

          {/* Layer Konten - z-10 agar berada di atas jaring Vanta */}
          <div className="relative z-10 flex flex-col items-center montserrat">
            {/* Subtitle dengan spacing huruf yang lebar (Classy) */}
            <div className="text-sm md:text-lg font-semibold tracking-[0.3em] uppercase mb-4 text-slate-400">
              Hi! I am
            </div>

            {/* Nama/Role dengan Gradient dan Font Classy */}
            <div className="text-4xl md:text-8xl font-extrabold text-center tracking-tight playfair">
              <span className="inline-block bg-linear-to-r from-slate-200 via-slate-400 to-slate-500 bg-clip-text text-transparent">
                <Typewriter
                  options={{
                    strings: [
                      "Fatih Safaat",
                      "Front-End Developer",
                      "UI Designer",
                      "UX Researcher",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 80,
                  }}
                />
              </span>
            </div>
          </div>

          {/* Efek Vignette/Fade (Opsional) */}
          <div className="absolute inset-0 z-1 bg-linear-to-t from-slate-950 via-transparent to-slate-950 pointer-events-none" />
        </main>
      </section>
      {/* HALAMAN 2 */}
      <section
        ref={aboutRef}
        id="about"
        className="h-screen w-full snap-start bg-slate-950 flex items-center justify-center relative"
      >
        <div className={`flex flex-col gap-4 justify-center text-center w-[70vw] transition-all duration-700 ease-out delay-400 ${
          isAboutVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-white text-4xl font-bold playfair">About Me</h2>
          <h3 className="text-white text-2xl font-medium montserrat leading-relaxed">
            I am a Front-End Developer with UI/UX Designer Experience. 
            <span className="inline-flex items-center">
            <br /><h3>I am using</h3>
            <span className="inline-flex items-center gap-2 px-3 py-1 mx-2 border border-[#F24E1E] rounded-full text-lg bg-[#F24E1E]/10 backdrop-blur-md hover:bg-[#F24E1E]/20 text-[#F24E1E] transition-all duration-300 align-text-bottom">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="w-5 h-5" />
              Figma
            </span> 
            <h3>as my design tool, and</h3>
            <span className="inline-flex items-center gap-2 px-3 py-1 mx-2 border border-white rounded-full text-lg bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all duration-300 align-text-bottom">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-5 h-5 invert" />
              Next.js
            </span> 
            <h3>as my framework.</h3> 
            </span>
            <br />So I'm pretty confident I can make a good website with a good taste design.
          </h3>
        </div>
        {/* Efek Vignette/Fade (Opsional) */}
          <div className="absolute inset-0 z-1 bg-linear-to-t from-black via-transparent to-slate-950 pointer-events-none" />

      </section>

      {/* HALAMAN 3 */}
      <section
        ref={skillsRef}
        id="skills"
        className="h-screen w-full snap-start bg-black flex items-center justify-center relative overflow-hidden"
      >
        {/* Background Icons Layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="w-full h-full grid grid-cols-4 grid-rows-3 place-items-center p-10">
              {skills.map((skill, index) => (
                <div 
                  key={`bg-${skill.name}-${index}`}
                  className={`
                    transition-all duration-500 ease-in-out
                    ${hoveredSkill === skill.name ? 'opacity-100 scale-150 blur-0 grayscale-0' : 'opacity-0 scale-100 blur-[6px] grayscale'}
                  `}
                >
                  <img 
                    src={skill.icon} 
                    alt="" 
                    style={{
                      filter: hoveredSkill === skill.name 
                        ? `drop-shadow(0 0 10px ${skill.color}) drop-shadow(0 0 30px ${skill.color})` 
                        : 'none'
                    }}
                    className={`w-24 h-24 object-contain transition-all duration-500`}
                  />
                </div>
              ))}
           </div>
        </div>

        <div className={`relative z-10 flex flex-col gap-8 justify-center items-center w-[80vw] max-w-6xl transition-all duration-700 ease-out delay-400 ${
          isSkillsVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-white text-4xl font-bold playfair">Skills & Technologies</h2>
          
          {/* Frontend Skills */}
          <div className="w-full">
            <h3 className="text-yellow-400 text-xl font-semibold montserrat mb-4 text-center">Frontend Development</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.filter(s => s.category === 'frontend').map(skill => (
                <SkillBadge 
                  key={skill.name} 
                  {...skill} 
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                />
              ))}
            </div>
          </div>

          {/* Backend & Database */}
          <div className="w-full">
            <h3 className="text-yellow-400 text-xl font-semibold montserrat mb-4 text-center">Backend & Database</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.filter(s => s.category === 'backend').map(skill => (
                <SkillBadge 
                  key={skill.name} 
                  {...skill}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                />
              ))}
            </div>
          </div>

          {/* Tools & Design */}
          <div className="w-full">
            <h3 className="text-yellow-400 text-xl font-semibold montserrat mb-4 text-center">Tools & Design</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.filter(s => s.category === 'tools').map(skill => (
                <SkillBadge 
                  key={skill.name} 
                  {...skill}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Efek Vignette/Fade (Opsional) */}
          <div className="absolute inset-0 z-5 bg-linear-to-t from-slate-950 via-transparent to-black pointer-events-none" />
      </section>


{/* HALAMAN 4 */}
      <section
        ref={projectRef}
        id="project"
        className="h-screen w-full snap-start bg-slate-950 flex items-center justify-center"
      >
        <div className={`flex flex-col gap-6 justify-center text-center w-[70vw] transition-all duration-700 ease-out delay-400 ${
          isProjectVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-white text-4xl font-bold playfair">Project</h2>
          <div className="flex justify-center items-center gap-4">
            {projectList.map((project, index) => (
              <div
                key={index}
                onClick={() => setExpandedItem(index + 1)}
                className={`${
                  expandedItem === index + 1 ? "w-[60vw]" : "w-[5vw]"
                } h-[60vh] bg-slate-800 rounded-3xl flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer hover:bg-slate-700 overflow-hidden`}
              >
                {expandedItem === index + 1 ? (
                  <ProjectActive
                    tittle={project.tittle}
                    image={project.image}
                    fullTech={project.fullTech}
                    description={project.description}
                    link={project.link}
                  />
                ) : (
                  <ProjectNotActive
                    shortTittle={project.shortTittle}
                    image={project.image}
                    tech={project.tech}
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
