import { Metadata } from "next";
import CourseHeader from "@/components/courses/CourseHeader";
import FeeTable from "@/components/courses/FeeTable";
import CourseSidebar from "@/components/courses/CourseSidebar";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "NIOS - National Institute of Open Schooling - ULP Academy",
  description:
    "Enroll in NIOS (National Institute of Open Schooling) with ULP Academy. Check fee structure for 10th and 12th classes.",
};

const fees = [
  { stream: "10th", fee: "₹40,000" },
  { stream: "12th Arts", fee: "₹44,765" },
  { stream: "12th Commerce", fee: "₹49,845" },
  { stream: "12th PCM (Physics, Chemistry, Mathematics)", fee: "₹50,076" },
  { stream: "12th PCB (Physics, Chemistry, Biology)", fee: "₹51,000" },
];

const highlights = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    text: "Government Recognized",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    ),
    text: "Flexible Education",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    text: "Local Exam Centre",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    ),
    text: "Valid for Higher Studies",
  },
];

export default function NIOSPage() {
  return (
    <>
      <CourseHeader
        logo="/nios_logo.png"
        title="NIOS"
        fullName="National Institute of Open Schooling"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0a192f] mb-4">
                About NIOS
              </h2>
              <p className="text-gray-600 mb-8">
                The National Institute of Open Schooling (NIOS) is an autonomous
                institution under the Ministry of Education, Government of
                India. It offers academic as well as vocational courses for
                students who wish to complete their education through open and
                distance learning.
              </p>

              <h3 className="font-[family-name:var(--font-poppins)] text-xl font-semibold text-[#0a192f] mb-4">
                Fee Structure
              </h3>
              <FeeTable fees={fees} />
              <p className="text-sm text-gray-500 mt-2">
                * Note: The second PCM listed in your request was assumed to be
                PCB based on typical stream options, or it could be a variation.
                Please confirm if needed.
              </p>

              <h3 className="font-[family-name:var(--font-poppins)] text-xl font-semibold text-[#0a192f] mt-8 mb-4">
                Exam Centre Details
              </h3>
              <div className="bg-[#f3f4f6] p-6 rounded-lg border-l-4 border-[#fca311]">
                <h4 className="font-semibold text-[#0a192f] mb-2">
                  ULP ACADEMY
                </h4>
                <p className="text-gray-600 flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[#fca311] mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  A-589, Block A, Palam Vihar, Gurgaon, Haryana 122017
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <CourseSidebar
              logo="/nios_logo.png"
              logoAlt="NIOS Logo"
              highlights={highlights}
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Enroll?"
        description="Start your journey with NIOS and ULP Academy today."
        buttonText="Contact Us"
      />
    </>
  );
}
