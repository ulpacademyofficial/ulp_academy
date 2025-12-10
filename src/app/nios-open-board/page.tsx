"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LeadFormWrapper from "@/components/LeadFormWrapper";
import LeadFormModal from "@/components/LeadFormModal";

const degreeCourses = [
  "BA",
  "B.Com",
  "B.Sc",
  "B.Ed",
  "JBT",
  "D.El.Ed",
  "MA",
  "M.Com",
  "M.Sc",
  "B.Pharma",
  "D.Pharm",
  "ITI",
];

const universities = [
  "Gurgaon University",
  "MDU",
  "Subharti",
  "Maharaja Agrasen",
  "Kalinga University",
  "Mangalayatan University",
];

const benefits = [
  "Direct university support & seat confirmation",
  "Personalised counselling & course selection",
  "100% genuine admission process",
  "Affordable fee structure",
];

export default function NIOSOpenBoardPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <>
      {/* Lead Form Modal for First-Time Visitors */}
      <LeadFormWrapper />
      
      {/* Manual Contact Form Modal */}
      {showContactForm && (
        <LeadFormModal onClose={() => setShowContactForm(false)} />
      )}
      {/* Hero Section */}
      <section className="min-h-[85vh] bg-gradient-to-br from-[#f8f9fa] via-[#e8f4fc] to-[#fef9e7] flex items-center py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a192f] mb-4 leading-tight">
                <span className="text-[#2980b9]">10वीं/12वीं</span>{" "}
                <span className="text-[#e67e22]">(NIOS/ Open Board)</span>{" "}
                <span className="text-[#0a192f]">से पास करे</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#0a192f] font-medium mb-8">
                Full guidance and Full Support
              </p>

              {/* Degree Courses Box */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border-l-4 border-[#e74c3c]">
                <h3 className="text-[#e74c3c] font-semibold text-lg mb-3">
                  Admission consultant for
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {degreeCourses.map((course, index) => (
                    <span
                      key={index}
                      className="bg-[#f8f9fa] text-[#0a192f] px-3 py-1 rounded-full text-sm font-medium border border-gray-200"
                    >
                      {course}
                    </span>
                  ))}
                </div>
                <p className="text-[#27ae60] font-semibold">
                  All Degree Courses available ✓
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-3 mb-8">
                {benefits.slice(0, 2).map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#0a192f]">
                    <svg
                      className="w-5 h-5 text-[#27ae60] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Content - Image & CTA */}
            <div className="flex flex-col items-center">
              {/* Urgency Bubble */}
              <div className="bg-white rounded-2xl p-6 shadow-xl mb-6 border-2 border-[#2980b9] relative">
                <div className="absolute -top-3 -right-3 bg-[#e74c3c] text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  Limited Seats!
                </div>
                <h3 className="text-[#2980b9] font-bold text-xl mb-2">
                  Jaldi admission chahiye?
                </h3>
                <p className="text-[#e67e22] font-semibold text-lg">
                  Humse poochho 👋
                </p>
              </div>

              {/* Student Image */}
              <div className="relative w-full max-w-xl">
                <Image
                  src="/student_illustration.jpg"
                  alt="Student studying"
                  width={700}
                  height={560}
                  className="rounded-2xl shadow-lg w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl font-bold text-[#e74c3c] mb-2">
              Direct Admission in Universities
            </h2>
            <p className="text-gray-600">Top universities में guaranteed admission</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {universities.map((university, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#f8f9fa] to-white p-4 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-center justify-center min-h-[80px]"
              >
                <span className="font-semibold text-[#0a192f] text-sm md:text-base">
                  {university}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0a192f] to-[#14213d]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Text */}
            <div className="text-center lg:text-left">
              <h2 className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl font-bold text-white mb-4">
                Abhi Call Karein! 📞
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Apne career ka सही decision लें। हमारे experts से बात करें।
              </p>

              {/* Benefits List */}
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <svg
                      className="w-5 h-5 text-[#fca311] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Contact Box */}
            <div className="bg-[#fca311] rounded-2xl p-8 text-center shadow-2xl">
              {/* Phone */}
              <Link
                href="tel:8447448370"
                className="flex items-center justify-center gap-3 text-[#0a192f] mb-6 hover:scale-105 transition-transform"
              >
                <div className="bg-white p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-[#27ae60]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-3xl md:text-4xl font-bold">8447448370</span>
              </Link>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                {/* WhatsApp Button */}
                <Link
                  href="https://wa.me/918447448370?text=Hi%2C%20I%20want%20to%20know%20about%20NIOS%2FOpen%20Board%20admission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#128C7E] transition-colors shadow-lg no-underline"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp करें
                </Link>

                {/* Contact Us / Enquire Button */}
                <button
                  onClick={() => setShowContactForm(true)}
                  className="inline-flex items-center gap-2 bg-[#2980b9] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1a5276] transition-colors shadow-lg border-0 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Contact Us
                </button>
              </div>

              {/* Address */}
              <div className="flex items-start justify-center gap-2 text-[#0a192f]">
                <svg
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  Sector 2, Palam Vihar, Gurugram, Haryana - 122017
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-[#0a192f]">
              <svg className="w-8 h-8 text-[#27ae60]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Government Recognized</span>
            </div>
            <div className="flex items-center gap-2 text-[#0a192f]">
              <svg className="w-8 h-8 text-[#2980b9]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="font-semibold">Valid for Higher Studies</span>
            </div>
            <div className="flex items-center gap-2 text-[#0a192f]">
              <svg className="w-8 h-8 text-[#e67e22]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Local Exam Centre</span>
            </div>
            <div className="flex items-center gap-2 text-[#0a192f]">
              <svg className="w-8 h-8 text-[#9b59b6]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">10+ Years Experience</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
