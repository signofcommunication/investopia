import { useNavigate } from "react-router-dom";
import CourseCard from "../components/home/CourseCard";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

// Tipe data untuk modul dan kursus
export interface Module {
  id: number;
  title: string;
  videoUrl: string;
  transcript: string;
  summary: string;
  subtitle: string;
  completed: boolean;
}

export interface Course {
  id: number;
  title: string;
  level: "Pemula" | "Menengah" | "Mahir";
  thumbnail: string;
  summary: string;
  modules: Module[];
}

// Mock data for courses
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

export default function CoursePage() {
  const navigate = useNavigate();
  const { user, paid, loading } = useAuth();
  const [error, setError] = useState("");

  const handleCardClick = (course: Course) => {
    // Jika course Menengah/Mahir, cek login & paid
    if (course.level === "Menengah" || course.level === "Mahir") {
      if (loading) return;
      if (!user) {
        setError("Silakan login untuk mengakses course ini.");
        return;
      }
      if (!paid) {
        setError(
          "Anda harus menjadi member berbayar untuk mengakses course ini."
        );
        return;
      }
    }
    // Jika lolos, redirect ke detail
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-gray-50">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
          {error}
          <button
            className="ml-4 text-blue-600 underline"
            onClick={() => setError("")}
          >
            Tutup
          </button>
        </div>
      )}
      {/* Course List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 w-full">
        {courses.map(course => (
          <div key={course.id} className="relative">
            {/* Badge Premium */}
            {(course.level === "Menengah" || course.level === "Mahir") && (
              <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded shadow">
                Premium
              </span>
            )}
            <CourseCard
              course={course}
              levelColor={levelColor}
              onClick={handleCardClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
