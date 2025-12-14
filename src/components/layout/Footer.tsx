import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#subjects", label: "Subjects" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a192f] text-white py-16 pb-8 text-[0.95rem]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="flex items-center gap-4 no-underline mb-4"
            >
              <Image
                src="/logo.jpg"
                alt="ULP Academy Logo"
                width={60}
                height={60}
                className="w-[60px] h-[60px] object-cover rounded-full flex-shrink-0"
              />
              <h3 className="font-[family-name:var(--font-poppins)] text-2xl text-[#fca311] m-0">
                ULP Academy
              </h3>
            </Link>
            <p className="opacity-80 leading-relaxed mt-4 max-w-[300px]">
              Learn by the unique way of Teaching. Empowering students to
              achieve excellence.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-[#fca311] font-[family-name:var(--font-poppins)] text-xl mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-10 after:h-0.5 after:bg-[#fca311]">
              Quick Links
            </h3>
            <ul className="list-none p-0 m-0">
              {quickLinks.map((link) => (
                <li key={link.href} className="mb-3">
                  <Link
                    href={link.href}
                    className="text-white/80 no-underline hover:text-[#fca311] hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-[#fca311] font-[family-name:var(--font-poppins)] text-xl mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-10 after:h-0.5 after:bg-[#fca311]">
              Contact Us
            </h3>
            <ul className="list-none p-0 m-0">
              {/* Address */}
              <li className="flex items-start gap-4 mb-5 opacity-90 justify-center md:justify-start">
                <svg
                  className="w-5 h-5 text-[#fca311] mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  A-589, Block A, Palam Vihar,
                  <br />
                  Gurgaon, Haryana 122017
                  <br />
                  India
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-4 mb-5 opacity-90 justify-center md:justify-start">
                <svg
                  className="w-5 h-5 text-[#fca311] mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:8447448370"
                    className="text-white no-underline hover:text-[#fca311] transition-colors"
                  >
                    8447448370
                  </a>
                  <a
                    href="tel:9988993348"
                    className="text-white no-underline hover:text-[#fca311] transition-colors"
                  >
                    9988993348
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-4 mb-5 opacity-90 justify-center md:justify-start">
                <svg
                  className="w-5 h-5 text-[#fca311] mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href="mailto:ulpacademy.official@gmail.com"
                  className="text-white no-underline hover:text-[#fca311] transition-colors"
                >
                  ulpacademy.official@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center text-sm opacity-60">
          © 2024 ULP Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
