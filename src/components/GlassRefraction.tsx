import { useEffect, useRef } from 'react';

export default function GlassRefraction() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    interface Crack {
      x: number;
      y: number;
      length: number;
      angle: number;
      branches: Array<{ angle: number; length: number }>;
      opacity: number;
      progress: number;
      speed: number;
    }

    const cracks: Crack[] = [];

    const createCrack = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const angle = Math.random() * Math.PI * 2;
      const length = 100 + Math.random() * 200;
      const branchCount = Math.floor(Math.random() * 3) + 1;

      const branches = [];
      for (let i = 0; i < branchCount; i++) {
        branches.push({
          angle: angle + (Math.random() - 0.5) * Math.PI / 2,
          length: length * (0.3 + Math.random() * 0.4),
        });
      }

      cracks.push({
        x,
        y,
        length,
        angle,
        branches,
        opacity: 0.4 + Math.random() * 0.3,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
      });
    };

    for (let i = 0; i < 8; i++) {
      createCrack();
    }

    const drawCrack = (crack: Crack) => {
      const currentLength = crack.length * Math.min(crack.progress, 1);

      ctx.strokeStyle = `rgba(147, 197, 253, ${crack.opacity * 0.6})`;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(crack.x, crack.y);
      const endX = crack.x + Math.cos(crack.angle) * currentLength;
      const endY = crack.y + Math.sin(crack.angle) * currentLength;
      ctx.lineTo(endX, endY);
      ctx.stroke();

      ctx.strokeStyle = `rgba(196, 181, 253, ${crack.opacity * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(crack.x, crack.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      if (crack.progress > 0.3) {
        crack.branches.forEach((branch) => {
          const branchProgress = Math.max(0, (crack.progress - 0.3) / 0.7);
          const branchLength = branch.length * branchProgress;

          ctx.strokeStyle = `rgba(167, 139, 250, ${crack.opacity * 0.5})`;
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.moveTo(endX, endY);
          const branchEndX = endX + Math.cos(branch.angle) * branchLength;
          const branchEndY = endY + Math.sin(branch.angle) * branchLength;
          ctx.lineTo(branchEndX, branchEndY);
          ctx.stroke();
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(249, 250, 251, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cracks.forEach((crack) => {
        crack.progress += crack.speed;

        if (crack.progress > 2) {
          crack.progress = 0;
          crack.x = Math.random() * canvas.width;
          crack.y = Math.random() * canvas.height;
          crack.angle = Math.random() * Math.PI * 2;
        }

        drawCrack(crack);
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{ mixBlendMode: 'overlay' }}
    />
  );
}
