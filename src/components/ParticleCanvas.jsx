import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ mouse: { x: -9999, y: -9999 }, animId: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Resize ─────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Mouse tracking ─────────────────────────────────────────────
    const onMouseMove = (e) => {
      stateRef.current.mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Build particles ────────────────────────────────────────────
    const viewportArea = window.innerWidth * window.innerHeight;
    const N = Math.min(320, Math.floor(viewportArea / 4200));

    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.35 + 0.35,
      twinkleOffset: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 1.4 + 0.8,
    }));

    // ── Animate ────────────────────────────────────────────────────
    const CONNECTION_DIST = 160;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { mouse } = stateRef.current;
      const time = performance.now() * 0.001;

      // Update positions
      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100 && dist > 0) {
          const force = ((100 - dist) / 100) * 0.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping + movement
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < CONNECTION_DIST) {
            const opacity = (1 - d / CONNECTION_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,229,255,${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const twinkle = 0.75 + ((Math.sin(time * p.twinkleSpeed + p.twinkleOffset) + 1) / 2) * 0.55;
        const alpha = Math.min(1, p.alpha * twinkle);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,229,255,0.65)';
        ctx.fillStyle = `rgba(130,245,255,${alpha})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      stateRef.current.animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.75 }}
    />
  );
}
