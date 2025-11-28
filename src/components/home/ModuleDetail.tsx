import React from "react";

import type { Module } from "../../pages/Courses";

interface ModuleDetailProps {
  module: Module;
  moduleList: Module[];
  activeModuleId?: number;
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({
  module,
  moduleList,
  activeModuleId,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Left: Video & Ringkasan */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow p-6 mb-4 md:mb-0">
        <h3 className="font-bold text-lg mb-4 text-gray-900">
          Video Pembelajaran
        </h3>
        <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-gray-200 bg-black flex items-center justify-center">
          <video
            src={module.videoUrl}
            controls
            title={module.title}
            className="w-full h-full"
          />
        </div>
        <h4 className="font-semibold text-gray-800 mb-2">Ringkasan Video</h4>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
          {module.summary}
        </p>
        <div className="mt-2">
          <span className="text-xs text-blue-700 font-semibold bg-blue-50 rounded px-2 py-1">
            {module.subtitle}
          </span>
        </div>
      </div>
      {/* Right: Daftar Video Modul */}
      <div className="w-full md:w-80 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 shadow p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-900">
            Daftar Video Modul
          </h3>
          <ul className="flex flex-col gap-2">
            {Array.isArray(moduleList) && moduleList.length > 0 ? (
              moduleList.map(item => (
                <li key={item.id}>
                  <div
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-150 text-sm font-medium shadow-sm ${
                      item.id === (activeModuleId ?? module.id)
                        ? "border-blue-500 bg-blue-50 text-blue-900"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                          item.id === (activeModuleId ?? module.id)
                            ? "border-blue-500 bg-blue-100 text-blue-700"
                            : "border-gray-300 bg-white text-gray-400"
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <circle cx="10" cy="10" r="6" />
                        </svg>
                      </span>
                      <span>{item.title}</span>
                    </div>
                    {item.completed && (
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                        75% Selesai
                      </span>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-400 text-sm px-2 py-4 text-center">
                Belum ada daftar video.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
