import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuthProfile } from '@/api';

type AuthContextType = {
  userId: string | null;
  firebaseUid: string | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  firebaseUid: null,
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [firebaseUid, setFirebaseUid] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUid(user.uid);
        setIsAuthenticated(true);
        const userData = await getAuthProfile(user.uid)
        setUserId(userData);
      } else {
        setFirebaseUid(null);
        setUserId(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, firebaseUid, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);