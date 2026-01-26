import Link from "next/link";
import React from "react";

export default function Navbar() {
  const navLinkStyle =
    "hover:text-slate-950 hover:bg-linear-to-r from-slate-200 via-slate-400 to-slate-500 transition-all duration-200 text-md text-center font-semibold px-3 py-1 rounded-full w-[90px]";
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-fit bg-black/80 backdrop-blur-sm text-white px-8 py-3 rounded-full border border-white/10 z-50 montserrat">
      <div className="flex items-center gap-12">
        {/* Grup Kiri */}
        <div className="flex gap-6 items-center">
          <Link href="#about" className={navLinkStyle}>
            About
          </Link>
          <Link href="#skills" className={navLinkStyle}>
            Skills
          </Link>
        </div>

        {/* Center Logo - Bisa diganti Icon atau Image */}
        <div className="flex items-center">
          <Link
            href="/"
            className="leading-none mb-1 font-extrabold tracking-widest text-2xl px-2 playfair bg-linear-to-r from-slate-200 via-slate-400 to-slate-500 bg-clip-text text-transparent"
          >
            FATIH
          </Link>
        </div>

        {/* Grup Kanan */}
        <div className="flex gap-6 items-center">
          <Link href="#projects" className={navLinkStyle}>
            Project
          </Link>
          <Link href="#contact" className={navLinkStyle}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
