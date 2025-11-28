import { Button } from "@material-tailwind/react";
// Ganti background Unsplash dan tambahkan ilustrasi di kanan
const unsplashBg =
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80";

export default function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${unsplashBg})` }}
    >
      {/* Overlay gelap agar teks lebih kontras */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="container mx-auto px-6 py-20 flex flex-col justify-center relative z-10 min-h-screen">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg max-w-3xl">
          Belajar Investasi Saham Lebih Mudah & Menyenangkan
        </h1>
        <p className="mt-4 text-lg text-blue-100 max-w-xl drop-shadow">
          Akses ratusan soal interaktif, pembahasan lengkap, dan statistik
          perkembangan belajar kamu secara real-time.
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-900 transition-all duration-300 ease-out font-semibold text-lg"
            ripple={true}
            placeholder=" "
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Mulai Belajar
          </Button>
        </div>
      </div>
    </section>
  );
}
