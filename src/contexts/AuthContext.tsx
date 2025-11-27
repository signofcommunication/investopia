import React, { createContext, useContext, useEffect, useState } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Tipe context auth
interface AuthContextType {
  user: User | null;
  paid: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  paid: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Ambil status paid dari Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        setPaid(userDoc.exists() ? userDoc.data().paid : false);
      } else {
        setPaid(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, paid, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
