import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, Sparkles, Zap, Cpu, Megaphone, Video, Bot, Plus, Minus, Globe, TrendingUp, Camera, BarChart2, Star, Menu, X } from "lucide-react";

/* ------------- shared bits ------------- */

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}

function MagneticButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === "primary"
      ? "bg-[#c6f208] text-[#050505] hover:shadow-[0_0_60px_rgba(198,242,8,0.6)]"
      : "bg-transparent text-[#f2f2e1] border border-[#f2f2e1]/30 hover:border-[#c6f208] hover:text-[#c6f208]";

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${base} ${className}`}
      data-cursor="hover"
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

/* ------------- announcement bar ------------- */

function AnnouncementBar() {
  const items = Array.from({ length: 3 });
  return (
    <div className="relative z-40 border-b border-white/5 bb-glass overflow-hidden">
      <div className="flex">
        <div className="bb-marquee flex whitespace-nowrap py-2">
          {items.concat(items).map((_, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#f2f2e1]/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#c6f208] shadow-[0_0_10px_#c6f208]" />
              Free 30-Min Strategy Call — See exactly how to scale beyond limits
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------- navigation ------------- */

function Nav({ onCTA }: { onCTA: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className={`fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "top-3 w-[min(94%,1100px)]" : "top-6 w-[min(96%,1240px)]"
      }`}
    >
      <div className={`flex items-center justify-between rounded-full bb-glass px-6 py-3 ${scrolled ? "shadow-[0_8px_40px_rgba(0,0,0,0.6)]" : ""}`}>
        <a href="#top" className="flex items-center gap-2" data-cursor="hover">
          <div className="h-2 w-2 rounded-full bg-[#c6f208] shadow-[0_0_12px_#c6f208]" />
          <span className="bb-display text-base tracking-tight">BEYOND<span className="text-[#c6f208]">.</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.25em] text-[#f2f2e1]/70">
          {["Services", "Method", "Founder", "FAQ"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#c6f208] transition-colors" data-cursor="hover">
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onCTA}
            data-cursor="hover"
            className="hidden sm:block group relative overflow-hidden rounded-full bg-[#c6f208] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#050505] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(198,242,8,0.6)]"
          >
            Let's Talk
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#f2f2e1]/70 hover:text-[#c6f208] transition-colors"
            aria-label="Toggle Menu"
            data-cursor="hover"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-[calc(100%+0.5rem)] left-0 right-0 rounded-2xl bb-glass p-5 md:hidden flex flex-col gap-4 shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
          >
            <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.25em] text-[#f2f2e1]/70">
              {["Services", "Method", "Founder", "FAQ"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(`#${l.toLowerCase()}`);
                  }}
                  className="hover:text-[#c6f208] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {l}
                </a>
              ))}
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCTA();
              }}
              className="w-full text-center rounded-full bg-[#c6f208] py-3 text-xs font-semibold uppercase tracking-widest text-[#050505] transition-all hover:bg-[#c6f208]/90"
            >
              Let's Talk
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ------------- hero ------------- */


