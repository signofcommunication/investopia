import React from "react";
import { Navbar, Collapse } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";

export default function MainNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <a
          href="/"
          className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-blue-100"
        >
          Beranda
        </a>
      </li>
      <li>
        <a
          href="/courses"
          className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-blue-100"
        >
          Materi
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-blue-100"
        >
          Kuis
        </a>
      </li>
      <li>
        <a
          href="/glosarium"
          className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-blue-100"
        >
          Glosarium
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-blue-100"
        >
          Tentang Kami
        </a>
      </li>
    </ul>
  );

  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar
          placeholder=""
          className="h-max w-full bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-md border-b border-blue-200"
        >
          <div className="flex items-center justify-between text-blue-900">
            <a
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-bold text-2xl text-blue-700 tracking-tight"
            >
              Investopia
            </a>
            <div className="mr-4 hidden lg:block">{navList}</div>
            {user ? (
              <button
                className="hidden lg:inline-block bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold px-5 py-2 rounded shadow-md hover:from-red-600 hover:to-red-900 transition-colors"
                onClick={async () => {
                  await auth.signOut();
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="hidden lg:inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-5 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-900 transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
            <button
              className="lg:hidden text-blue-700 p-2 rounded hover:bg-blue-100 transition-colors"
              onClick={() => setOpenNav(!openNav)}
              aria-label="Toggle navigation"
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </button>
          </div>
          <div className="lg:hidden">
            <Collapse open={openNav}>
              {navList}
              {user ? (
                <button
                  className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold px-5 py-2 rounded shadow-md mt-2 hover:from-red-600 hover:to-red-900 transition-colors"
                  onClick={async () => {
                    await auth.signOut();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-5 py-2 rounded shadow-md mt-2 hover:from-blue-600 hover:to-blue-900 transition-colors"
                  onClick={() => navigate("/login")}
                >
                  Get started
                </button>
              )}
            </Collapse>
          </div>
        </Navbar>
      </div>
      <div className="h-20" /> {/* Spacer agar konten tidak tertutup navbar */}
    </div>
  );
}
