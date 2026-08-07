import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f2f2e1] font-sans pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <Link to="/" className="inline-block mb-12 text-sm text-white/50 hover:text-[#c6f208] transition-colors uppercase tracking-widest">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bb-display">Contact Us</h1>
        <div className="text-sm uppercase tracking-[0.2em] text-[#c6f208] mb-12">Beyond Business</div>

        <div className="space-y-8 text-white/80 leading-relaxed text-sm sm:text-base bb-body">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display">Get in Touch</h2>
            <p className="mb-4">
              Have a question, a project in mind, or want to explore how we can help your business grow? We'd love to hear from you.
            </p>
            <p>
              Whether you're looking to generate more leads, scale your advertising, build a high-converting website, or automate parts of your business, our team is here to help.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-10">Contact Details</h2>
            <ul className="space-y-4">
              <li>
                <strong className="text-white block mb-1">Email:</strong>
                beyondbusinessofc@gmail.com
              </li>
              <li>
                <strong className="text-white block mb-1">Phone:</strong>
                +91 9989134262
              </li>
              <li>
                <strong className="text-white block mb-1">Address:</strong>
                Madhapur, Hyderabad, Telangana, India
              </li>
              <li>
                <strong className="text-white block mb-1">Business Hours:</strong>
                Monday to Friday, 9:00 AM – 5:00 PM (IST)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-10">What Happens Next?</h2>
            <p className="mb-4">Once you reach out, here's what you can expect:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>We'll review your message or form submission.</li>
              <li>A member of our team will get in touch with you within 24-48 hours (Monday to Friday).</li>
              <li>If it's a good fit, we'll schedule a call to understand your business and goals in more detail.</li>
            </ul>
            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-8">Let's Grow Your Business Together</h3>
            <p>
              We're always excited to connect with business owners who are ready to take the next step. Reach out today, and let's talk about how Beyond Business can help you get there.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
