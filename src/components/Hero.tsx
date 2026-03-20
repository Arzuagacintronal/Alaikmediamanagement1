import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, MouseEvent } from "react";

const GoldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const target = useRef({ x: 0.5, y: 0.5 });
  const ripples = useRef<Array<{ x: number; y: number; t: number; strength: number }>>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.current.x = (e.clientX - rect.left) / rect.width;
      target.current.y = (e.clientY - rect.top) / rect.height;
      ripples.current.push({
        x: target.current.x,
        y: target.current.y,
        t: 0,
        strength: 0.12 + Math.random() * 0.08,
      });
      if (ripples.current.length > 12) ripples.current.shift();
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      time += 0.012;

      mouse.current.x += (target.current.x - mouse.current.x) * 0.06;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.06;

      ripples.current = ripples.current
        .map(r => ({ ...r, t: r.t + 0.03 }))
        .filter(r => r.t < 1);

      ctx.clearRect(0, 0, W, H);

      const computeDistortion = (nx: number, ny: number) => {
        let dx = 0, dy = 0;
        for (const r of ripples.current) {
          const dist = Math.hypot(nx - r.x, ny - r.y);
          const wave = Math.sin(dist * 18 - r.t * 6) * r.strength * (1 - r.t);
          const falloff = Math.exp(-dist * 5);
          dx += wave * falloff * (nx - r.x);
          dy += wave * falloff * (ny - r.y);
        }
        const mdist = Math.hypot(nx - mouse.current.x, ny - mouse.current.y);
        const pulse = Math.sin(mdist * 12 - time * 3) * 0.04 * Math.exp(-mdist * 4);
        dx += pulse * (nx - mouse.current.x);
        dy += pulse * (ny - mouse.current.y);
        return { dx, dy };
      };

      const NUM_POINTS = 6;
      const points: { x: number; y: number; phase: number }[] = [
        { x: 0.5 + Math.sin(time * 0.7) * 0.18, y: 0.5 + Math.cos(time * 0.5) * 0.14, phase: 0 },
        { x: mouse.current.x, y: mouse.current.y, phase: 1 },
        { x: 0.25 + Math.sin(time * 0.4 + 1) * 0.12, y: 0.35 + Math.cos(time * 0.6 + 2) * 0.15, phase: 2 },
        { x: 0.75 + Math.cos(time * 0.5 + 0.5) * 0.1, y: 0.65 + Math.sin(time * 0.4 + 1) * 0.12, phase: 3 },
        { x: 0.6 + Math.sin(time * 0.3 + 3) * 0.15, y: 0.3 + Math.cos(time * 0.8) * 0.1, phase: 4 },
        { x: 0.3 + Math.cos(time * 0.6 + 2) * 0.1, y: 0.7 + Math.sin(time * 0.5 + 1) * 0.1, phase: 5 },
      ];

      const ROWS = 80;
      const COLS = 80;
      const cw = W / COLS;
      const ch = H / ROWS;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const nx = col / COLS;
          const ny = row / ROWS;
          const { dx, dy } = computeDistortion(nx, ny);
          const sx = nx + dx;
          const sy = ny + dy;

          let r = 0, g = 0, b = 0, a = 0;
          for (let pi = 0; pi < NUM_POINTS; pi++) {
            const p = points[pi];
            const dist = Math.hypot(sx - p.x, sy - p.y);
            const wave = Math.sin(time * (0.8 + pi * 0.2) + p.phase * 1.8 + dist * 10) * 0.5 + 0.5;
            const weight = Math.exp(-dist * (2.5 + wave * 2));

            if (pi === 1) {
              r += weight * (212 + wave * 30) * 1.4;
              g += weight * (175 + wave * 20) * 1.4;
              b += weight * (55 + wave * 15);
              a += weight * 1.4;
            } else if (pi % 2 === 0) {
              r += weight * (180 + wave * 40);
              g += weight * (140 + wave * 30);
              b += weight * (30 + wave * 20);
              a += weight;
            } else {
              r += weight * (100 + wave * 60);
              g += weight * (70 + wave * 40);
              b += weight * (5 + wave * 15);
              a += weight * 0.7;
            }
          }

          if (a > 0) {
            const fr = Math.min(255, r / a);
            const fg = Math.min(255, g / a);
            const fb = Math.min(255, b / a);
            const alpha = Math.min(0.85, a * 0.18);
            ctx.fillStyle = `rgba(${Math.round(fr)},${Math.round(fg)},${Math.round(fb)},${alpha.toFixed(3)})`;
            ctx.fillRect(col * cw, row * ch, cw + 1, ch + 1);
          }
        }
      }

      const grad = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.7);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.6, "rgba(0,0,0,0.3)");
      grad.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "transform", filter: "blur(12px) saturate(1.4)", transform: "scale(1.04)" }}
    />
  );
};

const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * 6,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -900], opacity: [0, 0.9, 0], x: [0, (Math.random() - 0.5) * 120] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 120 });
  const bgX = useTransform(springX, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const bgY = useTransform(springY, [-0.5, 0.5], ["-1.5%", "1.5%"]);

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const wordAnim = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      className="relative min-h-[110vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <GoldCanvas />
        <Particles />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background pointer-events-none z-20" />
      </div>

      <div className="relative z-30 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card mb-10 border-primary/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#D4AF37]" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary/90">Elevating Digital Presence</span>
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-6xl md:text-8xl lg:text-9xl font-display font-medium leading-[1.05] tracking-tight mb-8"
        >
          <div className="overflow-hidden inline-block"><motion.span variants={wordAnim} className="inline-block">We</motion.span></div>{" "}
          <div className="overflow-hidden inline-block"><motion.span variants={wordAnim} className="inline-block">Build.</motion.span></div><br />
          <div className="overflow-hidden inline-block"><motion.span variants={wordAnim} className="inline-block">We</motion.span></div>{" "}
          <div className="overflow-hidden inline-block"><motion.span variants={wordAnim} className="inline-block">Manage.</motion.span></div><br />
          <div className="overflow-hidden inline-block"><motion.span variants={wordAnim} className="inline-block text-gradient-gold italic">You</motion.span></div>{" "}
          <div className="overflow-hidden inline-block"><motion.span variants={wordAnim} className="inline-block text-gradient-gold italic">Grow.</motion.span></div>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-14 font-light leading-relaxed tracking-wide"
        >
          Professional websites and elite social media management for businesses ready to dominate their market and level up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#pricing"
            className="group relative px-10 py-5 w-full sm:w-auto rounded-xl font-medium text-primary-foreground bg-gradient-gold shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)] hover:shadow-[0_0_70px_-10px_rgba(212,175,55,0.7)] hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative tracking-wide">Get Started Today</span>
            <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform duration-500" />
          </a>
          <a
            href="#services"
            className="px-10 py-5 w-full sm:w-auto rounded-xl font-medium text-foreground glass-card hover:bg-white/5 hover:border-primary/30 transition-all duration-500 tracking-wide"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-30" />
    </section>
  );
}
