import { useEffect, useRef } from 'react';

export function NetworkBackground() {
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
    const colors = {
      cyan: { r: 34, g: 211, b: 238, hex: '#22D3EE' },
      purple: { r: 168, g: 85, b: 247, hex: '#A855F7' },
      cyanAccent: { r: 56, g: 189, b: 248, hex: '#38BDF8' },
      purpleLight: { r: 192, g: 132, b: 252, hex: '#C084FC' },
    };

    // ===== DNA STRAND (diagonal) =====
    interface DNAStrand {
      startX: number;
      startY: number;
      angle: number;
      length: number;
      width: number;
      wavePhase: number;
      waveSpeed: number;
      nodes: DNANode[];
      opacity: number;
    }

    interface DNANode {
      position: number;
      color: typeof colors.cyan;
      pulsePhase: number;
      pulseSpeed: number;
    }

    const strands: DNAStrand[] = [];

    // Create DNA strand (diagonal)
    const createDNAStrand = (startX: number, startY: number, length: number, angle: number) => {
      const nodes: DNANode[] = [];
      const nodeCount = length > 200 ? 6 : 4; // Less nodes for smaller strands
      const colorChoices = [colors.cyan, colors.cyanAccent, colors.purple, colors.purpleLight];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          position: i / (nodeCount - 1),
          color: colorChoices[i % colorChoices.length],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.012,
        });
      }

      return {
        startX,
        startY,
        angle,
        length,
        width: length > 200 ? 50 : 35,
        wavePhase: Math.random() * Math.PI * 2,
        waveSpeed: 0.002 + Math.random() * 0.003,
        nodes,
        opacity: 0.25 + Math.random() * 0.15, // Further increased visibility
      };
    };

    // Create multiple DNA strands at different angles (45-60°)
    const strandConfigs = [
      // Large strands
      { x: 0.15, y: 0.25, length: 280, angle: 50 },
      { x: 0.65, y: 0.20, length: 300, angle: 55 },
      // Medium strands
      { x: 0.35, y: 0.55, length: 200, angle: 48 },
      { x: 0.75, y: 0.60, length: 220, angle: 52 },
      // Small strands
      { x: 0.25, y: 0.75, length: 140, angle: 58 },
      { x: 0.85, y: 0.40, length: 160, angle: 46 },
      { x: 0.50, y: 0.85, length: 150, angle: 54 },
    ];

    strandConfigs.forEach((config) => {
      strands.push(
        createDNAStrand(
          canvas.width * config.x,
          canvas.height * config.y,
          config.length,
          config.angle
        )
      );
    });

    // Helper to get point along diagonal DNA
    const getPointAlongStrand = (strand: DNAStrand, position: number, offset: number) => {
      const angleRad = (strand.angle * Math.PI) / 180;
      const baseX = strand.startX + Math.cos(angleRad) * position * strand.length;
      const baseY = strand.startY + Math.sin(angleRad) * position * strand.length;

      // Perpendicular offset for double helix
      const perpAngle = angleRad + Math.PI / 2;
      const waveOffset = Math.sin(strand.wavePhase + position * Math.PI * 3) * offset;

      return {
        x: baseX + Math.cos(perpAngle) * waveOffset,
        y: baseY + Math.sin(perpAngle) * waveOffset,
      };
    };

    let animationId: number;

    const animate = () => {
      // Clear canvas with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ===== UPDATE & DRAW DNA STRANDS =====
      strands.forEach((strand) => {
        strand.wavePhase += strand.waveSpeed;

        // Calculate backbone points
        const steps = 60;
        const leftPoints: { x: number; y: number }[] = [];
        const rightPoints: { x: number; y: number }[] = [];

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const amplitude = strand.width / 2;

          const leftPoint = getPointAlongStrand(strand, t, amplitude);
          const rightPoint = getPointAlongStrand(strand, t, -amplitude);

          leftPoints.push(leftPoint);
          rightPoints.push(rightPoint);
        }

        // Draw backbones (very subtle)
        ctx.globalAlpha = strand.opacity * 0.45;
        ctx.strokeStyle = colors.cyan.hex;
        ctx.lineWidth = 1.3;
        ctx.lineCap = 'round';

        ctx.beginPath();
        leftPoints.forEach((point, i) => {
          if (i === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();

        ctx.strokeStyle = colors.purple.hex;
        ctx.beginPath();
        rightPoints.forEach((point, i) => {
          if (i === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();

        // Draw nodes
        strand.nodes.forEach((node) => {
          node.pulsePhase += node.pulseSpeed;
          const pulse = 0.7 + Math.sin(node.pulsePhase) * 0.3;

          const amplitude = strand.width / 2;
          const leftPoint = getPointAlongStrand(strand, node.position, amplitude);
          const rightPoint = getPointAlongStrand(strand, node.position, -amplitude);

          // Node size based on strand length
          const nodeSize = strand.length > 200 ? 3.5 : 3;

          // Left node
          ctx.globalAlpha = strand.opacity * 0.7 * pulse;
          ctx.fillStyle = node.color.hex;
          ctx.beginPath();
          ctx.arc(leftPoint.x, leftPoint.y, nodeSize * pulse, 0, Math.PI * 2);
          ctx.fill();

          // Right node
          ctx.globalAlpha = strand.opacity * 0.7 * pulse;
          ctx.fillStyle = node.color.hex;
          ctx.beginPath();
          ctx.arc(rightPoint.x, rightPoint.y, nodeSize * pulse, 0, Math.PI * 2);
          ctx.fill();
        });
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
      style={{ zIndex: 1, opacity: 0.9 }}
    />
  );
}