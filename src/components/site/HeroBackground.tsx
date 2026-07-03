"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hub: boolean; phase: number };
type Pulse = { from: number; to: number; t: number; duration: number };

export type HeroVariant = "network" | "hub" | "flow" | "grid" | "converge" | "dense" | "focus";

type VariantConfig = {
  count: number;
  linkDist: number;
  drift: number;
  hubFraction: number;
  hubSizeMult: number;
  maxPulses: number;
  spawnInterval: number;
  pulseMode: "random" | "directional" | "converge";
};

/** One distinct visual "personality" per page so the hero network doesn't feel identical site-wide,
 * while staying within the same dark/cyan agent-network language. Node placement always stays a
 * uniform random spread across the full canvas — only density/size/speed/pulse-behavior vary —
 * so no variant ever balls up into a clump in one corner. */
const VARIANTS: Record<HeroVariant, VariantConfig> = {
  // Homepage — the richest, most balanced version.
  network: { count: 34, linkDist: 130, drift: 1, hubFraction: 1 / 7, hubSizeMult: 1, maxPulses: 3, spawnInterval: 650, pulseMode: "random" },
  // Services — more, bigger hub nodes: many services radiating from a few cores.
  hub: { count: 32, linkDist: 150, drift: 0.7, hubFraction: 1 / 4, hubSizeMult: 1.5, maxPulses: 4, spawnInterval: 500, pulseMode: "random" },
  // How It Works — left-to-right directional pulses, evoking a pipeline/process.
  flow: { count: 28, linkDist: 150, drift: 1.1, hubFraction: 1 / 9, hubSizeMult: 1, maxPulses: 3, spawnInterval: 480, pulseMode: "directional" },
  // Pricing — calm, sparse, slow-moving: keeps focus on the plan cards.
  grid: { count: 18, linkDist: 160, drift: 0.35, hubFraction: 0, hubSizeMult: 1, maxPulses: 1, spawnInterval: 1600, pulseMode: "random" },
  // Contact — signals converging toward the center.
  converge: { count: 28, linkDist: 140, drift: 0.6, hubFraction: 1 / 10, hubSizeMult: 1.1, maxPulses: 3, spawnInterval: 600, pulseMode: "converge" },
  // Work index — denser, busier, showcase energy.
  dense: { count: 46, linkDist: 105, drift: 1, hubFraction: 1 / 9, hubSizeMult: 1, maxPulses: 5, spawnInterval: 400, pulseMode: "random" },
  // Case study pages — sparse, a few large glowing focal nodes, one slow pulse at a time.
  focus: { count: 20, linkDist: 160, drift: 0.45, hubFraction: 1 / 4, hubSizeMult: 1.7, maxPulses: 1, spawnInterval: 1100, pulseMode: "random" },
};

const PARALLAX = 14;

export function HeroBackground({ variant = "network" }: { variant?: HeroVariant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const cfg = VARIANTS[variant];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let mouse = { x: 0, y: 0 };
    let raf = 0;
    let running = !reduceMotion;
    let lastTime = 0;
    let lastSpawn = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouse = { x: width / 2, y: height / 2 };
    }

    function seed() {
      const hubEvery = cfg.hubFraction > 0 ? Math.round(1 / cfg.hubFraction) : Infinity;
      nodes = Array.from({ length: cfg.count }, (_, i) => {
        const hub = i % hubEvery === 0;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18 * cfg.drift,
          vy: (Math.random() - 0.5) * 0.18 * cfg.drift,
          r: hub ? (3 + Math.random() * 1.6) * cfg.hubSizeMult : 1.2 + Math.random() * 1.6,
          hub,
          phase: Math.random() * Math.PI * 2,
        };
      });
      pulses = [];
    }

    function draw(now: number) {
      raf = 0;
      const dt = lastTime ? now - lastTime : 16;
      lastTime = now;
      ctx!.clearRect(0, 0, width, height);

      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      const edges: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < cfg.linkDist) {
            edges.push([i, j]);
            ctx!.strokeStyle = `rgba(0,229,255,${(1 - dist / cfg.linkDist) * 0.22})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      if (!reduceMotion && now - lastSpawn > cfg.spawnInterval && pulses.length < cfg.maxPulses && edges.length) {
        const [i, j] = edges[Math.floor(Math.random() * edges.length)];
        let from = i;
        let to = j;
        if (cfg.pulseMode === "directional") {
          if (nodes[i].x > nodes[j].x) {
            from = j;
            to = i;
          }
        } else if (cfg.pulseMode === "converge") {
          const distI = Math.hypot(nodes[i].x - width / 2, nodes[i].y - height / 2);
          const distJ = Math.hypot(nodes[j].x - width / 2, nodes[j].y - height / 2);
          if (distI < distJ) {
            from = j;
            to = i;
          }
        }
        pulses.push({ from, to, t: 0, duration: 900 + Math.random() * 500 });
        lastSpawn = now;
      }

      for (const p of pulses) {
        p.t += dt / p.duration;
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) continue;
        const eased = 1 - Math.pow(1 - Math.min(1, p.t), 3);
        const x = a.x + (b.x - a.x) * eased;
        const y = a.y + (b.y - a.y) * eased;
        const glow = ctx!.createRadialGradient(x, y, 0, x, y, 9);
        glow.addColorStop(0, "rgba(0,229,255,0.9)");
        glow.addColorStop(1, "rgba(0,229,255,0)");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(x, y, 9, 0, Math.PI * 2);
        ctx!.fill();
      }
      pulses = pulses.filter((p) => p.t < 1);

      for (const n of nodes) {
        const ox = Math.max(-PARALLAX, Math.min(PARALLAX, (mouse.x - n.x) * 0.01));
        const oy = Math.max(-PARALLAX, Math.min(PARALLAX, (mouse.y - n.y) * 0.01));
        const twinkle = reduceMotion ? 1 : 0.75 + 0.25 * Math.sin(now * 0.0015 + n.phase);
        const nx = n.x + ox;
        const ny = n.y + oy;

        if (n.hub) {
          const glow = ctx!.createRadialGradient(nx, ny, 0, nx, ny, n.r * 4);
          glow.addColorStop(0, `rgba(0,229,255,${0.18 * twinkle})`);
          glow.addColorStop(1, "rgba(0,229,255,0)");
          ctx!.fillStyle = glow;
          ctx!.beginPath();
          ctx!.arc(nx, ny, n.r * 4, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.fillStyle = `rgba(${n.hub ? "230,255,255" : "0,229,255"},${(n.hub ? 0.85 : 0.55) * twinkle})`;
        ctx!.beginPath();
        ctx!.arc(nx, ny, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (running) {
        raf = requestAnimationFrame(draw);
      }
    }

    function start() {
      // Reset the frame clock so dt doesn't jump after a pause, and only
      // schedule if nothing is already queued — avoids the race where the
      // observer re-enables `running` but a stale frame had just cleared raf,
      // leaving the loop dead until reload (seen on mobile scroll away/back).
      lastTime = 0;
      if (running && !raf) raf = requestAnimationFrame(draw);
    }

    resize();
    seed();
    draw(performance.now());
    start();

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onResize() {
      resize();
      seed();
    }

    function onVisibility() {
      // Returning to a backgrounded tab (common on mobile) can leave rAF paused.
      if (!document.hidden) start();
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !reduceMotion;
        if (running) start();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        maskImage: "radial-gradient(ellipse 75% 65% at 60% 35%, #000 40%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 60% 35%, #000 40%, transparent 90%)",
        opacity: 0.7,
      }}
    />
  );
}
