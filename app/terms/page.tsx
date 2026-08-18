import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | EmpowerKids–South Sudan',
  description: 'Read the terms and conditions for using the EmpowerKids–South Sudan website and services.',
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-deep-forest mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the EmpowerKids–South Sudan website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                If you do not agree, please do not use the website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">2. Use of Website</h2>
              <p>
                You may use this website for lawful purposes only. You agree not to misuse, interfere with, or attempt to gain unauthorised access to any part of the site,
                its servers, or any connected networks.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">3. Intellectual Property</h2>
              <p>
                All content on this website—including text, graphics, logos, images, and documents—is the property of EmpowerKids–South Sudan or its content suppliers
                and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">4. Donations</h2>
              <p>
                Donations made through this website are voluntary and non‑refundable, except as required by law.
                EmpowerKids–South Sudan uses donations in accordance with its charitable purposes and organisational policies.
                Where applicable, we may issue receipts or acknowledgements for tax purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">5. Disclaimer of Warranties</h2>
              <p>
                This website and its content are provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the accuracy,
                reliability, or availability of the site or its content.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, EmpowerKids–South Sudan shall not be liable for any indirect, incidental, special, or consequential damages
                arising from your use of, or inability to use, this website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">7. External Links</h2>
              <p>
                This website may contain links to external sites that are not operated by us. We have no control over their content or practices and accept no responsibility for them.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">8. Changes to These Terms</h2>
              <p>
                We may revise these Terms of Service at any time. Your continued use of the website after any changes indicates your acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">9. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of South Sudan, without regard to conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-deep-forest mb-3">10. Contact Us</h2>
              <p>
                For questions regarding these Terms of Service, please contact:
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