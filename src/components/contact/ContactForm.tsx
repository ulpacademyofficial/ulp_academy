"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your interest! We will contact you soon.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium text-[#0a192f]">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          required
          className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-[#0a192f] focus:ring-2 focus:ring-[#0a192f]/10 transition-all"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-[#0a192f]">
          Email Id
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-[#0a192f] focus:ring-2 focus:ring-[#0a192f]/10 transition-all"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-[#0a192f]">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          required
          className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-[#0a192f] focus:ring-2 focus:ring-[#0a192f]/10 transition-all"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-[#0a192f]">Class</label>
        <select
          className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-[#0a192f] focus:ring-2 focus:ring-[#0a192f]/10 transition-all bg-white"
          defaultValue=""
        >
          <option value="" disabled>
            Select Class
          </option>
          <option value="10">Class 10th</option>
          <option value="12">Class 12th</option>
          <option value="none">None</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-[#0a192f]">Message</label>
        <textarea
          placeholder="Enter your message"
          rows={4}
          required
          className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-[#0a192f] focus:ring-2 focus:ring-[#0a192f]/10 transition-all resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#fca311] text-[#0a192f] px-8 py-4 rounded-lg font-semibold hover:bg-[#e5940c] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
