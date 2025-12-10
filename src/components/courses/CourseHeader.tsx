import Image from "next/image";

interface CourseHeaderProps {
  logo: string;
  title: string;
  fullName: string;
  category?: string;
}

export default function CourseHeader({
  logo,
  title,
  fullName,
  category = "Open Schooling",
}: CourseHeaderProps) {
  return (
    <section className="bg-[#f3f4f6] py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <Image
            src={logo}
            alt={`${title} Logo`}
            width={120}
            height={120}
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
          <div className="text-center md:text-left">
            <span className="inline-block text-sm text-[#fca311] font-semibold uppercase tracking-wider mb-2">
              {category}
            </span>
            <h1 className="font-[family-name:var(--font-poppins)] text-2xl md:text-4xl font-bold text-[#0a192f] break-words">
              {title} ({fullName})
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-8 mt-8 text-gray-600">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#fca311]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Exam Centre: ULP ACADEMY</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#fca311]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span>Class 10th & 12th</span>
          </div>
        </div>
      </div>
    </section>
  );
}
