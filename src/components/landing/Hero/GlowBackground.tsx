'use client'

/**
 * Tier 2 background: three large radial glow orbs.
 * No transform conflicts — each orb is a single div with one animation.
 */
export function GlowBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Primary teal — bottom left anchor */}
      <div
        className="absolute rounded-full animate-pulse-slow"
        style={{
          width: 700,
          height: 700,
          bottom: '-200px',
          left: '-180px',
          background:
            'radial-gradient(circle, rgba(20,184,166,0.22) 0%, rgba(20,184,166,0.06) 60%, transparent 80%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Purple — top right anchor */}
      <div
        className="absolute rounded-full animate-pulse-slow"
        style={{
          width: 600,
          height: 600,
          top: '-150px',
          right: '-120px',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.05) 60%, transparent 80%)',
          filter: 'blur(1px)',
          animationDelay: '2s',
        }}
      />

      {/* Cyan center accent — behind card area */}
      <div
        className="absolute rounded-full animate-pulse-slow"
        style={{
          width: 400,
          height: 400,
          top: '30%',
          right: '15%',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.03) 60%, transparent 80%)',
          animationDelay: '1s',
        }}
      />
    </div>
  )
}
