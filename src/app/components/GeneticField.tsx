import { useEffect, useRef } from 'react';

export function GeneticField() {
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
      cyanPrimary: { hex: '#22D3EE', rgb: { r: 34, g: 211, b: 238 } },
      purpleNeon: { hex: '#A855F7', rgb: { r: 168, g: 85, b: 247 } },
      cyanAccent: { hex: '#38BDF8', rgb: { r: 56, g: 189, b: 248 } },
      purpleLight: { hex: '#C084FC', rgb: { r: 192, g: 132, b: 252 } },
      purpleDark: { hex: '#9333EA', rgb: { r: 147, g: 51, b: 234 } },
    };

    // DNA Base Pair
    interface BasePair {
      position: number; // Position along the helix (0-1)
      formed: boolean; // Whether the connection is visible
      formProgress: number; // Animation progress (0-1)
      leftNucleotide: { x: number; y: number };
      rightNucleotide: { x: number; y: number };
      color: typeof colors.cyanPrimary;
    }

    // DNA Helix Structure
    interface DNAHelix {
      x: number; // Starting X position
      y: number; // Center Y position
      length: number; // Length of the DNA strand
      angle: number; // Rotation angle (40° or 60°)
      helixTurns: number; // Number of helix turns
      basePairs: BasePair[];
      growthProgress: number; // Overall growth (0-1)
      speed: number; // Movement speed
      opacity: number;
      phase: number; // Animation phase offset
    }

    // Floating Molecule
    interface Molecule {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: typeof colors.cyanPrimary;
      opacity: number;
      targetDNA?: number; // Index of target DNA
      targetPair?: number; // Index of target base pair
      isAttaching: boolean;
      attachProgress: number;
    }

    const isMobile = window.innerWidth < 768;
    
    // Create DNA helixes
    const dnaHelixes: DNAHelix[] = [];
    const dnaCount = isMobile ? 2 : 3; // Reduced: 2 mobile, 3 desktop
    const angle = 60 * (Math.PI / 180); // Fixed 60° angle for all DNAs

    for (let i = 0; i < dnaCount; i++) {
      const length = isMobile ? 200 + Math.random() * 150 : 300 + Math.random() * 250;
      const helixTurns = 2 + Math.random() * 2; // 2-4 turns
      const basePairsCount = Math.floor(12 + Math.random() * 8); // 12-20 base pairs
      
      // Position DNAs across the screen with good spacing
      const x = -100 + (canvas.width + 200) * (i / dnaCount) + (Math.random() - 0.5) * 100;
      const y = 100 + Math.random() * (canvas.height - 200);
      
      const basePairs: BasePair[] = [];
      const colorChoice = Math.random() > 0.5 ? colors.cyanPrimary : colors.purpleNeon;
      
      // Create base pairs along the helix
      for (let j = 0; j < basePairsCount; j++) {
        const position = j / basePairsCount;
        basePairs.push({
          position,
          formed: false,
          formProgress: 0,
          leftNucleotide: { x: 0, y: 0 },
          rightNucleotide: { x: 0, y: 0 },
          color: Math.random() > 0.3 ? colorChoice : (colorChoice === colors.cyanPrimary ? colors.purpleNeon : colors.cyanPrimary),
        });
      }
      
      dnaHelixes.push({
        x,
        y,
        length,
        angle,
        helixTurns,
        basePairs,
        growthProgress: Math.random() * 0.3, // Start with some pre-formed
        speed: 0.05 + Math.random() * 0.08, // Reduced speed (was 0.15-0.40, now 0.05-0.13)
        opacity: isMobile ? 0.3 : 0.4, // Slightly reduced (was 0.4/0.5, now 0.3/0.4)
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Create floating molecules
    const molecules: Molecule[] = [];
    const moleculeCount = isMobile ? 15 : 25;
    
    for (let i = 0; i < moleculeCount; i++) {
      molecules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2, // Reduced speed (was 0.5, now 0.2)
        vy: (Math.random() - 0.5) * 0.2, // Reduced speed (was 0.5, now 0.2)
        radius: 1.5 + Math.random() * 1.5,
        color: Math.random() > 0.5 ? colors.cyanAccent : colors.purpleLight,
        opacity: 0.25 + Math.random() * 0.25, // Slightly reduced (was 0.3-0.6, now 0.25-0.5)
        isAttaching: false,
        attachProgress: 0,
      });
    }

    let animationId: number;

    const animate = () => {
      // Clear canvas completely (no trail effect to avoid smudges)
      ctx.fillStyle = '#05070F';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw DNA helixes
      dnaHelixes.forEach((dna, dnaIndex) => {
        // Move DNA horizontally (wrap around)
        dna.x += dna.speed;
        if (dna.x > canvas.width + 200) {
          dna.x = -200;
          dna.y = 100 + Math.random() * (canvas.height - 200);
          dna.growthProgress = 0; // Reset growth when wrapping
        }

        // Grow DNA slowly
        if (dna.growthProgress < 1) {
          dna.growthProgress += 0.0008; // Very slow growth
        }

        // Update phase for helix rotation
        dna.phase += 0.02;

        // Calculate helix parameters
        const helixRadius = 12; // Distance between strands
        const currentLength = dna.length * dna.growthProgress;

        // Draw DNA double helix
        const cosAngle = Math.cos(dna.angle);
        const sinAngle = Math.sin(dna.angle);

        // Update and draw base pairs
        dna.basePairs.forEach((pair, pairIndex) => {
          const pairPosition = pair.position * currentLength;
          
          // Calculate helix spiral
          const helixPhase = (pair.position * dna.helixTurns * Math.PI * 2) + dna.phase;
          const leftOffset = Math.sin(helixPhase) * helixRadius;
          const rightOffset = -Math.sin(helixPhase) * helixRadius;
          const depthLeft = Math.cos(helixPhase); // -1 to 1 (for depth perception)
          const depthRight = -Math.cos(helixPhase);

          // Position along the angled line
          const baseX = dna.x + pairPosition * cosAngle;
          const baseY = dna.y + pairPosition * sinAngle;

          // Perpendicular offset for helix spiral
          const perpX = -sinAngle;
          const perpY = cosAngle;

          pair.leftNucleotide.x = baseX + perpX * leftOffset;
          pair.leftNucleotide.y = baseY + perpY * leftOffset;
          pair.rightNucleotide.x = baseX + perpX * rightOffset;
          pair.rightNucleotide.y = baseY + perpY * rightOffset;

          // Check if this pair should be visible (within growth)
          if (pairPosition <= currentLength) {
            // Gradually form base pairs
            if (!pair.formed && Math.random() < 0.002) {
              pair.formed = true;
            }

            if (pair.formed && pair.formProgress < 1) {
              pair.formProgress = Math.min(1, pair.formProgress + 0.015);
            }

            // Draw nucleotides
            const nucleotideOpacity = dna.opacity * (0.5 + depthLeft * 0.5);
            const leftRadius = 2 + depthLeft * 0.5;
            const rightRadius = 2 + depthRight * 0.5;

            // Left nucleotide
            if (depthLeft > -0.3) {
              ctx.globalAlpha = nucleotideOpacity;
              ctx.fillStyle = pair.color.hex;
              ctx.beginPath();
              ctx.arc(pair.leftNucleotide.x, pair.leftNucleotide.y, leftRadius, 0, Math.PI * 2);
              ctx.fill();

              // Glow
              const glowGradient = ctx.createRadialGradient(
                pair.leftNucleotide.x, pair.leftNucleotide.y, 0,
                pair.leftNucleotide.x, pair.leftNucleotide.y, leftRadius * 3
              );
              glowGradient.addColorStop(0, `rgba(${pair.color.rgb.r}, ${pair.color.rgb.g}, ${pair.color.rgb.b}, ${nucleotideOpacity * 0.3})`);
              glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
              ctx.fillStyle = glowGradient;
              ctx.beginPath();
              ctx.arc(pair.leftNucleotide.x, pair.leftNucleotide.y, leftRadius * 3, 0, Math.PI * 2);
              ctx.fill();
            }

            // Right nucleotide
            if (depthRight > -0.3) {
              ctx.globalAlpha = dna.opacity * (0.5 + depthRight * 0.5);
              ctx.fillStyle = pair.color.hex;
              ctx.beginPath();
              ctx.arc(pair.rightNucleotide.x, pair.rightNucleotide.y, rightRadius, 0, Math.PI * 2);
              ctx.fill();

              // Glow
              const glowGradient = ctx.createRadialGradient(
                pair.rightNucleotide.x, pair.rightNucleotide.y, 0,
                pair.rightNucleotide.x, pair.rightNucleotide.y, rightRadius * 3
              );
              glowGradient.addColorStop(0, `rgba(${pair.color.rgb.r}, ${pair.color.rgb.g}, ${pair.color.rgb.b}, ${nucleotideOpacity * 0.3})`);
              glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
              ctx.fillStyle = glowGradient;
              ctx.beginPath();
              ctx.arc(pair.rightNucleotide.x, pair.rightNucleotide.y, rightRadius * 3, 0, Math.PI * 2);
              ctx.fill();
            }

            // Draw base pair connection (hydrogen bonds)
            if (pair.formed && pair.formProgress > 0) {
              const connectionOpacity = dna.opacity * 0.25 * pair.formProgress;
              ctx.globalAlpha = connectionOpacity;
              
              // Gradient from left to right
              const gradient = ctx.createLinearGradient(
                pair.leftNucleotide.x, pair.leftNucleotide.y,
                pair.rightNucleotide.x, pair.rightNucleotide.y
              );
              gradient.addColorStop(0, `rgba(${pair.color.rgb.r}, ${pair.color.rgb.g}, ${pair.color.rgb.b}, ${connectionOpacity})`);
              gradient.addColorStop(0.5, `rgba(${pair.color.rgb.r}, ${pair.color.rgb.g}, ${pair.color.rgb.b}, ${connectionOpacity * 1.5})`);
              gradient.addColorStop(1, `rgba(${pair.color.rgb.r}, ${pair.color.rgb.g}, ${pair.color.rgb.b}, ${connectionOpacity})`);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(pair.leftNucleotide.x, pair.leftNucleotide.y);
              
              // Animate the connection forming
              const endX = pair.leftNucleotide.x + (pair.rightNucleotide.x - pair.leftNucleotide.x) * pair.formProgress;
              const endY = pair.leftNucleotide.y + (pair.rightNucleotide.y - pair.leftNucleotide.y) * pair.formProgress;
              ctx.lineTo(endX, endY);
              ctx.stroke();

              // Draw dashed line for hydrogen bonds (if fully formed)
              if (pair.formProgress > 0.9) {
                ctx.globalAlpha = connectionOpacity * 0.6;
                ctx.setLineDash([2, 3]);
                ctx.strokeStyle = `rgba(${pair.color.rgb.r}, ${pair.color.rgb.g}, ${pair.color.rgb.b}, ${connectionOpacity * 0.8})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(pair.leftNucleotide.x, pair.leftNucleotide.y);
                ctx.lineTo(pair.rightNucleotide.x, pair.rightNucleotide.y);
                ctx.stroke();
                ctx.setLineDash([]);
              }
            }
          }
        });

        // Draw backbone strands (sugar-phosphate)
        ctx.globalAlpha = dna.opacity * 0.3;
        
        // Left strand
        ctx.strokeStyle = colors.cyanAccent.hex;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        let firstPoint = true;
        for (let i = 0; i < dna.basePairs.length; i++) {
          const pair = dna.basePairs[i];
          const pairPosition = pair.position * currentLength;
          if (pairPosition <= currentLength) {
            if (firstPoint) {
              ctx.moveTo(pair.leftNucleotide.x, pair.leftNucleotide.y);
              firstPoint = false;
            } else {
              ctx.lineTo(pair.leftNucleotide.x, pair.leftNucleotide.y);
            }
          }
        }
        ctx.stroke();

        // Right strand
        ctx.strokeStyle = colors.purpleLight.hex;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        firstPoint = true;
        for (let i = 0; i < dna.basePairs.length; i++) {
          const pair = dna.basePairs[i];
          const pairPosition = pair.position * currentLength;
          if (pairPosition <= currentLength) {
            if (firstPoint) {
              ctx.moveTo(pair.rightNucleotide.x, pair.rightNucleotide.y);
              firstPoint = false;
            } else {
              ctx.lineTo(pair.rightNucleotide.x, pair.rightNucleotide.y);
            }
          }
        }
        ctx.stroke();
      });

      // Update and draw floating molecules
      molecules.forEach((molecule, molIndex) => {
        if (!molecule.isAttaching) {
          // Float around
          molecule.x += molecule.vx;
          molecule.y += molecule.vy;

          // Wrap around screen
          if (molecule.x < -10) molecule.x = canvas.width + 10;
          if (molecule.x > canvas.width + 10) molecule.x = -10;
          if (molecule.y < -10) molecule.y = canvas.height + 10;
          if (molecule.y > canvas.height + 10) molecule.y = -10;

          // Occasionally attach to DNA
          if (Math.random() < 0.0005) {
            const targetDNAIndex = Math.floor(Math.random() * dnaHelixes.length);
            const targetDNA = dnaHelixes[targetDNAIndex];
            const unformedPairs = targetDNA.basePairs.filter(p => !p.formed);
            
            if (unformedPairs.length > 0) {
              const targetPair = targetDNA.basePairs.indexOf(unformedPairs[0]);
              molecule.targetDNA = targetDNAIndex;
              molecule.targetPair = targetPair;
              molecule.isAttaching = true;
              molecule.attachProgress = 0;
            }
          }

          // Draw molecule
          ctx.globalAlpha = molecule.opacity;
          ctx.fillStyle = molecule.color.hex;
          ctx.beginPath();
          ctx.arc(molecule.x, molecule.y, molecule.radius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle glow
          const molGlow = ctx.createRadialGradient(
            molecule.x, molecule.y, 0,
            molecule.x, molecule.y, molecule.radius * 2.5
          );
          molGlow.addColorStop(0, `rgba(${molecule.color.rgb.r}, ${molecule.color.rgb.g}, ${molecule.color.rgb.b}, ${molecule.opacity * 0.4})`);
          molGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.globalAlpha = molecule.opacity * 0.6;
          ctx.fillStyle = molGlow;
          ctx.beginPath();
          ctx.arc(molecule.x, molecule.y, molecule.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Attaching to DNA
          molecule.attachProgress += 0.02;

          if (molecule.targetDNA !== undefined && molecule.targetPair !== undefined) {
            const targetDNA = dnaHelixes[molecule.targetDNA];
            const targetPair = targetDNA.basePairs[molecule.targetPair];

            if (targetPair && molecule.attachProgress < 1) {
              // Move towards target
              const targetX = (targetPair.leftNucleotide.x + targetPair.rightNucleotide.x) / 2;
              const targetY = (targetPair.leftNucleotide.y + targetPair.rightNucleotide.y) / 2;

              molecule.x += (targetX - molecule.x) * 0.05;
              molecule.y += (targetY - molecule.y) * 0.05;

              // Draw molecule
              ctx.globalAlpha = molecule.opacity * (1 - molecule.attachProgress * 0.5);
              ctx.fillStyle = molecule.color.hex;
              ctx.beginPath();
              ctx.arc(molecule.x, molecule.y, molecule.radius, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Fully attached - form the base pair and reset molecule
              if (targetPair) {
                targetPair.formed = true;
              }
              
              // Reset molecule to new position
              molecule.x = Math.random() * canvas.width;
              molecule.y = Math.random() * canvas.height;
              molecule.isAttaching = false;
              molecule.attachProgress = 0;
              molecule.targetDNA = undefined;
              molecule.targetPair = undefined;
            }
          }
        }
      });

      ctx.globalAlpha = 1;
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
      style={{ zIndex: 1 }}
    />
  );
}