import React from "react";
import { useParams } from "react-router-dom";

const CoursePage: React.FC = () => {
  const { level } = useParams<{ level: string }>();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Course: {level}</h1>
      <p>
        Ini adalah halaman course untuk level <b>{level}</b>.
      </p>
    </div>
  );
};

export default CoursePage;
