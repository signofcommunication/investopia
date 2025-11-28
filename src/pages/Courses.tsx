import { useState } from "react";
import BasicVideos from "./BasicVideos";
import IntermediateVideos from "./IntermediateVideos";
import AdvancedVideos from "./AdvancedVideos";

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

const tabList = [
  { name: 'Basic', value: 'Pemula' },
  { name: 'Intermediate', value: 'Menengah' },
  { name: 'Advanced', value: 'Mahir' },
];

export default function CoursePage() {
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<'Pemula' | 'Menengah' | 'Mahir'>('Pemula');

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto w-full mb-6">
        <div className="flex space-x-2 bg-white rounded-lg p-1 shadow">
          {tabList.map(tab => (
            <button
              key={tab.value}
              className={`w-full py-2.5 text-sm font-semibold rounded-lg focus:outline-none transition ${activeTab === tab.value ? "bg-blue-600 text-white" : "text-blue-700 hover:bg-blue-100"}`}
              onClick={() => setActiveTab(tab.value as 'Pemula' | 'Menengah' | 'Mahir')}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
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
      {/* Render komponen video sesuai tab */}
      {activeTab === 'Pemula' && <BasicVideos />}
      {activeTab === 'Menengah' && <IntermediateVideos />}
      {activeTab === 'Mahir' && <AdvancedVideos />}
    </div>
  );
}
