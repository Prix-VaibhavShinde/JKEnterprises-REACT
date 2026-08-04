import React, { useState } from "react";
import { PlusCircle, Building2 } from "lucide-react";
import CompanyAdd from "./CompanyAdd";
import CompanyDetails from "./CompanyDetails";


type TabType = "add" | "details";
export interface CompanyFormValues {
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

const CompanyHeader: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("add");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Company
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage company profiles, view listings, and register new
              organizations.
            </p>
          </div>
        </div>

        <div className="flex gap-2 border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
              activeTab === "add"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            Add Company
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
              activeTab === "details"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="h-4 w-4" />
            Company Details
          </button>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "add" ? <CompanyAdd /> : <CompanyDetails />}
      </div>
    </div>
  );
};

export default CompanyHeader;
