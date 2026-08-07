import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f2f2e1] font-sans pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <Link to="/" className="inline-block mb-12 text-sm text-white/50 hover:text-[#c6f208] transition-colors uppercase tracking-widest">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bb-display">Terms & Conditions</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-12">
          <div className="text-sm uppercase tracking-[0.2em] text-[#c6f208]">Beyond Business</div>
          <div className="hidden sm:block text-white/30">•</div>
          <div className="text-xs text-white/50">Last Updated: July - 2026</div>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed text-sm sm:text-base bb-body">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Introduction</h2>
            <p className="mb-4">
              Welcome to Beyond Business. These Terms & Conditions explain the rules for using our website and working with us. By using our website or services, you agree to these terms.
            </p>
            <p>
              Please read them carefully. If you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Who We Are</h2>
            <p className="mb-4">
              Beyond Business is a performance marketing and business growth agency. We help established business owners generate leads, increase sales, build high-converting websites, create founder-led personal brands, and automate business tasks using AI.
            </p>
            <ul className="space-y-2">
              <li><strong className="text-white">Email:</strong> beyondbusinessofc@gmail.com</li>
              <li><strong className="text-white">Phone:</strong> +91 9989134262</li>
              <li><strong className="text-white">Address:</strong> Madhapur, Hyderabad, Telangana, India</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Website Usage</h2>
            <p className="mb-2">You agree to use our website only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Use our website in a way that could damage, disable, or impair it</li>
              <li>Attempt to gain unauthorized access to our website or systems</li>
              <li>Use automated tools to scrape or extract content from our website</li>
              <li>Submit false or misleading information through our forms</li>
            </ul>
            <p>
              We may restrict or block access to our website for anyone who violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">User Responsibilities</h2>
            <p className="mb-2">When you contact us, submit a form, or work with us, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Provide accurate and truthful information</li>
              <li>Use our website and services for genuine business purposes</li>
              <li>Communicate with us respectfully and professionally</li>
            </ul>
            <p>
              You are responsible for keeping any account or login details we provide to you confidential, where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, graphics, logos, images, and design, is owned by Beyond Business unless otherwise stated. This content is protected by copyright and other intellectual property laws.
            </p>
            <p className="mb-4">
              You may not copy, reproduce, distribute, or use our content without our written permission, except for normal personal browsing of our website.
            </p>
            <p>
              Any strategies, frameworks, systems, or materials we create for you as part of a paid engagement will be governed by the specific terms agreed in your service agreement or proposal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Service Information</h2>
            <p className="mb-4">
              The information on our website about our services is provided for general informational purposes. It is not a guarantee of specific results.
            </p>
            <p>
              Marketing and advertising outcomes depend on many factors outside our control, including market conditions, competition, and platform algorithms. We do not guarantee specific results such as a fixed number of leads, sales, or return on investment, unless explicitly agreed in writing as part of a service agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Quotes and Proposals</h2>
            <p className="mb-2">Any quotes or proposals we provide are:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Valid for the period stated in the proposal, or [Information Needed] if no period is stated</li>
              <li>Based on the information you provide to us at the time</li>
              <li>Subject to change if project scope or requirements change</li>
            </ul>
            <p>
              A formal agreement or proposal will outline the specific scope, deliverables, and terms for any paid engagement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Payments</h2>
            
            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Accepted Payment Methods</h3>
            <p className="mb-4">We accept payments via UPI and card.</p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Confirmation Fee</h3>
            <p className="mb-4">
              To confirm and begin any new engagement, a confirmation fee is required. This fee reserves your project slot and allows us to begin planning and onboarding. The confirmation fee is non-refundable under all circumstances, including if you choose to cancel or discontinue the engagement after paying it.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Deposits</h3>
            <p className="mb-4">
              For most projects, we require an upfront deposit before work begins, with the remaining balance due at agreed milestones or upon completion, as outlined in your specific proposal or service agreement. The exact deposit amount, milestone structure, and payment schedule will be confirmed in writing for each engagement before work starts.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Refunds</h3>
            <p className="mb-4">The confirmation fee is non-refundable under all circumstances.</p>
            <p className="mb-4">
              For ongoing monthly engagements, if Beyond Business fails to deliver the agreed deliverables for a particular month, we will offer a full refund of that specific month's payment. This does not apply to the confirmation fee, and does not entitle you to a refund of payments made for other months where deliverables were completed as agreed.
            </p>

            <h3 className="text-xl font-bold mb-2 text-white bb-display mt-6">Late Fees</h3>
            <p>
              We do not charge late fees on overdue payments. However, we reserve the right to pause work on your project until outstanding payments are received.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Limitation of Liability</h2>
            <p className="mb-2">To the fullest extent permitted by law, Beyond Business is not liable for:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Any indirect, incidental, or consequential damages arising from the use of our website or services</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Delays or failures caused by third-party platforms, such as Google or Meta, including changes to their advertising policies or algorithms</li>
            </ul>
            <p>
              Our total liability for any claim related to our services will not exceed the amount you paid us for the specific service in question, unless otherwise agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">External Links</h2>
            <p>
              Our website may contain links to third-party websites, such as Google, Meta, or client resources. We do not control these websites and are not responsible for their content, policies, or practices. Visiting external links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Changes to Our Services</h2>
            <p>
              We may update, modify, or discontinue any part of our website or services at any time. We will make reasonable efforts to inform clients of any changes that directly affect ongoing service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Changes to These Terms</h2>
            <p>
              We may update these Terms & Conditions from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our website after changes are posted means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-8">Governing Law</h2>
            <p>
              These Terms & Conditions are governed by the laws of India and the State of Telangana. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts located in Telangana, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white bb-display mt-10">Contact Us</h2>
            <p className="mb-4">If you have any questions about these Terms & Conditions, please contact us:</p>
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
