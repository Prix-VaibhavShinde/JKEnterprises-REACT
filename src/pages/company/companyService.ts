import { apiClient } from "@/api/axiosInstance";

export interface Company {
  id: string;
  companyName: string;
  gstin: string;
  mobileNumber: string;
  state: string;
}

export type CreateCompanyDTO = Omit<Company, "id">;

export const companyService = {
  getAll: async (): Promise<Company[]> => {
    const response = await apiClient.get<Company[]>("/companies");
    return response.data;
  },

  getById: async (id: string): Promise<Company> => {
    const response = await apiClient.get<Company>(`/companies/${id}`);
    return response.data;
  },

  create: async (data: CreateCompanyDTO): Promise<Company> => {
    const response = await apiClient.post<Company>("/Company", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateCompanyDTO>,
  ): Promise<Company> => {
    const response = await apiClient.put<Company>(`/companies/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<{ success: boolean }>(
      `/companies/${id}`,
    );
    return response.data;
  },
};
