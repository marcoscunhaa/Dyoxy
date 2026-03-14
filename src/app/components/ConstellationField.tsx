import { useEffect, useRef } from 'react';

export function ConstellationField() {
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

    // Star representing a constellation point
    interface Star {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      color: typeof colors.cyanPrimary;
      opacity: number;
      twinklePhase: number;
      twinkleSpeed: number;
      depth: number; // For parallax
      isConstellation: boolean; // Part of connected constellation
      // Neural movement properties
      velocityX?: number;
      velocityY?: number;
      targetX?: number;
      targetY?: number;
    }

    // Neural particle traveling through connections
    interface NeuralParticle {
      groupIndex: number;
      connectionIndex: number;
      progress: number; // 0-1 along the connection
      speed: number;
      color: typeof colors.cyanPrimary;
    }

    const stars: Star[] = [];
    const constellationGroups: ConstellationGroup[] = [];
    const neuralParticles: NeuralParticle[] = [];

    // Create stars - very minimal for elegance
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 40 : 60;
    const colorOptions = [
      colors.cyanPrimary,
      colors.purpleNeon,
      colors.cyanAccent,
      colors.purpleLight,
      colors.purpleDark,
    ];

    // Create stars with different depths for parallax
    for (let i = 0; i < starCount; i++) {
      const depth = Math.random();
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      stars.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: 0.8 + depth * 1.5,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        opacity: isMobile ? 0.2 + depth * 0.3 : 0.25 + depth * 0.35,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        depth,
        isConstellation: false,
      });
    }

    // Create constellation groups (connected stars)
    // Position constellations around the hero text area with strategic spacing
    const constellationCount = isMobile ? 4 : 6; // Reduced for better spacing
    
    // Define zones around the center hero text (avoid center)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const heroZoneWidth = canvas.width * 0.5; // Expanded hero zone for cleaner center
    const heroZoneHeight = canvas.height * 0.35;
    
    // Define specific zones for each constellation (premium distribution)
    const constellationZones = [
      { x: 0.15, y: 0.2 },      // Top-left
      { x: 0.85, y: 0.2 },      // Top-right
      { x: 0.1, y: 0.5 },       // Middle-left
      { x: 0.9, y: 0.5 },       // Middle-right
      { x: 0.2, y: 0.8 },       // Bottom-left
      { x: 0.8, y: 0.8 },       // Bottom-right
      { x: 0.5, y: 0.05 },      // Top-center (above hero)
      { x: 0.5, y: 0.92 },      // Bottom-center (below hero)
    ];
    
    const usedZones = new Set<number>();
    
    for (let i = 0; i < constellationCount; i++) {
      const groupSize = 5 + Math.floor(Math.random() * 4); // 5-8 stars per neural network (larger graphs)
      const group: Star[] = [];
      
      // Select zone for this constellation
      let zoneIndex = -1;
      let attempts = 0;
      while (zoneIndex === -1 && attempts < 20) {
        const candidateZone = Math.floor(Math.random() * constellationZones.length);
        if (!usedZones.has(candidateZone)) {
          zoneIndex = candidateZone;
          usedZones.add(candidateZone);
        }
        attempts++;
      }
      
      if (zoneIndex === -1) continue;
      
      const zone = constellationZones[zoneIndex];
      const zoneX = canvas.width * zone.x;
      const zoneY = canvas.height * zone.y;
      
      // Find stars near this zone
      const zoneRadius = isMobile ? 150 : 200; // Search radius around zone center
      const availableStars = stars.filter(s => {
        if (s.isConstellation) return false;
        const dx = s.x - zoneX;
        const dy = s.y - zoneY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < zoneRadius;
      });
      
      if (availableStars.length === 0) continue;
      
      // Pick closest star to zone center as constellation anchor
      availableStars.sort((a, b) => {
        const distA = Math.sqrt((a.x - zoneX) ** 2 + (a.y - zoneY) ** 2);
        const distB = Math.sqrt((b.x - zoneX) ** 2 + (b.y - zoneY) ** 2);
        return distA - distB;
      });
      
      const centerStar = availableStars[0];
      group.push(centerStar);
      centerStar.isConstellation = true;
      
      // Initialize neural movement for center star
      centerStar.velocityX = (Math.random() - 0.5) * 0.3;
      centerStar.velocityY = (Math.random() - 0.5) * 0.3;
      centerStar.targetX = centerStar.baseX;
      centerStar.targetY = centerStar.baseY;

      // Add nearby stars to form constellation (tighter grouping)
      for (let j = 1; j < groupSize; j++) {
        const nearbyStars = stars.filter(s => {
          if (s.isConstellation) return false;
          const dx = s.x - centerStar.x;
          const dy = s.y - centerStar.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < 180 && distance > 40; // Tighter constellation (was 250)
        });

        if (nearbyStars.length > 0) {
          const star = nearbyStars[Math.floor(Math.random() * nearbyStars.length)];
          star.isConstellation = true;
          
          // Initialize neural movement for this star
          star.velocityX = (Math.random() - 0.5) * 0.3;
          star.velocityY = (Math.random() - 0.5) * 0.3;
          star.targetX = star.baseX;
          star.targetY = star.baseY;
          
          group.push(star);
        }
      }

      if (group.length >= 3) {
        // Create NEURAL GRAPH patterns - complex interconnected structures
        const connections: ConstellationConnection[] = [];
        
        // Neural network patterns - sophisticated graph structures
        const neuralPatterns = ['neural_hub', 'synaptic_web', 'data_flow', 'brain_cluster', 'distributed_network'];
        const chosenPattern = neuralPatterns[Math.floor(Math.random() * neuralPatterns.length)];
        
        if (chosenPattern === 'neural_hub') {
          // Central hub with radial connections
          const centerIdx = 0; // First star is center
          for (let k = 1; k < group.length; k++) {
            connections.push({ from: centerIdx, to: k, pulseOffset: Math.random() * Math.PI * 2 });
          }
        } else if (chosenPattern === 'synaptic_web') {
          // Dense web of connections
          for (let k = 0; k < group.length; k++) {
            for (let c = k + 1; c < group.length; c++) {
              connections.push({ from: k, to: c, pulseOffset: Math.random() * Math.PI * 2 });
            }
          }
        } else if (chosenPattern === 'data_flow') {
          // Directed flow from center to outer stars
          const centerIdx = 0; // First star is center
          for (let k = 1; k < group.length; k++) {
            if (Math.random() > 0.3 || k === 1) {
              connections.push({ from: centerIdx, to: k, pulseOffset: Math.random() * Math.PI * 2 });
            } else {
              // Branch from previous star
              connections.push({ from: k - 1, to: k, pulseOffset: Math.random() * Math.PI * 2 });
            }
          }
        } else if (chosenPattern === 'brain_cluster') {
          // Clustered connections with central hub
          const centerIdx = 0; // First star is center
          for (let k = 1; k < group.length; k++) {
            if (Math.random() > 0.3 || k === 1) {
              connections.push({ from: centerIdx, to: k, pulseOffset: Math.random() * Math.PI * 2 });
            } else {
              // Branch from previous star
              connections.push({ from: k - 1, to: k, pulseOffset: Math.random() * Math.PI * 2 });
            }
          }
        } else if (chosenPattern === 'distributed_network') {
          // Distributed network with multiple hubs
          const hubCount = Math.min(2 + Math.floor(Math.random() * 2), group.length - 1);
          const hubs: number[] = [];
          for (let k = 0; k < hubCount; k++) {
            const hubIdx = Math.floor(Math.random() * group.length);
            if (!hubs.includes(hubIdx)) {
              hubs.push(hubIdx);
            }
          }
          for (let k = 0; k < group.length; k++) {
            const hubIdx = hubs[Math.floor(Math.random() * hubs.length)];
            if (k !== hubIdx) {
              connections.push({ from: k, to: hubIdx, pulseOffset: Math.random() * Math.PI * 2 });
            }
          }
        }
        
        constellationGroups.push({ 
          stars: group, 
          connections, 
          pattern: chosenPattern,
          pulsePhase: Math.random() * Math.PI * 2,
          morphTimer: 0,
          nextMorphTime: 1000 + Math.random() * 5000, // Random time between 1 and 6 seconds
        });
      }
    }

    let animationId: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    // Mouse interaction for parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetMouseX = e.touches[0].clientX - rect.left;
        targetMouseY = e.touches[0].clientY - rect.top;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Create neural particles traveling through connections
    const createNeuralParticle = () => {
      if (neuralParticles.length < 12 && Math.random() < 0.03) {
        const groupIndex = Math.floor(Math.random() * constellationGroups.length);
        const group = constellationGroups[groupIndex];
        if (group && group.connections.length > 0) {
          const connectionIndex = Math.floor(Math.random() * group.connections.length);
          neuralParticles.push({
            groupIndex,
            connectionIndex,
            progress: 0,
            speed: 0.008 + Math.random() * 0.012,
            color: Math.random() > 0.5 ? colors.cyanPrimary : colors.purpleNeon,
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth parallax mouse movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxStrength = 15;
      const offsetX = (mouseX - canvas.width / 2) / canvas.width * parallaxStrength;
      const offsetY = (mouseY - canvas.height / 2) / canvas.height * parallaxStrength;

      // Update and draw stars
      stars.forEach((star) => {
        // Neural node movement (slow organic drift)
        if (star.isConstellation && star.velocityX !== undefined && star.velocityY !== undefined && star.targetX !== undefined && star.targetY !== undefined) {
          // Update target position periodically (every few seconds)
          if (Math.random() < 0.001) {
            const driftRadius = 25; // Maximum drift distance
            star.targetX = star.baseX + (Math.random() - 0.5) * driftRadius;
            star.targetY = star.baseY + (Math.random() - 0.5) * driftRadius;
          }
          
          // Smoothly move baseX/baseY towards target
          const dx = star.targetX - star.baseX;
          const dy = star.targetY - star.baseY;
          star.baseX += dx * 0.005; // Very slow drift
          star.baseY += dy * 0.005;
        }
        
        // Apply subtle parallax based on depth
        star.x = star.baseX + offsetX * star.depth;
        star.y = star.baseY + offsetY * star.depth;

        // Validate star position (ensure finite values)
        if (!isFinite(star.x) || !isFinite(star.y)) {
          star.x = star.baseX;
          star.y = star.baseY;
        }

        // Twinkle effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.6 + Math.sin(star.twinklePhase) * 0.4; // 0.2-1.0

        // Draw star glow (very subtle)
        const glowSize = star.radius * (star.isConstellation ? 6 : 5);
        
        // Ensure all values are finite before creating gradient
        if (isFinite(star.x) && isFinite(star.y) && isFinite(glowSize) && glowSize > 0) {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize
          );
          const glowOpacity = isMobile ? 0.06 : 0.08;
          gradient.addColorStop(0, `rgba(${star.color.rgb.r}, ${star.color.rgb.g}, ${star.color.rgb.b}, ${star.opacity * glowOpacity * twinkle})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw star core
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fillStyle = star.color.hex;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw cross sparkle for constellation stars (premium touch)
        if (star.isConstellation && twinkle > 0.8) {
          ctx.globalAlpha = star.opacity * 0.3 * twinkle;
          ctx.strokeStyle = star.color.hex;
          ctx.lineWidth = 0.5;
          const sparkleSize = star.radius * 3;
          
          ctx.beginPath();
          ctx.moveTo(star.x - sparkleSize, star.y);
          ctx.lineTo(star.x + sparkleSize, star.y);
          ctx.moveTo(star.x, star.y - sparkleSize);
          ctx.lineTo(star.x, star.y + sparkleSize);
          ctx.stroke();
        }
      });

      // Draw constellation connections with animated pulse effect
      ctx.globalAlpha = 1;
      constellationGroups.forEach((group, groupIndex) => {
        // Update pulse phase
        group.pulsePhase += 0.02;
        
        // Morphing logic
        group.morphTimer++;
        if (group.morphTimer >= group.nextMorphTime) {
          // Choose a new pattern
          const neuralPatterns = ['neural_hub', 'synaptic_web', 'data_flow', 'brain_cluster', 'distributed_network'];
          const chosenPattern = neuralPatterns[Math.floor(Math.random() * neuralPatterns.length)];
          
          // Create new connections based on the chosen pattern
          const connections: ConstellationConnection[] = [];
          
          if (chosenPattern === 'neural_hub') {
            // Central hub with radial connections
            const centerIdx = 0; // First star is center
            for (let k = 1; k < group.stars.length; k++) {
              connections.push({ from: centerIdx, to: k, pulseOffset: Math.random() * Math.PI * 2 });
            }
          } else if (chosenPattern === 'synaptic_web') {
            // Dense web of connections
            for (let k = 0; k < group.stars.length; k++) {
              for (let c = k + 1; c < group.stars.length; c++) {
                connections.push({ from: k, to: c, pulseOffset: Math.random() * Math.PI * 2 });
              }
            }
          } else if (chosenPattern === 'data_flow') {
            // Directed flow from center to outer stars
            const centerIdx = 0; // First star is center
            for (let k = 1; k < group.stars.length; k++) {
              if (Math.random() > 0.3 || k === 1) {
                connections.push({ from: centerIdx, to: k, pulseOffset: Math.random() * Math.PI * 2 });
              } else {
                // Branch from previous star
                connections.push({ from: k - 1, to: k, pulseOffset: Math.random() * Math.PI * 2 });
              }
            }
          } else if (chosenPattern === 'brain_cluster') {
            // Clustered connections with central hub
            const centerIdx = 0; // First star is center
            for (let k = 1; k < group.stars.length; k++) {
              if (Math.random() > 0.3 || k === 1) {
                connections.push({ from: centerIdx, to: k, pulseOffset: Math.random() * Math.PI * 2 });
              } else {
                // Branch from previous star
                connections.push({ from: k - 1, to: k, pulseOffset: Math.random() * Math.PI * 2 });
              }
            }
          } else if (chosenPattern === 'distributed_network') {
            // Distributed network with multiple hubs
            const hubCount = Math.min(2 + Math.floor(Math.random() * 2), group.stars.length - 1);
            const hubs: number[] = [];
            for (let k = 0; k < hubCount; k++) {
              const hubIdx = Math.floor(Math.random() * group.stars.length);
              if (!hubs.includes(hubIdx)) {
                hubs.push(hubIdx);
              }
            }
            for (let k = 0; k < group.stars.length; k++) {
              const hubIdx = hubs[Math.floor(Math.random() * hubs.length)];
              if (k !== hubIdx) {
                connections.push({ from: k, to: hubIdx, pulseOffset: Math.random() * Math.PI * 2 });
              }
            }
          }
          
          // Update group with new connections and pattern
          group.connections = connections;
          group.pattern = chosenPattern;
          group.pulsePhase = Math.random() * Math.PI * 2;
          group.morphTimer = 0;
          group.nextMorphTime = 1000 + Math.random() * 5000; // Random time between 1 and 6 seconds
        }
        
        for (let i = 0; i < group.connections.length; i++) {
          const connection = group.connections[i];
          const star1 = group.stars[connection.from];
          const star2 = group.stars[connection.to];

          // Calculate pulse opacity (wave effect)
          const pulseIntensity = 0.5 + Math.sin(group.pulsePhase + connection.pulseOffset) * 0.5;
          const baseOpacity = isMobile ? 0.1 : 0.15;
          const connectionOpacity = baseOpacity + pulseIntensity * 0.08;

          // Draw connection line with gradient and pulse
          const gradient = ctx.createLinearGradient(star1.x, star1.y, star2.x, star2.y);
          gradient.addColorStop(0, `rgba(${star1.color.rgb.r}, ${star1.color.rgb.g}, ${star1.color.rgb.b}, ${connectionOpacity})`);
          gradient.addColorStop(0.5, `rgba(${Math.floor((star1.color.rgb.r + star2.color.rgb.r) / 2)}, ${Math.floor((star1.color.rgb.g + star2.color.rgb.g) / 2)}, ${Math.floor((star1.color.rgb.b + star2.color.rgb.b) / 2)}, ${connectionOpacity * 1.2})`);
          gradient.addColorStop(1, `rgba(${star2.color.rgb.r}, ${star2.color.rgb.g}, ${star2.color.rgb.b}, ${connectionOpacity})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.2 + pulseIntensity * 0.4;
          ctx.beginPath();
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
          ctx.stroke();

          // Draw pulse highlight (traveling energy)
          if (pulseIntensity > 0.7) {
            const pulseProgress = (Math.sin(group.pulsePhase + connection.pulseOffset) + 1) / 2;
            const pulseX = star1.x + (star2.x - star1.x) * pulseProgress;
            const pulseY = star1.y + (star2.y - star1.y) * pulseProgress;
            
            const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 6);
            pulseGradient.addColorStop(0, `rgba(${star1.color.rgb.r}, ${star1.color.rgb.g}, ${star1.color.rgb.b}, 0.4)`);
            pulseGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = pulseGradient;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Update and draw neural particles
      createNeuralParticle();

      for (let i = neuralParticles.length - 1; i >= 0; i--) {
        const particle = neuralParticles[i];
        particle.progress += particle.speed;

        if (particle.progress >= 1) {
          neuralParticles.splice(i, 1);
          continue;
        }

        const group = constellationGroups[particle.groupIndex];
        const connection = group.connections[particle.connectionIndex];
        const star1 = group.stars[connection.from];
        const star2 = group.stars[connection.to];

        // Calculate particle position along the connection
        const x = star1.x + (star2.x - star1.x) * particle.progress;
        const y = star1.y + (star2.y - star1.y) * particle.progress;

        // Draw particle
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = particle.color.hex;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset global alpha
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
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