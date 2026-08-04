import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import {
  RefreshCw,
  Building2,
  Search,
  MoreHorizontal,
  Copy,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/shared/formatDate";

export interface StateInfo {
  id: number;
  name: string;
  address: string | null;
  gstin: string | null;
}

export interface Company {
  id: number;
  uid: number;
  unm: string;
  nm: string;
  pf: number;
  mlwf: number;
  address: string;
  gstin: string;
  state: StateInfo;
  serviceCharge: number;
  employeeStartCode: number;
  isActive: boolean;
  modifiedDate: string;
}

const CompanyDetails = () => {
  const { isFetching, companies, fetchCompanies, error } = useApp();
  const { open, isMobile } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (companies.length === 0 && !isFetching) {
      fetchCompanies();
    }
  }, [companies.length, isFetching, fetchCompanies]);

  // Filter companies based on search
  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return companies;
    const query = searchQuery.toLowerCase();
    return companies.filter(
      (c) =>
        c.nm?.toLowerCase().includes(query) ||
        c.unm?.toLowerCase().includes(query) ||
        c.gstin?.toLowerCase().includes(query) ||
        c.id.toString().includes(query),
    );
  }, [companies, searchQuery]);

  if (isFetching && companies.length === 0) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3 text-slate-500">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
        <span className="text-sm font-medium">
          Loading company directory...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center p-6 text-center">
        <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-950/50 dark:text-red-400">
          <XCircle className="h-6 w-6" />
        </div>
        <p className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
          Failed to load companies
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          {error.message}
        </p>
        <Button
          onClick={fetchCompanies}
          className="mt-4"
          variant="outline"
          size="sm"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full space-y-4 p-1">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Company Directory
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {companies.length} total registered{" "}
              {companies.length === 1 ? "organization" : "organizations"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name, GSTIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 text-xs focus-visible:ring-1"
            />
          </div>

          <Button
            onClick={fetchCompanies}
            disabled={isFetching}
            variant="outline"
            size="sm"
            className="h-9 gap-2 text-xs font-medium"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Main Table Card Wrapper */}
      <div className="relative rounded-xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="max-h-[680px] overflow-auto rounded-xl">
          <Table className="w-full min-w-[1100px] text-xs">
            <TableHeader className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-xs dark:bg-slate-900/90">
              <TableRow className="border-b border-slate-200/80 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="w-[70px] font-semibold text-slate-700 dark:text-slate-300">
                  ID
                </TableHead>
                <TableHead className="w-[100px] font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Company Name
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Username
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  GSTIN
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  State
                </TableHead>
                <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">
                  PF (%)
                </TableHead>
                <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">
                  MLWF
                </TableHead>
                <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">
                  Svc Charge
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Address
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Modified
                </TableHead>
                <TableHead className="w-[50px] text-center font-semibold text-slate-700 dark:text-slate-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    className="h-32 text-center text-slate-500"
                  >
                    No matching companies found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.map((company) => (
                  <TableRow
                    key={company.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50/80 dark:border-slate-900 dark:hover:bg-slate-900/50"
                  >
                    {/* ID */}
                    <TableCell className="font-mono text-[11px] font-medium text-slate-500">
                      #{company.id}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          company.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40"
                            : "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            company.isActive
                              ? "bg-emerald-500 animate-pulse"
                              : "bg-slate-400"
                          }`}
                        />
                        {company.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>

                    {/* Company Name */}
                    <TableCell className="font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {company.nm || "—"}
                    </TableCell>

                    {/* Username */}
                    <TableCell className="text-slate-600 dark:text-slate-400 whitespace-nowrap font-mono text-[11px]">
                      @{company.unm}
                    </TableCell>

                    {/* GSTIN */}
                    <TableCell className="font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {company.gstin || (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </TableCell>

                    {/* State */}
                    <TableCell className="text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {company.state?.name || "—"}
                    </TableCell>

                    {/* PF */}
                    <TableCell className="text-right font-mono text-slate-700 dark:text-slate-300">
                      {company.pf ?? 0}%
                    </TableCell>

                    {/* MLWF */}
                    <TableCell className="text-right font-mono text-slate-700 dark:text-slate-300">
                      ₹{company.mlwf ?? 0}
                    </TableCell>

                    {/* Service Charge */}
                    <TableCell className="text-right font-mono text-slate-700 dark:text-slate-300">
                      ₹{company.serviceCharge ?? 0}
                    </TableCell>

                    {/* Address */}
                    <TableCell className="max-w-[220px] truncate text-slate-500 title={company.address}">
                      {company.address || (
                        <span className="italic text-slate-400">
                          No address provided
                        </span>
                      )}
                    </TableCell>

                    {/* Modified Date */}
                    <TableCell className="text-slate-500 whitespace-nowrap text-[11px]">
                      {formatDate(company.modifiedDate)}
                    </TableCell>

                    {/* Action Dropdown Menu */}
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-40 text-xs"
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(company.gstin)
                            }
                          >
                            <Copy className="mr-2 h-3.5 w-3.5 text-slate-400" />
                            Copy GSTIN
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-3.5 w-3.5 text-slate-400" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer Summary Bar */}
        <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/30">
          <span>
            Showing{" "}
            <strong className="font-medium text-slate-700 dark:text-slate-300">
              {filteredCompanies.length}
            </strong>{" "}
            of{" "}
            <strong className="font-medium text-slate-700 dark:text-slate-300">
              {companies.length}
            </strong>{" "}
            entries
          </span>
          <span className="text-[11px] text-slate-400">
            Scroll horizontally to view all columns
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
