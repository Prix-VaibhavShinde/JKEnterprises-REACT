import type { ICompany } from "@/interfaces/ICompany";
import { companyService } from "@/services/Company";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

interface AppContextType {
  isFetching: boolean;
  companies: ICompany[];
  error: Error | null;
  fetchCompanies: () => Promise<void>;
}

interface AppProviderProps {
  children: ReactNode;
}

// 1. Initialize context with null for explicit type safety
const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchCompanies = useCallback(async () => {
    try {
      setIsFetching(true);
      setError(null);
      const res = await companyService.getAll();
      setCompanies(res ?? []);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsFetching(false);
    }
  }, []);

  const value = useMemo<AppContextType>(
    () => ({
      isFetching,
      companies,
      error,
      fetchCompanies,
    }),
    [isFetching, companies, error, fetchCompanies],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