function Hero({ onCTA }: { onCTA: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "12px"]);

  const words1 = "READY TO SCALE".split(" ");
  const words2 = "YOUR BUSINESS.".split(" ");
  const words3 = "TO THE".split(" ");
  const words4 = "BEYOND LEVEL?".split(" ");

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100vh] xl:min-h-[120vh] overflow-hidden bb-noise"
    >
      {/* — Background layer — */}
      <motion.div style={{ y: yBg, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bb-grid-bg opacity-50" />
        <div className="absolute inset-0 bb-aurora" />
        {/* <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#c6f208]/40 to-transparent" /> */}
      </motion.div>

      {/* — Sticky hero content — */}
      <motion.div
        style={{ opacity: fade, filter: blur }}
        className={[
          "sticky top-0 flex min-h-screen flex-col items-center justify-center text-center",
          "px-5 sm:px-8 md:px-12 lg:px-16",
          "pt-20 sm:pt-22 md:pt-24 lg:pt-28",
          // ↓ Tighter bottom on mobile, breathes on larger screens
          "pb-10 sm:pb-14 md:pb-16",
        ].join(" ")}
      >
        {/* — Badge — */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={[
            "inline-flex items-center gap-2 rounded-full",
            "border border-[#c6f208]/30 bg-[#c6f208]/5",
            "px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-[#c6f208]",
            "mb-6 sm:mb-7 md:mb-8",
          ].join(" ")}
        >
          <Sparkles className="h-3 w-3" /> AI-Powered Growth Studio
        </motion.div>

        {/* — Headline — */}
        <h1 className="bb-display text-[clamp(2.2rem,8.5vw,8.5rem)]">
          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {words1.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: 120, opacity: 0, rotateX: 60 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {w}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {words2.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: 120, opacity: 0, rotateX: 60 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block bb-text-stroke"
              >
                {w}
              </motion.span>
            ))}
          </div>

          <div className="mt-1.5 sm:mt-2 flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {words3.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {w}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {words4.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-[#c6f208]"
              >
                {w}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* — Subheading — */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className={[
            "bb-body max-w-xl",
            "text-sm sm:text-base md:text-lg",
            "mt-7 sm:mt-8 md:mt-10",
            "px-2 sm:px-0",
          ].join(" ")}
        >
          You built a strong business the traditional way. We make it just as strong online — and
          take your growth to the next level.
        </motion.p>

        {/* — CTA buttons — */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className={[
            "flex flex-col sm:flex-row items-center justify-center",
            "gap-3 sm:gap-4",
            "mt-8 sm:mt-9 md:mt-10",
            // Full-width on mobile so the primary CTA fills the thumb zone
            "w-full sm:w-auto px-4 sm:px-0",
          ].join(" ")}
        >
          {/* Primary CTA — full-width pill on mobile, auto-width on sm+ */}
          <motion.div className="relative w-full sm:w-auto" whileTap={{ scale: 0.97 }}>
            {/* Outer glow ring — pulses to signal "tap me" on mobile */}
            <motion.span
              aria-hidden
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 rounded-full border border-[#c6f208]/50"
            />
            <MagneticButton
              onClick={onCTA}
              className={[
                "w-full sm:w-auto",
                // Bigger tap target on mobile
                "py-4 sm:py-3",
                "text-sm sm:text-base font-semibold tracking-wide",
              ].join(" ")}
            >
              {/* Short label on xs, full label on sm+ */}
              <span className="sm:hidden">Scale My Business — Free&nbsp;🚀</span>
              <span className="hidden sm:inline">Take My Business Beyond For Free!</span>
              <ArrowUpRight className="h-4 w-4 ml-1.5 shrink-0" />
            </MagneticButton>
          </motion.div>

          {/* Ghost CTA — full-width on mobile too */}
          <MagneticButton
            variant="ghost"
            className={["w-full sm:w-auto", "py-4 sm:py-3", "text-sm sm:text-base"].join(" ")}
          >
            Explore Growth System
          </MagneticButton>
        </motion.div>

        {/* — Scroll indicator — */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className={[
            "absolute left-1/2 -translate-x-1/2",
            "flex flex-col items-center gap-2.5",
            "text-[10px] uppercase tracking-[0.4em] text-[#f2f2e1]/40",
            "bottom-4 sm:bottom-6 md:bottom-8",
          ].join(" ")}
        >
          Scroll
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-7 sm:h-9 w-px bg-gradient-to-b from-[#c6f208] to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------- trust / metrics ------------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

function Trust() {
  const logos = [
    "A to Z Networks",
    "Sniffix",
    "Northwave",
    "Helio Labs",
    "Forma",
    "Atlas&Co",
    "Velora",
    "Nimbus",
  ];
  const metrics = [
    { label: "Revenue Growth", value: 312, suffix: "%" },
    { label: "Leads Generated", value: 184000, suffix: "+" },
    { label: "Systems Automated", value: 240, suffix: "" },
    { label: "Businesses Scaled", value: 96, suffix: "" },
  ];

  return (
    <Section className="relative border-t border-white/5 py-8 sm:py-20 md:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-6">
        {/* — Header row — */}
        <div className="mb-10 sm:mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-5 sm:gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">
              / 01 — Trust
            </div>
            <h2 className="bb-display mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-xl">
              Proven Growth for Businesses That Refuse to Stand Still.
            </h2>
          </div>
          <p className="bb-body max-w-sm text-sm sm:text-base">
            The owners who scaled beyond their old limits all started in the same place. Here's
            where they are now.
          </p>
        </div>

        {/* — Metrics grid — */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5">
          {metrics.map((m) => (
            <div key={m.label} className="bg-[#050505] p-5 sm:p-7 md:p-8 lg:p-10">
              <div className="bb-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f2f2e1]">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="bb-body mt-2 sm:mt-3 text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* — Logo marquee — */}
        <div className="mt-10 sm:mt-12 md:mt-16 overflow-hidden">
          <div className="flex bb-marquee">
            {logos.concat(logos).map((l, i) => (
              <div
                key={i}
                className="mx-8 sm:mx-10 md:mx-12 shrink-0 text-xl sm:text-2xl md:text-3xl font-semibold text-[#f2f2e1]/30 hover:text-[#c6f208] transition-colors"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}


/* ------------- problem agitation ------------- */

function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const questions = [
    "Does your competitor show up first, not you?",
    "Do smaller rivals get found online before you do?",
    "Why do new buyers find others, but not you?",
    "Is a smaller name winning the leads that should be yours?",
    "When buyers search online, do they even find you?",
  ];

  return (
    <Section className="relative py-10 sm:py-10 md:py-12 lg:py-10 overflow-hidden">
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.2, 0.6]) }}
        className="absolute inset-0 bb-aurora"
      />

      <div ref={ref} className="mx-auto max-w-5xl px-5 sm:px-8 md:px-10 lg:px-6 text-center">
        {/* — Section label — */}
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-8 sm:mb-10 md:mb-12">
          / 02 — Reality Check
        </div>

        {/* — Questions stack — */}
        <div className="space-y-7 sm:space-y-9 md:space-y-11 lg:space-y-12">
          {questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bb-display text-[clamp(1.5rem,4.5vw,4.5rem)]"
            >
              {q.split(" ").map((w, j) => (
                <span
                  key={j}
                  className="inline-block mr-2 sm:mr-3 hover:text-[#c6f208] transition-colors duration-300"
                >
                  {w}
                </span>
              ))}
            </motion.div>
          ))}
        </div>

        {/* — Closing line — */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bb-body mt-12 sm:mt-16 md:mt-20 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0"
        >
          Does Any of This Sound Like Your Business? If You Said Yes to These, We Should Talk.
        </motion.p>
      </div>
    </Section>
  );
}

/* ------------- services ------------- */

const services: any[] = [
  {
    icon: Globe,
    tag: "01",
    headline: "Websites That Sell, Not Just Sit",
    sub: "We build fast, modern websites that make you look as strong online as you are in real life — and turn visitors into engaged leads.",
    cta: "Explore",
  },
  {
    icon: TrendingUp,
    tag: "02",
    headline: "A Steady Flow of Leads",
    sub: "Stop waiting on referrals. We build a system that brings new inquiries to you every single month.",
    cta: "Get Leads",
  },
  {
    icon: Camera,
    tag: "03",
    headline: "Content That Builds Trust",
    sub: "We create and post content that keeps your brand active and respected — without you lifting a finger.",
    cta: "See How",
  },
  {
    icon: Bot,
    tag: "04",
    headline: "Automate the Busywork",
    sub: "We set up smart systems that handle the repeat tasks — so your team escapes manual work and WhatsApp chaos.",
    cta: "Automate",
  },
  {
    icon: BarChart2,
    tag: "05",
    headline: "Never Lose a Lead Again",
    sub: "We build a system that tracks every inquiry and follows up on time — so more leads turn into real sales.",
    cta: "Boost Sales",
  },
  {
    icon: Star,
    tag: "06",
    headline: "From Legacy to Leadership",
    sub: "We build a strong brand and the systems behind it — so your business doesn't just grow, it leads.",
    cta: "Scale Up",
  },
];

// ─── Hook: scroll direction ───────────────────────────────────────────────────

function useScrollDirection() {
  const [direction, setDirection] = useState<"down" | "up">("down");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setDirection(y >= lastY.current ? "down" : "up");
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}

// ─── Progress Dots ────────────────────────────────────────────────────────────

function ProgressDots({ activeCards }: { activeCards: boolean[] }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {activeCards.map((active, i) => (
        <motion.div
          key={i}
          animate={{
            height: active ? 20 : 4,
            backgroundColor: active ? "#c6f208" : "rgba(242,242,225,0.2)",
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-1 rounded-full"
        />
      ))}
    </div>
  );
}

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({
  s,
  index,
  scrollDirection,
  onVisibilityChange,
}: {
  s: any;
  index: number;
  scrollDirection: "down" | "up";
  onVisibilityChange: (index: number, visible: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Generous margin so cards enter/exit one-by-one
  const isInView = useInView(ref, {
    margin: "-8% 0px -8% 0px",
    once: false,
  });

  // Tilt state
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  const Icon = s.icon;

  // Staggered delay based on scroll direction
  const staggerDelay =
    scrollDirection === "down" ? index * 0.09 : (services.length - 1 - index) * 0.07;

  // Report visibility to parent for progress dots
  useEffect(() => {
    onVisibilityChange(index, isInView);
  }, [isInView, index, onVisibilityChange]);

  // 3D tilt on mouse move
  const handleMouseMove = useCallback((e: any) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({
      rx: ((y - cy) / cy) * 5,
      ry: ((x - cx) / cx) * -5,
    });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      // Entrance/exit driven purely by scroll position
      initial={{ opacity: 0, y: 90, scale: 0.91 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: scrollDirection === "down" ? 90 : -60, scale: 0.91 }
      }
      transition={{
        duration: 0.72,
        delay: isInView ? staggerDelay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      // 3D hover tilt
      style={{
        perspective: 800,
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: hovered ? tilt.rx : 0,
          rotateY: hovered ? tilt.ry : 0,
          y: hovered ? -8 : 0,
          scale: hovered ? 1.025 : 1,
          boxShadow: hovered
            ? "0 28px 56px rgba(198,242,8,0.09), 0 8px 20px rgba(0,0,0,0.45)"
            : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-3xl bb-glass p-6 sm:p-8 md:p-10 cursor-pointer"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        data-cursor="hover"
      >
        {/* Hover glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-br from-[#c6f208]/10 via-transparent to-transparent pointer-events-none"
        />

        {/* Shimmer top line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c6f208]/70 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Corner accent */}
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full"
          animate={{
            background: hovered
              ? "radial-gradient(circle at bottom right, rgba(198,242,8,0.07), transparent 70%)"
              : "radial-gradient(circle at bottom right, transparent, transparent)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Tag + Icon row */}
        <div className="relative flex items-start justify-between mb-12">
          <motion.div
            className="text-xs uppercase tracking-[0.4em] text-[#c6f208]"
            animate={{ opacity: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            / {s.tag}
          </motion.div>
          <motion.div
            animate={{
              color: hovered ? "#c6f208" : "rgba(242,242,225,0.25)",
              rotate: hovered ? 15 : 0,
              scale: hovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        </div>

        {/* Content */}
        <h3 className="bb-display relative text-2xl md:text-3xl lg:text-[1.65rem] mb-4 leading-tight">
          {s.headline}
        </h3>
        <p className="bb-body relative text-[#f2f2e1]/55 leading-relaxed text-sm md:text-base">
          {s.sub}
        </p>

        {/* CTA */}
        <motion.div
          className="relative mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.3em]"
          animate={{ color: hovered ? "#c6f208" : "rgba(242,242,225,0.45)" }}
          transition={{ duration: 0.3 }}
        >
          {s.cta}
          <motion.div
            animate={{
              x: hovered ? 4 : 0,
              y: hovered ? -4 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const scrollDirection = useScrollDirection();
  const [activeCards, setActiveCards] = useState<boolean[]>(new Array(6).fill(false));

  const handleVisibilityChange = useCallback((index: number, visible: boolean) => {
    setActiveCards((prev) => {
      if (prev[index] === visible) return prev;
      const next = [...prev];
      next[index] = visible;
      return next;
    });
  }, []);

  // Parallax for title and subtitle
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawTitleY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const titleY = useSpring(rawTitleY, { stiffness: 55, damping: 18 });

  const rawSubY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const subY = useSpring(rawSubY, { stiffness: 55, damping: 20 });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 1, 1, 0]);
  const headerOpacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });

  const headerInView = useInView(headerRef, { once: false, margin: "-5% 0px" });

  return (
    <>
      {/* Fixed progress dots */}
      <ProgressDots activeCards={activeCards} />

      {/* Outer div owns the ref and padding for scroll tracking */}
      <div
        ref={sectionRef}
        style={{
          paddingTop: "clamp(32px, 5vw, 80px)",
          paddingBottom: "clamp(32px, 5vw, 80px)",
        }}
      >
        <section id="services" className="relative border-t border-white/5">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bb-grid-bg opacity-20 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* ── Header ── */}
            <motion.div
              ref={headerRef}
              style={{ opacity: headerOpacity }}
              initial={{ opacity: 0, y: 36 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              // className="mb-16 sm:mb-20 lg:mb-24 flex items-end justify-between flex-wrap gap-8"
              className="mb-16 sm:mb-20 lg:mb-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-8"
            >
              <div className="flex-1 min-w-0">
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-4"
                >
                  / 03 — Capabilities
                </motion.div>

                {/* Title with parallax */}
                <motion.h2
                  style={{ y: titleY }}
                  className="bb-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.05]"
                >
                  {"Everything You Need to Scale Your Business Beyond Limits."
                    .split(" ")
                    .map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-[0.25em]"
                        initial={{ opacity: 0, y: 28 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                        transition={{
                          duration: 0.65,
                          delay: 0.15 + i * 0.035,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                </motion.h2>
              </div>

              {/* Subtitle with parallax */}
              <motion.p
                style={{ y: subY }}
                initial={{ opacity: 0, x: 20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                // className="bb-body max-w-xs sm:max-w-sm text-[#f2f2e1]/55 leading-relaxed text-sm md:text-base"
                className="bb-body w-full sm:max-w-sm text-[#f2f2e1]/55 leading-relaxed text-sm md:text-base"
              >
                From your website to your sales system, we build the full engine that brings your
                business steady, lasting growth — under one roof.
              </motion.p>
            </motion.div>

            {/* ── Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {services.map((s, i) => (
                <ServiceCard
                  key={s.tag}
                  s={s}
                  index={i}
                  scrollDirection={scrollDirection}
                  onVisibilityChange={handleVisibilityChange}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


/* ------------- The Beyond Method ------------- */

const steps = [
  {
    n: "01",
    title: "The Deep Map",
    desc: "We study your business, market, and gaps first — so every move is built on truth, not guesswork.",
  },
  {
    n: "02",
    title: "The Power Base",
    desc: "We build the website / apps and brand that make you look as strong online as you already are offline.",
  },
  {
    n: "03",
    title: "The Inflow Engine",
    desc: "We switch on a steady stream of new leads — so your growth no longer waits on referrals.",
  },
  {
    n: "04",
    title: "The Conversion Core",
    desc: "We track and follow up every lead with smart automation — so not a single sale slips away.",
  },
  {
    n: "05",
    title: "The Market Lead",
    desc: "We scale the whole system and make you the name your market follows — on the road Beyond limits.",
  },
];



function Method() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <Section id="method" className="relative border-t border-white/5">
      <div ref={ref} className="relative h-[420vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bb-aurora opacity-40" />

          {/* ── Header block ── */}
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-24">
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">
              / 04 — Process
            </div>

            <h2 className="bb-display mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              The Beyond Business Method
              <span className="text-[#c6f208]">™</span>
            </h2>

            <p className="bb-body mt-3 max-w-[18rem] sm:max-w-md text-sm sm:text-base opacity-70">
              A five-stage operating system for engineering compounding growth.
            </p>
          </div>

          {/* ── Cards strip ── */}
          <motion.div
            style={{ x }}
            className="
              absolute
              top-[38%] sm:top-auto
              sm:bottom-[8vh] md:bottom-[10vh] lg:bottom-[14vh] xl:bottom-[18vh]
              left-0 flex
              gap-4 sm:gap-6 lg:gap-8
              pl-[5vw] sm:pl-[7vw] lg:pl-[10vw]
            "
          >
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="
                  relative shrink-0 rounded-2xl sm:rounded-3xl bb-glass overflow-hidden
                  flex flex-col justify-between

                  /* Mobile: wider card, constrained height so it fits below the header */
                  w-[80vw]  h-[54vw]  min-h-[220px] max-h-[290px]

                  /* sm: expand a bit */
                  sm:w-[62vw] sm:h-[42vw] sm:min-h-[260px] sm:max-h-[360px]

                  /* md: shift toward viewport-height-based sizing */
                  md:w-[50vw] md:h-[44vh] md:max-h-[400px]

                  /* lg: wide landscape cards */
                  lg:w-[42vw] lg:max-h-[420px]

                  /* xl: settle into a refined fixed feel */
                  xl:w-[36vw] xl:max-h-[440px]

                  p-4 sm:p-6 md:p-7 lg:p-9
                "
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#c6f208] to-transparent opacity-40" />

                {/* Top row: step number + stage indicator */}
                <div className="flex items-center justify-between">
                  <div className="text-[#c6f208] text-[10px] sm:text-xs uppercase tracking-[0.4em]">
                    {s.n}
                  </div>
                  <div className="text-[#f2f2e1]/30 text-[9px] sm:text-[10px] uppercase tracking-[0.4em]">
                    Stage {i + 1} / {steps.length}
                  </div>
                </div>

                {/* Middle: title + description */}
                <div className="flex-1 flex flex-col justify-center gap-2 sm:gap-3 lg:gap-4 py-2">
                  <h3
                    className="
                      bb-display leading-[0.92]
                      text-[clamp(1.5rem,5.5vw,3.2rem)]
                      sm:text-[clamp(1.9rem,5vw,3.8rem)]
                      lg:text-[clamp(2.2rem,4vw,4.4rem)]
                    "
                  >
                    {s.title}
                  </h3>
                  <p className="bb-body text-[13px] sm:text-sm md:text-base leading-snug sm:leading-relaxed opacity-80 max-w-xs sm:max-w-sm">
                    {s.desc}
                  </p>
                </div>

                {/* Bottom: progress bar */}
                <div className="w-full h-px bg-white/10 mt-2">
                  <div
                    className="h-full bg-[#c6f208]"
                    style={{ width: `${((i + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ------------- Why Beyond Business ------------- */

function Why() {
  const items = [
    "We Build Systems, Not Campaigns.",
    "Growth That Works Even While You Sleep.",
    "AI-Powered Infrastructure.",
    "Everything Works Together.",
  ];

  return (
    <Section className="relative border-t border-white/5">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-10 py-16 sm:py-24">
        {/* Eyebrow */}
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">
          / 05 — Why Businesses Choose Us?
        </div>

        {/* Headline */}
        <h2 className="bb-display mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] max-w-4xl">
          Most agencies chase startups and talk in jargon. We do the opposite. We speak business,
          build systems, and stay for the long run.
          <span className="text-[#c6f208]">™</span>
        </h2>

        {/* Items List */}
        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative flex items-center gap-4 bg-[#0a0a0a] px-6 sm:px-8 py-5 sm:py-6 group"
            >
              {/* Left accent bar */}
              <div className="shrink-0 w-px h-8 bg-[#c6f208]/60 group-hover:bg-[#c6f208] transition-colors duration-300" />

              {/* Item number */}
              <span className="text-[#c6f208]/40 text-[10px] uppercase tracking-[0.3em] shrink-0">
                0{i + 1}
              </span>

              {/* Item text */}
              <p className="bb-body text-sm sm:text-base text-[#f2f2e1]/80 leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------- Founder ------------- */

function Founder() {
  return (
    <Section id="founder" className="relative py-40 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bb-aurora opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] rounded-3xl bb-glass overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#1a1a1a] to-[#3a3a3a]" />
          <div className="absolute inset-0 bb-grid-bg opacity-20" />
          <div className="absolute inset-0 flex items-end p-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]">Founder</div>
              <div className="bb-display text-5xl mt-2">Aarav Mehta</div>
              <div className="bb-body mt-1 text-sm">Engineer, operator, builder.</div>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-[#c6f208]/10 to-transparent" />
        </motion.div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">/ 06 — Founder</div>
          <h2 className="bb-display mt-4 text-4xl md:text-6xl">
            Built by founders. For founders chasing the next ceiling.
          </h2>
          <p className="bb-body mt-6 text-lg max-w-lg">
            Beyond Business was born from a simple truth — most agencies sell
            campaigns. Founders need infrastructure. We engineer the systems
            that decouple your growth from your hours.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { k: "8+", v: "Years building" },
              { k: "40+", v: "Founders backed" },
              { k: "12", v: "AI engineers" },
            ].map((s) => (
              <div key={s.v}>
                <div className="bb-display text-3xl text-[#c6f208]">{s.k}</div>
                <div className="bb-body text-xs uppercase tracking-[0.3em] mt-2">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------- Testimonials ------------- */

const testimonials = [
  { who: "A to Z Networks", title: "Telecom growth lead", quote: "They didn't just market us. They re-engineered how we acquire. Our pipeline tripled in one quarter." },
  { who: "Sniffix", title: "Founder", quote: "The AI automation alone replaced two ops hires. The brand work made us look like a category leader." },
  { who: "Forma Studio", title: "Co-founder", quote: "Felt less like an agency, more like an in-house growth team. Cinematic execution, end to end." },
];

function Testimonials() {
  return (
    <Section id="work" className="relative py-40 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">/ 07 — Voices</div>
        <h2 className="bb-display mt-4 text-5xl md:text-7xl mb-20 max-w-3xl">
          Real founders. Real growth. Real systems.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.who}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bb-glass aspect-[4/5] p-8 cursor-pointer"
              data-cursor="hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505]" />
              <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-[#c6f208]/10 blur-3xl group-hover:bg-[#c6f208]/30 transition-all duration-700" />
              {/* waveform */}
              <div className="absolute bottom-32 left-8 right-8 flex items-end gap-1 h-12 opacity-60 group-hover:opacity-100 transition-opacity">
                {Array.from({ length: 40 }).map((_, j) => (
                  <motion.div
                    key={j}
                    animate={{ height: [`${20 + Math.random() * 60}%`, `${30 + Math.random() * 70}%`, `${20 + Math.random() * 60}%`] }}
                    transition={{ duration: 1.2 + Math.random(), repeat: Infinity, delay: j * 0.04 }}
                    className="flex-1 bg-[#c6f208]/60 rounded-full"
                  />
                ))}
              </div>
              <div className="relative flex flex-col h-full justify-between">
                <div className="text-xs uppercase tracking-[0.4em] text-[#c6f208]">▶ Play story</div>
                <div>
                  <p className="bb-display text-xl mb-8 leading-tight">"{t.quote}"</p>
                  <div className="border-t border-white/10 pt-4">
                    <div className="text-sm font-semibold text-[#f2f2e1]">{t.who}</div>
                    <div className="bb-body text-xs uppercase tracking-[0.3em] mt-1">{t.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------- Lead magnet ------------- */

function LeadMagnet() {
  const [step, setStep] = useState(0);
  const total = 3;
  const fields = [
    { label: "What's your monthly revenue?", placeholder: "$10k – $1M+" },
    { label: "What's slowing your growth?", placeholder: "Lead flow, ops, content..." },
    { label: "Where should we send the diagnostic?", placeholder: "you@company.com" },
  ];
  return (
    <Section className="relative py-40 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">/ 08 — Free Diagnostic</div>
        <h2 className="bb-display mt-4 text-5xl md:text-7xl mb-12 max-w-3xl">
          Free AI Growth Diagnostic.
        </h2>
        <div className="relative overflow-hidden rounded-3xl bb-glass p-8 md:p-12">
          <div className="absolute top-0 left-0 h-px w-full bg-white/10">
            <motion.div
              animate={{ width: `${((step + 1) / total) * 100}%` }}
              className="h-full bg-[#c6f208] shadow-[0_0_15px_#c6f208]"
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className="text-xs uppercase tracking-[0.4em] text-[#c6f208]">Step 0{step + 1} / 0{total}</div>
            <div className="bb-body text-xs uppercase tracking-[0.3em]">~ 60 seconds</div>
          </div>
          <label className="bb-display block text-2xl md:text-4xl mb-6">{fields[step].label}</label>
          <input
            placeholder={fields[step].placeholder}
            className="w-full bg-transparent border-b border-white/20 focus:border-[#c6f208] outline-none py-4 text-xl md:text-2xl text-[#f2f2e1] placeholder:text-[#f2f2e1]/30 transition-colors"
          />
          <div className="mt-10 flex items-center justify-between">
            <button
              disabled={step === 0}
              onClick={() => setStep(Math.max(0, step - 1))}
              className="text-xs uppercase tracking-[0.3em] text-[#f2f2e1]/50 hover:text-[#c6f208] disabled:opacity-30"
              data-cursor="hover"
            >
              ← Back
            </button>
            <MagneticButton onClick={() => setStep(Math.min(total - 1, step + 1))}>
              {step === total - 1 ? "Submit Diagnostic" : "Next"} <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------- FAQ ------------- */

const faqs = [
  {
    q: "I tried digital marketing before and it didn't work. Why will this be different?",
    a: "Most digital marketing fails because it's random posts and ads with no system behind them. We don't do random. We build a complete system — and we show you results at every step.",
  },
  {
    q: "How do I know I won't get cheated like last time?",
    a: "Fair question — many owners have been burned. That's why we lead with proof, not promises. You'll see real numbers, clear plans, and exactly where your money goes before you spend it.",
  },
  {
    q: "Do you actually understand my type of business?",
    a: "Yes. We work with established businesses like yours, not startups. We learn how your business really makes money first — then build around that, not around buzzwords.",
  },
  {
    q: "This sounds expensive. What will it cost?",
    a: "We price for the value we create, not by the hour. Every plan is built to return far more than it costs. We'll show you the numbers before you decide — no surprises.",
  },
  {
    q: "What return will I actually get?",
    a: "More inquiries, more sales, and less dependence on referrals. We set clear goals at the start, then track them — so you always know what your money achieved.",
  },
  {
    q: "I don't have time to manage this. Will it add to my work?",
    a: "No — it removes work. We handle the building and the running. You stay informed with simple updates, without doing the heavy lifting.",
  },
  {
    q: "How long before I see results?",
    a: "Some wins come fast, like a better website and first inquiries. Real, steady growth builds over a few months. We're honest about timelines — we don't promise magic overnight.",
  },
  {
    q: "What if it doesn't work? Any guarantee?",
    a: "We can't promise luck, and anyone who does is lying. What we promise is a proven system, clear steps, and full honesty. We work in stages, so you see progress before going deeper.",
  },
  {
    q: "I already have someone doing social media. Why do I need you?",
    a: "One person posting isn't a growth system. We build the full engine — website, leads, content, sales, and follow-up — so your growth doesn't sit on one person's shoulders.",
  },
  {
    q: "My business runs on referrals and walk-ins. Do I even need online?",
    a: "Referrals are great — until they slow down. Today, your buyers search online first. If they don't find you, they find your competitor. We make sure they find you.",
  },
  {
    q: "Will I lose control of my business or brand?",
    a: "Never. You stay in full control. We build everything in your name, share clear reports, and keep you the decision-maker at every step.",
  },
  {
    q: "I'm not tech-savvy. Will I understand what's happening?",
    a: "Completely. We explain everything in plain business language — no confusing terms. If you understand revenue and customers, you'll understand our work.",
  },
  {
    q: "How are you different from other agencies and freelancers?",
    a: "Agencies chase startups. Freelancers come and go. We're a long-term growth partner who speaks business first, builds real systems, and stays with you as you grow.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "We build for the long term, but we earn that trust first. We start with clear, simple terms — and you continue because the results make it an easy choice.",
  },
  {
    q: "If I stop one day, do I keep everything you built?",
    a: "Yes. Your website, your brand, your systems, your data — all yours. We build assets you own, not things you rent from us.",
  },
];

// function FAQ() {
//   const [open, setOpen] = useState<number | null>(0);
//   return (
//     <Section id="faq" className="relative py-40 border-t border-white/5">
//       <div className="mx-auto max-w-5xl px-6">
//         <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">/ 06 — FAQ</div>
//         <h2 className="bb-display mt-4 text-5xl md:text-7xl mb-16">Things founders ask.</h2>
//         <div className="space-y-3">
//           {faqs.map((f, i) => {
//             const isOpen = open === i;
//             return (
//               <div
//                 key={i}
//                 className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${
//                   isOpen
//                     ? "border-[#c6f208]/40 bg-[#c6f208]/[0.03] shadow-[0_0_40px_rgba(198,242,8,0.08)]"
//                     : "border-white/10 hover:border-white/30"
//                 }`}
//               >
//                 <button
//                   onClick={() => setOpen(isOpen ? null : i)}
//                   className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left"
//                   data-cursor="hover"
//                 >
//                   <span className="bb-display text-xl md:text-2xl">{f.q}</span>
//                   <span className="shrink-0 h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#c6f208]">
//                     {isOpen ? (
//                       <Minus className="h-4 w-4 text-[#c6f208]" />
//                     ) : (
//                       <Plus className="h-4 w-4" />
//                     )}
//                   </span>
//                 </button>
//                 <motion.div
//                   initial={false}
//                   animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
//                   transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//                   className="overflow-hidden"
//                 >
//                   <p className="bb-body px-6 md:px-8 pb-8 max-w-3xl text-base md:text-lg">{f.a}</p>
//                 </motion.div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Section>
//   );
// }

/* ------------- Team ------------- */

function Team() {
  return (
    <Section id="team" className="relative border-t border-white/5 py-28 sm:py-32 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bb-aurora opacity-20" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        {/* Eyebrow */}
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">
          / 06 — Team
        </div>

        {/* Headline */}
        <div className="mt-4 sm:mt-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="bb-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] max-w-2xl">
            The Minds Engineering Your Scale.
          </h2>
          <p className="bb-body max-w-xs text-sm sm:text-base opacity-70">
            A cohesive squad of engineers, developers, designers, and operators dedicated to building your future infrastructure.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mt-12 max-w-2xl mx-auto">
          {[
            {
              name: "Sairam",
              role: "Co-Founder — Business Growth  & Marketing Strategy",
              bio: "Sairam does not just look at your ads and current situation. He looks at your whole business. He studies where the gaps are, builds a clear growth plan, and then puts the right people on the right problems. Strategy, marketing, operations — he connects all of it. And when the plan is ready, he makes sure the team executes it the right way.",
              img: "/assets/sr 2.png",
            },
            {
              name: "Uday",
              role: "Full Stack Developer",
              bio: "Uday has 10+ years of experience building websites and web applications that actually work — fast, smooth, and built to last. Custom development, animations, complex web apps — he handles it all. When the design is ready, Uday makes sure it comes to life exactly the way it was meant to.",
              img: "/assets/uday - teamate.jpeg",
            },
          ].map((m, i) => (
            <div key={m.name} className="flex flex-col group">
              <div 
                className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]"
                data-cursor="hover"
              >
                {/* Subtle overlay border */}
                <div className="absolute inset-0 z-10 border border-white/5 rounded-2xl pointer-events-none" />
                
                <img 
                  src={m.img} 
                  alt={m.name} 
                  className="w-full h-full object-cover grayscale scale-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                />

                {/* Vignette shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
              </div>

              <h3 className="bb-display text-lg sm:text-xl font-bold mt-4">
                {m.name}
              </h3>
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#c6f208] mt-1 font-semibold">
                {m.role}
              </div>
              <p className="bb-body text-xs mt-2 text-[#f2f2e1]/65 leading-relaxed">
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      className="relative py-28 sm:py-32 md:py-36 lg:py-40 xl:py-44 border-t border-white/5"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">/ 07 — FAQ</div>

        <h2 className="bb-display mt-5 md:mt-6 text-5xl md:text-7xl mb-10 md:mb-12 lg:mb-16">
          Things founders ask.
        </h2>

        <div className="space-y-4 md:space-y-5">
          {faqs.map((f, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? "border-[#c6f208]/40 bg-[#c6f208]/[0.03] shadow-[0_0_40px_rgba(198,242,8,0.08)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-5 sm:p-6 md:p-8 text-left"
                  data-cursor="hover"
                >
                  <span className="bb-display text-xl md:text-2xl">{f.q}</span>

                  <span className="shrink-0 h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#c6f208]">
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-[#c6f208]" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="bb-body px-5 sm:px-6 md:px-8 pb-6 sm:pb-7 md:pb-8 max-w-3xl text-base md:text-lg">
                    {f.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ------------- Final CTA ------------- */

// function FinalCTA({ onCTA }: { onCTA: () => void }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//   const scale = useTransform(scrollYProgress, [0, 0.6], [0.85, 1.05]);
//   const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

//   return (
//     <Section className="relative py-40 border-t border-white/5 overflow-hidden">
//       <div ref={ref}>
//         <div className="absolute inset-0 bb-aurora opacity-70" />
//         <div className="absolute inset-0 bb-grid-bg opacity-30" />
//         {Array.from({ length: 30 }).map((_, i) => (
//           <motion.span
//             key={i}
//             className="absolute h-1 w-1 rounded-full bg-[#c6f208]"
//             initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
//             animate={{ opacity: [0, 0.8, 0], scale: [0, 2, 0] }}
//             transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
//           />
//         ))}
//         <motion.div style={{ scale, y }} className="relative mx-auto max-w-7xl px-6 text-center">
//           <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-8">/ 10 — Take The Leap</div>
//           <h2 className="bb-display text-[clamp(2.4rem,10vw,9rem)] leading-[0.88]">
//             READY TO TAKE
//             <br />
//             YOUR BUSINESS
//             <br />
//             <span className="text-[#c6f208]">BEYOND LIMITS?</span>
//           </h2>
//           <p className="bb-body mt-10 text-lg max-w-xl mx-auto">
//             Book a strategy call. We'll map your growth system in 30 minutes.
//           </p>
//           <div className="mt-12">
//             <MagneticButton onClick={onCTA}>
//               Let's Build Your Growth System <ArrowUpRight className="h-4 w-4" />
//             </MagneticButton>
//           </div>
//         </motion.div>
//       </div>
//     </Section>
//   );
// }

function FinalCTA({ onCTA }: { onCTA: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [0.85, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <Section className="relative py-20 sm:py-32 border-t border-white/5 overflow-hidden">
      <div ref={ref}>
        <div className="absolute inset-0 bb-aurora opacity-70" />
        <div className="absolute inset-0 bb-grid-bg opacity-30" />

        {Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#c6f208]"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        <motion.div style={{ scale, y }} className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-8">
            / 08 — Take The Leap
          </div>

          <h2 className="bb-display text-[clamp(2.4rem,10vw,9rem)] leading-[0.88]">
            READY TO TAKE
            <br />
            YOUR BUSINESS
            <br />
            <span className="text-[#c6f208]">BEYOND LIMITS?</span>
          </h2>

          <p className="bb-body mt-10 text-lg max-w-xl mx-auto">
            Book a strategy call. We'll map your growth system in 30 minutes.
          </p>

          <div className="mt-12">
            <MagneticButton onClick={onCTA}>
              Let's Build Your Growth System <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ------------- Footer ------------- */

// function Footer() {
//   return (
//     <footer className="relative border-t border-white/5 overflow-hidden">
//       <div className="mx-auto max-w-7xl px-6 py-20">
//         <div className="grid md:grid-cols-3 gap-12 mb-20">
//           <div>
//             <div className="bb-display text-3xl">BEYOND<span className="text-[#c6f208]">.</span></div>
//             <p className="bb-body mt-4 max-w-xs">
//               An AI-powered growth studio engineering the digital infrastructure of modern founders.
//             </p>
//           </div>
//           <div>
//             <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-6">Studio</div>
//             <ul className="space-y-3 bb-body">
//               {["Services", "Method", "Work", "Founder", "Careers"].map((l) => (
//                 <li key={l}><a href="#" className="hover:text-[#c6f208] transition-colors" data-cursor="hover">{l}</a></li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-6">Contact</div>
//             <ul className="space-y-3 bb-body">
//               <li>hello@beyondbusiness.studio</li>
//               <li>Dubai · Bengaluru · Remote</li>
//               <li className="flex gap-4 pt-2">
//                 {["LinkedIn", "Instagram", "X"].map((s) => (
//                   <a key={s} href="#" className="hover:text-[#c6f208] transition-colors" data-cursor="hover">{s}</a>
//                 ))}
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="relative">
//           <motion.h3
//             initial={{ opacity: 0, y: 60 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1 }}
//             className="bb-display text-[clamp(3rem,15vw,16rem)] leading-none bb-text-stroke"
//           >
//             BEYOND BUSINESS
//           </motion.h3>
//           <div className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c6f208]/60 to-transparent" />
//         </div>
//         <div className="mt-12 flex items-center justify-between bb-body text-xs uppercase tracking-[0.3em]">
//           <span>© {new Date().getFullYear()} Beyond Business</span>
//           <span>Your Business, Beyond Limits.</span>
//         </div>
//       </div>
//     </footer>
//   );
// }

function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden bg-[#0a0a0a]">
      {/* Animated scan line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none">
        <motion.div
          className="h-px w-3/5 bg-gradient-to-r from-transparent via-[#c6f208]/40 to-transparent"
          animate={{ x: ["-60%", "260%"] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-[#c6f208]"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 40}%`,
            }}
            animate={{
              y: [0, -120],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              delay: Math.random() * 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 relative z-10">
        {/* Top gradient rule */}
        <motion.div
          className="h-px mb-16 bg-gradient-to-r from-transparent via-[#c6f208]/50 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {/* Brand */}
          <div>
            <motion.div
              className="bb-display text-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              BEYOND
              <motion.span
                className="text-[#c6f208]"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
              >
                .
              </motion.span>
            </motion.div>
            <p className="bb-body mt-4 max-w-xs text-white/45 text-sm leading-relaxed">
              An AI-powered growth studio engineering the digital infrastructure of modern founders.
            </p>
          </div>

          {/* Studio links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-[9px] uppercase tracking-[0.45em] text-[#c6f208]/65 mb-6 font-medium">
              Studio
            </div>
            <ul className="space-y-3 bb-body">
              {["Services", "Method", "Work", "Founder", "Careers"].map((l, i) => (
                <li key={l}>
                  <motion.a
                    href="#"
                    className="group text-sm text-white/50 hover:text-[#c6f208] transition-colors duration-200 flex items-center gap-0 hover:gap-3"
                    data-cursor="hover"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <span className="inline-block w-0 group-hover:w-3 h-px bg-[#c6f208] transition-all duration-250 flex-shrink-0" />
                    {l}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-[9px] uppercase tracking-[0.45em] text-[#c6f208]/65 mb-6 font-medium">
              Contact
            </div>
            <ul className="space-y-3 bb-body text-sm text-white/45">
              <li>hello@beyondbusiness.studio</li>
              <li>Dubai · Bengaluru · Remote</li>
              <li className="flex gap-2 pt-2">
                {["LinkedIn", "Instagram", "X"].map((s) => (
                  <motion.a
                    key={s}
                    href="#"
                    className="text-[10px] uppercase tracking-[0.12em] text-white/45 border border-white/10 px-2.5 py-1.5 rounded-sm hover:bg-[#c6f208] hover:text-[#0a0a0a] hover:border-[#c6f208] transition-all duration-200"
                    whileHover={{ y: -2 }}
                    data-cursor="hover"
                  >
                    {s}
                  </motion.a>
                ))}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Big headline */}
        {/* <div className="relative overflow-hidden">
          <div className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c6f208]/60 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-[0.06em] leading-none"
          >
            <span
              className="bb-display text-[clamp(3rem,15vw,16rem)] text-white font-black tracking-tight"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
            >
              BEYOND
            </span>
            <motion.span
              className="bb-display text-[clamp(3rem,15vw,16rem)] font-black tracking-tight text-[#000000] bg-[#c6f208] px-[0.1em]"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(198,242,8,0)",
                  "0 0 60px rgba(198,242,8,0.3)",
                  "0 0 0px rgba(198,242,8,0)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              BUSINESS
            </motion.span>
          </motion.div>
        </div> */}

        {/* Big headline */}
        <div className="relative overflow-hidden">
          <div className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c6f208]/60 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col leading-none"
          >
            <span
              className="bb-display text-[clamp(3rem,15vw,16rem)] text-white font-black tracking-tight"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
            >
              BEYOND
            </span>
            {/* <motion.span
              className="bb-display text-[clamp(3rem,15vw,16rem)] font-black tracking-tight text-[#000000] bg-[#c6f208] px-[0.1em] self-start"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(198,242,8,0)",
                  "0 0 60px rgba(198,242,8,0.3)",
                  "0 0 0px rgba(198,242,8,0)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              BUSINESS
            </motion.span> */}

            <motion.span
              className="bb-display text-[clamp(3rem,15vw,16rem)] font-black tracking-tight !text-[#0a0a0a] bg-[#c6f208] px-[0.1em] self-start"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(198,242,8,0)",
                  "0 0 60px rgba(198,242,8,0.3)",
                  "0 0 0px rgba(198,242,8,0)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              BUSINESS
            </motion.span>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between bb-body text-[10px] uppercase tracking-[0.3em]">
          <span className="text-white/25">© {new Date().getFullYear()} Beyond Business</span>
          <span className="flex items-center gap-2 text-white/25">
            <motion.span
              className="w-[5px] h-[5px] rounded-full bg-[#c6f208] flex-shrink-0"
              animate={{ opacity: [1, 0.2, 1], scale: [1, 0.6, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Your Business, Beyond Limits.
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------- Calendly modal ------------- */

/* ------------- Contact Form Modal ------------- */

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setStatus("idle");
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Construct a beautiful WhatsApp message
    const formattedMessage = `Hello Beyond Business growth team! I would like to get in touch:\n\n` +
      `*Name*: ${formData.name}\n` +
      `*Email*: ${formData.email}\n` +
      `*Phone*: ${formData.phone}\n\n` +
      `*Bottleneck / Goal*:\n${formData.message}`;

    const whatsappUrl = `https://wa.me/919515884262?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      setStatus("success");
      window.open(whatsappUrl, "_blank");
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bb-glass p-6 sm:p-10 text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
          aria-label="Close modal"
          data-cursor="hover"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-[#c6f208]/10 flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-[#c6f208]" />
            </div>
            <h3 className="bb-display text-2xl md:text-3xl">Talk to you soon!</h3>
            <p className="bb-body mt-4 max-w-sm mx-auto text-sm sm:text-base">
              Your inquiry has been successfully transmitted. Our growth team will get back to you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-[#c6f208] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#050505] hover:bg-[#c6f208]/90 transition-colors"
            >
              Close Window
            </button>
          </motion.div>
        ) : (
          <>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]">Get in Touch</div>
            <h3 className="bb-display mt-3 text-2xl sm:text-4xl">Let's engineer your growth.</h3>
            <p className="bb-body mt-3 text-xs sm:text-sm text-[#f2f2e1]/60">
              Fill in your details below and we will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-1.5 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Aarav Mehta"
                  className={`w-full bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-xl px-4 py-3 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20`}
                />
                {errors.name && <span className="text-red-500 text-[10px] mt-1 block">{errors.name}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-1.5 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className={`w-full bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-xl px-4 py-3 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20`}
                  />
                  {errors.email && <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>}
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-1.5 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 99999 99999"
                    className={`w-full bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-xl px-4 py-3 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20`}
                  />
                  {errors.phone && <span className="text-red-500 text-[10px] mt-1 block">{errors.phone}</span>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-1.5 font-medium">
                  What is slowing your growth?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your business goals and bottlenecks..."
                  rows={4}
                  className={`w-full bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-xl px-4 py-3 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20 resize-none`}
                />
                {errors.message && <span className="text-red-500 text-[10px] mt-1 block">{errors.message}</span>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full text-center rounded-full bg-[#c6f208] py-3 text-xs font-semibold uppercase tracking-widest text-[#050505] transition-all hover:shadow-[0_0_30px_rgba(198,242,8,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Let's Talk</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ------------- Page composition ------------- */

export function Site() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative bg-[#050505] text-[#f2f2e1]">
      <AnnouncementBar />
      <Nav onCTA={() => setOpen(true)} />
      <main>
        <Hero onCTA={() => setOpen(true)} />
        <Trust />
        <Problem />
        <Services />
        <Method />
        <Why />
        <Team />
        {/* <Founder />
        <Testimonials />
        <LeadMagnet /> */}
        <FAQ />
        <FinalCTA onCTA={() => setOpen(true)} />
      </main>
      <Footer />
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}