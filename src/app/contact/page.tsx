import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us - ULP Academy",
  description:
    "Get in touch with ULP Academy. We are here to help you achieve your academic goals. Contact us for admissions and inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title={
          <>
            Get in <span className="text-[#fca311]">Touch</span>
          </>
        }
        description="Have questions? We are here to help you achieve your academic goals."
        showButtons={false}
        variant="page"
      />

      <section className="py-0">
        <div className="flex flex-col lg:flex-row">
          {/* Map */}
          <div className="flex-1 min-h-[400px] lg:min-h-[600px]">
            <iframe
              src="https://maps.google.com/maps?q=28.5060412,77.0352888&z=17&output=embed"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 w-full h-full min-h-[400px] lg:min-h-[600px]"
            />
          </div>

          {/* Form Container */}
          <div className="flex-1 bg-white p-8 lg:p-16 flex flex-col justify-center">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl font-bold text-[#0a192f] mb-4">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </p>
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}
