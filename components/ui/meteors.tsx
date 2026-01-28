"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface MeteorsProps {
  className?: string
  children?: React.ReactNode
  /** Number of meteors */
  count?: number
  /** Meteor angle in degrees (215 = diagonal down-left) */
  angle?: number
  /** Meteor color */
  color?: string
  /** Tail gradient color */
  tailColor?: string
}

interface MeteorData {
  id: number
  left: number
  top: number
  delay: number
  duration: number
}

export function Meteors({
  className,
  children,
  count = 100,
  color = "#f0e1af",
  tailColor = "#f0e1af",
}: MeteorsProps) {
  const [meteors, setMeteors] = useState<MeteorData[]>([])
  const [path, setPath] = useState<string>("")

  useEffect(() => {
    const updatePath = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      // Curve: Start left, go up (negative Y is up), land right
      // M 0 0: Start at element's position
      // Q ${width/2} -${height/2} ${width} 0: Quadratic bezier curving up
      // We assume meteors start near left edge, so width traverses the screen
      setPath(`path("M -100 0 Q ${width / 2} -400 ${width + 100} 50")`)
    }

    updatePath()
    window.addEventListener("resize", updatePath)
    return () => window.removeEventListener("resize", updatePath)
  }, [])

  // Generate meteor data on client only to avoid hydration mismatch
  useEffect(() => {
    setMeteors(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 20, // Start slightly offscreen left
        top: Math.floor(Math.random() * 60), // Random vertical start (top 50% only)
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 10,
      }))
    )
  }, [count])

  // Don't render until path is ready to avoid layout shifts or hydration issues
  if (!path) return null

  return (
    <div className={cn("fixed inset-0 overflow-hidden bg-neutral-950", className)}>
      {/* Keyframe animation - uses vmax for viewport scaling */}
      <style>{`
        @keyframes meteor-travel {
          0% {
            offset-distance: 0%;
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }
      `}</style>

      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(30, 40, 60, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, rgba(20, 20, 40, 0.2) 0%, transparent 50%)
          `,
        }}
      />

      {/* Meteors */}
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute h-1 w-1 rounded-full"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}px`,
            offsetPath: path,
            offsetRotate: "auto",
            backgroundColor: color,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.1)`,
            animation: `meteor-travel ${meteor.duration}s linear infinite`,
            animationDelay: `${meteor.delay}s`,
            zIndex: 1,
          }}
        >
          {/* Tail */}
          <span
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              right: "100%", // Tail goes behind (left side)
              width: "80px",
              height: "1px",
              background: `linear-gradient(to left, ${tailColor}, transparent)`,
            }}
          />
        </span>
      ))}

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(10,10,15,0.8) 100%)",
        }}
      />

      {/* Content layer */}
      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  )
}

export default function MeteorsDemo() {
  return <Meteors />
}
