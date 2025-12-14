import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SubjectsSection from "@/components/sections/SubjectsSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import NIOSRedirectSection from "@/components/sections/NIOSRedirectSection";

export default function Home() {
  return (
    <>
      <HeroSection
        subtitle="Welcome to ULP Academy"
        title={
          <>
            Learn by the <span className="text-[#fca311]">Unique Way</span> of
            Teaching
          </>
        }
        description="Empowering students of Class 10th & 12th to achieve excellence in Math, Science, English, and Commerce."
      />
      <AboutSection />
      <NIOSRedirectSection />
      <SubjectsSection />
      <CTASection
        title="Ready to Excel?"
        description="Join the league of achievers today."
      />
      <FAQSection />
    </>
  );
}
