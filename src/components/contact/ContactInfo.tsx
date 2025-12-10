export default function ContactInfo() {
  return (
    <div className="space-y-4 mt-10">
      {/* Address */}
      <div className="flex items-start gap-6 p-6 bg-[#f3f4f6] rounded-2xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all border border-transparent hover:border-[#fca311]/20">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#fca311] shadow-sm flex-shrink-0">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <span className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
            Visit Us
          </span>
          <p className="text-[#0a192f] mt-1">
            A-589, Block A, Palam Vihar,
            <br />
            Gurgaon, Haryana 122017
            <br />
            India
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="flex items-start gap-6 p-6 bg-[#f3f4f6] rounded-2xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all border border-transparent hover:border-[#fca311]/20">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#fca311] shadow-sm flex-shrink-0">
            <svg
              className="w-6 h-6 scale-x-[-1]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div>
            <span className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
              Call Us
            </span>
            <div className="flex flex-col gap-1 mt-1">
              <a
                href="tel:8447448370"
                className="text-[#0a192f] no-underline hover:text-[#fca311] transition-colors"
              >
                8447448370
              </a>
              <a
                href="tel:9988993348"
                className="text-[#0a192f] no-underline hover:text-[#fca311] transition-colors"
              >
                9988993348
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-6 p-6 bg-[#f3f4f6] rounded-2xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all border border-transparent hover:border-[#fca311]/20">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#fca311] shadow-sm flex-shrink-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div>
            <span className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
              Email Us
            </span>
            <a
              href="mailto:ulpacademy.official@gmail.com"
              className="block text-[#0a192f] no-underline hover:text-[#fca311] transition-colors mt-1"
            >
              ulpacademy.official@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
