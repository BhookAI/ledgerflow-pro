'use client'

import { useState, useEffect } from 'react'

/* ───────── 3D floating planet component — MONOCHROMATIC ───────── */
export function FloatingPlanet({
    size, color1, color2, top, left, delay, duration, blur, opacity, ring
}: {
    size: number; color1: string; color2: string; top: string; left: string;
    delay: number; duration: number; blur?: number; opacity?: number; ring?: boolean
}) {
    return (
        <div
            className="absolute pointer-events-none"
            style={{
                top, left,
                width: size, height: size,
                animation: `float ${duration}s ease-in-out ${delay}s infinite`,
                filter: blur ? `blur(${blur}px)` : undefined,
                opacity: opacity ?? 1,
                zIndex: 0,
            }}
        >
            {/* Glow */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle at 30% 30%, ${color1}40, ${color2}20, transparent 70%)`,
                    filter: 'blur(20px)',
                    transform: 'scale(1.5)',
                }}
            />
            {/* Planet body */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle at 35% 25%, ${color1}, ${color2} 60%, rgba(0,0,0,0.9))`,
                    boxShadow: `inset -8px -8px 20px rgba(0,0,0,0.7), inset 4px 4px 15px ${color1}20, 0 0 ${size / 2}px ${color1}08`,
                }}
            />
            {/* Surface texture */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `
            radial-gradient(circle at 40% 20%, transparent 40%, rgba(0,0,0,0.2) 60%),
            radial-gradient(ellipse at 60% 70%, ${color2}15 0%, transparent 50%)
          `,
                }}
            />
            {/* Specular highlight — white */}
            <div
                className="absolute rounded-full"
                style={{
                    top: '12%', left: '20%',
                    width: '35%', height: '25%',
                    background: `radial-gradient(ellipse, rgba(255,255,255,0.18), transparent 70%)`,
                    transform: 'rotate(-30deg)',
                }}
            />
            {/* Orbital ring — white/10 */}
            {ring && (
                <div
                    className="absolute"
                    style={{
                        top: '35%', left: '-15%',
                        width: '130%', height: '30%',
                        border: `2px solid rgba(255,255,255,0.10)`,
                        borderRadius: '50%',
                        transform: 'rotateX(75deg)',
                    }}
                />
            )}
        </div>
    )
}

/* ───────── Mini orbiting dot — MONOCHROMATIC ───────── */
export function OrbitingDot({ radius, speed, color, size: dotSize, offsetAngle }: {
    radius: number; speed: number; color: string; size: number; offsetAngle: number
}) {
    return (
        <div
            className="absolute"
            style={{
                width: radius * 2, height: radius * 2,
                top: '50%', left: '50%',
                marginTop: -radius, marginLeft: -radius,
                animation: `spin-slow ${speed}s linear infinite`,
                animationDelay: `${offsetAngle / 360 * speed}s`,
            }}
        >
            <div
                className="absolute rounded-full"
                style={{
                    width: dotSize, height: dotSize,
                    top: 0, left: '50%',
                    marginLeft: -dotSize / 2,
                    background: color,
                    boxShadow: `0 0 ${dotSize * 2}px ${color}`,
                }}
            />
        </div>
    )
}

/* ───────── Star field ───────── */
export function StarField() {
    const [stars, setStars] = useState<Array<{ x: number; y: number; s: number; d: number }>>([])

    useEffect(() => {
        const arr = Array.from({ length: 60 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            s: Math.random() * 2 + 0.5,
            d: Math.random() * 4 + 2,
        }))
        setStars(arr)
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.s,
                        height: star.s,
                        opacity: 0.3 + Math.random() * 0.4,
                        animation: `pulse-glow ${star.d}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 3}s`,
                    }}
                />
            ))}
        </div>
    )
}

/* ───────── Mini floating decoration sphere — MONOCHROMATIC ───────── */
export function MiniSphere({ size, color, className }: { size: number; color: string; className?: string }) {
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ width: size, height: size }}>
            <div className="absolute inset-0 rounded-full" style={{
                background: `radial-gradient(circle at 35% 25%, ${color}, rgba(0,0,0,0.6) 70%)`,
                boxShadow: `inset -3px -3px 8px rgba(0,0,0,0.5), 0 0 ${size / 3}px ${color}10`,
            }} />
            <div className="absolute rounded-full" style={{
                top: '15%', left: '22%', width: '28%', height: '18%',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.15), transparent 70%)',
            }} />
        </div>
    )
}
