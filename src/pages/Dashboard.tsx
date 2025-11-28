import React, { useEffect, useState } from "react";
import { Card, Typography, Progress, Button } from "@material-tailwind/react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

interface DashboardData {
  completedQuizzes: number;
  totalQuizzes: number;
  quizScores: number[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid;
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const fetchData = async () => {
      const ref = doc(db, "dashboard", userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setData(snap.data() as DashboardData);
      } else {
        setData({ completedQuizzes: 0, totalQuizzes: 0, quizScores: [] });
      }
      setLoading(false);
    };
    fetchData();
  }, [userId]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-6">
        {/* @ts-expect-error type workaround for MaterialTailwind */}
        <Card className="p-8 w-full max-w-md text-center">
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Typography variant="h5" color="red">
            Anda harus login untuk melihat dashboard.
          </Typography>
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Button
            color="blue"
            className="mt-6"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span>Loading...</span>
      </div>
    );
  }

  const percent =
    data && data.totalQuizzes > 0
      ? Math.round((data.completedQuizzes / data.totalQuizzes) * 100)
      : 0;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-2">
      <div className="w-full max-w-2xl">
        {/* @ts-expect-error type workaround for MaterialTailwind */}
        <Card className="p-8 shadow-2xl rounded-3xl border border-blue-100">
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Typography
            variant="h3"
            className="mb-2 font-bold text-blue-700 text-center"
            color="blue"
          >
            Dashboard Kuis
          </Typography>
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Typography className="mb-8 text-lg text-center text-gray-600">
            Selamat datang di dashboard progres kuis Anda!
          </Typography>
          <div className="flex flex-col md:flex-row gap-8 mb-8 justify-center items-center">
            <div className="flex-1 bg-blue-50 rounded-xl p-6 flex flex-col items-center shadow">
              {/* @ts-expect-error type workaround for MaterialTailwind */}
              <Typography className="text-2xl font-bold text-blue-700 mb-1">
                {data?.completedQuizzes ?? 0}
              </Typography>
              {/* @ts-expect-error type workaround for MaterialTailwind */}
              <Typography className="text-gray-600">Kuis Selesai</Typography>
            </div>
            <div className="flex-1 bg-green-50 rounded-xl p-6 flex flex-col items-center shadow">
              {/* @ts-expect-error type workaround for MaterialTailwind */}
              <Typography className="text-2xl font-bold text-green-700 mb-1">
                {data?.totalQuizzes ?? 0}
              </Typography>
              {/* @ts-expect-error type workaround for MaterialTailwind */}
              <Typography className="text-gray-600">Total Kuis</Typography>
            </div>
            <div className="flex-1 bg-yellow-50 rounded-xl p-6 flex flex-col items-center shadow">
              {/* @ts-expect-error type workaround for MaterialTailwind */}
              <Typography className="text-2xl font-bold text-yellow-700 mb-1">
                {percent}%
              </Typography>
              {/* @ts-expect-error type workaround for MaterialTailwind */}
              <Typography className="text-gray-600">Progress</Typography>
            </div>
          </div>
          <div className="mb-8">
            {/* @ts-expect-error type workaround for MaterialTailwind */}
            <Typography className="mb-2 font-semibold text-blue-700">
              Progress Kuis
            </Typography>
            {/* @ts-expect-error type workaround for MaterialTailwind */}
            <Progress
              value={percent}
              color="green"
              className="h-4 rounded-full"
            />
            <div className="text-center text-gray-600 mt-1 text-sm">
              {percent}% dari semua kuis telah diselesaikan
            </div>
          </div>
          <div className="mb-2">
            {/* @ts-expect-error type workaround for MaterialTailwind */}
            <Typography className="mb-2 font-semibold text-blue-700">
              Riwayat Skor Kuis
            </Typography>
            {data?.quizScores && data.quizScores.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.quizScores.map((score, idx) => (
                  <li
                    key={idx}
                    className="bg-white border border-blue-100 rounded-lg px-4 py-3 flex items-center justify-between shadow-sm"
                  >
                    <span className="font-medium text-gray-700">
                      Kuis #{idx + 1}
                    </span>
                    <span className="font-bold text-blue-600 text-lg">
                      {score}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              // @ts-expect-error type workaround for MaterialTailwind
              <Typography className="text-gray-500 text-center">
                Belum ada skor kuis.
              </Typography>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
