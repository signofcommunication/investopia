import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const levels = [
  {
    key: "basic",
    label: "Basic",
    color: "bg-green-100 text-green-800",
    materials: [
      {
        title: "Apa itu pasar modal",
        summary:
          "Pasar modal adalah tempat bertemunya pihak yang membutuhkan dana (emiten/perusahaan) dengan pihak yang memiliki dana lebih (investor). Di sini terjadi jual beli instrumen seperti saham dan obligasi.",
        details: `Pasar modal adalah tempat bertemunya pihak yang membutuhkan dana (emiten/perusahaan) dengan pihak yang memiliki dana lebih (investor). Di sini terjadi jual beli instrumen seperti saham dan obligasi.`,
      },
      {
        title: "Manfaat pasar modal",
        summary:
          "- Sumber pendanaan perusahaan\n- Tempat investasi\n- Membuka lapangan kerja\n- Menjadi sumber pendapatan negara & indikator perekonomian",
        details:
          "Sumber pendanaan perusahaan, tempat investasi, membuka lapangan kerja, menjadi sumber pendapatan negara & indikator perekonomian.",
      },
      {
        title: "Pengawas & pelaku pasar modal",
        summary:
          "Pengawas: OJK, BEI, KPEI, KSEI. Pelaku: Emiten, Investor, Perusahaan Sekuritas.",
        details:
          "Pengawas:\n- OJK\n- BEI\n- KPEI\n- KSEI\nPelaku:\n- Emiten\n- Investor\n- Perusahaan Sekuritas",
      },
      {
        title: "Jenis-jenis pasar dalam pasar modal",
        summary: "Pasar Perdana & Pasar Sekunder.",
        details:
          "- Pasar Perdana → penjualan saham pertama kali sebelum listing. Ciri: harga tetap, beli via broker, potensi oversubscribe, jalur IPO (Book Building → Penawaran → Penjatahan → Distribusi → Listing).\n- Pasar Sekunder → jual beli saham antar-investor. Ciri: harga fluktuatif, dipengaruhi kondisi pasar, transaksi via aplikasi sekuritas, settlement T+2.",
      },
      {
        title: "Instrumen investasi dalam pasar modal",
        summary: "Saham, Obligasi, Reksadana.",
        details:
          "- Saham → tanda kepemilikan\n- Obligasi → surat utang\n- Reksadana → dana kelolaan oleh Manajer Investasi",
      },
    ],
  },
  {
    key: "intermediate",
    label: "Intermediate",
    color: "bg-yellow-100 text-yellow-800",
    materials: [
      {
        title: "Saham (penjelasan tingkat menengah)",
        summary:
          "Hak pemegang saham, keuntungan (dividen + capital gain), dan risiko (tidak dapat dividen, capital loss, risiko likuiditas).",
        details:
          "Hak pemegang saham, keuntungan (dividen + capital gain), dan risiko (tidak dapat dividen, capital loss, risiko likuiditas).",
      },
      {
        title: "Obligasi (penjelasan lengkap)",
        summary:
          "Karakteristik obligasi: kupon, jatuh tempo, nilai nominal, rating. Tipe obligasi berdasarkan penerbit, kupon, rating, jaminan, dan konvertibilitas. Keuntungan: kupon + capital gain. Risiko: capital loss, gagal bayar, likuiditas, kebangkrutan.",
        details:
          "Karakteristik obligasi:\n- Kupon\n- Jatuh tempo\n- Nilai nominal\n- Rating\nTipe obligasi berdasarkan penerbit, kupon, rating, jaminan, dan konvertibilitas.\nKeuntungan: kupon + capital gain.\nRisiko: capital loss, gagal bayar, likuiditas, kebangkrutan.",
      },
      {
        title: "Reksadana (penjelasan tingkat menengah)",
        summary:
          "Keuntungan: diversifikasi, dikelola profesional, potensi return lebih besar, modal kecil, likuid. Risiko: pasar, manajer investasi, perubahan regulasi.",
        details:
          "Keuntungan: diversifikasi, dikelola profesional, potensi return lebih besar, modal kecil, likuid. Risiko: pasar, manajer investasi, perubahan regulasi.",
      },
    ],
  },
  {
    key: "advanced",
    label: "Advanced",
    color: "bg-red-100 text-red-800",
    materials: [
      {
        title: "Saham — Analisis Lanjutan",
        summary:
          "Analisis teknikal: membaca grafik, pola, volume. Analisis fundamental: ekonomi, industri, laporan keuangan, prospek usaha.",
        details:
          "- Analisis teknikal: membaca grafik, pola, volume\n- Analisis fundamental: ekonomi, industri, laporan keuangan, prospek usaha",
      },
      {
        title: "Obligasi — Analisis Lanjutan",
        summary:
          "Analisis risiko kredit, yield, tenor, risiko suku bunga, likuiditas, covenant.",
        details:
          "1. Analisis risiko kredit\n2. Analisis yield (YTM vs inflasi vs BI Rate)\n3. Analisis tenor & sensitivitas suku bunga\n4. Risiko suku bunga\n5. Analisis likuiditas\n6. Analisis covenant (callable, convertible, floating, dll.)",
      },
      {
        title: "Reksadana — Analisis Lanjutan",
        summary:
          "Analisis historis, risiko, manajer investasi, biaya, portofolio, likuiditas & AUM.",
        details:
          "1. Analisis historis (return 1–5 tahun)\n2. Evaluasi risiko dan volatilitas\n3. Evaluasi Manajer Investasi\n4. Analisis biaya-biaya (expense ratio, switching, pembelian, penjualan)\n5. Analisis portofolio (komposisi, sektor, kapitalisasi)\n6. Analisis likuiditas & AUM",
      },
    ],
  },
];

