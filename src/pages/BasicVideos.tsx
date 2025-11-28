import React from "react";
import VideoPlayer from "../components/home/VideoPlayer";

const basicCourses = [
  {
    title: "Basic - Apa itu Pasar Modal?",
    videos: [
      {
        title: "Apa itu Pasar Modal? 1",
        url: "https://www.youtube.com/embed/8Sa8Hz5UzII?si=Newz5y6Eb2hO9EEM",
      },
      {
        title: "Apa itu Pasar Modal? 2",
        url: "https://www.youtube.com/embed/ofgsGb4ET0Y?si=BodPkl5dVOajerRm",
      },
    ],
  },
  {
    title: "Basic - Manfaat Pasar Modal",
    videos: [
      {
        title: "Manfaat Pasar Modal 1",
        url: "https://www.youtube.com/embed/fJLX5xCllk0?si=eXjqgLMnJBkGLkQG",
      },
      {
        title: "Manfaat Pasar Modal 2",
        url: "https://www.youtube.com/embed/dtdrbgTJxUc?si=6a8GjdQa-lmw9b6x",
      },
      {
        title: "Manfaat Pasar Modal 3",
        url: "https://www.youtube.com/embed/MXaN1_fgLsg?si=z15scafw33mnZOxl",
      },
      {
        title: "Manfaat Pasar Modal 4",
        url: "https://www.youtube.com/embed/jU3qEb0Yg_o?si=BNS7exAzHzhMWO2Q",
      },
      {
        title: "Manfaat Pasar Modal 5",
        url: "https://www.youtube.com/embed/n59zvc4G59E?si=SjcfFQX-mhd2FrW7",
      },
    ],
  },
  {
    title: "Basic - Pengawas dan pelaku Pasar Modal",
    videos: [
      {
        title: "Pengawas dan Pelaku Pasar Modal 1",
        url: "https://www.youtube.com/embed/aSRfA0S5NfE?si=impAE7VEhIHrww0s",
      },
      {
        title: "Pengawas dan Pelaku Pasar Modal 2",
        url: "https://www.youtube.com/embed/ou3RxBAdr9A?si=_wawTb0cTdzNWC7R",
      },
      {
        title: "Pengawas dan Pelaku Pasar Modal 3",
        url: "https://www.youtube.com/embed/e6gCYa9dULM?si=VJgU5Ou90RMJavMR",
      },
    ],
  },
  {
    title: "Basic - Jenis Jenis Pasar Dalam Pasar Modal",
    videos: [
      {
        title: "Jenis Jenis Pasar Dalam Pasar Modal 1",
        url: "https://www.youtube.com/embed/2qnAQ98Pscg?si=Funnfcf_fmzNwI8N",
      },
      {
        title: "Jenis Jenis Pasar Dalam Pasar Modal 2",
        url: "https://www.youtube.com/embed/2qnAQ98Pscg?si=Funnfcf_fmzNwI8N",
      },
      {
        title: "Jenis Jenis Pasar Dalam Pasar Modal 3",
        url: "https://www.youtube.com/embed/gj_DsRiBIpI?si=Qz1ozZx0fZbcAtCf",
      },
    ],
  },
  {
    title: "Basic - Jenis Jenis Instrumen Keuangan",
    videos: [
      {
        title: "Jenis Jenis Instrumen Keuangan 1",
        url: "https://www.youtube.com/embed/yuE8EN19uOc?si=v-xgPYGKgM1X4rht",
      },
      {
        title: "Jenis Jenis Instrumen Keuangan 2",
        url: "https://www.youtube.com/embed/syvcFI9xQok?si=9Jq93kQzKfvjbPjm",
      },
      {
        title: "Jenis Jenis Instrumen Keuangan 3",
        url: "https://www.youtube.com/embed/ixLCectaW6w?si=c6IRJxqZXzzs6tmg",
      },
      {
        title: "Jenis Jenis Instrumen Keuangan 4",
        url: "https://www.youtube.com/embed/NK_c8AzcnFw?si=NV_chQwD5qedXsFm",
      },
    ],
  },
];

const BasicVideos: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Materi Basic
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {basicCourses.map((course) => (
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

export default BasicVideos;
