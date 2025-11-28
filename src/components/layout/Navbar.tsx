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
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 justify-center w-full">
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
          href="/quiz"
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
          href="/pricing"
          className="flex items-center text-blue-700 hover:text-blue-900 font-semibold transition-colors px-2 py-1 rounded hover:bg-blue-100"
        >
          Pricing
        </a>
      </li>
    </ul>
  );

  // Dropdown user menu (hanya jika login)
  const userMenu = user && (
    <div className="relative group ml-4">
      <button className="flex items-center gap-2 focus:outline-none">
        <img
          src={
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${user.displayName || "User"}`
          }
          alt="profile"
          className="w-9 h-9 rounded-full border-2 border-blue-300 shadow"
        />
        <span className="hidden lg:inline font-semibold text-blue-900 text-sm">
          {user.displayName || "Profil"}
        </span>
        <svg
          className="w-4 h-4 ml-1 text-blue-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-blue-100 py-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all z-50 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
        <a
          href="/dashboard"
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
        >
          <span className="inline-block w-5 text-blue-700 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v6.75M3 13.5l9 6 9-6M3 13.5l9 6 9-6"
              />
            </svg>
          </span>{" "}
          Dashboard
        </a>
        <div className="border-t border-blue-50 my-2" />
        <button
          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-semibold"
          onClick={async () => {
            await auth.signOut();
            navigate("/");
          }}
        >
          <span className="inline-block w-5 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v10.5A2.25 2.25 0 0113.5 21h-3A2.25 2.25 0 018.25 19.5V9m7.5 0H8.25m7.5 0h-7.5"
              />
            </svg>
          </span>{" "}
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar
          className="h-max w-full bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-md border-b border-blue-200"
          placeholder=" "
          onResize={() => {}}
          onResizeCapture={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <div className="flex items-center justify-between text-blue-900">
            <a
              href="/"
              className="mr-4 cursor-pointer py-1.5 font-bold text-2xl text-blue-700 tracking-tight flex items-center gap-2"
            >
              <img
                src="/src/assets/logo-2.png"
                alt="Investopia Logo"
                className="h-44 w-44 object-contain -my-16"
                draggable={false}
                style={{ pointerEvents: "none", userSelect: "none" }}
              />
            </a>
            <div className="mr-4 hidden lg:flex flex-1 justify-center">
              {navList}
            </div>
            {/* User menu jika login, tombol login & register jika tidak */}
            {user ? (
              userMenu
            ) : (
              <div className="hidden lg:flex gap-2 ml-auto">
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-5 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-900 transition-colors"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-5 py-2 rounded shadow-md hover:from-green-600 hover:to-green-900 transition-colors"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
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
              {/* User menu mobile */}
              {user ? (
                <div className="mt-2 px-2">
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 rounded text-blue-700 hover:bg-blue-100 font-semibold"
                  >
                    Dashboard
                  </a>
                  <button
                    className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold px-5 py-2 rounded shadow-md mt-2 hover:from-red-600 hover:to-red-900 transition-colors"
                    onClick={async () => {
                      await auth.signOut();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2 px-2">
                  <button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-5 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-900 transition-colors"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-5 py-2 rounded shadow-md hover:from-green-600 hover:to-green-900 transition-colors"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              )}
            </Collapse>
          </div>
        </Navbar>
      </div>
      <div className="h-20" /> {/* Spacer agar konten tidak tertutup navbar */}
    </div>
  );
}
