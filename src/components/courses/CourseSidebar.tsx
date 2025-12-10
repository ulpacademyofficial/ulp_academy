import Image from "next/image";
import Link from "next/link";

interface CourseSidebarProps {
  logo: string;
  logoAlt: string;
  highlights: { icon: React.ReactNode; text: string }[];
}

export default function CourseSidebar({
  logo,
  logoAlt,
  highlights,
}: CourseSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Logo Card */}
      <div className="bg-white p-8 rounded-xl shadow-md sticky top-24">
        <div className="flex justify-center mb-8">
          <Image
            src={logo}
            alt={logoAlt}
            width={150}
            height={150}
            className="w-32 h-auto object-contain"
          />
        </div>

        {/* Highlights */}
        <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[#0a192f] mb-4">
          Key Highlights
        </h3>
        <ul className="space-y-3 mb-8">
          {highlights.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-700">
              <span className="text-[#fca311] flex-shrink-0">{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="block w-full bg-[#fca311] text-[#0a192f] text-center px-6 py-4 rounded-lg font-semibold no-underline hover:bg-[#e5940c] transition-all"
        >
          Enquire Now
        </Link>
      </div>
    </div>
  );
}
