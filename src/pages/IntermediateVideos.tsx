import React from "react";
import VideoPlayer from "../components/home/VideoPlayer";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const intermediateCourses = [
  {
    title: "Intermediate - Pembuka",
    videos: [
      {
        title: "Pembuka 1",
        url: "https://www.youtube.com/embed/J-IlX3LUaWQ?si=TbmpWvon1HLU6DsQ",
      },
      {
        title: "Pembuka 2",
        url: "https://www.youtube.com/embed/P8jS_7oprik?si=IXzsYsmFq-_33m8u",
      },
      {
        title: "Pembuka 3",
        url: "https://www.youtube.com/embed/2oehZPReeZA?si=kYA24DUlQbq_a0jT",
      },
      {
        title: "Pembuka 4",
        url: "https://www.youtube.com/embed/6P4cqloreuI?si=WA-rPKXn_K80bI1B",
      },
    ],
  },
];

const IntermediateVideos: React.FC = () => {
  const { user, paid, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-4">Login Diperlukan</h2>
          <p className="mb-6">Silakan login untuk mengakses materi Intermediate.</p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
            onClick={() => navigate("/login")}
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
          <p className="mb-6">Anda harus menjadi member berbayar untuk mengakses materi Intermediate.</p>
          <button
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600"
            onClick={() => navigate("/pricing")}
          >
            Lihat Paket Premium
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Materi Intermediate
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {intermediateCourses.map(course => (
          <section
            key={course.title}
            className="bg-white rounded-xl shadow p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              {course.title}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {course.videos.map(video => (
                <div key={video.url}>
                  <VideoPlayer url={video.url} title={video.title} />
                  <p className="mt-2 text-base font-medium text-gray-600 text-center">
                    {video.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default IntermediateVideos;
