const subjects = [
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" />
      </svg>
    ),
    title: "Mathematics",
    description:
      "Comprehensive coverage of syllabus with focus on problem-solving and concept clarity.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.344c2.672 0 4.011-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Science",
    description:
      "Physics, Chemistry, and Biology taught with practical examples and deep understanding.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    ),
    title: "English",
    description:
      "Enhancing grammar, literature, and writing skills for perfect board scores.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Commerce / Accounts",
    description:
      "Expert guidance for Class 12th Commerce students to master Accountancy.",
  },
];

export default function SubjectsSection() {
  return (
    <section id="subjects" className="py-20 bg-[#f3f4f6]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-[#0a192f] mb-4 text-center">
          Our Subjects
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Specialized coaching for Board Classes
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="w-[70px] h-[70px] bg-[#fca311]/10 text-[#fca311] rounded-full flex items-center justify-center mx-auto mb-6">
                {subject.icon}
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] text-xl font-semibold text-[#0a192f] mb-4">
                {subject.title}
              </h3>
              <p className="text-gray-600">{subject.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
