'use client'

export function CSSFloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large faint ring — center-left */}
      <div
        className="absolute"
        style={{
          width: 480,
          height: 480,
          top: '50%',
          left: '15%',
          transform: 'translate(-50%, -50%)',
          border: '1.5px solid rgba(20, 184, 166, 0.18)',
          borderRadius: '50%',
          animation: 'css-spin-slow 30s linear infinite',
        }}
      />
      {/* Inner ring — center-left */}
      <div
        className="absolute"
        style={{
          width: 280,
          height: 280,
          top: '50%',
          left: '15%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '50%',
          animation: 'css-spin-slow 20s linear infinite reverse',
        }}
      />

      {/* Rotating diamond — top right */}
      <div
        className="absolute"
        style={{
          width: 80,
          height: 80,
          top: '14%',
          right: '18%',
          background: 'rgba(20, 184, 166, 0.15)',
          border: '1px solid rgba(20, 184, 166, 0.35)',
          transform: 'rotate(45deg)',
          animation: 'css-spin-medium 18s linear infinite, css-float 6s ease-in-out infinite',
        }}
      />

      {/* Hexagon — right side */}
      <div
        className="absolute"
        style={{
          width: 70,
          height: 70,
          top: '38%',
          right: '8%',
          background: 'rgba(139, 92, 246, 0.12)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'css-float 7s ease-in-out infinite 1s',
        }}
      />

      {/* Small diamond — bottom right */}
      <div
        className="absolute"
        style={{
          width: 44,
          height: 44,
          bottom: '22%',
          right: '22%',
          background: 'rgba(6, 182, 212, 0.18)',
          border: '1px solid rgba(6, 182, 212, 0.4)',
          transform: 'rotate(45deg)',
          animation: 'css-spin-medium 12s linear infinite reverse, css-float 5s ease-in-out infinite 2s',
        }}
      />

      {/* Wireframe square — top left area */}
      <div
        className="absolute"
        style={{
          width: 56,
          height: 56,
          top: '20%',
          left: '28%',
          border: '1.5px solid rgba(20, 184, 166, 0.28)',
          animation: 'css-spin-medium 22s linear infinite, css-float 8s ease-in-out infinite 0.5s',
        }}
      />

      {/* Hexagon — left lower */}
      <div
        className="absolute"
        style={{
          width: 52,
          height: 52,
          bottom: '30%',
          left: '22%',
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'css-float 9s ease-in-out infinite 3s',
        }}
      />

      {/* Large translucent triangle — far left */}
      <div
        className="absolute"
        style={{
          width: 100,
          height: 100,
          top: '60%',
          left: '5%',
          background: 'rgba(6, 182, 212, 0.08)',
          border: '1px solid rgba(6, 182, 212, 0.22)',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          animation: 'css-float 11s ease-in-out infinite 1.5s',
        }}
      />

      {/* Dot grid accent — subtle */}
      <div
        className="absolute"
        style={{
          width: 120,
          height: 120,
          bottom: '18%',
          right: '12%',
          backgroundImage:
            'radial-gradient(circle, rgba(20,184,166,0.35) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          animation: 'css-pulse 4s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes css-spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes css-spin-medium {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes css-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes css-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}
