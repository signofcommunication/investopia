import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GlossarySection from "../components/glossary/GlossarySection";
import CoursePage from "../pages/Courses";
import CourseDetailPage from "../pages/CourseDetail";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/glosarium" element={<GlossarySection />} />
        <Route path="/login" element={<LoginPage />} />
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
