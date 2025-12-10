import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  title,
  description,
  buttonText = "Enquire Now",
  buttonHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="cta-bg py-24 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-8">{description}</p>
        <Link
          href={buttonHref}
          className="inline-block bg-white text-[#0a192f] px-8 py-4 rounded-lg font-semibold no-underline hover:bg-gray-100 hover:-translate-y-0.5 transition-all"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
