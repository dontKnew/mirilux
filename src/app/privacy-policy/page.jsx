import Main from "@/components/layout/Main";
import TitleHeading from "@/components/ui/TitleHeading";
import BrandName from "@/components/ui/BrandName";
import Container from "@/components/layout/Container";
import Title from "@/components/ui/Title";

export default function Page() {
  return (
    <Main>
      <TitleHeading
        title="Privacy Policy"
        description="Your privacy is important to us. Please read this policy carefully."
      />

      <Container className="space-y-6">

        <p>
          At <BrandName />, we respect your privacy and are committed to
          protecting your personal information. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your data when you visit
          or make a purchase from our website.
        </p>

        {/* Information We Collect */}
        <div>
          <Title
            mt="6"
            title="Information We Collect"
            description="Details we collect to provide and improve our services."
          />
          <ul className="list-disc pl-5 space-y-2">
            <li>Name, email address, phone number, and shipping address</li>
            <li>Order details and purchase history</li>
            <li>
              Payment information (securely processed via third-party payment
              gateways)
            </li>
            <li>Device, browser, and usage data for analytics</li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div>
          <Title
            mt="6"
            title="How We Use Your Information"
            description="Your information is used only for legitimate business purposes."
          />
          <ul className="list-disc pl-5 space-y-2">
            <li>To process and deliver your orders</li>
            <li>To communicate order updates and customer support responses</li>
            <li>To improve our products, services, and website experience</li>
            <li>To send promotional communications (only if you opt in)</li>
          </ul>
        </div>

        {/* Data Security */}
        <div>
          <Title
            mt="6"
            title="Data Security"
            description="Measures we take to protect your personal information."
          />
          <p>
            <BrandName /> follows industry-standard security practices to protect
            your personal data. However, no method of transmission over the
            internet or electronic storage is completely secure, and we cannot
            guarantee absolute security.
          </p>
        </div>

        {/* Sharing of Information */}
        <div>
          <Title
            mt="6"
            title="Sharing of Information"
            description="When and how your data may be shared."
          />
          <p>
            We do not sell or rent your personal information. Your data may be
            shared only with trusted third-party service providers for payment
            processing, shipping, analytics, or legal compliance.
          </p>
        </div>

        {/* Cookies */}
        <div>
          <Title
            mt="6"
            title="Cookies"
            description="How cookies help improve your browsing experience."
          />
          <p>
            Our website uses cookies to enhance user experience, analyze site
            traffic, and personalize content. You can choose to disable cookies
            through your browser settings.
          </p>
        </div>

        {/* Changes to Policy */}
        <div>
          <Title
            mt="6"
            title="Changes to This Policy"
            description="Updates and modifications to our privacy practices."
          />
          <p>
            <BrandName /> reserves the right to update or modify this Privacy
            Policy at any time. Changes will be effective immediately upon
            posting on this page.
          </p>
        </div>

        {/* Contact */}
        <div>
          <Title
            mt="6"
            title="Contact Us"
            description="Reach out to us for privacy-related questions or concerns."
          />
          <p>
            If you have any questions regarding this Privacy Policy or how your
            information is handled, please contact our customer support team at{" "}
            <BrandName />.
          </p>
        </div>

        {/* Closing */}
        <p className="pt-4 text-gray-600">
          By using our website, you agree to the terms outlined in this Privacy
          Policy.
        </p>

      </Container>
    </Main>
  );
}
