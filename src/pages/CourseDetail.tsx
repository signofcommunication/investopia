import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import ModuleDetail from "../components/home/ModuleDetail";
import type { Course, Module } from "./Courses";

// Mock data (bisa diimpor dari Courses.tsx jika ingin DRY)
const courses: Course[] = [
  {
    id: 1,
    title: "Dasar Investasi Saham",
    level: "Pemula",
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    summary: "Pelajari dasar-dasar investasi saham untuk pemula.",
    modules: [
      {
        id: 1,
        title: "Pengenalan Saham",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        transcript: "transcript-1.pdf",
        summary: "Apa itu saham dan bagaimana cara kerjanya?",
        subtitle: "Dasar Saham",
        completed: true,
      },
      {
        id: 2,
        title: "Cara Membeli Saham",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        transcript: "transcript-2.pdf",
        summary: "Langkah-langkah membeli saham di bursa.",
        subtitle: "Praktik Membeli Saham",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Analisis Teknikal",
    level: "Menengah",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    summary: "Belajar analisis teknikal untuk memilih saham.",
    modules: [
      {
        id: 1,
        title: "Dasar Analisis Teknikal",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        transcript: "transcript-3.pdf",
        summary: "Konsep dasar analisis teknikal.",
        subtitle: "Teori Dasar",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Manajemen Risiko",
    level: "Mahir",
    thumbnail:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    summary: "Strategi manajemen risiko dalam investasi.",
    modules: [
      {
        id: 1,
        title: "Mengelola Risiko",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        transcript: "transcript-4.pdf",
        summary: "Cara mengelola risiko investasi.",
        subtitle: "Strategi Risiko",
        completed: false,
      },
    ],
  },
];

const levelColor: Record<Course["level"], string> = {
  Pemula: "bg-green-100 text-green-800",
  Menengah: "bg-yellow-100 text-yellow-800",
  Mahir: "bg-red-100 text-red-800",
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = useMemo(() => courses.find(c => c.id === Number(id)), [id]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(
    course ? course.modules[0] : null
  );

  if (!course) {
    return (
      <div className="p-8 text-center text-gray-500">
        Kursus tidak ditemukan.
        <button
          className="ml-4 text-blue-600 underline"
          onClick={() => navigate(-1)}
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-50">
      <button
        className="mb-4 text-blue-600 hover:underline text-sm"
        onClick={() => navigate(-1)}
      >
        ← Kembali ke Daftar Kursus
      </button>
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
        <span
          className={`w-fit px-2 py-0.5 rounded text-xs font-bold ${
            levelColor[course.level]
          }`}
        >
          {course.level[0]}
        </span>
        <p className="text-gray-600 text-sm mt-1">{course.summary}</p>
      </div>
      {/* Video & Detail */}
      {selectedModule && (
        <ModuleDetail module={selectedModule} level={course.level} />
      )}
      {/* Module List */}
      <div className="mt-6">
        <h5 className="font-semibold mb-2">Daftar Modul</h5>
        <ul className="space-y-2">
          {course.modules.map(module => (
            <li
              key={module.id}
              className={`p-2 rounded cursor-pointer flex items-center gap-2 ${
                selectedModule && selectedModule.id === module.id
                  ? "bg-blue-100 font-bold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedModule(module)}
            >
              <span>{module.title}</span>
              {module.completed && (
                <span className="ml-2 text-green-500 text-xs">Selesai</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
