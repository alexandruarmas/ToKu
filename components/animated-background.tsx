"use client";

import { useEffect, useState, useRef } from "react";
import { useBackground } from "@/providers/background-provider";
import { cn } from "@/lib/utils";

// Heart class for managing multiple animated hearts
class Heart {
  x: number;
  y: number;
  size: number;
  opacity: number;
  lifespan: number;
  age: number;
  maxSize: number;
  color: string;
  
  constructor(canvasWidth: number, canvasHeight: number) {
    // Position randomly but avoid edges
    this.x = Math.random() * (canvasWidth * 0.8) + (canvasWidth * 0.1);
    this.y = Math.random() * (canvasHeight * 0.8) + (canvasHeight * 0.1);
    
    // Start small and grow
    this.maxSize = Math.random() * 80 + 40; // Random size between 40-120px
    this.size = 1;
    this.opacity = 0;
    
    // Lifespan in frames
    this.lifespan = Math.floor(Math.random() * 200) + 100; // 100-300 frames
    this.age = 0;
    
    // Random color variation between purple and blue
    const hue = Math.floor(Math.random() * 60) + 220; // 220-280 (blue to purple)
    const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
    const lightness = Math.floor(Math.random() * 20) + 70; // 70-90%
    this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, `;
  }
  
  // Update heart state
  update() {
    this.age++;
    
    // Growth phase (0-30% of lifespan)
    if (this.age < this.lifespan * 0.3) {
      this.size = this.maxSize * (this.age / (this.lifespan * 0.3));
      this.opacity = Math.min(1, this.age / (this.lifespan * 0.2));
    } 
    // Stable phase (30-70% of lifespan)
    else if (this.age < this.lifespan * 0.7) {
      this.size = this.maxSize;
      this.opacity = 1;
    } 
    // Shrinking phase (70-100% of lifespan)
    else {
      const shrinkPhase = (this.age - this.lifespan * 0.7) / (this.lifespan * 0.3);
      this.size = this.maxSize * (1 - shrinkPhase);
      this.opacity = 1 - shrinkPhase;
    }
    
    return this.age < this.lifespan;
  }
  
  // Draw heart on canvas
  draw(ctx: CanvasRenderingContext2D) {
    if (this.opacity <= 0) return;
    
    const x = this.x;
    const y = this.y;
    const size = this.size;
    
    ctx.save();
    ctx.translate(x, y);
    
    // Draw heart shape
    const heartPath = new Path2D();
    heartPath.moveTo(0, size * 0.3);
    heartPath.bezierCurveTo(
      size * 0.3, -size * 0.3, 
      size * 0.8, -size * 0.2, 
      0, size * 0.6
    );
    heartPath.bezierCurveTo(
      -size * 0.8, -size * 0.2, 
      -size * 0.3, -size * 0.3, 
      0, size * 0.3
    );
    
    // Heart fill with glow
    ctx.fillStyle = `${this.color}${this.opacity})`;
    ctx.shadowColor = this.color + "1)";
    ctx.shadowBlur = size * 0.5;
    ctx.fill(heartPath);
    
    // Optional: Add subtle pulse effect
    if (this.age % 20 < 10) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke(heartPath);
    }
    
    ctx.restore();
  }
}

export const AnimatedBackground = () => {
  const { backgroundType } = useBackground();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixRef = useRef<number | null>(null);
  const heartsRef = useRef<Heart[]>([]);
  const lastHeartSpawnRef = useRef<number>(0);
  const crystalCanvasRef = useRef<HTMLCanvasElement>(null);
  const crystalAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Matrix animation setup
  useEffect(() => {
    if (backgroundType !== "matrix-heart") {
      if (matrixRef.current !== null) {
        cancelAnimationFrame(matrixRef.current);
        matrixRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix rain variables
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    // Matrix characters (simplified for performance)
    const matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    
    // Hearts array
    heartsRef.current = [];
    
    // Animation function
    const drawMatrix = (timestamp: number) => {
      // Semi-transparent overlay to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Matrix rain text
      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;
      
      // Process hearts
      const currentHearts = heartsRef.current;
      
      // Spawn new hearts periodically
      if (timestamp - lastHeartSpawnRef.current > 700 && currentHearts.length < 10) { // 700ms between spawns, max 10 hearts
        currentHearts.push(new Heart(canvas.width, canvas.height));
        lastHeartSpawnRef.current = timestamp;
      }
      
      // Update and remove dead hearts
      heartsRef.current = currentHearts.filter(heart => heart.update());
      
      // Check if a character is inside any heart
      const isInAnyHeart = (x: number, y: number) => {
        for (const heart of currentHearts) {
          // Skip hearts that are barely visible
          if (heart.opacity < 0.2) continue;
          
          // Simple distance check (approximation)
          const dx = x - heart.x;
          const dy = y - heart.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < heart.size * 0.5) {
            return { inHeart: true, opacity: heart.opacity };
          }
        }
        return { inHeart: false, opacity: 0 };
      };
      
      // Draw matrix characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Check if inside any heart and adjust color
        const heartCheck = isInAnyHeart(x, y);
        
        if (heartCheck.inHeart) {
          // Create gradient for heart text - light purple/blue
          ctx.fillStyle = `rgba(160, 170, 255, ${Math.random() * 0.4 + 0.6 * heartCheck.opacity})`;
        } else {
          // Matrix green with varying opacity
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const distanceFromCenter = Math.sqrt(
            Math.pow((x - centerX) / canvas.width, 2) + 
            Math.pow((y - centerY) / canvas.height, 2)
          );
          // Fade characters as they get closer to the center
          const opacity = Math.max(0.3, Math.min(0.85, distanceFromCenter));
          ctx.fillStyle = `rgba(0, 255, 70, ${opacity})`;
        }
        
        // Don't render some text inside hearts
        if (!heartCheck.inHeart || Math.random() > 0.5) {
          ctx.fillText(text, x, y);
        }
        
        // Move drops down
        drops[i]++;
        
        // Reset drops back to top with random start position
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -10);
        }
      }
      
      // Draw all hearts
      for (const heart of currentHearts) {
        heart.draw(ctx);
      }
      
      // Schedule next frame
      matrixRef.current = requestAnimationFrame(drawMatrix);
    };

    // Start animation
    matrixRef.current = requestAnimationFrame(drawMatrix);

    // Cleanup
    return () => {
      if (matrixRef.current !== null) {
        cancelAnimationFrame(matrixRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [backgroundType]);

  // Crystal Aurora animation setup
  useEffect(() => {
    if (backgroundType !== "crystal-aurora") {
      if (crystalAnimationRef.current !== null) {
        cancelAnimationFrame(crystalAnimationRef.current);
        crystalAnimationRef.current = null;
      }
      return;
    }

    const canvas = crystalCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Crystal class for managing animated crystals
    class Crystal {
      x: number;
      y: number;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      shapeType: number; // 0-4 for different crystal shapes
      lifespan: number;
      age: number;
      
      constructor(canvasWidth: number, canvasHeight: number) {
        // Position randomly
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        
        this.size = Math.random() * 60 + 30; // Random size between 30-90px
        this.opacity = Math.random() * 0.3 + 0.1; // Start with low opacity
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.01 + 0.002) * (Math.random() > 0.5 ? 1 : -1);
        
        // Random color in pink/purple palette
        const hue = Math.floor(Math.random() * 50) + 280; // 280-330 (purple to pink)
        const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
        const lightness = Math.floor(Math.random() * 20) + 75; // 75-95%
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, `;
        
