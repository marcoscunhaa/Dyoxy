import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface DyoxyLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function DyoxyLogo({ size = 48, showText = true, className = '' }: DyoxyLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // DNA Helix configuration - static premium version
    const centerX = size / 2;
    const centerY = size / 2;
    const helixLength = size * 0.45; // Reduzido ainda mais para não cortar
    const amplitude = size * 0.12; // Amplitude menor também
    const wavelength = size * 0.5;
    const angle = 60; // degrees
    const angleRad = (angle * Math.PI) / 180;

    const drawLogo = () => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Draw DNA double helix - static position
      const points = 80; // Mais pontos para curvas ultra suaves
      const strand1: Array<{ x: number; y: number; opacity: number }> = [];
      const strand2: Array<{ x: number; y: number; opacity: number }> = [];

      // Fixed offset for premium static look
      const staticOffset = Math.PI * 0.25;

      // Offset vertical para centralizar melhor
      const verticalOffset = -helixLength * Math.tan(angleRad) / 2;

      for (let i = 0; i < points; i++) {
        const progress = i / points;
        const baseX = centerX - helixLength / 2 + helixLength * progress;
        const baseY = centerY + (helixLength * progress * Math.tan(angleRad)) + verticalOffset;

        const waveAngle = (progress * (helixLength / wavelength) * Math.PI * 2) + staticOffset;

        const perpX1 = baseX + Math.cos(angleRad + Math.PI / 2) * Math.sin(waveAngle) * amplitude;
        const perpY1 = baseY + Math.sin(angleRad + Math.PI / 2) * Math.sin(waveAngle) * amplitude;
        const z1 = Math.cos(waveAngle);

        const perpX2 = baseX - Math.cos(angleRad + Math.PI / 2) * Math.sin(waveAngle) * amplitude;
        const perpY2 = baseY - Math.sin(angleRad + Math.PI / 2) * Math.sin(waveAngle) * amplitude;
        const z2 = -z1;

        // Calculate opacity based on z-position (depth) - enhanced for premium look
        const opacity1 = ((z1 + 1) / 2) * 0.75 + 0.25; // Min 25%, max 100%
        const opacity2 = ((z2 + 1) / 2) * 0.75 + 0.25;

        strand1.push({ x: perpX1, y: perpY1, opacity: opacity1 });
        strand2.push({ x: perpX2, y: perpY2, opacity: opacity2 });
      }

      // Draw connection lines (base pairs) - premium detail
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';
      
      for (let i = 0; i < points; i += 6) { // Conectores a cada 6 pontos
        const point1 = strand1[i];
        const point2 = strand2[i];
        
        if (point1 && point2) {
          // Calcular se está visível baseado na opacidade média
          const avgOpacity = (point1.opacity + point2.opacity) / 2;
          
          if (avgOpacity > 0.5) { // Só desenha conectores visíveis
            const gradient = ctx.createLinearGradient(point1.x, point1.y, point2.x, point2.y);
            gradient.addColorStop(0, `rgba(34, 211, 238, ${avgOpacity * 0.4})`);
            gradient.addColorStop(0.5, `rgba(147, 51, 234, ${avgOpacity * 0.3})`); // Mix color
            gradient.addColorStop(1, `rgba(168, 85, 247, ${avgOpacity * 0.4})`);
            
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.strokeStyle = gradient;
            ctx.stroke();
          }
        }
      }

      // Draw strands with premium quality
      const drawStrand = (strand: Array<{ x: number; y: number; opacity: number }>, color: string, isTop: boolean) => {
        // Primeira camada - base sólida mais espessa
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < strand.length - 1; i++) {
          const point = strand[i];
          const nextPoint = strand[i + 1];

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          
          const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y);
          gradient.addColorStop(0, color.replace('1)', `${point.opacity * 0.95})`));
          gradient.addColorStop(1, color.replace('1)', `${nextPoint.opacity * 0.95})`));
          
          ctx.strokeStyle = gradient;
          ctx.stroke();
        }

        // Segunda camada - glow interno
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = isTop ? 'rgba(34, 211, 238, 0.6)' : 'rgba(168, 85, 247, 0.6)';
        
        for (let i = 0; i < strand.length - 1; i++) {
          const point = strand[i];
          const nextPoint = strand[i + 1];

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          
          const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y);
          gradient.addColorStop(0, color.replace('1)', `${point.opacity})`));
          gradient.addColorStop(1, color.replace('1)', `${nextPoint.opacity})`));
          
          ctx.strokeStyle = gradient;
          ctx.stroke();
        }
        
        ctx.shadowBlur = 0;

        // Terceira camada - highlight centers (brilho no centro da fita)
        ctx.lineWidth = 1;
        for (let i = 0; i < strand.length - 1; i++) {
          const point = strand[i];
          const nextPoint = strand[i + 1];

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          
          const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${point.opacity * 0.3})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${nextPoint.opacity * 0.3})`);
          
          ctx.strokeStyle = gradient;
          ctx.stroke();
        }
      };

      // Draw both strands - cyan on top for premium hierarchy
      drawStrand(strand2, 'rgba(168, 85, 247, 1)', false); // Purple Neon (back)
      drawStrand(strand1, 'rgba(34, 211, 238, 1)', true); // Cyan Neon (front)
    };

    drawLogo();
  }, [size]);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <canvas
        ref={canvasRef}
        className="flex-shrink-0 -mt-0.5"
        style={{ 
          filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.25))'
        }}
      />
      
      {showText && (
        <div className="flex flex-col gap-0.5 -mt-1">
          {/* Brand name - Premium uppercase */}
          <span 
            className="text-[1.35rem] font-bold tracking-wide leading-none"
            style={{ 
              background: 'linear-gradient(135deg, #EDEDED 0%, #D1D5DB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.08em',
              fontWeight: 700
            }}
          >
            DYOXY
          </span>
          
          {/* Technology subtitle - Premium uppercase */}
          <span 
            className="text-[0.55rem] tracking-widest font-semibold"
            style={{ 
              background: 'linear-gradient(90deg, #22D3EE, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.12em',
              fontWeight: 600
            }}
          >
            DATA INTELLIGENCE
          </span>
        </div>
      )}
    </div>
  );
}