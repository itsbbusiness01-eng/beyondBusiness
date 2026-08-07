import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f2f2e1] font-sans pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <Link to="/" className="inline-block mb-12 text-sm text-white/50 hover:text-[#c6f208] transition-colors uppercase tracking-widest">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bb-display">Privacy Policy</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-12">
          <div className="text-sm uppercase tracking-[0.2em] text-[#c6f208]">Beyond Business</div>
          <div className="hidden sm:block text-white/30">•</div>
          <div className="text-xs text-white/50">Last Updated: July - 2026</div>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed text-sm sm:text-base bb-body">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Introduction</h2>
            <p className="mb-4">
              Welcome to Beyond Business. We help business owners grow through advertising, lead generation, website development, and business automation services.
            </p>
            <p className="mb-4">
              This Privacy Policy explains how we collect, use, and protect information when you visit our website or interact with our services. We want you to feel confident about how your information is handled.
            </p>
            <p>
              By using our website, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Information We Collect</h2>
            
            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Personal Information You Provide</h3>
            <p className="mb-2">We may collect personal information when you:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Fill out a contact form or lead generation form</li>
              <li>Book a call or consultation</li>
              <li>Sign up for updates or resources</li>
              <li>Email or message us directly</li>
            </ul>
            <p className="mb-2">This information may include:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business name</li>
              <li>Details about your business or project</li>
            </ul>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Information Collected Automatically</h3>
            <p className="mb-2">When you visit our website, some information is collected automatically. This may include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your IP address</li>
              <li>Browser type and device information</li>
              <li>Pages you visit on our site</li>
              <li>Time spent on pages</li>
              <li>Referring website or source</li>
              <li>General location (city or region level)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking tools to understand how visitors use our website and to improve our marketing efforts.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Google Analytics</h3>
            <p className="mb-4">
              We use Google Analytics 4 (GA4) to understand how people use our website. This helps us see which pages are popular and how we can improve the site. Google Analytics collects information such as pages visited, time on site, and general location.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Google Tag Manager</h3>
            <p className="mb-4">
              We use Google Tag Manager to manage the tracking tools on our website. Google Tag Manager itself does not collect personal data. It helps us organize and deploy the tracking codes we use, such as Google Analytics and Meta Pixel.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Meta Pixel</h3>
            <p className="mb-4">
              We use Meta Pixel on our website to understand how visitors interact with our site after seeing our ads on Facebook or Instagram. This helps us measure the performance of our advertising campaigns and show more relevant ads. Meta Pixel may collect information such as pages visited and actions taken on our site.
            </p>
            <p>
              You can learn more about how Meta uses this information by visiting Meta's own privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to your inquiries and requests</li>
              <li>Provide quotes and proposals for our services</li>
              <li>Improve our website and services</li>
              <li>Measure the performance of our advertising campaigns</li>
              <li>Send updates or marketing communications, where you have agreed to receive them</li>
              <li>Understand how visitors use our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Data Sharing Practices</h2>
            <p className="mb-4 font-bold text-white">We do not sell your personal information.</p>
            <p className="mb-2">We may share information with trusted third-party service providers who help us operate our business, such as:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Google (for analytics and advertising)</li>
              <li>Meta (for advertising)</li>
              <li>Email and communication tools</li>
              <li>Customer relationship management (CRM) tools</li>
            </ul>
            <p className="mb-4">
              These providers only receive the information needed to perform their services and are expected to handle it responsibly.
            </p>
            <p>We may also share information if required by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Data Security</h2>
            <p>
              We take reasonable steps to protect the information we collect. However, no method of transmission over the internet or electronic storage is completely secure. While we work to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Your Rights</h2>
            <p className="mb-2">Depending on your location, you may have rights regarding your personal information, such as the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Ask what information we hold about you</li>
              <li>Request corrections to your information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p>To exercise these rights, please contact us using the details below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Children's Privacy</h2>
            <p>
              Our website and services are intended for business owners and professionals. We do not knowingly collect personal information from children under 18. If you believe a child has provided us with personal information, please contact us so we can remove it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites or use third-party tools, such as Google and Meta. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies separately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will update the "Last Updated" date at the top of this page when changes are made.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-10">Contact Us</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy or how we handle your information, please contact us:</p>
            <ul className="space-y-2">
              <li><strong className="text-white">Email:</strong> beyondbusinessofc@gmail.com</li>
              <li><strong className="text-white">Phone:</strong> +91 9989134262</li>
              <li><strong className="text-white">Address:</strong> Madhapur, Hyderabad, Telangana, India</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
