import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

/* ─── PASTE YOUR MP3 URL HERE ─────────────────────────────── */
const THEME_URL =
  "https://res.cloudinary.com/dekn8nxtu/video/upload/v1780653102/Quiet_Signal_vlif9z.mp3";
/* ─────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   IDLE ICON — "Sound Prism"  (48×48 canvas)
───────────────────────────────────────────────────────────── */
function IdleIcon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const slowT = t * 0.00035;
      const breathe = Math.sin(t * 0.0018) * 0.5 + 0.5;

      for (let i = 0; i < 6; i++) {
        const baseAngle = (i / 6) * Math.PI * 2 + slowT;
        const phase = Math.sin(t * 0.0014 + (i * Math.PI) / 3);
        const size = 8 + phase * 2.5 + breathe * 1.5;
        const dist = 7 + breathe * 1.5;
        const px = cx + Math.cos(baseAngle) * dist;
        const py = cy + Math.sin(baseAngle) * dist;
        const tipX = cx + Math.cos(baseAngle) * (dist + size);
        const tipY = cy + Math.sin(baseAngle) * (dist + size);
        const left = baseAngle + Math.PI / 2;
        const right = baseAngle - Math.PI / 2;
        const bs = size * 0.5;
        const alpha = 0.3 + phase * 0.25 + breathe * 0.2;

        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(px + Math.cos(left) * bs, py + Math.sin(left) * bs);
        ctx.lineTo(px + Math.cos(right) * bs, py + Math.sin(right) * bs);
        ctx.closePath();
        if (i % 2 === 0) {
          ctx.fillStyle = `rgba(198,242,8,${alpha})`;
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(198,242,8,${alpha + 0.2})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      const hexR = 4 + breathe * 2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + slowT * 2;
        i === 0
          ? ctx.moveTo(cx + Math.cos(a) * hexR, cy + Math.sin(a) * hexR)
          : ctx.lineTo(cx + Math.cos(a) * hexR, cy + Math.sin(a) * hexR);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(198,242,8,${0.6 + breathe * 0.4})`;
      ctx.fill();

      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 + slowT * 0.5;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * 20, cy + Math.sin(a) * 20, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242,242,225,${0.1 + Math.sin(t * 0.002 + i * 0.5) * 0.08})`;
        ctx.fill();
      }

      for (let arc = 0; arc < 2; arc++) {
        const startA = slowT * (arc === 0 ? 1 : -1) * 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 17, startA, startA + Math.PI * 0.6);
        ctx.strokeStyle = "rgba(198,242,8,0.16)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} width={48} height={48} style={{ display: "block" }} />;
}

