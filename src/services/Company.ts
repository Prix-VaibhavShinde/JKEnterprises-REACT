import { apiClient } from "@/api/axiosInstance";
import type { ICompany } from "@/interfaces/ICompany";

export type CreateCompanyDTO = Omit<ICompany, "id">;

export const companyService = {
  getAll: async (): Promise<ICompany[]> => {
    const response = await apiClient.get<ICompany[]>("/Company");
    return response.data;
  },

  getById: async (id: string): Promise<ICompany> => {
    const response = await apiClient.get<ICompany>(`/companies/${id}`);
    return response.data;
  },

  create: async (data: CreateCompanyDTO): Promise<ICompany> => {
    const response = await apiClient.post<ICompany>("/Company", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateCompanyDTO>,
  ): Promise<ICompany> => {
    const response = await apiClient.post<ICompany>(`/Company/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<{ success: boolean }> => {
    const response = await apiClient.get<{ success: boolean }>(
      `/Company/activeDeactive/${id}`,
    );
    return response.data;
  },

  activeDeactive: async (id: number): Promise<{ success: boolean }> => {
    const response = await apiClient.get<{ success: boolean }>(
      `/Company/activeDeactive/${id}`,
    );
    return response.data;
  },
};
