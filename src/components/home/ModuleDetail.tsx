import React from "react";

import type { Module } from "../../pages/Courses";

interface ModuleDetailProps {
  module: Module;
}

const levelShort: Record<string, string> = {
  Pemula: "P",
  Menengah: "M",
  Mahir: "H",
};

const levelColor: Record<string, string> = {
  Pemula: "bg-green-100 text-green-700 border-green-300",
  Menengah: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Mahir: "bg-red-100 text-red-700 border-red-300",
};

const ModuleDetail: React.FC<ModuleDetailProps & { level?: string }> = ({
  module,
  level,
}) => {
  return (
    <div className="mb-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-gray-200">
        <video controls className="w-full h-full object-cover">
          <source src={module.videoUrl} type="video/mp4" />
          Browser tidak mendukung video.
        </video>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-lg text-gray-900 mb-0">
            {module.title}
          </h4>
          {level && (
            <span
              className={`ml-2 px-2 py-0.5 rounded text-xs font-bold border ${levelColor[level]} whitespace-nowrap`}
              title={level}
            >
              {levelShort[level]}
            </span>
          )}
        </div>
        <a
          href={`/${module.transcript}`}
          download
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-medium shadow-sm transition"
        >
          Download Transcript
        </a>
      </div>
      <div className="flex items-center text-xs text-gray-500 mb-2">
        <span>{module.subtitle}</span>
      </div>
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        {module.summary}
      </p>
      {/* Progress Bar (opsional) */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${
            module.completed ? "bg-green-500 w-full" : "bg-gray-400 w-1/3"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ModuleDetail;
