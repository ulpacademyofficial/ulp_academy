import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function CourseCard({
  title,
  description,
  image,
  href,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      <div className="p-8 flex items-center justify-center bg-gray-50">
        <Image
          src={image}
          alt={`${title} Logo`}
          width={200}
          height={100}
          className="h-24 w-auto object-contain"
        />
      </div>
      <div className="p-8">
        <h3 className="font-[family-name:var(--font-poppins)] text-xl font-semibold text-[#0a192f] mb-4">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link
          href={href}
          className="inline-block bg-[#fca311] text-[#0a192f] px-6 py-3 rounded-lg font-semibold no-underline hover:bg-[#e5940c] hover:-translate-y-0.5 transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
