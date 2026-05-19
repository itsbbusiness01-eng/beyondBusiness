import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      setTimeout(onDone, 800);
    }, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bb-grid-bg opacity-30" />
          <div className="absolute inset-0 bb-aurora" />

          <motion.div
            className="absolute left-1/2 top-0 h-full w-px bb-line-glow"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "top" }}
          />

          {/* Particles */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#c6f208]"
              initial={{
                x: (Math.random() - 0.5) * window.innerWidth * 0.7,
                y: (Math.random() - 0.5) * window.innerHeight * 0.7,
                opacity: 0,
              }}
              animate={{ opacity: [0, 0.9, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 2.5, delay: i * 0.05, repeat: Infinity }}
            />
          ))}

          <motion.div
            initial={{ y: 30, opacity: 0, filter: "blur(20px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center"
          >
            <div className="bb-display text-[clamp(2.5rem,8vw,6rem)] tracking-tight">
              BEYOND <span className="text-[#c6f208]">BUSINESS</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="bb-body mt-4 text-sm md:text-base tracking-[0.4em] uppercase"
            >
              Your Business, Beyond Limits.
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-1/2 h-px w-[40vw] -translate-x-1/2 bg-[#c6f208]/30 overflow-hidden"
          >
            <motion.div
              className="h-full w-1/3 bg-[#c6f208]"
              initial={{ x: "-100%" }}
              animate={{ x: "400%" }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}