        // Random crystal shape (0-4)
        this.shapeType = Math.floor(Math.random() * 5);
        
        // Lifespan and age
        this.lifespan = Math.floor(Math.random() * 300) + 400; // 400-700 frames
        this.age = 0;
      }
      
      update() {
        this.age++;
        this.rotation += this.rotationSpeed;
        
        // Fade in (0-20% of lifespan)
        if (this.age < this.lifespan * 0.2) {
          this.opacity = Math.min(0.7, this.opacity + 0.01);
        } 
        // Stable phase (20-80% of lifespan)
        else if (this.age < this.lifespan * 0.8) {
          // Slight opacity fluctuation
          this.opacity = 0.4 + Math.sin(this.age * 0.02) * 0.3;
        } 
        // Fade out (80-100% of lifespan)
        else {
          this.opacity = Math.max(0, this.opacity - 0.01);
        }
        
        return this.age < this.lifespan;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Base crystal color with transparency
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.strokeStyle = `${this.color}${this.opacity + 0.2})`;
        ctx.lineWidth = 1;
        
        // Add glow effect
        ctx.shadowColor = this.color + "1)";
        ctx.shadowBlur = this.size * 0.5;
        
        // Draw different crystal shapes based on shapeType
        switch (this.shapeType) {
          case 0: // Diamond shape
            this.drawDiamond(ctx);
            break;
          case 1: // Hexagonal shape
            this.drawHexagon(ctx);
            break;
          case 2: // Star shape
            this.drawStar(ctx);
            break;
          case 3: // Triangular shape
            this.drawTriangle(ctx);
            break;
          case 4: // Rectangular prism
            this.drawRectPrism(ctx);
            break;
          default:
            this.drawDiamond(ctx);
        }
        
        ctx.restore();
      }
      
      // Diamond/gem shape
      drawDiamond(ctx: CanvasRenderingContext2D) {
        const s = this.size * 0.5;
        
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.7, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.7, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Add facet lines for dimension
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(0, s);
        ctx.moveTo(-s * 0.7, 0);
        ctx.lineTo(s * 0.7, 0);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.stroke();
      }
      
      // Hexagonal shape
      drawHexagon(ctx: CanvasRenderingContext2D) {
        const s = this.size * 0.5;
        const sides = 6;
        const angle = (Math.PI * 2) / sides;
        
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const x = s * Math.cos(angle * i);
          const y = s * Math.sin(angle * i);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Add facet lines
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(s * Math.cos(angle * i), s * Math.sin(angle * i));
          ctx.lineTo(s * Math.cos(angle * (i + 3)), s * Math.sin(angle * (i + 3)));
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.4})`;
          ctx.stroke();
        }
      }
      
      // Star shape
      drawStar(ctx: CanvasRenderingContext2D) {
        const s = this.size * 0.5;
        const points = 5;
        const outerRadius = s;
        const innerRadius = s * 0.4;
        
        ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI * i) / points;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      
      // Triangle shape
      drawTriangle(ctx: CanvasRenderingContext2D) {
        const s = this.size * 0.6;
        
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * Math.cos(Math.PI / 6), s * Math.sin(Math.PI / 6));
        ctx.lineTo(-s * Math.cos(Math.PI / 6), s * Math.sin(Math.PI / 6));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Add center line
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(0, s * Math.sin(Math.PI / 6));
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.stroke();
      }
      
      // Rectangular prism
      drawRectPrism(ctx: CanvasRenderingContext2D) {
        const s = this.size * 0.4;
        
        // Front face
        ctx.beginPath();
        ctx.rect(-s, -s, s * 2, s * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add 3D effect with side face
        ctx.beginPath();
        ctx.moveTo(s, -s);
        ctx.lineTo(s + s * 0.4, -s + s * 0.4);
        ctx.lineTo(s + s * 0.4, s + s * 0.4);
        ctx.lineTo(s, s);
        ctx.closePath();
        ctx.fillStyle = `${this.color}${this.opacity * 0.7})`;
        ctx.fill();
        ctx.stroke();
        
        // Top face
        ctx.beginPath();
        ctx.moveTo(-s, -s);
        ctx.lineTo(-s + s * 0.4, -s + s * 0.4);
        ctx.lineTo(s + s * 0.4, -s + s * 0.4);
        ctx.lineTo(s, -s);
        ctx.closePath();
        ctx.fillStyle = `${this.color}${this.opacity * 0.9})`;
        ctx.fill();
        ctx.stroke();
      }
    }
    
    // Array to store crystals
    const crystals: Crystal[] = [];
    
    // Add initial crystals
    for (let i = 0; i < 15; i++) {
      crystals.push(new Crystal(canvas.width, canvas.height));
    }
    
    // Animation function for Crystal Aurora
    const drawCrystalAurora = (timestamp: number) => {
      // Clear canvas with a transparent black overlay for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add new crystals occasionally
      if (crystals.length < 30 && Math.random() < 0.02) {
        crystals.push(new Crystal(canvas.width, canvas.height));
      }
      
      // Update and draw crystals
      for (let i = crystals.length - 1; i >= 0; i--) {
        const crystal = crystals[i];
        const isAlive = crystal.update();
        
        if (isAlive) {
          crystal.draw(ctx);
        } else {
          // Remove dead crystals
          crystals.splice(i, 1);
          
          // Add a new crystal to replace the dead one
          if (Math.random() < 0.8) {
            crystals.push(new Crystal(canvas.width, canvas.height));
          }
        }
      }
      
      // Continue animation
      crystalAnimationRef.current = requestAnimationFrame(drawCrystalAurora);
    };
    
    // Start animation
    crystalAnimationRef.current = requestAnimationFrame(drawCrystalAurora);
    
    // Cleanup
    return () => {
      if (crystalAnimationRef.current !== null) {
        cancelAnimationFrame(crystalAnimationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [backgroundType]);

  // Apple Light background
  if (backgroundType === "apple-light") {
    return (
      <div className="fixed inset-0 bg-[#F5F3EE] transition-all duration-1000">
        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />
        
        {/* Subtle gradients in background - softer pastel palette */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full blur-3xl animate-gradient-pulse opacity-60" 
               style={{ width: '40%', height: '40%', left: '10%', top: '20%', background: '#A19387', animationDelay: '0s' }} />
          <div className="absolute rounded-full blur-3xl animate-gradient-pulse opacity-60" 
               style={{ width: '35%', height: '35%', right: '15%', top: '15%', background: '#EDD9A3', animationDelay: '2s' }} />
          <div className="absolute rounded-full blur-3xl animate-gradient-pulse opacity-60" 
               style={{ width: '30%', height: '30%', left: '20%', bottom: '20%', background: '#E0A9B3', animationDelay: '4s' }} />
          <div className="absolute rounded-full blur-3xl animate-gradient-pulse opacity-60" 
               style={{ width: '25%', height: '25%', right: '25%', bottom: '25%', background: '#9DBFCB', animationDelay: '6s' }} />
        </div>
        
        {/* Floating abstract shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full border transition-all duration-500"
              style={{
                width: `${Math.random() * 4 + 2}rem`,
                height: `${Math.random() * 4 + 2}rem`,
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`,
                opacity: 0.15,
                borderColor: i % 5 === 0 ? '#A19387' : 
                            i % 5 === 1 ? '#EDD9A3' :
                            i % 5 === 2 ? '#E0A9B3' :
                            i % 5 === 3 ? '#9DBFCB' : '#F5F3EE',
                background: 'rgba(255, 255, 255, 0.1)',
                animation: `float-apple ${Math.random() * 8 + 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `rotate(${Math.random() * 45}deg)`
              }}
            />
          ))}
        </div>
        
        {/* Mouse follow effect - light version */}
        <div className="absolute inset-0 transition-all duration-300" style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(139, 114, 103, 0.08) 0%, 
                      rgba(139, 114, 103, 0.03) 25%, 
                      rgba(139, 114, 103, 0) 50%)`,
          transform: 'scale(1.2)',
        }} />
      </div>
    );
  }
  
  // Apple Dark Inverted background (Dark background with refined colors)
  if (backgroundType === "apple-dark-inverted") {
    return (
      <div className="fixed inset-0 bg-[#121214] transition-all duration-1000">
        {/* Grid lines - more subtle */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />
        
        {/* Subtle gradients in background - muted colors with reduced opacity */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full blur-3xl animate-gradient-pulse" 
               style={{ width: '40%', height: '40%', left: '10%', top: '20%', background: '#3A4666', opacity: 0.35, animationDelay: '0s' }} />
          <div className="absolute rounded-full blur-3xl animate-gradient-pulse" 
               style={{ width: '35%', height: '35%', right: '15%', top: '15%', background: '#1F367A', opacity: 0.35, animationDelay: '2s' }} />
          <div className="absolute rounded-full blur-3xl animate-gradient-pulse" 
               style={{ width: '30%', height: '30%', left: '20%', bottom: '20%', background: '#1D5F53', opacity: 0.35, animationDelay: '4s' }} />
          <div className="absolute rounded-full blur-3xl animate-gradient-pulse" 
               style={{ width: '25%', height: '25%', right: '25%', bottom: '25%', background: '#5F3A42', opacity: 0.35, animationDelay: '6s' }} />
        </div>
        
        {/* Floating abstract shapes - more subtle */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full border transition-all duration-500"
              style={{
                width: `${Math.random() * 4 + 2}rem`,
                height: `${Math.random() * 4 + 2}rem`,
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`,
                opacity: 0.1,
                borderColor: i % 5 === 0 ? '#3A4666' : 
                            i % 5 === 1 ? '#1F367A' :
                            i % 5 === 2 ? '#1D5F53' :
                            i % 5 === 3 ? '#5F3A42' : '#121214',
                background: 'rgba(0, 0, 0, 0.1)',
                animation: `float-apple ${Math.random() * 8 + 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `rotate(${Math.random() * 45}deg)`
              }}
            />
          ))}
        </div>
        
        {/* Mouse follow effect - refined dark version */}
        <div className="absolute inset-0 transition-all duration-300" style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(90, 110, 150, 0.07) 0%, 
                      rgba(90, 110, 150, 0.03) 25%, 
                      rgba(90, 110, 150, 0) 50%)`,
          transform: 'scale(1.2)',
        }} />
      </div>
    );
  }
  
  // Crystal Aurora background
  if (backgroundType === "crystal-aurora") {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' ? 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    
    // Check for high contrast preference
    const prefersHighContrast = typeof window !== 'undefined' ?
      window.matchMedia('(prefers-contrast: more)').matches : false;
    
    // Reduce animation intensity for high contrast mode
    const visualIntensity = prefersHighContrast ? 'opacity-30' : 'opacity-40';
    
    return (
      <div className="fixed inset-0" style={{ backgroundColor: 'var(--aurora-bg-deep)' }}>
        {/* Canvas for crystal animation with reduced opacity */}
        <canvas 
          ref={crystalCanvasRef} 
          className={cn(
            "absolute inset-0 w-full h-full z-0",
            visualIntensity
          )}
        />
        
        {/* Aurora wave effects with reduced intensity for accessibility */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className={prefersReducedMotion ? "" : "animate-aurora-subtle"}
            style={{
              position: 'absolute',
              width: '150%',
              height: '100%',
              left: '-25%',
              background: prefersHighContrast 
                ? 'linear-gradient(90deg, rgba(219, 112, 219, 0.03), rgba(126, 87, 194, 0.06), rgba(156, 39, 176, 0.1), rgba(103, 58, 183, 0.06), rgba(219, 112, 219, 0.03))'
                : 'linear-gradient(90deg, rgba(219, 112, 219, 0.05), rgba(126, 87, 194, 0.1), rgba(156, 39, 176, 0.15), rgba(103, 58, 183, 0.1), rgba(219, 112, 219, 0.05))',
              backgroundSize: '400% 100%',
              borderRadius: '60% 40% 50% 50% / 40% 50% 60% 60%',
              top: '10%',
              transform: 'rotate(-5deg)',
              opacity: prefersHighContrast ? 0.6 : 1
            }} 
          />
          <div 
            className={prefersReducedMotion ? "" : "animate-aurora-subtle"}
            style={{
              position: 'absolute',
              width: '150%',
              height: '90%',
              left: '-25%',
              background: prefersHighContrast
                ? 'linear-gradient(90deg, rgba(94, 53, 177, 0.06), rgba(156, 39, 176, 0.04), rgba(233, 30, 99, 0.06), rgba(103, 58, 183, 0.04), rgba(94, 53, 177, 0.06))'
                : 'linear-gradient(90deg, rgba(94, 53, 177, 0.1), rgba(156, 39, 176, 0.08), rgba(233, 30, 99, 0.1), rgba(103, 58, 183, 0.08), rgba(94, 53, 177, 0.1))',
              backgroundSize: '400% 100%',
              borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%',
              top: '25%',
              animationDelay: '3s',
              transform: 'rotate(8deg)',
              opacity: prefersHighContrast ? 0.6 : 1
            }} 
          />
        </div>
        
        {/* Floating crystal decorations - reduced for accessibility */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {prefersReducedMotion || prefersHighContrast ? null : [...Array(prefersHighContrast ? 3 : 5)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-crystal-float animate-crystal-glow"
              style={{
                width: `${Math.random() * 50 + 40}px`,
                height: `${Math.random() * 50 + 40}px`,
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`,
                background: i % 2 === 0 
                  ? 'linear-gradient(135deg, rgba(255, 192, 255, 0.2), rgba(199, 125, 255, 0.08))'
                  : 'linear-gradient(135deg, rgba(195, 105, 255, 0.2), rgba(153, 50, 204, 0.08))',
                backdropFilter: 'blur(3px)',
                borderRadius: i % 4 === 0 ? '30% 70% 70% 30% / 30% 30% 70% 70%' : 
                            i % 4 === 1 ? '60% 40% 30% 70% / 60% 30% 70% 40%' :
                            i % 4 === 2 ? '30% 30% 70% 70% / 60% 40% 60% 40%' :
                                         '50% 50% 20% 80% / 25% 80% 20% 75%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animationDuration: `${Math.random() * 5 + 15}s`, // Slower animation
                animationDelay: `${Math.random() * 5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
        
        {/* Subtle star effect in background - reduced number and opacity */}
        <div className="absolute inset-0 overflow-hidden">
          {prefersReducedMotion || prefersHighContrast ? null : [...Array(prefersHighContrast ? 15 : 30)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1, // Reduced opacity
                animation: 'twinkle 3s ease-in-out infinite',
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Mouse follow effect with reduced intensity */}
        <div className={cn(
          "absolute inset-0 transition-all duration-500",
          prefersHighContrast ? "opacity-30" : ""
        )} style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(230, 150, 255, 0.03) 0%, 
                      rgba(230, 150, 255, 0.01) 25%, 
                      rgba(230, 150, 255, 0) 50%)`,
          transform: 'scale(1.5)',
        }} />
      </div>
    );
  }
  
  // Matrix Heart background
  if (backgroundType === "matrix-heart") {
    return (
      <div className="fixed inset-0 bg-black">
        {/* Canvas for matrix animation */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-0"
        />
        
        {/* Additional overlay for subtle effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
        
        {/* Very subtle grid pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 255, 70, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 70, 0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>
    );
  }
  
  // Starfield background
  if (backgroundType === "starfield") {
    return (
      <div className="fixed inset-0 bg-[#000B14]">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 5 + 2}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 animate-starfield-rotate" style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 41, 102, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 157, 255, 0.08) 0%, rgba(0, 0, 0, 0) 60%)'
        }} />
      </div>
    );
  }
  
  // Fallback
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black" />
  );
}; 