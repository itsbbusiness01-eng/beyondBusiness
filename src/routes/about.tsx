import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f2f2e1] font-sans pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <Link to="/" className="inline-block mb-12 text-sm text-white/50 hover:text-[#c6f208] transition-colors uppercase tracking-widest">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bb-display">About Us</h1>
        <div className="text-sm uppercase tracking-[0.2em] text-[#c6f208] mb-12">Beyond Business</div>

        <div className="space-y-8 text-white/80 leading-relaxed text-sm sm:text-base bb-body">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Who We Are</h2>
            <p className="mb-4">
              Beyond Business is a performance marketing and business growth agency. We work with established business owners who already have a product or service people want, and help them grow it faster through smarter marketing, better systems, and stronger online presence.
            </p>
            <p>
              We're not here to teach you the basics. We're here to help you scale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Why We Started</h2>
            <p>
              Beyond Business was built on a simple observation: many businesses with great products struggle to grow, not because their offer is weak, but because their marketing, lead generation, and sales systems aren't built to scale. We started this agency to close that gap — combining performance marketing, technology, and AI-driven automation to help businesses grow in a way that's measurable and repeatable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Our Mission</h2>
            <p>
              To help business owners grow faster and more profitably by building marketing, sales, and automation systems that actually work — not just look good on paper.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Our Vision</h2>
            <p>
              To become a trusted growth partner for business owners across India, known for delivering real, measurable results rather than empty promises.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Our Core Values</h2>
            
            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Results Over Noise</h3>
            <p className="mb-4">
              We focus on what actually moves the needle for your business — leads, sales, and growth — not vanity metrics.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Clarity and Honesty</h3>
            <p className="mb-4">
              We explain what we're doing and why. No jargon, no overpromising, no hiding behind complexity.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Built to Scale</h3>
            <p className="mb-4">
              Every system we build, from ads to automation, is designed to grow with your business, not just work for a month and break down.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Ownership</h3>
            <p>
              We treat your business goals like our own. If something isn't working, we say so and fix it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Who We Serve</h2>
            <p className="mb-2">We work best with:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Established business owners in India</li>
              <li>Businesses that already have product-market fit</li>
              <li>Founders looking to generate more leads and close more sales</li>
              <li>Business owners who want to build a stronger personal or company brand online</li>
            </ul>
            <p>
              We're not the right fit for early-stage ideas still looking for their first customers. We're built for businesses ready to scale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">How We Help Businesses Grow</h2>
            <p className="mb-2">We support business growth through:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong className="text-white">Performance Advertising</strong> — Running Meta and Google ad campaigns focused on generating qualified leads</li>
              <li><strong className="text-white">High-Converting Websites</strong> — Building websites designed to turn visitors into leads and customers</li>
              <li><strong className="text-white">Founder-Led Branding</strong> — Helping founders build a personal brand that drives trust and business growth</li>
              <li><strong className="text-white">Lead Generation Systems</strong> — Designing systems that consistently bring in qualified leads</li>
              <li><strong className="text-white">Sales Systems</strong> — Building processes that help convert leads into paying clients</li>
              <li><strong className="text-white">AI Automation</strong> — Automating repetitive tasks so your team can focus on growth, not admin work</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">What Makes Us Different</h2>
            <p className="mb-4">
              We don't believe in one-size-fits-all marketing. Every business we work with gets a strategy built around their specific goals, industry, and growth stage. We combine hands-on marketing expertise with modern automation and AI tools, so you get both strategic thinking and operational efficiency — without having to manage five different vendors to get there.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Let's Build Something Together</h2>
            <p>
              If you're a business owner ready to grow faster and smarter, we'd love to talk. Reach out to us and let's see if we're the right fit.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
