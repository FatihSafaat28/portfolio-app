"use client";
import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import * as THREE from "three";
import ProjectNotActive from "./component/project-notActive";
import ProjectActive from "./component/project-Active";

export default function Page() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

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
              <span className="inline-block bg-gradient-to-r from-slate-200 via-slate-400 to-slate-500 bg-clip-text text-transparent">
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
          <div className="absolute inset-0 z-1 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 pointer-events-none" />
        </main>
      </section>
      {/* HALAMAN 2 */}
      <section
        ref={aboutRef}
        id="about"
        className="h-screen w-full snap-start bg-slate-950 flex items-center justify-center"
      >
        <div className={`flex flex-col gap-4 justify-center text-center w-[70vw] transition-all duration-700 ease-out delay-400 ${
          isAboutVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-white text-4xl font-bold playfair">About Me</h2>
          <h3 className="text-white text-2xl font-medium montserrat">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, id
            reiciendis officiis aspernatur est veniam delectus et quod quos
            corrupti nulla totam quo nemo ad, odit dolores corporis deserunt
            animi.
          </h3>
        </div>
      </section>

      {/* HALAMAN 3 */}
      <section
        ref={skillsRef}
        id="skills"
        className="h-screen w-full snap-start bg-slate-950 flex items-center justify-center"
      >
        <div className={`flex flex-col gap-4 justify-center text-center w-[70vw] transition-all duration-700 ease-out delay-400 ${
          isSkillsVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-white text-4xl font-bold playfair">Skills</h2>
          <h3 className="text-white text-2xl font-medium montserrat">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, id
            reiciendis officiis aspernatur est veniam delectus et quod quos
            corrupti nulla totam quo nemo ad, odit dolores corporis deserunt
            animi.
          </h3>
        </div>
      </section>

      <section
        ref={projectRef}
        id="project"
        className="h-screen w-full snap-start bg-slate-950 flex items-center justify-center"
      >
        <div className={`flex flex-col gap-4 justify-center text-center w-[70vw] transition-all duration-700 ease-out delay-400 ${
          isProjectVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-white text-4xl font-bold playfair">Project</h2>
          <div className="flex justify-center items-center gap-4">
            <div 
              onClick={() => setExpandedItem(expandedItem === 1 ? null : 1)}
              className={`${expandedItem === 1 ? 'w-[60vw]' : expandedItem !== null ? 'w-[5vw]' : 'w-[10vw]'} h-[60vh] bg-slate-800 rounded-3xl flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer hover:bg-slate-700`}
            > 
              {expandedItem === 1 ? <ProjectActive /> : <ProjectNotActive />}
            </div>
            <div 
              onClick={() => setExpandedItem(expandedItem === 2 ? null : 2)}
              className={`${expandedItem === 2 ? 'w-[60vw]' : expandedItem !== null ? 'w-[5vw]' : 'w-[10vw]'} h-[60vh] bg-slate-800 rounded-3xl flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer hover:bg-slate-700`}
            > 
              {expandedItem === 2 ? <ProjectActive /> : <ProjectNotActive />}
            </div>
            <div 
              onClick={() => setExpandedItem(expandedItem === 3 ? null : 3)}
              className={`${expandedItem === 3 ? 'w-[60vw]' : expandedItem !== null ? 'w-[5vw]' : 'w-[10vw]'} h-[60vh] bg-slate-800 rounded-3xl flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer hover:bg-slate-700`}
            > 
              {expandedItem === 3 ? <ProjectActive /> : <ProjectNotActive />}
            </div>
            <div 
              onClick={() => setExpandedItem(expandedItem === 4 ? null : 4)}
              className={`${expandedItem === 4 ? 'w-[60vw]' : expandedItem !== null ? 'w-[5vw]' : 'w-[10vw]'} h-[60vh] bg-slate-800 rounded-3xl flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer hover:bg-slate-700`}
            > 
              {expandedItem === 4 ? <ProjectActive /> : <ProjectNotActive />}
            </div>
            <div 
              onClick={() => setExpandedItem(expandedItem === 5 ? null : 5)}
              className={`${expandedItem === 5 ? 'w-[60vw]' : expandedItem !== null ? 'w-[5vw]' : 'w-[10vw]'} h-[60vh] bg-slate-800 rounded-3xl flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer hover:bg-slate-700`}
            > 
              {expandedItem === 5 ? <ProjectActive /> : <ProjectNotActive />}
            </div>
            <div 
              onClick={() => setExpandedItem(expandedItem === 6 ? null : 6)}
              className={`${expandedItem === 6 ? 'w-[60vw]' : expandedItem !== null ? 'w-[5vw]' : 'w-[10vw]'} h-[60vh] bg-slate-800 rounded-3xl flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer hover:bg-slate-700`}
            > 
              {expandedItem === 6 ? <ProjectActive /> : <ProjectNotActive />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
