import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cookie-policy")({
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f2f2e1] font-sans pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <Link to="/" className="inline-block mb-12 text-sm text-white/50 hover:text-[#c6f208] transition-colors uppercase tracking-widest">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bb-display">Cookie Policy</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-12">
          <div className="text-sm uppercase tracking-[0.2em] text-[#c6f208]">Beyond Business</div>
          <div className="hidden sm:block text-white/30">•</div>
          <div className="text-xs text-white/50">Last Updated: July - 2026</div>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed text-sm sm:text-base bb-body">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Introduction</h2>
            <p>
              This Cookie Policy explains how Beyond Business uses cookies and similar tracking technologies on our website. It explains what these technologies are, why we use them, and what choices you have.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They help the website remember information about your visit, such as your preferences and actions. Cookies make websites work more smoothly and help us understand how visitors use our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Why We Use Cookies</h2>
            <p className="mb-2">We use cookies to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Understand how visitors use our website</li>
              <li>Measure the performance of our advertising campaigns</li>
              <li>Improve our website based on visitor behavior</li>
              <li>Remember your preferences during your visit</li>
              <li>Show more relevant ads to people who have visited our site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Analytics Cookies</h3>
            <p className="mb-4">
              We use Google Analytics 4 (GA4) to collect information about how visitors use our website. This includes pages visited, time spent on the site, and general location. This helps us understand what's working well and where we can improve.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Advertising Cookies</h3>
            <p className="mb-4">
              We use Meta Pixel to track how visitors interact with our website after clicking on our Facebook or Instagram ads. This helps us measure the effectiveness of our campaigns and show more relevant ads to people who may be interested in our services.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Functional Cookies</h3>
            <p className="mb-4">
              These cookies help our website remember choices you make, such as form entries or site preferences, so your experience is smoother during your visit.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Performance Cookies</h3>
            <p className="mb-4">
              These cookies help us understand how our website is performing, including page load times and any technical issues visitors may experience.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Third-Party Cookies</h3>
            <p>
              Some cookies on our website are set by third-party services we use, such as Google and Meta. These companies may use cookies to collect information about your visits to our website and other websites. We do not control how these third parties use their cookies. We recommend reviewing their privacy policies for more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">How We Use Google Tag Manager</h2>
            <p>
              We use Google Tag Manager to manage and organize the tracking tools on our website, including Google Analytics and Meta Pixel. Google Tag Manager itself does not set cookies or collect personal data. It simply helps us deploy our tracking tools efficiently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Managing Your Cookie Preferences</h2>
            <p className="mb-4">You have control over whether cookies are placed on your device.</p>
            
            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Browser Settings</h3>
            <p className="mb-2">Most web browsers allow you to manage cookies through their settings. You can usually:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>View the cookies stored on your device</li>
              <li>Delete existing cookies</li>
              <li>Block cookies from being set in the future</li>
              <li>Set your browser to notify you when a cookie is being placed</li>
            </ul>
            <p className="mb-4 text-white/50 text-xs italic">
              Please note that blocking some types of cookies may affect how our website functions and may limit your experience on our site.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Opting Out of Advertising Cookies</h3>
            <p className="mb-2">You can manage your ad preferences directly through:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><a href="https://adssettings.google.com" className="text-[#c6f208] hover:underline" target="_blank" rel="noreferrer">Google Ads Settings</a></li>
              <li><a href="https://www.facebook.com/adpreferences/ad_settings" className="text-[#c6f208] hover:underline" target="_blank" rel="noreferrer">Meta Ad Preferences</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in the tools we use or for legal reasons. We will update the "Last Updated" date at the top of this page when changes are made.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-10">Contact Us</h2>
            <p className="mb-4">If you have any questions about our use of cookies, please contact us:</p>
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
