'use client'

/**
 * Tier 2 background: two large static glow orbs.
 * No animations — clean, professional, no GPU waste.
 */
export function GlowBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Teal — bottom left */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: '-120px',
          left: '-100px',
          background: 'radial-gradient(circle, rgba(20,184,166,0.14) 0%, transparent 70%)',
        }}
      />

      {/* Cyan — upper right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 350,
          height: 350,
          top: '10%',
          right: '-80px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
