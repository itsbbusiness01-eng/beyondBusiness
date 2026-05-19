import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles, Zap, Cpu, Megaphone, Video, Bot, Plus, Minus } from "lucide-react";

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
  const items = Array.from({ length: 8 });
  return (
    <div className="relative z-40 border-b border-white/5 bb-glass overflow-hidden">
      <div className="flex">
        <div className="bb-marquee flex whitespace-nowrap py-2">
          {items.concat(items).map((_, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#f2f2e1]/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c6f208] shadow-[0_0_10px_#c6f208]" />
              AI-Powered Growth Systems For Modern Businesses
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
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
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
          {["Services", "Method", "Work", "Founder", "FAQ"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#c6f208] transition-colors" data-cursor="hover">
              {l}
            </a>
          ))}
        </div>
        <button
          onClick={onCTA}
          data-cursor="hover"
          className="group relative overflow-hidden rounded-full bg-[#c6f208] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#050505] transition-shadow hover:shadow-[0_0_30px_rgba(198,242,8,0.6)]"
        >
          Let's Talk
        </button>
      </div>
    </motion.nav>
  );
}

/* ------------- hero ------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "12px"]);

  const words1 = "WE DON'T MARKET".split(" ");
  const words2 = "YOUR BUSINESS.".split(" ");
  const words3 = "WE ENGINEER".split(" ");
  const words4 = "ITS GROWTH.".split(" ");

  return (
    <section ref={ref} id="top" className="relative min-h-[140vh] overflow-hidden bb-noise">
      <motion.div style={{ y: yBg, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bb-grid-bg opacity-50" />
        <div className="absolute inset-0 bb-aurora" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#c6f208]/40 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity: fade, filter: blur }} className="sticky top-0 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c6f208]/30 bg-[#c6f208]/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-[#c6f208]"
        >
          <Sparkles className="h-3 w-3" /> AI-Powered Growth Studio
        </motion.div>

        <h1 className="bb-display text-[clamp(2.4rem,9vw,8.5rem)]">
          <div className="flex flex-wrap justify-center gap-x-4">
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
          <div className="flex flex-wrap justify-center gap-x-4">
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
          <div className="mt-2 flex flex-wrap justify-center gap-x-4">
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
          <div className="flex flex-wrap justify-center gap-x-4">
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="bb-body mt-10 max-w-xl text-base md:text-lg"
        >
          For founders who refuse to grow slowly. We build websites, web apps,
          ads, content engines and AI automations that compound — quietly,
          beautifully, relentlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            Book Strategy Call <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="ghost">Explore Growth System</MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[#f2f2e1]/40"
        >
          Scroll
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-10 w-px bg-gradient-to-b from-[#c6f208] to-transparent"
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
  const logos = ["A to Z Networks", "Sniffix", "Northwave", "Helio Labs", "Forma", "Atlas&Co", "Velora", "Nimbus"];
  const metrics = [
    { label: "Revenue Growth", value: 312, suffix: "%" },
    { label: "Leads Generated", value: 184000, suffix: "+" },
    { label: "Systems Automated", value: 240, suffix: "" },
    { label: "Businesses Scaled", value: 96, suffix: "" },
  ];
  return (
    <Section className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">/ 01 — Trust</div>
            <h2 className="bb-display mt-4 text-4xl md:text-6xl max-w-xl">
              Operating with brands building the future.
            </h2>
          </div>
          <p className="bb-body max-w-sm">
            From bootstrapped founders to scaling startups — our growth systems
            quietly power their entire digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {metrics.map((m) => (
            <div key={m.label} className="bg-[#050505] p-8 md:p-10">
              <div className="bb-display text-4xl md:text-6xl text-[#f2f2e1]">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="bb-body mt-3 text-xs uppercase tracking-[0.3em]">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden">
          <div className="flex bb-marquee">
            {logos.concat(logos).map((l, i) => (
              <div key={i} className="mx-12 shrink-0 text-2xl md:text-3xl font-semibold text-[#f2f2e1]/30 hover:text-[#c6f208] transition-colors">
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
    "Still depending only on referrals?",
    "Posting content but not getting clients?",
    "Working all day but growth feels slow?",
    "Doing everything manually?",
  ];
  return (
    <Section className="relative py-40 overflow-hidden">
      <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.2, 0.6]) }} className="absolute inset-0 bb-aurora" />
      <div ref={ref} className="mx-auto max-w-5xl px-6 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-12">/ 02 — Reality Check</div>
        <div className="space-y-12">
          {questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bb-display text-[clamp(1.8rem,5vw,4.5rem)]"
            >
              {q.split(" ").map((w, j) => (
                <span key={j} className="inline-block mr-3 hover:text-[#c6f208] transition-colors duration-300">
                  {w}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bb-body mt-20 text-lg max-w-2xl mx-auto"
        >
          You don't need another agency. You need an engineered growth system
          that runs whether you sleep, travel or scale.
        </motion.p>
      </div>
    </Section>
  );
}

/* ------------- services ------------- */

const services = [
  { icon: Cpu, name: "Website Development", desc: "Cinematic, conversion-engineered websites built for ambition.", tag: "01" },
  { icon: Zap, name: "Web App Development", desc: "Custom apps and SaaS platforms that scale with your operations.", tag: "02" },
  { icon: Megaphone, name: "Running Advertisements", desc: "Performance ads engineered around a creative + data flywheel.", tag: "03" },
  { icon: Video, name: "Content Creation", desc: "On-brand content engines that turn attention into revenue.", tag: "04" },
  { icon: Bot, name: "AI Automations", desc: "Custom AI infrastructure: agents, workflows, internal copilots.", tag: "05" },
];

function ServiceCard({ s, i }: { s: typeof services[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60 - i * 20]);
  const Icon = s.icon;
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative overflow-hidden rounded-3xl bb-glass p-8 md:p-10 cursor-pointer"
      data-cursor="hover"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#c6f208]/10 via-transparent to-transparent" />
      <div className="relative flex items-start justify-between mb-12">
        <div className="text-xs uppercase tracking-[0.4em] text-[#c6f208]">/ {s.tag}</div>
        <Icon className="h-6 w-6 text-[#f2f2e1]/40 group-hover:text-[#c6f208] transition-colors" />
      </div>
      <h3 className="bb-display relative text-3xl md:text-4xl mb-4">{s.name}</h3>
      <p className="bb-body relative">{s.desc}</p>
      <div className="relative mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#f2f2e1]/60 group-hover:text-[#c6f208] transition-colors">
        Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </motion.div>
  );
}

