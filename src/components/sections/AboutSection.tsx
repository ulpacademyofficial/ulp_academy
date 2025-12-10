import Image from "next/image";

const features = [
  "Expert Faculty for each subject",
  "Personalized Attention",
  "Regular Assessments & Feedback",
  "Proven Track Record of Toppers",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-[#0a192f] mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              At ULP Academy, we believe in nurturing talent through
              personalized attention and innovative teaching methods. Our track
              record of success speaks for itself.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-4 text-lg">
                  <svg
                    className="w-6 h-6 text-[#fca311] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="order-first lg:order-last">
            <Image
              src="/about.png"
              alt="Education Success"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
