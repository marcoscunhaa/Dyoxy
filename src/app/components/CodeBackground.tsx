import { useEffect, useRef } from 'react';

export function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas setup
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Dyoxy Deep Space Neon Palette
    const colors = [
      { hex: '#22D3EE', name: 'cyan' },
      { hex: '#A855F7', name: 'purple' },
      { hex: '#38BDF8', name: 'cyanAccent' },
      { hex: '#C084FC', name: 'purpleLight' },
    ];

    // Programming symbols - elegant and minimal
    const codeSymbols = [
      '{ }',
      '< >',
      '[ ]',
      '( )',
      '=>',
      '//',
      '::',
      '&&',
      '||',
      '!=',
      '===',
      'fn',
    ];

    interface CodeElement {
      x: number;
      y: number;
      symbol: string;
      color: typeof colors[0];
      size: number;
      opacity: number;
      speed: number;
      drift: number;
      driftPhase: number;
      blur: number;
    }

    const elements: CodeElement[] = [];

    // Create minimal code elements (only 12)
    for (let i = 0; i < 12; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 14 + Math.random() * 8,
        opacity: 0.04 + Math.random() * 0.06, // Very subtle: 4-10%
        speed: 0.08 + Math.random() * 0.12,
        drift: 15 + Math.random() * 25,
        driftPhase: Math.random() * Math.PI * 2,
        blur: 0.3 + Math.random() * 0.5,
      });
    }

    // Hexadecimal values floating (even more subtle)
    interface HexElement {
      x: number;
      y: number;
      value: string;
      color: typeof colors[0];
      size: number;
      opacity: number;
      speed: number;
    }

    const hexElements: HexElement[] = [];

    // Create subtle hex values (only 8)
    for (let i = 0; i < 8; i++) {
      const hexValue = '0x' + Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');
      hexElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: hexValue,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 9 + Math.random() * 4,
        opacity: 0.02 + Math.random() * 0.03, // Ultra subtle: 2-5%
        speed: 0.05 + Math.random() * 0.08,
      });
    }

    // Subtle grid dots (premium touch)
    interface GridDot {
      x: number;
      y: number;
      opacity: number;
      pulsePhase: number;
      pulseSpeed: number;
    }

    const gridDots: GridDot[] = [];
    const gridSpacing = 80;

    for (let x = gridSpacing; x < canvas.width; x += gridSpacing) {
      for (let y = gridSpacing; y < canvas.height; y += gridSpacing) {
        // Only create some dots (not all - sparse grid)
        if (Math.random() > 0.7) {
          gridDots.push({
            x,
            y,
            opacity: 0.02 + Math.random() * 0.03,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.003 + Math.random() * 0.002,
          });
        }
      }
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid dots (ultra subtle)
      gridDots.forEach((dot) => {
        dot.pulsePhase += dot.pulseSpeed;
        const pulse = 0.5 + Math.sin(dot.pulsePhase) * 0.5;

        ctx.globalAlpha = dot.opacity * pulse;
        ctx.fillStyle = '#22D3EE';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw code symbols
      ctx.font = 'monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      elements.forEach((el) => {
        // Floating movement
        el.y -= el.speed;
        el.driftPhase += 0.01;

        // Horizontal drift
        const driftOffset = Math.sin(el.driftPhase) * el.drift;

        // Wrap around
        if (el.y < -50) {
          el.y = canvas.height + 50;
          el.x = Math.random() * canvas.width;
        }

        // Apply subtle blur
        ctx.filter = `blur(${el.blur}px)`;
        ctx.globalAlpha = el.opacity;
        ctx.fillStyle = el.color.hex;
        ctx.font = `${el.size}px 'Courier New', monospace`;

        ctx.fillText(el.symbol, el.x + driftOffset, el.y);

        // Reset filter
        ctx.filter = 'none';
      });

      // Draw hex values (ultra subtle)
      hexElements.forEach((hex) => {
        hex.y -= hex.speed;

        // Wrap around
        if (hex.y < -30) {
          hex.y = canvas.height + 30;
          hex.x = Math.random() * canvas.width;
          hex.value = '0x' + Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');
        }

        ctx.filter = 'blur(0.8px)';
        ctx.globalAlpha = hex.opacity;
        ctx.fillStyle = hex.color.hex;
        ctx.font = `${hex.size}px 'Courier New', monospace`;
        ctx.fillText(hex.value, hex.x, hex.y);

        ctx.filter = 'none';
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 1 }}
    />
  );
}
