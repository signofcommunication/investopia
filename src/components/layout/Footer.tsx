import React from "react";
import logo from "../../assets/react.svg"; // Ganti logo ketika sudah ada
import { FaInstagram, FaDiscord, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white pt-14 pb-8 border-t border-blue-800/40">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* LOGO & BRAND */}
          <div className="flex flex-col items-start">
            <img
              src={logo}
              alt="Investopia Logo"
              className="w-12 h-12 mb-4 rounded-lg shadow-md bg-white p-1"
            />
            <h3 className="font-bold text-xl tracking-wide mb-2">Investopia</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Platform edukasi investasi modern untuk membantu Anda belajar dari
              basic hingga advanced secara terstruktur.
            </p>
          </div>

          {/* MENU */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="/materi"
                  className="hover:text-blue-400 transition-colors"
                >
                  Materi
                </a>
              </li>
              <li>
                <a
                  href="/kuis"
                  className="hover:text-blue-400 transition-colors"
                >
                  Kuis
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="hover:text-blue-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL MEDIA */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Social Media</h3>
            <div className="flex gap-4 mt-2">
              {/* Reusable style */}
              {[
                {
                  icon: <FaInstagram />,
                  color: "hover:text-pink-400 hover:bg-pink-400/10",
                },
                {
                  icon: <FaDiscord />,
                  color: "hover:text-indigo-400 hover:bg-indigo-400/10",
                },
                {
                  icon: <FaYoutube />,
                  color: "hover:text-red-500 hover:bg-red-500/10",
                },
                {
                  icon: <FaLinkedin />,
                  color: "hover:text-blue-400 hover:bg-blue-400/10",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className={`text-2xl p-3 bg-white/10 rounded-full transition-all duration-300 
                  backdrop-blur-sm ${item.color} hover:scale-110 shadow-md`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-blue-800/30 my-10"></div>

        {/* COPYRIGHT */}
        <p className="text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Investopia — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
