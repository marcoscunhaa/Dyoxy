interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* DNA Emoji Logo */}
      <div className="logo-emoji-container relative">
        <span className="text-4xl logo-emoji" role="img" aria-label="DNA">
          🧬
        </span>
      </div>
      
      {/* Logo Text - Premium Typography */}
      {showText && (
        <span className="text-2xl font-black font-space tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 logo-text">
          DYOXY
        </span>
      )}
    </div>
  );
}