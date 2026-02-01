"use client";
import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import * as THREE from "three";
import ProjectNotActive from "./component/project-notActive";
import ProjectActive from "./component/project-Active";

import SkillBadge from "./component/SkillBadge";
import projectList from "./helper/projectList";
import skills from "./helper/skillList"
import { Meteors } from "@/components/ui/meteors";
import { ConstellationBackground } from "@/components/ui/constellation";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";



export default function Page() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number>(1);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [randomGlowingIcons, setRandomGlowingIcons] = useState<string[]>([]);
  const project = projectList;

  // Vanta Effect
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

  // Intersection Observer
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
        } else if (entry.target.id === "contact") {
          setIsContactVisible(entry.isIntersecting);
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
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Random Glowing Icons Effect
  useEffect(() => {
    // Only run random glow when user is not hovering
    if (hoveredSkill !== null) return;

    const interval = setInterval(() => {
      // Randomly select 1-3 icons to glow
      const numberOfIcons = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
      const randomSkills: string[] = [];
      
      // Get random unique skills
      const availableSkills = [...skills];
      for (let i = 0; i < numberOfIcons && availableSkills.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableSkills.length);
        randomSkills.push(availableSkills[randomIndex].name);
        availableSkills.splice(randomIndex, 1);
      }
      
      setRandomGlowingIcons(randomSkills);
    }, 2000); // Every 2 seconds

    return () => clearInterval(interval);
  }, [hoveredSkill]);

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <section id="home" className="h-screen w-full snap-start flex items-center justify-center">
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
        <div className="absolute inset-x-0 top-0 h-[65%] z-0 pointer-events-none opacity-60">
          <ConstellationBackground 
            className="absolute inset-0 bg-transparent"
            count={200}
            nodeSize={1}
            connectionDistance={80}
            nodeColor="white"
            lineColor="rgba(255, 255, 255, 0.2)"
            mouseRadius={0} // Disable mouse interaction for background-only feel
            glow={false}
          />
        </div>
        <Meteors className="absolute inset-0 z-0 bg-transparent" />
        <div className={`relative z-10 flex flex-col gap-4 justify-center text-center w-[70vw] transition-all duration-700 ease-out delay-400 ${
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
          <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-transparent to-slate-950 pointer-events-none" />

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
              {skills.map((skill, index) => {
                const isHovered = hoveredSkill === skill.name;
                const isRandomGlowing = randomGlowingIcons.includes(skill.name);
                const shouldGlow = isHovered || (isRandomGlowing && hoveredSkill === null);
                
                return (
                  <div 
                    key={`bg-${skill.name}-${index}`}
                    className={`
                      transition-all duration-500 ease-in-out
                      ${shouldGlow ? 'opacity-100 scale-150 blur-0 grayscale-0' : 'opacity-0 scale-100 blur-[6px] grayscale'}
                    `}
                  >
                    <img 
                      src={skill.icon} 
                      alt="" 
                      style={{
                        filter: shouldGlow 
                          ? `drop-shadow(0 0 10px ${skill.color}) drop-shadow(0 0 30px ${skill.color})` 
                          : 'none'
                      }}
                      className={`w-24 h-24 object-contain transition-all duration-500`}
                    />
                  </div>
                );
              })}
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
        className="h-screen w-full snap-start bg-slate-950 flex items-center justify-center relative overflow-hidden"
      >
        {/* Dynamic Background Image */}
         <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-20 blur-sm"
            style={{
                backgroundImage: `url(${projectList[expandedItem - 1]?.image || ''})`
            }}
         />

        <div className={`relative z-10 flex flex-col gap-6 justify-center text-center w-[70vw] transition-all duration-700 ease-out delay-400 ${
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

         {/* Efek Vignette/Fade (Opsional) */}
          <div className="absolute inset-0 z-5 bg-gradient-to-t from-[#000] via-transparent to-slate-950 pointer-events-none" />
      </section>
      {/* HALAMAN 5 CONTACT */}
      <section
        ref={contactRef}
        id="contact"
        className="h-screen w-full snap-start bg-slate-950 flex flex-col items-center justify-center relative"
      >

        <div className="absolute inset-0 z-0 overflow-hidden">
          <StarsBackground 
            className="absolute inset-0 bg-slate-950" 
            pointerEvents={false}
            starColor="#ffffff"
            speed={60}
          />
        </div>
        <div className={`relative z-10 flex flex-col gap-12 justify-center items-center transition-all duration-700 ease-out delay-400 ${
          isContactVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-white text-4xl md:text-5xl font-bold playfair">Get In Touch</h2>
          <p className="text-slate-400 text-lg md:text-xl montserrat text-center max-w-2xl px-4">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-8 md:gap-12 items-center">
            {/* Gmail */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=fatihsafaat@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="transition-all duration-300 ease-out group-hover:scale-110">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.366l8.073-5.873C21.69 2.28 24 3.434 24 5.457z"
                    className="fill-white group-hover:fill-[#EA4335] transition-all duration-300"
                  />
                </svg>
              </div>
              <p className="text-white text-sm md:text-base montserrat text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Gmail</p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/fatih-safaat-a914811b0/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="transition-all duration-300 ease-out group-hover:scale-110">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    className="fill-white group-hover:fill-[#0A66C2] transition-all duration-300"
                  />
                </svg>
              </div>
              <p className="text-white text-sm md:text-base montserrat text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">LinkedIn</p>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/FatihSafaat28"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="transition-all duration-300 ease-out group-hover:scale-110">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    className="fill-white group-hover:fill-[#333] transition-all duration-300"
                  />
                </svg>
              </div>
              <p className="text-white text-sm md:text-base montserrat text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">GitHub</p>
            </a>

            

            {/* Instagram */}
            <a
              href="https://www.instagram.com/fatihsafaat28"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="transition-all duration-300 ease-out group-hover:scale-110">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FD5949" />
                      <stop offset="50%" stopColor="#D6249F" />
                      <stop offset="100%" stopColor="#285AEB" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                    className="fill-white group-hover:fill-[url(#instagram-gradient)] transition-all duration-300"
                    style={{
                      fill: 'white'
                    }}
                  />
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    fill="url(#instagram-gradient)"
                  />
                </svg>
              </div>
              <p className="text-white text-sm md:text-base montserrat text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Instagram</p>
            </a>
          </div>

          {/* Footer Text */}
          <p className="text-slate-500 text-sm montserrat mt-8">
            © 2026 Fatih Safaat. All rights reserved.
          </p>
        </div>
        <div className="absolute inset-0 z-5 bg-gradient-to-t from-[#000] via-transparent to-[#000] pointer-events-none" />
      </section>
    </div>
  );
}
