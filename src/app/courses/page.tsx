import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import CourseCard from "@/components/courses/CourseCard";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Courses - ULP Academy",
  description:
    "Explore our wide range of third-party courses and services offered in partnership with top universities and academies.",
};

const courses = [
  {
    title: "BOSSE",
    description:
      "Board Of Open Schooling and Skill Education. Flexible schooling for 10th and 12th.",
    image: "/bosse_logo.png",
    href: "/courses/bosse",
  },
  {
    title: "NIOS",
    description:
      "National Institute of Open Schooling. Recognized open schooling for 10th and 12th.",
    image: "/nios_logo.png",
    href: "/courses/nios",
  },
];

export default function CoursesPage() {
  return (
    <>
      <HeroSection
        title={
          <>
            Explore Our <span className="text-[#fca311]">Courses</span>
          </>
        }
        description="Expand your horizons with our partner courses from renowned open schooling boards."
        showButtons={false}
        variant="page"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-[#0a192f] mb-4">
            Available Courses
          </h2>

          <div className="mb-12">
            <p className="text-gray-600 mb-4">
              ULP Academy is proud to be an authorized exam center for BOSSE and
              NIOS, offering flexible open schooling programs for students in
              10th and 12th grades. These nationally recognized boards provide
              an excellent opportunity for students to complete their education
              with flexibility and quality support.
            </p>
            <p className="text-gray-600">
              Whether you&apos;re looking for skill-based education or a recognized
              alternative to traditional schooling, we&apos;re here to guide you
              every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Guidance?"
        description="Contact us to find the best course for your career path."
      />
    </>
  );
}
