"use client";
import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import * as THREE from "three";

export default function Page() {
  const vantaRef = useRef<HTMLDivElement>(null);

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
        id="about"
        className="h-screen w-full snap-start bg-slate-950 flex items-center justify-center"
      >
        <div className="flex flex-col gap-4 justify-center text-center w-[70vw]">
          <h2 className="text-white text-4xl font-bold fairplay">About Me</h2>
          <h3 className="text-white text-2xl font-medium montserart">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, id
            reiciendis officiis aspernatur est veniam delectus et quod quos
            corrupti nulla totam quo nemo ad, odit dolores corporis deserunt
            animi.
          </h3>
        </div>
      </section>

      {/* HALAMAN 3 */}
      <section
        id="skills"
        className="h-screen w-full snap-start bg-slate-950 flex items-center justify-center"
      >
        <div className="flex flex-col gap-4 justify-center text-center w-[70vw]">
          <h2 className="text-white text-4xl font-bold fairplay">About Me</h2>
          <h3 className="text-white text-2xl font-medium montserart">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, id
            reiciendis officiis aspernatur est veniam delectus et quod quos
            corrupti nulla totam quo nemo ad, odit dolores corporis deserunt
            animi.
          </h3>
        </div>
      </section>
    </div>
  );
}
