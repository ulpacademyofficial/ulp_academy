"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What subjects do you offer tuition for?",
    answer:
      "We provide comprehensive coaching for Class 10th and 12th students in Mathematics, Science, English, and Commerce. Our expert faculty focuses on concept clarity, problem-solving techniques, and exam preparation.",
  },
  {
    question: "What are BOSSE and NIOS courses?",
    answer:
      "BOSSE (Board of Open Schooling and Skill Education) and NIOS (National Institute of Open Schooling) are nationally recognized open schooling boards that offer flexible education programs for 10th and 12th classes. ULP Academy serves as an authorized exam center for both boards.",
  },
  {
    question: "Do you offer both online and offline classes?",
    answer:
      "Yes, we offer both offline and online modes of learning to suit your needs. You can choose the mode that works best for you, ensuring flexibility and accessibility in your learning journey.",
  },
  {
    question: "How can I enroll at ULP Academy?",
    answer:
      'Enrollment is easy! Click the "Admission Open" button on our homepage, fill out the contact form, or call us directly at 8447448370 or 9988993348. Our team will guide you through the admission process and help you choose the right program.',
  },
  {
    question: "Where is ULP Academy located?",
    answer:
      "We are located at A-589, Block A, Palam Vihar, Gurgaon, Haryana 122017, India. Our center is easily accessible and serves as an authorized exam center for BOSSE and NIOS.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="cta-bg py-20 relative">
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md transition-all ${
                activeIndex === index ? "shadow-lg" : ""
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer bg-transparent border-none"
              >
                <span className="font-[family-name:var(--font-poppins)] text-[#0a192f] font-medium pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[#0a192f] flex-shrink-0 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="px-6 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
