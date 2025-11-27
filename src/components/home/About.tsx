const AboutInvestopia = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-8 text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Apa itu <span className="text-blue-600">Investopia?</span>
        </h2>

        {/* Accent Line */}
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>

        {/* Description */}
        <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed text-lg">
          Investopia adalah platform edukasi investasi yang menyediakan
          perjalanan belajar terstruktur mulai dari level
          <span className="font-semibold text-gray-800"> Basic</span>,
          <span className="font-semibold text-gray-800"> Intermediate</span>,
          hingga
          <span className="font-semibold text-gray-800"> Advanced</span>.
          Dirancang untuk membantu kamu memahami investasi dari dasar hingga
          mahir melalui materi interaktif, simulasi, dan analisis nyata.
        </p>
      </div>
    </section>
  );
};

export default AboutInvestopia;
