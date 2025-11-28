import React from "react";
import PricingCard from "../components/PricingCard";

const packages = [
  {
    title: "FREE",
    price: "Rp0",
    benefits: [
      "Akses materi basic level",
      "Tidak termasuk latihan / kuis",
      "Tidak ada konsultasi",
    ],
    cta: "Mulai Gratis",
  },
  {
    title: "PREMIUM",
    price: "Rp30.000",
    originalPrice: "Rp50.000",
    benefits: [
      "Full akses materi semua level",
      "Akses latihan, kuis, dan progress tracking",
      "Sertifikat penyelesaian",
    ],
    cta: "Upgrade Sekarang",
    highlight: true,
    badge: "Best Value",
  },
  {
    title: "ULTIMATE",
    price: "Rp100.000",
    benefits: [
      "Semua yang ada di paket Premium",
      "Konsultasi saham 1-on-1",
      "Ujian terjadwal",
      "Akses komunitas private",
    ],
    cta: "Pilih Paket Ini",
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Pilih Paket Belajar Kamu
        </h1>
        <p className="text-lg text-gray-600">
          Upgrade untuk membuka semua materi, latihan, dan fitur lengkap.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {packages.map(pkg => (
          <PricingCard key={pkg.title} {...pkg} />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
