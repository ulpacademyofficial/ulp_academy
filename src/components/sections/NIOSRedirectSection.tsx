import Link from "next/link";
import NextImage from "next/image";
import { CheckCircleIcon, ArrowRightIcon } from "@/icons";

export default function NIOSRedirectSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0a192f] to-[#112240] text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#fca311] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fca311] opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-[#fca311]/20 text-[#fca311] px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-[#fca311]/20">
              अपना साल बचाएं ✨
            </div>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              10वीं/12वीं <span className="text-[#fca311]">(NIOS/Open Board)</span>{" "}से पास करें!
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed">
              अपना साल बर्बाद न होने दें। NIOS (द ओपन स्कूल) में प्रवेश लें और पूर्ण मार्गदर्शन और सहायता के साथ अपनी 10वीं या 12वीं की परीक्षा पास करें। 
              यह सभी सरकारी नौकरियों और उच्च शिक्षा के लिए मान्य है।
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                "Government Recognized Board",
                "Valid for Higher Studies (BA/B.Sc)",
                "Exam Centers Near You",
                "Transfer of Credit Available",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#fca311] flex-shrink-0" />
                  <span className="text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>

            <Link
              href="/nios-open-board"
              className="inline-flex items-center gap-2 bg-[#fca311] text-[#0a192f] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#e5940c] transition-all hover:scale-105 shadow-lg group no-underline"
            >
              Check Fee & Details
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Visual/Image Area */}
          <div className="flex-1 w-full max-w-md lg:max-w-xl flex justify-center md:justify-end">
            <div className="relative w-full aspect-square max-w-[550px]">
              <NextImage
                src="/nios-student.png"
                alt="Student thinking about admission"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
