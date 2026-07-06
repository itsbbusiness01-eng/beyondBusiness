import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, Sparkles, Zap, Cpu, Megaphone, Video, Bot, Plus, Minus, Globe, TrendingUp, Camera, BarChart2, Star, Menu, X, Check, ChevronLeft, ChevronRight } from "lucide-react";

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
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${base} ${className}`}
      data-cursor="hover"
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">{children}</span>
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
  const [activeSection, setActiveSection] = useState("");
  
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      
      const sections = ["services", "method", "about-us", "faq"];
      let current = "";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className={`fixed left-1/2 z-[999] -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "top-3 w-[min(94%,1100px)]" : "top-6 w-[min(96%,1240px)]"
      }`}
    >
      <div className={`flex items-center justify-between rounded-full bb-glass px-6 py-3 ${scrolled ? "shadow-[0_8px_40px_rgba(0,0,0,0.6)]" : ""}`}>
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleLinkClick("#top"); }}
          className="flex items-center gap-2" 
          data-cursor="hover"
        >
          <div className="h-2 w-2 rounded-full bg-[#c6f208] shadow-[0_0_12px_#c6f208]" />
          <span className="bb-display text-base tracking-tight">BEYOND<span className="text-[#c6f208]">.</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.25em] text-[#f2f2e1]/70">
          {["Services", "Method", "About Us", "FAQ"].map((l) => {
            const id = l.toLowerCase().replace(' ', '-');
            const isActive = activeSection === id;
            return (
              <a 
                key={l} 
                href={`#${id}`} 
                onClick={(e) => { e.preventDefault(); handleLinkClick(`#${id}`); }}
                className={`${isActive ? "text-[#c6f208]" : "hover:text-[#c6f208]"} transition-colors`} 
                data-cursor="hover"
              >
                {l}
              </a>
            );
          })}
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
              {["Services", "Method", "About Us", "FAQ"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(' ', '-')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(`#${l.toLowerCase().replace(' ', '-')}`);
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

  const words1 = "DO YOU WANT".split(" ");
  const words2 = "TO SCALE".split(" ");
  const words3 = "YOUR".split(" ");
  const words4 = "BUSINESS?".split(" ");

  return (
    <section
      ref={ref}
      id="top"
      className="relative md:min-h-[100vh] xl:min-h-[120vh] overflow-hidden bb-noise"
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
          "sticky top-0 flex md:min-h-[100vh] flex-col items-center justify-center text-center",
          "px-5 sm:px-8 md:px-12 lg:px-16",
          "pt-36 sm:pt-40 md:pt-24 lg:pt-28",
          "pb-20 sm:pb-24 md:pb-16",
        ].join(" ")}
      >


        {/* — Headline — */}
        <h1 className="bb-display text-[clamp(2.4rem,11vw,3.5rem)] md:text-[clamp(3.5rem,5.5vw,5.5rem)] flex flex-wrap justify-center md:gap-y-2">
          
          {/* DO YOU WANT */}
          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 w-full md:w-auto md:mr-3 lg:mr-4">
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

          {/* TO SCALE */}
          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 w-full md:w-auto md:mr-3 lg:mr-4">
            {words2.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: 120, opacity: 0, rotateX: 60 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block ${w === "SCALE" ? "text-[#c6f208]" : "bb-text-stroke"}`}
              >
                {w}
              </motion.span>
            ))}
          </div>

          {/* YOUR */}
          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 w-full md:w-auto">
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

          {/* BUSINESS? */}
          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 w-full">
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
          Learn from the team that has scaled a portfolio to over 10cr+ in annual revenue.
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
              <span>I'M READY TO SCALE</span>
              <ArrowUpRight className="h-4 w-4 ml-1.5 shrink-0" />
            </MagneticButton>
          </motion.div>
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
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
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
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

function Trust({ onCTA }: { onCTA: () => void }) {
  const baseLogos = [
    <img key="sniffix" src="/assets/sniffix_logobg.png" alt="Sniffix" className="h-10 sm:h-12 object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 brightness-0 invert" />,
    <img key="elevatech" src="/assets/elevatech_logob.png" alt="Elevatech" className="h-16 sm:h-24 lg:h-32 object-contain opacity-100 transition-opacity duration-300" />,
  ];
  const metrics = [
    { label: "Average Revenue Growth", value: 312, suffix: "%" },
    { label: "Leads Generated", value: 184500, suffix: "+" },
    { label: "Business Tasks Automated with AI", value: 250, suffix: "+" },
    { label: "Businesses Scaled", value: 96, suffix: "+" },
  ];

  return (
    <Section className="relative border-t border-white/5 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-6">
        {/* — Header row — */}
        <div className="mb-10 sm:mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-5 sm:gap-6">
          <div>
            <h2 className="bb-display mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-xl">
              Our Track Record
            </h2>
          </div>
          <p className="bb-body max-w-sm text-sm sm:text-base">
            Here's what we've done for businesses like yours.
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
        <div className="relative mt-12 sm:mt-16 md:mt-20 flex justify-center flex-wrap gap-8 sm:gap-12 md:gap-16 px-4">
          {baseLogos.map((l, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center"
            >
              {l}
            </div>
          ))}
        </div>

        {/* — CTA — */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <MagneticButton onClick={onCTA}>
            See How We Can Grow Your Business <ArrowUpRight className="h-4 w-4 ml-1.5 shrink-0" />
          </MagneticButton>
        </div>

        {/* Future Section Placeholder: Hear from our customers */}
        {/* <div className="mt-20">
          <h3 className="bb-display text-2xl sm:text-3xl text-center mb-10">Hear from our customers</h3>
          <p className="text-center text-[#f2f2e1]/50 text-sm">Scrolling videos section with thumbnail selector</p>
          <p className="text-center text-[#f2f2e1]/50 text-sm mt-4">Scrolling images - what are the results we have achieved</p>
        </div> */}
      </div>
    </Section>
  );
}


/* ------------- problem agitation ------------- */

function Problem({ onCTA }: { onCTA: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const questions = [
    "Does your competitors show up first,not you?",
    "Do Smaller competitors get found online before you do ?",
    "Why do new buyers find your competitors , but not you?",
    "Is a smaller competitor winning leads that should be yours?",
    "When buyers search online, do they even find you?",
  ];

  return (
    <Section className="relative pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 lg:pb-32 overflow-hidden">
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.2, 0.6]) }}
        className="absolute inset-0 bb-aurora"
      />

      <div ref={ref} className="mx-auto max-w-5xl px-5 sm:px-8 md:px-10 lg:px-6 text-center">


        <h2 className="bb-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-12 sm:mb-16 md:mb-20">
          Ask Yourself This
        </h2>

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
          className="bb-body mt-12 sm:mt-16 md:mt-20 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0 mb-10"
        >
          Does Any of This Sound Like Your Business? If You Said Yes to These, We Should Talk.
        </motion.p>

        {/* — CTA — */}
        <div className="flex justify-center">
          <MagneticButton onClick={onCTA}>
            I WANT TO FIX THIS <ArrowUpRight className="h-4 w-4 ml-1.5 shrink-0" />
          </MagneticButton>
        </div>
      </div>
    </Section>
  );
}

/* ------------- services ------------- */

const services: any[] = [
  {
    tag: "01",
    headline: "Website Development",
    sub: "A complete website stack that turns visitors into paying customers.",
    features: [
      "Website Development & Deployment",
      "Website Speed Optimization",
      "Custom CRM & Dashboard Development",
      "Custom Software Development",
      "AI Chat Bot Integration",
      "Multiple Page Optimization",
      "Mobile & Tablet Friendly Optimization",
      "SEO Optimization",
      "Persuasive Copywriting",
      "Custom UTM Links",
      "Traffic Tracking Pixel Integration"
    ]
  },
  {
    tag: "02",
    headline: "Leads & Sales Generation System",
    sub: "A complete system that brings you new leads, every single month.",
    features: [
      "Cold Outreach System",
      "Warm Outreach System",
      "Paid Advertisement (Google/Meta)",
      "Full Funnel Design & Development",
      "Ad Creatives Production",
      "WhatsApp Campaigns",
      "Email Campaigns",
      "Affiliate Systems for More Growth",
      "Integration Marketing",
      "Upsell / Cross-sell / Downsell Management",
      "Full Tracking System"
    ]
  },
  {
    tag: "03",
    headline: "Build Your Online Presence",
    sub: "We build a content system that builds and maintains your online presence.",
    features: [
      "Social Media Account Handling",
      "Content Research & Strategy",
      "Customised Content Script Writing",
      "Content Shooting",
      "Content Editing",
      "Omnichannel Management",
      "Brand Storytelling",
      "Personal Branding for Founders",
      "Content Funnel Development",
      "Influencer Collaboration Management",
      "Online Reputation & Review Management"
    ]
  },
  {
    tag: "04",
    headline: "AI Automations",
    sub: "We automate your boring tasks, so you get more time for your family.",
    features: [
      "WhatsApp Communication Automation",
      "Email Communication Automation",
      "Complete Leads System Automation",
      "Complete Sales System Automation",
      "Logistical Automation (For Ecommerce Businesses)",
      "Customer Service Automation",
      "Invoice & Payment Reminder Automation",
      "Appointment & Booking Automation",
      "Data Entry & Reporting Automation",
      "Internal Team Task Automation",
      "Review & Feedback Collection Automation"
    ]
  },
  {
    tag: "05",
    headline: "Founder Freedom System",
    sub: "A system that lets your business run, grow, and even sell — without you.",
    features: [
      "SOPs Development",
      "Sales Process Documentation",
      "Team Training Systems",
      "Hiring & Onboarding Systems",
      "Decision Dashboards for Owners",
      "Delegation Roadmap",
      "Second-in-Command (Ops Manager) Hiring & Setup",
      "Weekly Business Review System",
      "Financial Systems & Cash Flow Tracking",
      "Customer Complaint & Escalation System",
      "Founder Exit Readiness Planning"
    ]
  }
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
  onOpenModal,
}: {
  s: any;
  index: number;
  scrollDirection: "down" | "up";
  onVisibilityChange: (index: number, visible: boolean) => void;
  onOpenModal: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    margin: "-8% 0px -8% 0px",
    once: false,
  });

  const [hovered, setHovered] = useState(false);

  const staggerDelay =
    scrollDirection === "down" ? index * 0.09 : (services.length - 1 - index) * 0.07;

  useEffect(() => {
    onVisibilityChange(index, isInView);
  }, [isInView, index, onVisibilityChange]);

  return (
    <motion.div
      ref={ref}
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
      style={{ willChange: "transform, opacity" }}
      className="h-full snap-start flex flex-col"
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex-1 flex flex-col overflow-hidden rounded-[2rem] bg-[#050505]/80 backdrop-blur-xl border border-[#c6f208]/20 hover:border-[#c6f208]/60 p-8 sm:p-10 transition-all duration-500 hover:shadow-[0_0_60px_rgba(198,242,8,0.15)] hover:-translate-y-2"
        style={{
          boxShadow: hovered 
            ? "inset 0 2px 20px rgba(198,242,8,0.1), 0 0 40px rgba(198,242,8,0.15)" 
            : "inset 0 1px 10px rgba(198,242,8,0.03)",
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#c6f208]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
        
        {/* Top highlight */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#c6f208] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="text-center mb-8 relative">
          <h3 className="bb-display text-3xl sm:text-4xl mb-3 leading-tight text-white font-semibold">
            {s.headline}
          </h3>
          <p className="bb-body text-[#c6f208]/80 text-sm md:text-sm max-w-[280px] mx-auto">
            {s.sub}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center relative">
          <div className="space-y-4 mb-10 text-left w-full max-w-[260px]">
            {s.features.map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#c6f208] shrink-0 mt-0.5" />
                <span className="text-sm text-[#f2f2e1]/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-auto text-center flex justify-center w-full">
          <button
            onClick={onOpenModal}
            className="w-full rounded-full bg-[#c6f208] px-10 py-4 text-xs font-bold uppercase tracking-widest text-[#050505] transition-all duration-300 hover:shadow-[0_0_20px_rgba(198,242,8,0.4)] hover:bg-white"
          >
            Get Started
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

export default function Services({ onOpenModal }: { onOpenModal: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 640 ? 432 : 344;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollDirection = useScrollDirection();
  const [activeCards, setActiveCards] = useState<boolean[]>(new Array(5).fill(false));

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
                <div className="flex items-center justify-between w-full">

                  

                </div>

                {/* Title with parallax */}
                <motion.h2
                  style={{ y: titleY }}
                  className="bb-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.05]"
                >
                  {"How We Help You Grow Your Business"
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
                className="bb-body w-full sm:max-w-sm text-[#f2f2e1]/55 leading-relaxed text-sm md:text-base"
              >
                We build your website, bring you leads, save you time, and grow your reputation among your customers.
              </motion.p>
            </motion.div>

            {/* ── Cards Scroller ── */}
            <div className="relative group/scroller">
              <div 
                ref={scrollRef}
                className="grid grid-flow-col auto-cols-[320px] sm:auto-cols-[400px] overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style dangerouslySetInnerHTML={{__html: `div::-webkit-scrollbar { display: none; }`}} />
                {services.map((s, i) => (
                  <ServiceCard
                    key={s.tag}
                    s={s}
                    index={i}
                    scrollDirection={scrollDirection}
                    onVisibilityChange={handleVisibilityChange}
                    onOpenModal={onOpenModal}
                  />
                ))}
              </div>
              
              {/* Floating Navigation Arrows */}
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 sm:-left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur shadow-xl hover:border-[#c6f208]/50 hover:bg-[#c6f208]/10 transition-colors opacity-0 group-hover/scroller:opacity-100 hidden sm:block"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 sm:-right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur shadow-xl hover:border-[#c6f208]/50 hover:bg-[#c6f208]/10 transition-colors opacity-0 group-hover/scroller:opacity-100 hidden sm:block"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
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
  return (
    <Section className="relative border-t border-white/5">
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 pt-24 sm:pt-32 pb-24 sm:pb-32 text-center">


        {/* Headline */}
        <h2 className="bb-display mt-4 sm:mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
          Why Businesses Want to Work With Us
        </h2>

        {/* Subtitle */}
        <p className="bb-body mt-8 sm:mt-10 text-xl sm:text-2xl text-[#f2f2e1]/80 max-w-2xl mx-auto leading-relaxed">
          We don't just grow your business. We free you from running it.
        </p>
      </div>
    </Section>
  );
}

/* ------------- Founder ------------- */

function Founder() {
  return (
    <Section id="about-us" className="relative py-40 border-t border-white/5 overflow-hidden">
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

function TeamCard({ m, index }: { m: { name: string, role: string, bio: string, img: string }; index: number }) {
  return (
    <div className="team-flip-card relative aspect-square w-full cursor-pointer" style={{ perspective: "1000px" }}>
      <div 
        className="team-flip-inner relative w-full h-full transition-transform duration-700 ease-in-out" 
        style={{ transformStyle: "preserve-3d", animationDelay: `${index * 1.5}s` }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .team-flip-card:hover > .team-flip-inner { transform: rotateY(180deg); }
          .team-flip-card:active > .team-flip-inner { transform: rotateY(180deg); }
          @media (max-width: 768px) {
            @keyframes autoFlip {
              0%, 25% { transform: rotateY(0deg); }
              40%, 85% { transform: rotateY(180deg); }
              100% { transform: rotateY(0deg); }
            }
            .team-flip-inner {
              animation: autoFlip 8s infinite ease-in-out;
            }
          }
        `}} />
        
        {/* Front Face */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 z-10 border border-white/5 rounded-2xl pointer-events-none" />
          <img 
            src={m.img} 
            alt={m.name} 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="bb-display text-2xl sm:text-3xl font-bold">{m.name}</h3>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#c6f208] mt-2 font-semibold">{m.role}</div>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden border border-[#c6f208]/30 bg-[#050505] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(198,242,8,0.1)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-0 bb-grid-bg opacity-10" />
          <h3 className="bb-display text-2xl font-bold relative z-10">{m.name}</h3>
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#c6f208] mt-2 font-semibold relative z-10">{m.role}</div>
          <p className="bb-body text-xs sm:text-sm mt-4 sm:mt-6 text-[#f2f2e1]/80 leading-relaxed relative z-10">
            {m.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

function Team() {
  return (
    <Section id="about-us" className="relative border-t border-white/5 py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bb-aurora opacity-20" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        
        {/* Headline */}
        <div className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20">
          <h2 className="bb-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] max-w-4xl">
            Team Behind Beyond Business
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Srinadh Reddy",
              role: "Co-Founder",
              bio: "Hey, I'm Srinadh Reddy, Co-Founder of Beyond Business. I've spent 5+ years turning brands into names people don't forget. I have only one goal: make sure your customers never forget you.",
              img: "/assets/srinadh.png",
            },
            {
              name: "Sairam Nayak",
              role: "Co-Founder",
              bio: 'Hi, I\'m Sairam Nayak, Co-Founder of Beyond Business. My friends call me "The Profit Guy" because I\'ve grown my own businesses at an average 1:24 ROAS—profitably. Now I bring that same approach to your business, helping you build stronger foundations, generate consistent leads, and capture a bigger share of your market.',
              img: "/assets/sr 2.png",
            },
            {
              name: "Uday",
              role: "Lead Developer",
              bio: "Hi, I'm Uday. I've spent 10+ years writing code and leading teams that build things right the first time. From high-end websites to full product builds, my team and I make sure everything runs smoothly, so you can focus on your business—not your bugs.",
              img: "/assets/uday - teamate.jpeg",
            },
            {
              name: "Manideep",
              role: "Creative Director",
              bio: "Hi, I'm Manideep, Creative Director at Beyond Business. My camera has worked with brands like Pista House and Marluri Bakery. In a world where everyone's posting, I make sure your content is the one people actually remember.",
              img: "/assets/mani.png",
            },
            {
              name: "Harsha Reddy",
              role: "Social Media Growth Manager",
              bio: "Hi, I'm Harsha Reddy, Social Media Growth Manager at Beyond Business. I handle your social media accounts so your content goes out on time, every time. I know exactly when to post for the best chance of going viral, helping you stay consistent and visible without lifting a finger.",
              img: "/assets/harsha.png",
            },
            {
              name: "Maneesh Reddy",
              role: "Customer Experience Manager",
              bio: "Hi, I'm Maneesh Reddy, Customer Experience Manager at Beyond Business. I make sure every customer interaction leaves a lasting impression. That's how referrals and word-of-mouth happen naturally. I've already grown our own NPS score from 35 to 67, and I bring that same customer-first approach to your business.",
              img: "/assets/maneesh.jpeg",
            },
          ].map((m, i) => (
            <TeamCard key={m.name} m={m} index={i} />
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
      className="relative pt-16 sm:pt-24 md:pt-32 pb-28 sm:pb-32 md:pb-36 lg:pb-40 xl:pb-44 border-t border-white/5"
    >
      <div className="mx-auto max-w-5xl px-6">


        <h2 className="bb-display mt-5 md:mt-6 text-5xl md:text-7xl mb-10 md:mb-12 lg:mb-16">
          Frequently Asked Questions by Business Owners
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
          {/* <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208]/80 mb-8">
            / 08 — Scale The Leap
          </div> */}

          <h2 className="bb-display text-[clamp(2.4rem,10vw,9rem)] leading-[0.88]">
            READY TO SCALE
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

function PremiumServiceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", business: "", email: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      setFormData({ name: "", phone: "", business: "", email: "" });
      setStatus("idle");
      setErrors({});
    }
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Invalid phone format";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const formattedMessage = `Hello Beyond Business growth team!\n\n` +
      `*Name*: ${formData.name}\n` +
      `*Phone*: ${formData.phone}\n` +
      (formData.business ? `*Business*: ${formData.business}\n` : "") +
      (formData.email ? `*Email*: ${formData.email}` : "");

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
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 text-center shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-white/40 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {status === "success" ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#c6f208]/10 flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-[#c6f208]" />
            </div>
            <h3 className="bb-display text-2xl md:text-3xl">Talk to you soon!</h3>
            <p className="bb-body mt-4 max-w-sm mx-auto text-sm sm:text-base text-white/60">
              Your inquiry has been successfully transmitted. Our growth team will get back to you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-[#c6f208] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#050505] hover:bg-[#c6f208]/90 transition-colors w-full"
            >
              Close Window
            </button>
          </motion.div>
        ) : (
          <>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c6f208] mb-3">Premium Service</div>
            <h3 className="bb-display text-3xl sm:text-4xl mb-3">Get Started</h3>
            <p className="bb-body text-xs sm:text-sm text-white/50 mb-8">
              Fill in your details below and we will get back to you to map out your growth plan.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-2 font-medium ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Aarav Mehta"
                  className={`w-full bg-black/50 border ${errors.name ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-2xl px-5 py-4 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20`}
                />
                {errors.name && <span className="text-red-500 text-[10px] mt-1.5 ml-1 block">{errors.name}</span>}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-2 font-medium ml-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 99999 99999"
                  className={`w-full bg-black/50 border ${errors.phone ? "border-red-500" : "border-white/10"} focus:border-[#c6f208] rounded-2xl px-5 py-4 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20`}
                />
                {errors.phone && <span className="text-red-500 text-[10px] mt-1.5 ml-1 block">{errors.phone}</span>}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-2 font-medium ml-1">
                  Business Name <span className="text-white/30 lowercase">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  placeholder="Your Company"
                  className="w-full bg-black/50 border border-white/10 focus:border-[#c6f208] rounded-2xl px-5 py-4 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#f2f2e1]/50 mb-2 font-medium ml-1">
                  Email Address <span className="text-white/30 lowercase">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full bg-black/50 border border-white/10 focus:border-[#c6f208] rounded-2xl px-5 py-4 text-sm text-[#f2f2e1] outline-none transition-colors placeholder:text-white/20"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full text-center rounded-2xl bg-[#c6f208] py-4 text-xs font-bold uppercase tracking-widest text-[#050505] transition-all hover:shadow-[0_0_30px_rgba(198,242,8,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  ) : (
                    <>
                      <span>Book A Call</span>
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
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  return (
    <div className="relative bg-[#050505] text-[#f2f2e1]">
      <AnnouncementBar />
      <Nav onCTA={() => setPremiumModalOpen(true)} />
      <main>
        <Hero onCTA={() => setPremiumModalOpen(true)} />
        <Trust onCTA={() => setPremiumModalOpen(true)} />
        <Problem onCTA={() => setPremiumModalOpen(true)} />
        <Services onOpenModal={() => setPremiumModalOpen(true)} />
        <Method />
        <Why />
        <Team />
        {/* <Founder />
        <Testimonials />
        <LeadMagnet /> */}
        <FAQ />
        <FinalCTA onCTA={() => setPremiumModalOpen(true)} />
      </main>
      <Footer />
      <PremiumServiceModal open={premiumModalOpen} onClose={() => setPremiumModalOpen(false)} />
    </div>
  );
}