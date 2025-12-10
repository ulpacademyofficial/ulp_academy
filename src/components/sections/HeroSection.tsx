import Link from "next/link";

interface HeroSectionProps {
  title: React.ReactNode;
  description: string;
  subtitle?: string;
  showButtons?: boolean;
  variant?: "default" | "page";
}

export default function HeroSection({
  title,
  description,
  subtitle,
  showButtons = true,
  variant = "default",
}: HeroSectionProps) {
  const isDefault = variant === "default";

  return (
    <section
      className={`${
        isDefault ? "min-h-[90vh]" : "min-h-[50vh]"
      } hero-bg flex items-center justify-center text-center text-white pt-20`}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {subtitle && (
          <span className="block text-lg md:text-xl text-[#fca311] mb-4 uppercase tracking-widest font-semibold">
            {subtitle}
          </span>
        )}
        <h1 className="font-[family-name:var(--font-poppins)] text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-[#e5e5e5] mb-10 max-w-2xl mx-auto">
          {description}
        </p>
        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#fca311] text-[#0a192f] px-8 py-4 rounded-lg font-semibold no-underline hover:bg-[#e5940c] hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Admission Open
            </Link>
            <Link
              href="/courses"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold no-underline hover:bg-white hover:text-[#0a192f] transition-all"
            >
              View Courses
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
