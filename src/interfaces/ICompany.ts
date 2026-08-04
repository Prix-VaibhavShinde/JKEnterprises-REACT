export interface ICompany {
  nm: string;
  employeeStartCode: string;
  serviceCharge: string;
  mobileNumber: string;
  gstin: string;
  pf: string;
  mlwf: string;
  address: string;
  state: { id: number; name: string } | string;
}
