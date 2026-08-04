import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface UserData {
  address?: string;
  email?: string;
  expiration?: string;
  firm?: string;
  firmId?: number;
  mobile?: string;
  role?: string;
  username?: string;
}

interface AuthContextType {
  token: string | null;
  user: UserData | null;
  login: (token: string, userData: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isExpired = (expirationStr?: string): boolean => {
  if (!expirationStr) return false;

  const expTime = new Date(expirationStr).getTime();
  if (isNaN(expTime)) return false;

  return Date.now() >= expTime;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const [user, setUser] = useState<UserData | null>(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return null;

      const parsedUser: UserData = JSON.parse(savedUser);

      if (parsedUser.expiration && isExpired(parsedUser.expiration)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return null;
      }

      return parsedUser;
    } catch {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const login = (newToken: string, userData: UserData) => {
    if (userData.expiration && isExpired(userData.expiration)) {
      logout();
      return;
    }

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  useEffect(() => {
    if (!user?.expiration) return;

    const expTime = new Date(user.expiration).getTime();
    if (isNaN(expTime)) return;

    const timeUntilExpiration = expTime - Date.now();

    if (timeUntilExpiration <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeUntilExpiration);

    return () => clearTimeout(timer);
  }, [user?.expiration]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: Boolean(token && user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