const LearningMaterials: React.FC = () => {
  const { user, paid, loading } = useAuth();
  const [activeLevel, setActiveLevel] = useState("basic");
  const [expanded, setExpanded] = useState<{ [key: string]: number | null }>({
    basic: null,
    intermediate: null,
    advanced: null,
  });

  const handleExpand = (levelKey: string, idx: number) => {
    setExpanded(prev => ({
      ...prev,
      [levelKey]: prev[levelKey] === idx ? null : idx,
    }));
  };

  const currentLevel = levels.find(l => l.key === activeLevel)!;

  // Proteksi Intermediate & Advanced
  if ((activeLevel === "intermediate" || activeLevel === "advanced")) {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <span>Loading...</span>
        </div>
      );
    }
    if (!user) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold mb-4">Login Diperlukan</h2>
            <p className="mb-6">Silakan login untuk mengakses materi {currentLevel.label}.</p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
              onClick={() => window.location.href = "/login"}
            >
              Login
            </button>
          </div>
        </div>
      );
    }
    if (!paid) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold mb-4">Akses Premium</h2>
            <p className="mb-6">Anda harus menjadi member berbayar untuk mengakses materi {currentLevel.label}.</p>
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600"
              onClick={() => window.location.href = "/pricing"}
            >
              Lihat Paket Premium
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-2">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900">
          Materi Pembelajaran
        </h1>
        {/* Tabs */}
        <div className="flex space-x-2 bg-white rounded-lg p-1 shadow mb-8">
          {levels.map(level => (
            <button
              key={level.key}
              className={`w-full py-2.5 text-sm font-semibold rounded-lg focus:outline-none transition ${
                activeLevel === level.key
                  ? `${level.color} shadow`
                  : "text-blue-700 hover:bg-blue-100"
              }`}
              onClick={() => setActiveLevel(level.key)}
            >
              {level.label}
            </button>
          ))}
        </div>
        {/* Materials List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className={`text-xl font-bold mb-4 ${currentLevel.color}`}>
            Level {currentLevel.label}
          </h2>
          <ul className="divide-y divide-blue-50">
            {currentLevel.materials.map((mat, idx) => (
              <li key={mat.title} className="py-4">
                <button
                  className="flex items-center justify-between w-full text-left focus:outline-none"
                  onClick={() => handleExpand(currentLevel.key, idx)}
                >
                  <span className="font-semibold text-blue-900 text-base">
                    {idx + 1}. {mat.title}
                  </span>
                  <span className="ml-2">
                    {expanded[currentLevel.key] === idx ? (
                      <ChevronUpIcon className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-blue-600" />
                    )}
                  </span>
                </button>
                <div className="mt-2 text-gray-700 whitespace-pre-line text-sm">
                  {mat.summary}
                </div>
                {expanded[currentLevel.key] === idx && (
                  <div className="mt-3 p-4 bg-blue-50 rounded-xl text-gray-800 whitespace-pre-line text-sm border border-blue-100">
                    {mat.details}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LearningMaterials;
