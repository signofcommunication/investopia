// QuizPage.tsx
// Halaman kuis dengan integrasi Firestore, UI modern, dan mock data
import React, { useEffect, useState } from "react";
import { Card, Button, Progress, Typography } from "@material-tailwind/react";
import { RadioGroup } from "@headlessui/react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

// Dummy quizId
const quizId = "basic-finance-quiz-001";

// Mock data kuis (5 soal)
const quizQuestions = [
  {
    question: "Apa itu investasi?",
    options: [
      "Menyimpan uang di bawah bantal",
      "Menanamkan modal untuk mendapatkan keuntungan",
      "Membelanjakan seluruh pendapatan",
      "Menghindari risiko apapun",
    ],
    answer: 1,
  },
  {
    question: "Instrumen investasi berikut yang paling rendah risiko adalah?",
    options: [
      "Saham",
      "Obligasi korporasi",
      "Deposito bank",
      "Reksa dana saham",
    ],
    answer: 2,
  },
  {
    question: "Apa tujuan utama diversifikasi portofolio?",
    options: [
      "Memaksimalkan risiko",
      "Mengurangi risiko",
      "Mengurangi jumlah aset",
      "Meningkatkan pajak",
    ],
    answer: 1,
  },
  {
    question: "Apa yang dimaksud dengan return investasi?",
    options: [
      "Jumlah modal awal",
      "Keuntungan atau kerugian dari investasi",
      "Risiko investasi",
      "Jangka waktu investasi",
    ],
    answer: 1,
  },
  {
    question: "Manakah yang termasuk aset likuid?",
    options: [
      "Properti",
      "Tabungan bank",
      "Emas batangan",
      "Kendaraan bermotor",
    ],
    answer: 1,
  },
];

// Type untuk progress
interface QuizProgress {
  quizId: string;
  currentQuestionIndex: number;
  selectedAnswers: number[];
  completed: boolean;
  score: number;
}

// Firestore helpers
async function loadProgress(userId: string): Promise<QuizProgress | null> {
  const ref = doc(db, "quizProgress", userId);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as QuizProgress;
  return null;
}

async function saveProgress(userId: string, data: QuizProgress) {
  const ref = doc(db, "quizProgress", userId);
  await setDoc(ref, data, { merge: true });
}

async function saveFinalScore(userId: string, score: number) {
  const ref = doc(db, "dashboard", userId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const d = snap.data();
    await updateDoc(ref, {
      completedQuizzes: (d.completedQuizzes || 0) + 1,
      totalQuizzes: (d.totalQuizzes || 0) + 1,
      quizScores: arrayUnion(score),
    });
  } else {
    await setDoc(ref, {
      completedQuizzes: 1,
      totalQuizzes: 1,
      quizScores: [score],
    });
  }
}

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || "guest";
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Load progress on mount
  useEffect(() => {
    let ignore = false;
    async function fetchProgress() {
      setLoading(true);
      const progress = await loadProgress(userId);
      if (!ignore) {
        if (progress && progress.quizId === quizId && !progress.completed) {
          setCurrentQuestion(progress.currentQuestionIndex || 0);
          setSelectedAnswers(progress.selectedAnswers || []);
        }
        setCompleted(progress?.completed || false);
        setScore(progress?.score || 0);
        setLoading(false);
      }
    }
    fetchProgress();
    return () => {
      ignore = true;
    };
  }, [userId]);

  // Save progress on answer change
  useEffect(() => {
    if (!loading && !completed) {
      saveProgress(userId, {
        quizId,
        currentQuestionIndex: currentQuestion,
        selectedAnswers,
        completed: false,
        score: 0,
      });
    }
  }, [currentQuestion, selectedAnswers]);

  const handleSelect = (idx: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = idx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(q => q + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(q => q - 1);
    }
  };

  const handleSubmit = async () => {
    let sc = 0;
    quizQuestions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) sc++;
    });
    setScore(sc);
    setCompleted(true);
    await saveProgress(userId, {
      quizId,
      currentQuestionIndex: quizQuestions.length,
      selectedAnswers,
      completed: true,
      score: sc,
    });
    await saveFinalScore(userId, sc);
  };

  const progressPercent = Math.round(
    ((currentQuestion + (completed ? 1 : 0)) / quizQuestions.length) * 100
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-6">
        {/* @ts-expect-error type workaround for MaterialTailwind */}
        <Card className="p-8 w-full max-w-md text-center">
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Typography variant="h5" color="red">
            Anda harus login untuk mengakses kuis.
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

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-6">
        {/* @ts-expect-error type workaround for MaterialTailwind */}
        <Card className="p-8 w-full max-w-md text-center">
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Typography variant="h4" color="green">
            Skor Anda: {score} / {quizQuestions.length}
          </Typography>
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Typography className="mt-2">
            Persentase: {Math.round((score / quizQuestions.length) * 100)}%
          </Typography>
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Button
            color="blue"
            className="mt-6"
            onClick={() => (window.location.href = "/")}
          >
            Kembali ke Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const q = quizQuestions[currentQuestion];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-xl">
        {/* @ts-expect-error type workaround for MaterialTailwind */}
        <Progress value={progressPercent} color="blue" className="mb-6" />
        {/* @ts-expect-error type workaround for MaterialTailwind */}
        <Card className="p-6 shadow-lg">
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Typography variant="h5" className="mb-4">
            Soal {currentQuestion + 1} dari {quizQuestions.length}
          </Typography>
          {/* @ts-expect-error type workaround for MaterialTailwind */}
          <Typography className="mb-6 text-lg font-medium">
            {q.question}
          </Typography>
          <RadioGroup
            value={selectedAnswers[currentQuestion]}
            onChange={(val: number) => handleSelect(val)}
          >
            <div className="grid gap-4 mb-6">
              {q.options.map((opt, idx) => (
                <RadioGroup.Option key={idx} value={idx}>
                  {({ checked }: { checked: boolean }) => (
                    <div
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-150 ${
                        checked
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 mr-3 rounded-full border-2 flex items-center justify-center ${
                          checked
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {checked && (
                          <span className="w-2 h-2 bg-white rounded-full block" />
                        )}
                      </span>
                      <span className="text-base">{opt}</span>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <div className="flex justify-between">
            {/* @ts-expect-error type workaround for MaterialTailwind */}
            <Button
              color="gray"
              variant="outlined"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion < quizQuestions.length - 1 ? (
              // @ts-expect-error type workaround for MaterialTailwind
              <Button
                color="blue"
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Next
              </Button>
            ) : (
              // @ts-expect-error type workaround for MaterialTailwind
              <Button
                color="green"
                onClick={handleSubmit}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Submit
              </Button>
            )}
          </div>
        </Card>
        <div className="mt-4 text-center text-gray-500">
          Progress: {progressPercent}%
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
