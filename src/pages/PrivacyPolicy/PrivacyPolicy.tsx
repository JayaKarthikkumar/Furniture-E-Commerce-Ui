import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HighQualityCard from "../../components/Card/HighQualityCard";

const Banner: React.FC<{ title: string }> = ({ title }) => (
  <div className="relative w-full h-[300px] flex items-center justify-center bg-gray-100 mb-8">
    <h1 className="text-5xl font-bold text-black text-center">{title}</h1>
  </div>
);

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl font-bold text-black mb-4 mt-12">{children}</h2>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{children}</h2>
);

const SubSubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-6">{children}</h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-base text-gray-600 mb-4 leading-relaxed">{children}</p>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="ml-6 mb-4 list-disc">
    {items.map((item, idx) => (
      <li key={idx} className="text-base text-gray-600 mb-2">
        {item}
      </li>
    ))}
  </ul>
);

const ContactBox: React.FC = () => (
  <div className="bg-gray-50 p-6 rounded-lg mt-12 border-l-4 border-[#B88E2F]">
    <p className="text-base text-gray-600 mb-3 font-semibold">Furniro Furniture</p>
    <p className="text-base text-gray-600 mb-2">
      <strong>Email:</strong>{" "}
      <a href="mailto:privacy@furniro.com" className="text-[#B88E2F]">
        privacy@furniro.com
      </a>
    </p>
    <p className="text-base text-gray-600 mb-2">
      <strong>Phone:</strong> +(84) 456-6789
    </p>
    <p className="text-base text-gray-600 mb-4">
      <strong>Address:</strong> 236 5th SE Avenue, New York NY10000, United States
    </p>
    <p className="text-base text-gray-600 mb-0">
      <strong>Data Protection Officer</strong>
      <br />
      <strong>Email:</strong>{" "}
      <a href="mailto:dpo@furniro.com" className="text-[#B88E2F]">
        dpo@furniro.com
      </a>
    </p>
  </div>
);

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Navbar />

      <Banner title="Privacy Policy" />

      <div className="max-w-5xl mx-auto px-6 py-16 bg-white font-sans leading-relaxed">
        <div className="text-sm text-gray-500 mb-8">
          <strong>Effective Date:</strong> January 1, 2024 <br />
          <strong>Last Updated:</strong> January 1, 2024
        </div>

        <Heading>Introduction</Heading>
        <Paragraph>
          Welcome to Furniro Furniture ("we," "our," or "us"). We are committed to protecting your personal information
          and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
          information when you visit our website or make a purchase from us.
        </Paragraph>

        <SubHeading>Information We Collect</SubHeading>
        <SubSubHeading>Personal Information</SubSubHeading>
        <Paragraph>We collect personal information that you voluntarily provide to us when you:</Paragraph>
        <List
          items={[
            "Register on our website",
            "Make a purchase",
            "Subscribe to our newsletter",
            "Contact us for customer support",
            "Participate in surveys or promotions",
          ]}
        />

        <Paragraph>This information may include:</Paragraph>
        <List
          items={[
            "Full name",
            "Email address",
            "Phone number",
            "Shipping and billing address",
            "Payment information",
            "Order history",
          ]}
        />

        <SubSubHeading>Automatic Information</SubSubHeading>
        <Paragraph>
          When you visit our website, we automatically collect certain information about your device, including:
        </Paragraph>
        <List
          items={[
            "IP address",
            "Browser type and version",
            "Operating system",
            "Pages visited and time spent",
            "Referring website addresses",
            "Cookie data",
          ]}
        />

        <SubHeading>How We Use Your Information</SubHeading>
        <Paragraph>We use the information we collect to:</Paragraph>
        <List
          items={[
            "Process and fulfill your orders",
            "Send order confirmations and shipping updates",
            "Provide customer support",
            "Send marketing communications (with your consent)",
            "Improve our website and services",
            "Prevent fraud and ensure security",
            "Comply with legal obligations",
            "Analyze website usage and trends",
          ]}
        />

        <SubHeading>Information Sharing and Disclosure</SubHeading>
        <Paragraph>We do not sell your personal information. We may share your information with:</Paragraph>

        <SubSubHeading>Service Providers</SubSubHeading>
        <Paragraph>We work with third-party companies to:</Paragraph>
        <List items={["Process payments", "Ship products", "Provide analytics", "Send marketing emails", "Host our website"]} />

        <SubSubHeading>Legal Requirements</SubSubHeading>
        <Paragraph>We may disclose your information if required by law or in response to:</Paragraph>
        <List items={["Court orders or subpoenas", "Legal processes", "Government requests", "Protection of our rights or property"]} />

        <SubSubHeading>Business Transfers</SubSubHeading>
        <Paragraph>
          If Furniro is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
        </Paragraph>

        <SubHeading>Cookies and Tracking Technologies</SubHeading>
        <Paragraph>We use cookies and similar tracking technologies to:</Paragraph>
        <List items={["Remember your preferences", "Understand how you use our website", "Improve user experience", "Deliver targeted advertising"]} />

        <Paragraph>
          You can control cookie settings through your browser preferences. Note that disabling cookies may limit website functionality.
        </Paragraph>

        <SubHeading>Data Security</SubHeading>
        <Paragraph>We implement appropriate technical and organizational measures to protect your personal information, including:</Paragraph>
        <List
          items={[
            "Encryption of sensitive data",
            "Secure servers and databases",
            "Regular security assessments",
            "Access controls and authentication",
            "Employee training on data protection",
          ]}
        />

        <Paragraph>However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</Paragraph>

        <SubHeading>Your Privacy Rights</SubHeading>
        <Paragraph>Depending on your location, you may have the following rights:</Paragraph>

        <SubSubHeading>Right to Access</SubSubHeading>
        <Paragraph>Request a copy of the personal information we hold about you.</Paragraph>

        <SubSubHeading>Right to Correction</SubSubHeading>
        <Paragraph>Request correction of inaccurate or incomplete information.</Paragraph>

        <SubSubHeading>Right to Deletion</SubSubHeading>
        <Paragraph>Request deletion of your personal information (subject to legal obligations).</Paragraph>

        <SubSubHeading>Right to Restrict Processing</SubSubHeading>
        <Paragraph>Request that we limit how we use your information.</Paragraph>

        <SubSubHeading>Right to Data Portability</SubSubHeading>
        <Paragraph>Request a copy of your data in a structured, machine-readable format.</Paragraph>

        <SubSubHeading>Right to Object</SubSubHeading>
        <Paragraph>Object to our processing of your personal information.</Paragraph>

        <SubSubHeading>Right to Withdraw Consent</SubSubHeading>
        <Paragraph>Withdraw consent for marketing communications at any time.</Paragraph>

        <Paragraph>
          To exercise these rights, please contact us at{" "}
          <a href="mailto:privacy@furniro.com" className="text-[#B88E2F]">
            privacy@furniro.com
          </a>
          .
        </Paragraph>

        <SubHeading>Contact Us</SubHeading>
        <ContactBox />

        <p className="text-base text-gray-500 mt-12 text-center italic">
          Your privacy matters to us. We are committed to maintaining the trust you place in Furniro Furniture by protecting your personal information.
        </p>
      </div>

      <HighQualityCard />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
