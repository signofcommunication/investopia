import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk membuat dokumen user di Firestore jika belum ada
  const createUserIfNotExist = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        paid: false, // default
      });
      console.log("User baru dibuat di Firestore dengan paid=false");
    }
  };

  // Fungsi login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Cek dan buat dokumen user jika belum ada
      await createUserIfNotExist(userCredential.user);
      navigate("/courses");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Fungsi register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Selalu buat dokumen user baru saat register
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        paid: false,
      });
      navigate("/courses");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        {isRegister ? "Register" : "Login"}
      </h2>
      <form
        onSubmit={isRegister ? handleRegister : handleLogin}
        className="flex flex-col gap-2 w-80"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {isRegister ? "Register" : "Login"}
        </button>
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Sudah punya akun? Login"
            : "Belum punya akun? Register"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
