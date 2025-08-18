import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/integrations/firebase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, displayName: string, role: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  isGuest: boolean;
  setGuestMode: (isGuest: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      return { error: null };
    } catch (error: unknown) {
      toast.error((error as Error).message);
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, displayName: string, role: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // You might want to store the displayName and role in your Firestore database
      toast.success('Account created! Please check your email to verify your account.');
      return { error: null };
    } catch (error: unknown) {
      toast.error((error as Error).message);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setIsGuest(false);
      toast.success('Signed out successfully');
      return { error: null };
    } catch (error: unknown) {
      toast.error('Error signing out');
      return { error: error as Error };
    }
  };

  const setGuestMode = (guest: boolean) => {
    setIsGuest(guest);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isGuest,
    setGuestMode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};