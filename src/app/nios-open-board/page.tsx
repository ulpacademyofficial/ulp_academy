"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LeadFormWrapper from "@/components/LeadFormWrapper";
import LeadFormModal from "@/components/LeadFormModal";
import {
  CheckCircleIcon,
  CheckIcon,
  PhoneIcon,
  MailIcon,
  LocationIcon,
  WhatsAppIcon,
  BadgeCheckIcon,
  AcademicCapIcon,
  OfficeBuildingIcon,
  InformationCircleIcon,
} from "@/icons";

const degreeCourses = [
  "10th",
  "12th",
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
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
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
                <div className="flex flex-wrap gap-2 mb-3 justify-center lg:justify-start">
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
                    <CheckCircleIcon className="w-5 h-5 text-[#27ae60] flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Check Fee Structure Button */}
              <div className="flex justify-center lg:justify-start">
                <Link
                  href="https://wa.me/918447448370?text=Hi%2C%20I%20want%20to%20know%20about%20the%20fee%20structure%20for%20NIOS%2FOpen%20Board%20admission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fca311] text-[#0a192f] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#e5940c] transition-colors shadow-lg no-underline min-w-[300px] text-center mb-12"
                >
                  Check Fee Structure
                </Link>
              </div>
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
                    <CheckIcon className="w-5 h-5 text-[#fca311] flex-shrink-0" />
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
                  <PhoneIcon className="w-8 h-8 text-[#27ae60]" />
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
                  <WhatsAppIcon className="w-6 h-6" />
                  WhatsApp करें
                </Link>

                {/* Contact Us / Enquire Button */}
                <button
                  onClick={() => setShowContactForm(true)}
                  className="inline-flex items-center gap-2 bg-[#2980b9] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1a5276] transition-colors shadow-lg border-0 cursor-pointer"
                >
                  <MailIcon className="w-6 h-6" />
                  Contact Us
                </button>
              </div>

              {/* Address */}
              <div className="flex items-start justify-center gap-2 text-[#0a192f]">
                <LocationIcon className="w-5 h-5 mt-1 flex-shrink-0" />
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
              <BadgeCheckIcon className="w-8 h-8 text-[#27ae60]" />
              <span className="font-semibold">Government Recognized</span>
            </div>
            <div className="flex items-center gap-2 text-[#0a192f]">
              <AcademicCapIcon className="w-8 h-8 text-[#2980b9]" />
              <span className="font-semibold">Valid for Higher Studies</span>
            </div>
            <div className="flex items-center gap-2 text-[#0a192f]">
              <OfficeBuildingIcon className="w-8 h-8 text-[#e67e22]" />
              <span className="font-semibold">Local Exam Centre</span>
            </div>
            <div className="flex items-center gap-2 text-[#0a192f]">
              <InformationCircleIcon className="w-8 h-8 text-[#9b59b6]" />
              <span className="font-semibold">10+ Years Experience</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
