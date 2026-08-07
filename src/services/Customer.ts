import { apiClient } from "@/api/axiosInstance";
import type { ICustomer } from "@/interfaces/ICustomer";

export type CreateCustomerDTO = Omit<ICustomer, "id">;

export const customerService = {
  getAll: async (): Promise<ICustomer[]> => {
    const response = await apiClient.get<ICustomer[]>("/Customer");
    return response.data;
  },

  getById: async (id: string): Promise<ICustomer> => {
    const response = await apiClient.get<ICustomer>(`/companies/${id}`);
    return response.data;
  },

  create: async (data: CreateCustomerDTO): Promise<ICustomer> => {
    const response = await apiClient.post<ICustomer>("/Customer", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateCustomerDTO>,
  ): Promise<ICustomer> => {
    const response = await apiClient.post<ICustomer>(`/Customer/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<{ success: boolean }> => {
    const response = await apiClient.get<{ success: boolean }>(
      `/Customer/activeDeactive/${id}`,
    );
    return response.data;
  },

  activeDeactive: async (id: number): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>(
      `/Customer/activeDeactive/${id}`,
    );
    return response.data;
  },
};
