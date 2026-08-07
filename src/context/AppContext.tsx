import type { ICompany } from "@/interfaces/ICompany";
import type { ICustomer } from "@/interfaces/ICustomer";
import { companyService } from "@/services/Company";
import { customerService } from "@/services/Customer";
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
  selectedCompany: ICompany | null;
  fetchCompanies: () => Promise<void>;
  selectCompany: (company: ICompany | null) => void;
  addCompany: (company: ICompany) => void;
  removeCompany: (companyId: number) => void;
  updateActiveStatus: (companyId: number) => void;
  customers: ICustomer[];
  selectedCustomer: ICustomer | null;
  setSelectedCustomer: (customer: ICustomer | null) => void;
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: ICustomer) => void;
  removeCustomer: (customerId: number) => void;
  updateCustomerActiveStatus: (customerId: number) => void;
  selectCustomer: (customer: ICustomer | null) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // Companies
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

  const addCompany = useCallback(async (company: any) => {
    setCompanies((prev) => [...prev, company]);
  }, []);

  const removeCompany = useCallback(async (companyId: number) => {
    const res = await companyService.delete(companyId);
    setCompanies((prev) => prev.filter((c: any) => c.id !== companyId));
  }, []);

  const updateActiveStatus = useCallback(async (companyId: number) => {
    await companyService.activeDeactive(companyId);
    setCompanies((prev) =>
      prev.map((c: any) => (c.id === companyId ? { ...c, isActive: !c.isActive } : c))
    );
  }, []);

  const selectCompany = useCallback((company: ICompany | null) => {
    setSelectedCompany(company as any);
  }, []);

  // Customers
  const fetchCustomers = useCallback(async () => {
    try {
      setIsFetching(true);
      setError(null);
      const res = await customerService.getAll();
      setCustomers(res ?? []);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsFetching(false);
    }
  }, []);

  const addCustomer = useCallback(async (customer: any) => {
    setCustomers((prev) => [...prev, customer]);
  }, []);

  const removeCustomer = useCallback(async (customerId: number) => {
    const res = await customerService.delete(customerId);
    setCustomers((prev) => prev.filter((c: any) => c.id !== customerId));
  }, []);

  const updateCustomerActiveStatus = useCallback(async (customerId: number) => {
    await customerService.activeDeactive(customerId);
    setCustomers((prev) =>
      prev.map((c: any) => (c.id === customerId ? { ...c, isActive: !c.isActive } : c))
    );
  }, []);

  const selectCustomer = useCallback((customer: ICustomer | null) => {
    setSelectedCustomer(customer as any);
  }, []);

  const value = useMemo(
    () => ({
      isFetching,
      companies,
      error,
      fetchCompanies,

      selectedCompany,
      selectCompany,
      addCompany,
      removeCompany,
      updateActiveStatus,
      customers,
      selectedCustomer,
      setSelectedCustomer,
      fetchCustomers,
      addCustomer,
      removeCustomer,
      updateCustomerActiveStatus,
      selectCustomer,
    }),
    [
      isFetching,
      companies,
      error,
      fetchCompanies,
      selectedCompany,
      selectCompany,
      addCompany,
      removeCompany,
      updateActiveStatus,
      customers,
      selectedCustomer,
      setSelectedCustomer,
      fetchCustomers,
      addCustomer,
      removeCustomer,
      updateCustomerActiveStatus,
      selectCustomer,
    ],
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