function Services() {
  return (
    <Section id="services" className="relative py-40 border-t border-white/5">
      <div className="absolute inset-0 bb-grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">/ 03 — Capabilities</div>
            <h2 className="bb-display mt-4 text-5xl md:text-7xl max-w-3xl">
              A studio that ships your entire growth stack.
            </h2>
          </div>
          <p className="bb-body max-w-sm">
            Five capabilities. One engineered system. Designed to compound.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.name} s={s} i={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------- The Beyond Method ------------- */

const steps = [
  { n: "01", title: "Analyze", desc: "Deep audit of funnel, brand, infrastructure and revenue physics." },
  { n: "02", title: "Engineer", desc: "Design a custom growth system around your specific economics." },
  { n: "03", title: "Automate", desc: "Deploy AI-powered workflows that remove manual operations." },
  { n: "04", title: "Scale", desc: "Pour fuel: ads, content, partnerships, distribution flywheel." },
  { n: "05", title: "Expand", desc: "Productize, internationalize, and unlock new revenue layers." },
];

function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  return (
    <Section id="method" className="relative border-t border-white/5">
      <div ref={ref} className="relative h-[420vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bb-aurora opacity-40" />
          <div className="mx-auto max-w-7xl px-6 pt-28">
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">/ 04 — Process</div>
            <h2 className="bb-display mt-4 text-5xl md:text-7xl">
              The Beyond Method<span className="text-[#c6f208]">™</span>
            </h2>
            <p className="bb-body mt-4 max-w-md">
              A five-stage operating system for engineering compounding growth.
            </p>
          </div>
          <motion.div style={{ x }} className="absolute bottom-20 left-0 flex gap-8 pl-[10vw]">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="relative w-[80vw] md:w-[55vw] shrink-0 rounded-3xl bb-glass p-10 overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#c6f208] to-transparent opacity-40" />
                <div className="flex items-center justify-between mb-10">
                  <div className="text-[#c6f208] text-sm uppercase tracking-[0.4em]">{s.n}</div>
                  <div className="text-[#f2f2e1]/30 text-xs uppercase tracking-[0.4em]">Stage {i + 1} / {steps.length}</div>
                </div>
                <h3 className="bb-display text-6xl md:text-8xl">{s.title}</h3>
                <p className="bb-body mt-8 max-w-md text-lg">{s.desc}</p>
                <div className="absolute bottom-8 left-10 right-10 h-px bg-white/10">
                  <div className="h-full bg-[#c6f208]" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
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
    <Section className="relative py-40 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-10">/ 05 — Differentiators</div>
        <div className="space-y-8">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center gap-6 border-b border-white/10 pb-8"
            >
              <div className="text-xs text-[#c6f208] uppercase tracking-[0.4em] w-12">0{i + 1}</div>
              <div className="bb-display text-3xl md:text-6xl flex-1 group-hover:text-[#c6f208] transition-colors duration-500">{t}</div>
              <ArrowUpRight className="h-6 w-6 text-[#f2f2e1]/30 group-hover:text-[#c6f208] group-hover:rotate-45 transition-all" />
            </motion.div>
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
  { q: "How is Beyond Business different from a traditional agency?", a: "We don't sell campaigns or retainers for the sake of activity. We engineer end-to-end growth systems — websites, apps, ads, content and AI — that compound over time." },
  { q: "Who do you typically work with?", a: "Founders and operators of 7-figure businesses, ambitious startups, and brands ready to scale infrastructure, not just spend." },
  { q: "What kind of AI automations do you build?", a: "Internal copilots, lead-qualification agents, content engines, ops workflows, custom GPTs trained on your data — anything that compresses time-to-revenue." },
  { q: "How long until I see results?", a: "Foundation in 30 days, traction in 60, compounding by 90. We architect for long-term defensibility, not vanity wins." },
  { q: "Do you work globally?", a: "Yes. Our team operates across time zones with founders in the US, EU, MENA and APAC." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="relative py-40 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80">/ 09 — Questions</div>
        <h2 className="bb-display mt-4 text-5xl md:text-7xl mb-16">Things founders ask.</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen ? "border-[#c6f208]/40 bg-[#c6f208]/[0.03] shadow-[0_0_40px_rgba(198,242,8,0.08)]" : "border-white/10 hover:border-white/30"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left"
                  data-cursor="hover"
                >
                  <span className="bb-display text-xl md:text-2xl">{f.q}</span>
                  <span className="shrink-0 h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#c6f208]">
                    {isOpen ? <Minus className="h-4 w-4 text-[#c6f208]" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="bb-body px-6 md:px-8 pb-8 max-w-3xl text-base md:text-lg">{f.a}</p>
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

function FinalCTA({ onCTA }: { onCTA: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.85, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <Section className="relative py-40 border-t border-white/5 overflow-hidden">
      <div ref={ref}>
        <div className="absolute inset-0 bb-aurora opacity-70" />
        <div className="absolute inset-0 bb-grid-bg opacity-30" />
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#c6f208]"
            initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0, 2, 0] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
        <motion.div style={{ scale, y }} className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-8">/ 10 — Take The Leap</div>
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

function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div>
            <div className="bb-display text-3xl">BEYOND<span className="text-[#c6f208]">.</span></div>
            <p className="bb-body mt-4 max-w-xs">
              An AI-powered growth studio engineering the digital infrastructure of modern founders.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-6">Studio</div>
            <ul className="space-y-3 bb-body">
              {["Services", "Method", "Work", "Founder", "Careers"].map((l) => (
                <li key={l}><a href="#" className="hover:text-[#c6f208] transition-colors" data-cursor="hover">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-6">Contact</div>
            <ul className="space-y-3 bb-body">
              <li>hello@beyondbusiness.studio</li>
              <li>Dubai · Bengaluru · Remote</li>
              <li className="flex gap-4 pt-2">
                {["LinkedIn", "Instagram", "X"].map((s) => (
                  <a key={s} href="#" className="hover:text-[#c6f208] transition-colors" data-cursor="hover">{s}</a>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className="relative">
          <motion.h3
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bb-display text-[clamp(3rem,15vw,16rem)] leading-none bb-text-stroke"
          >
            BEYOND BUSINESS
          </motion.h3>
          <div className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c6f208]/60 to-transparent" />
        </div>
        <div className="mt-12 flex items-center justify-between bb-body text-xs uppercase tracking-[0.3em]">
          <span>© {new Date().getFullYear()} Beyond Business</span>
          <span>Your Business, Beyond Limits.</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------- Calendly modal ------------- */

function CalendlyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
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
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bb-glass p-10 text-center"
      >
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]">Book a Strategy Call</div>
        <h3 className="bb-display mt-4 text-3xl md:text-5xl">Let's engineer your growth.</h3>
        <p className="bb-body mt-4 max-w-md mx-auto">
          30-minute call. We'll map your bottlenecks and outline your custom growth system.
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-12">
          <p className="bb-body text-sm">Calendly embed slot — connect your Calendly link here.</p>
        </div>
        <button onClick={onClose} className="mt-6 text-xs uppercase tracking-[0.3em] text-[#f2f2e1]/60 hover:text-[#c6f208]" data-cursor="hover">
          Close
        </button>
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
        <Hero />
        <Trust />
        <Problem />
        <Services />
        <Method />
        <Why />
        <Founder />
        <Testimonials />
        <LeadMagnet />
        <FAQ />
        <FinalCTA onCTA={() => setOpen(true)} />
      </main>
      <Footer />
      <CalendlyModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}