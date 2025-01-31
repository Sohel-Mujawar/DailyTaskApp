import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, createContext, ReactNode} from 'react';

// Define types for the context values
interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  userid: string | null;
}

// Initialize AuthContext with default values
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedUserid = await AsyncStorage.getItem('userid');
        const storedRole = await AsyncStorage.getItem(' role');
        if (storedUserid) {
          setIsAuthenticated(true);
          setUserid(storedUserid);
          setRole(storedRole);
        }
      } catch (e) {
        console.error('Failed to load auth data:', e);
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, userid, role: null}}>
      {children}
    </AuthContext.Provider>
  );
};
