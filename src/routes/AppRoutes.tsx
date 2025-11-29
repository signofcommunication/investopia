import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GlossarySection from "../components/glossary/GlossarySection";
import CoursePage from "../pages/Courses";
import CourseDetailPage from "../pages/CourseDetail";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import QuizPage from "../pages/QuizPage";
import Dashboard from "../pages/Dashboard";
import PricingPage from "../pages/PricingPage";
import RegisterPage from "../pages/RegisterPage";
import BasicVideos from "../pages/BasicVideos";
import IntermediateVideos from "../pages/IntermediateVideos";
import AdvancedVideos from "../pages/AdvancedVideos";
import LearningMaterials from "../pages/LearningMaterials";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/glosarium" element={<GlossarySection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Course Beginner bebas akses */}
        <Route path="/courses/beginner" element={<CoursePage />} />
        {/* Proteksi Intermediate & Advanced dengan PrivateRoute (harus login & paid) */}
        <Route element={<PrivateRoute requiredPaid={true} />}>
          <Route path="/courses/intermediate" element={<CoursePage />} />
          <Route path="/courses/advanced" element={<CoursePage />} />
        </Route>
        {/* Route lain tetap */}
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/basic-videos" element={<BasicVideos />} />
        <Route path="/intermediate-videos" element={<IntermediateVideos />} />
        <Route path="/advanced-videos" element={<AdvancedVideos />} />
        <Route path="/learning-materials" element={<LearningMaterials />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