/* ─────────────────────────────────────────────────────────────
   PLAYING ICON — "Liquid Sound"  (48×48 canvas)
───────────────────────────────────────────────────────────── */
function PlayingIcon({ analyser }: { analyser: AnalyserNode | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particles = useRef<
    Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }>
  >([]);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const buf = analyser.frequencyBinCount;
    const data = new Uint8Array(buf);

    const draw = (t: number) => {
      rafRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(data);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const N = 56;
      const baseR = 12;
      const spike = 10;
      const coords: [number, number][] = [];
      let maxAmp = 0;

      for (let i = 0; i < N; i++) {
        const raw = data[Math.floor((i / N) * buf * 0.7)] / 255;
        const amp = raw * 0.7 + 0.15 + Math.sin(t * 0.002 + (i * Math.PI * 2) / N) * 0.06;
        maxAmp = Math.max(maxAmp, amp);
        const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
        coords.push([
          cx + Math.cos(angle) * (baseR + amp * spike),
          cy + Math.sin(angle) * (baseR + amp * spike),
        ]);
      }

      const draw2 = (lw: number, stroke: string, fill?: string) => {
        ctx.beginPath();
        coords.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.closePath();
        if (fill) {
          ctx.fillStyle = fill;
          ctx.fill();
        }
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lw;
        ctx.stroke();
      };

      draw2(5, `rgba(198,242,8,${0.1 + maxAmp * 0.16})`);
      draw2(
        1.0,
        `rgba(198,242,8,${0.7 + maxAmp * 0.3})`,
        `rgba(198,242,8,${0.08 + maxAmp * 0.07})`,
      );

      const bp = ((data[1] + data[2]) / (255 * 2)) * 0.6 + 0.18 + Math.sin(t * 0.003) * 0.06;
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5 + bp * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(242,242,225,${0.7 + bp * 0.3})`;
      ctx.fill();

      if (Math.random() < 0.3 + maxAmp * 0.35) {
        const [px, py] = coords[Math.floor(Math.random() * N)];
        const dx = px - cx;
        const dy = py - cy;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        particles.current.push({
          x: px,
          y: py,
          vx: (dx / len) * (0.35 + Math.random() * 0.7),
          vy: (dy / len) * (0.35 + Math.random() * 0.7),
          life: 1,
          maxLife: 24 + Math.random() * 18,
        });
      }

      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.75, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,242,8,${(p.life / p.maxLife) * 0.75})`;
        ctx.fill();
        return p.life > 0;
      });

      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2 + t * 0.0006;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * 22, cy + Math.sin(a) * 22, 0.65, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,242,8,${0.14 + maxAmp * 0.18})`;
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [analyser]);

  return <canvas ref={canvasRef} width={48} height={48} style={{ display: "block" }} />;
}

/* ─────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────── */
export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const ctxRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 14 });
  const sy = useSpring(my, { stiffness: 180, damping: 14 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
      my.set((e.clientY - (r.top + r.height / 2)) * 0.25);
    },
    [mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const toggle = useCallback(async () => {
    if (playing) {
      audioRef.current?.pause();
      setAnalyser(null);
      setPlaying(false);
      return;
    }

    if (!ctxRef.current) {
      const audio = new Audio(THEME_URL);
      audio.crossOrigin = "anonymous";
      audio.loop = true;
      audioRef.current = audio;

      const actx = new (window.AudioContext || (window as any).webkitAudioContext)();
      ctxRef.current = actx;

      const an = actx.createAnalyser();
      an.fftSize = 128;
      an.smoothingTimeConstant = 0.84;
      analyserRef.current = an;

      actx.createMediaElementSource(audio).connect(an);
      an.connect(actx.destination);
    }

    if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
    await audioRef.current!.play();
    setAnalyser(analyserRef.current);
    setPlaying(true);
  }, [playing]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      ctxRef.current?.close();
    },
    [],
  );

  return (
    <div className="fixed bottom-4 right-4 md:bottom-7 md:right-7 z-[9999]">
      <motion.div style={{ x: sx, y: sy }}>
        {/* Pulse rings */}
        <AnimatePresence>
          {playing && (
            <>
              <motion.span
                key="r1"
                initial={{ opacity: 0.55, scale: 1 }}
                animate={{ opacity: 0, scale: 1.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1px solid rgba(198,242,8,0.65)",
                  pointerEvents: "none",
                }}
              />
              <motion.span
                key="r2"
                initial={{ opacity: 0.3, scale: 1 }}
                animate={{ opacity: 0, scale: 2.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.65, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1px solid rgba(198,242,8,0.3)",
                  pointerEvents: "none",
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onClick={toggle}
          aria-label={playing ? "Stop theme music" : "Play theme music"}
          whileTap={{ scale: 0.9 }}
          className="w-[52px] h-[52px] md:w-[58px] md:h-[58px]"
          style={{
            borderRadius: "50%",
            border: "none",
            background: "#0a0a0a",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            outline: "none",
            position: "relative",
            boxShadow: playing
              ? "0 0 0 1.5px rgba(198,242,8,0.8), 0 0 22px rgba(198,242,8,0.13)"
              : "0 0 0 1px rgba(242,242,225,0.1)",
            transition: "box-shadow 0.35s ease",
          }}
        >
          <AnimatePresence mode="wait">
            {playing ? (
              <motion.div
                key="p"
                initial={{ opacity: 0, scale: 0.5, rotate: 18 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: -18 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <PlayingIcon analyser={analyser} />
              </motion.div>
            ) : (
              <motion.div
                key="i"
                initial={{ opacity: 0, scale: 0.5, rotate: -18 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 18 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <IdleIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  );
}
