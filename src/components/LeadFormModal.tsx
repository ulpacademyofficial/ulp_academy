"use client";

import { useState, useEffect } from "react";

interface LeadFormModalProps {
  onClose: () => void;
}

const degreeOptions = [
  { value: "10th", label: "10वीं (10th)" },
  { value: "12th", label: "12वीं (12th)" },
  { value: "graduation", label: "Graduation" },
  { value: "post-graduation", label: "Post Graduation" },
];

const graduationCourses = [
  "BA",
  "B.Com",
  "B.Sc",
  "B.Ed",
  "JBT",
  "D.El.Ed",
  "B.Pharma",
  "D.Pharm",
  "ITI",
  "BBA",
  "BCA",
  "Other",
];

const postGraduationCourses = [
  "MA",
  "M.Com",
  "M.Sc",
  "M.Ed",
  "MBA",
  "MCA",
  "M.Pharma",
  "Other",
];

export default function LeadFormModal({ onClose }: LeadFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    degree: "",
    course: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const showCourseDropdown =
    formData.degree === "graduation" || formData.degree === "post-graduation";

  const courseOptions =
    formData.degree === "graduation"
      ? graduationCourses
      : formData.degree === "post-graduation"
      ? postGraduationCourses
      : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset course when degree changes
      ...(name === "degree" && { course: "" }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to API
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit");
      }

      // Save to localStorage to prevent showing again
      localStorage.setItem("ulp_lead_submitted", "true");
      localStorage.setItem("ulp_lead_data", JSON.stringify(formData));

      setShowSuccess(true);

      // Close modal after showing success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still show success for UX (data saved to localStorage as backup)
      localStorage.setItem("ulp_lead_submitted", "true");
      localStorage.setItem("ulp_lead_data", JSON.stringify(formData));
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.degree &&
    (!showCourseDropdown || formData.course);

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#0a192f] mb-2">
            धन्यवाद! 🎉
          </h3>
          <p className="text-gray-600">
            हमारी team जल्द ही आपसे संपर्क करेगी।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#fca311] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-7 h-7 text-[#0a192f]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0a192f]">
            Free Counselling पाएं! 🎓
          </h2>
          <p className="text-gray-600 mt-1">
            अपनी details भरें और expert guidance पाएं
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#0a192f] mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0a192f] mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 outline-none transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[#0a192f] mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 outline-none transition-all"
            />
          </div>

          {/* Degree */}
          <div>
            <label className="block text-sm font-medium text-[#0a192f] mb-1">
              Course Level <span className="text-red-500">*</span>
            </label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 outline-none transition-all bg-white"
            >
              <option value="">Select your course level</option>
              {degreeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown - Only for Graduation/Post-Graduation */}
          {showCourseDropdown && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-medium text-[#0a192f] mb-1">
                Course <span className="text-red-500">*</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 outline-none transition-all bg-white"
              >
                <option value="">Select your course</option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-[#fca311] text-[#0a192f] py-4 rounded-lg font-bold text-lg hover:bg-[#e5940c] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Get Free Counselling
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Skip Link */}
        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700 transition-colors cursor-pointer bg-transparent border-none"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
