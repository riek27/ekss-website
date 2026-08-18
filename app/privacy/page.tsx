import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | EmpowerKids–South Sudan',
  description: 'Learn how EmpowerKids–South Sudan collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-deep-forest mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">1. Introduction</h2>
              <p>
                EmpowerKids–South Sudan ("we," "us," or "our") respects your privacy and is committed to protecting your personal information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">2. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> name, email address, phone number, organization, and any other details you provide through contact or get‑involved forms.</li>
                <li><strong>Usage Data:</strong> information about how you access and use the website, such as IP address, browser type, pages visited, and time spent.</li>
                <li><strong>Cookies:</strong> we may use cookies to enhance your browsing experience.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Respond to inquiries and provide requested information.</li>
                <li>Process donations and issue receipts where applicable.</li>
                <li>Send updates, newsletters, or other communications you have consented to receive.</li>
                <li>Improve our website, programmes, and services.</li>
                <li>Maintain organisational records and comply with legal obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">4. Sharing of Information</h2>
              <p>
                We do not sell, rent, or trade your personal information. We may share limited information with trusted third parties who assist us in operating our website or conducting our work,
                provided they agree to keep the information confidential. We may also disclose information when required by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">5. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal information against accidental loss, unauthorised access, alteration, or disclosure.
                However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">6. Your Rights</h2>
              <p>
                You have the right to request access to the personal information we hold about you, to correct inaccuracies, and to request deletion of your data, subject to any legal or contractual obligations.
                To exercise any of these rights, please contact us at the details below.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those sites.
                We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The latest version will always be posted on this page, and the date at the top will indicate when it was last revised.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
                <br />
                <strong>Email:</strong> info@ekss.org<br />
                <strong>Phone:</strong> +211 926 133 777<br />
                <strong>Address:</strong> Gudele West, Block 4, Plot 477, Luri Payam, Juba County, Central Equatoria State, South Sudan
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}