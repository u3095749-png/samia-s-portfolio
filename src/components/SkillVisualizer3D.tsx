import React, { useEffect, useRef, useState } from 'react';

interface Node3D {
  name: string;
  category: string;
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

const initialSkills: { name: string; category: string; color: string }[] = [
  { name: 'TypeScript', category: 'Tech', color: '#2563EB' },
  { name: 'Teaching (1 Yr)', category: 'Pedagogy', color: '#0284C7' },
  { name: 'React SPA', category: 'Tech', color: '#3B82F6' },
  { name: 'Game Logic', category: 'Creative', color: '#1D4ED8' },
  { name: 'Tailwind CSS', category: 'Tech', color: '#06B6D4' },
  { name: 'Mentorship', category: 'Pedagogy', color: '#0369A1' },
  { name: 'UI / UX Design', category: 'Creative', color: '#6366F1' },
  { name: 'HTML5 Canvas', category: 'Tech', color: '#2563EB' },
  { name: 'Problem Solving', category: 'Core', color: '#1E40AF' },
  { name: 'Git & GitHub', category: 'Tech', color: '#475569' },
  { name: 'Curriculum Dev', category: 'Pedagogy', color: '#0284C7' },
  { name: 'Vercel Deploy', category: 'Tech', color: '#1D4ED8' }
];

export const SkillVisualizer3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationRef = useRef<{ x: number; y: number }>({ x: 0.002, y: 0.004 });
  const angleRef = useRef<{ x: number; y: number }>({ x: 0.4, y: 0.6 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const radius = 130;

    // Distribute nodes evenly on a sphere (Fibonacci sphere distribution)
    const count = initialSkills.length;
    const nodes: Node3D[] = initialSkills.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      return {
        name: skill.name,
        category: skill.category,
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
        color: skill.color,
        size: 7
      };
    });

    const rotatePoint = (x: number, y: number, z: number, angleX: number, angleY: number) => {
      // Rotate around X
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y1 = y * cosX - z * sinX;
      const z1 = z * cosX + y * sinX;

      // Rotate around Y
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      return { x: x2, y: y1, z: z2 };
    };

    const render = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Auto rotation when not dragging
      if (!isDraggingRef.current) {
        angleRef.current.x += rotationRef.current.x;
        angleRef.current.y += rotationRef.current.y;
      }

      // Calculate projected coordinates
      const projected = nodes.map(node => {
        const rotated = rotatePoint(node.x, node.y, node.z, angleRef.current.x, angleRef.current.y);
        const fov = 340;
        const scale = fov / (fov + rotated.z);
        const projX = centerX + rotated.x * scale;
        const projY = centerY + rotated.y * scale;

        return {
          ...node,
          projX,
          projY,
          scale,
          z: rotated.z
        };
      });

      // Sort by depth (z) for correct rendering order
      projected.sort((a, b) => a.z - b.z);

      // Draw faint connecting network lines
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.projX - p2.projX;
          const dy = p1.projY - p2.projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = Math.max(0.04, 0.25 * (1 - dist / 110) * ((p1.scale + p2.scale) / 2));
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha.toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes and labels
      projected.forEach(p => {
        const isMuted = activeCategory !== 'all' && p.category.toLowerCase() !== activeCategory.toLowerCase();
        const baseAlpha = isMuted ? 0.2 : Math.max(0.35, (p.z + radius) / (2 * radius));
        const nodeRadius = p.size * p.scale;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          p.projX,
          p.projY,
          0,
          p.projX,
          p.projY,
          nodeRadius * 2.5
        );
        glowGradient.addColorStop(0, `rgba(37, 99, 235, ${baseAlpha * 0.4})`);
        glowGradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, nodeRadius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, Math.max(2, nodeRadius), 0, Math.PI * 2);
        ctx.fillStyle = isMuted ? '#94A3B8' : p.color;
        ctx.globalAlpha = baseAlpha;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Label
        const fontSize = Math.max(9, Math.round(11 * p.scale));
        ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Label background badge
        const textMetrics = ctx.measureText(p.name);
        const paddingX = 6;
        const paddingY = 3;
        const boxWidth = textMetrics.width + paddingX * 2;
        const boxHeight = fontSize + paddingY * 2;
        const boxY = p.projY - nodeRadius - 10;

        ctx.fillStyle = isMuted ? 'rgba(241, 245, 249, 0.7)' : 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = isMuted ? 'rgba(203, 213, 225, 0.5)' : 'rgba(191, 219, 254, 0.8)';
        ctx.lineWidth = 1;

        // Round rect
        ctx.beginPath();
        ctx.roundRect(p.projX - boxWidth / 2, boxY - boxHeight / 2, boxWidth, boxHeight, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isMuted ? '#94A3B8' : '#0F172A';
        ctx.fillText(p.name, p.projX, boxY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCategory]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - mousePosRef.current.x;
    const dy = e.clientY - mousePosRef.current.y;
    mousePosRef.current = { x: e.clientX, y: e.clientY };

    angleRef.current.y += dx * 0.006;
    angleRef.current.x -= dy * 0.006;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - mousePosRef.current.x;
    const dy = e.touches[0].clientY - mousePosRef.current.y;
    mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    angleRef.current.y += dx * 0.006;
    angleRef.current.x -= dy * 0.006;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Category Filter Controls */}
      <div className="flex items-center gap-1.5 p-1 bg-blue-50/70 border border-blue-100 rounded-xl mb-3">
        {[
          { id: 'all', label: 'All Dimensions' },
          { id: 'tech', label: 'Web Tech' },
          { id: 'pedagogy', label: 'Teaching & Mentorship' },
          { id: 'creative', label: 'Games & UI' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-blue-900 hover:bg-white/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
        {/* Glow backdrop ring */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-400/10 via-sky-300/10 to-indigo-500/10 blur-xl pointer-events-none" />

        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing select-none"
        />

        {/* User drag hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-200/80 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
          <span>Drag in 3D to rotate sphere</span>
        </div>
      </div>
    </div>
  );
};
