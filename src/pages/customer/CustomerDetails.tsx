import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { RefreshCw, Building2, Search, XCircle, X, FileEdit, } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { formatDate } from "@/shared/formatDate";

export interface StateInfo {
    id: number;
    nm: string;
    mobile: string;
    address: string | null;
    gstin: string | null;
    isActive: boolean;
}

interface Props {
    onEdit: () => void;
}

const CustomerDetails: React.FC<Props> = ({ onEdit }) => {
    const { isFetching, customers = [], fetchCustomers, error, selectCustomer, updateCustomerActiveStatus, } = useApp();
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    useEffect(() => {
        if (customers.length === 0 && !isFetching) {
            fetchCustomers();
        }
    }, [customers.length, isFetching, fetchCustomers]);

    // Reset to page 1 whenever the search filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredCustomers = useMemo(() => {
        if (!searchQuery.trim()) return customers;
        const query = searchQuery.toLowerCase();
        return customers.filter(
            (c: any) =>
                c.nm?.toLowerCase().includes(query) ||
                c.gstin?.toLowerCase().includes(query) ||
                c.mobile?.toString().includes(query)
        );
    }, [customers, searchQuery]);

    // Pagination Calculations
    const totalItems = filteredCustomers.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const paginatedCustomers = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredCustomers.slice(start, start + pageSize);
    }, [filteredCustomers, currentPage, pageSize]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("ellipsis-1");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push("ellipsis-2");
            pages.push(totalPages);
        }
        return pages;
    };

    const startRecord = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalItems);

    const handleUpdate = (customer: any) => {
        selectCustomer(customer);
        onEdit();
    };

    if (isFetching && customers.length === 0) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground">
                <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                <span className="text-sm font-medium">
                    Loading customer directory...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-destructive/10 p-3 text-destructive">
                    <XCircle className="h-6 w-6" />
                </div>
                <p className="mt-3 font-semibold text-foreground">
                    Failed to load customers
                </p>
                <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                    {error.message || "An unexpected error occurred."}
                </p>
                <Button
                    onClick={fetchCustomers}
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
        <div className="w-full space-y-4 p-2 sm:p-4">
            {/* Header Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-foreground">
                            Customer Directory
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            {customers.length} registered{" "}
                            {customers.length === 1 ? "organization" : "organizations"}
                        </p>
                    </div>
                </div>

                {/* Action & Filter Controls */}
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 sm:w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by ID, name, GSTIN..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 pl-9 pr-8 text-xs bg-background"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <Button
                        onClick={fetchCustomers}
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

            {/* Main Table Wrapper */}
            <div className="rounded-md border border-border bg-card shadow-xs overflow-hidden flex flex-col">
                {/* Fixed Height Container for Sticky Scrolling */}
                <div className="relative max-h-[500px] md:max-h-[550px] lg:max-h-[800px] overflow-auto">
                    <Table className="w-full min-w-[1000px] text-xs relative border-collapse">
                        <TableHeader className="sticky top-0 z-20 bg-background shadow-xs">
                            <TableRow className="border-b border-border hover:bg-transparent bg-background">
                                <TableHead className="w-24">Actions</TableHead>
                                <TableHead className="w-28 text-center">Status</TableHead>
                                <TableHead className="min-w-[220px]">Customer Name</TableHead>
                                <TableHead className="min-w-[220px]">Mobile</TableHead>
                                <TableHead className="w-52">GSTIN</TableHead>
                                <TableHead className="min-w-[280px]">Address</TableHead>
                                <TableHead className="w-36">Modified</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginatedCustomers.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                        className="h-40 text-center text-muted-foreground"
                                    >
                                        No customers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedCustomers.map((customer: any) => (
                                    <TableRow
                                        key={customer.id}
                                        className="hover:bg-muted/40 transition-colors"
                                    >
                                        {/* Actions */}
                                        <TableCell className="w-24">
                                            <div className="flex items-center justify-center gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleUpdate(customer)}
                                                >
                                                    <FileEdit className="h-4 w-4" />
                                                </Button>

                                                {/* <Button
                                  size="icon"
                                  variant="ghost"
                                  className="hover:bg-destructive/10 hover:text-destructive"
                                  onClick={() => handleDelete(company.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button> */}
                                            </div>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell className="w-28 text-center">
                                            <Badge
                                                onClick={() => updateCustomerActiveStatus(customer.id)}
                                                variant={customer.isActive ? "default" : "secondary"}
                                                className={
                                                    customer.isActive
                                                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/50 cursor-pointer"
                                                        : "bg-rose-500/15 text-rose-500 border-rose-500/50 cursor-pointer"
                                                }
                                            >
                                                {customer.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>

                                        {/* Company */}
                                        <TableCell className="min-w-[220px]">
                                            <div className="font-medium truncate">{customer.nm}</div>
                                        </TableCell>

                                        {/* MOBILE */}
                                        <TableCell className="w-52">
                                            {customer.mobile || "—"}
                                        </TableCell>

                                        {/* GSTIN */}
                                        <TableCell className="w-52">
                                            {customer.gstin || "—"}
                                        </TableCell>


                                        {/* Address */}
                                        <TableCell className="min-w-[280px] max-w-[350px]">
                                            <p
                                                className="line-clamp-2 text-sm text-muted-foreground"
                                                title={customer.address}
                                            >
                                                {customer.address || "Not provided"}
                                            </p>
                                        </TableCell>

                                        {/* Modified */}
                                        <TableCell className="w-36 text-xs whitespace-nowrap">
                                            {formatDate(customer.modifiedDate)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer & Shadcn Pagination Bar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                    {/* Record Counters & Rows-Per-Page Selector */}
                    <div className="flex items-center gap-4">
                        <span>
                            Showing{" "}
                            <strong className="font-semibold text-foreground">
                                {startRecord}-{endRecord}
                            </strong>{" "}
                            of{" "}
                            <strong className="font-semibold text-foreground">
                                {totalItems}
                            </strong>{" "}
                            records
                        </span>

                        <div className="flex items-center gap-2 border-l border-border pl-4">
                            <span>Rows per page</span>
                            <Select
                                value={String(pageSize)}
                                onValueChange={(val) => {
                                    setPageSize(Number(val));
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="h-7 w-[70px] text-xs bg-background">
                                    <SelectValue placeholder={pageSize} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Shadcn UI Pagination Controls */}
                    <Pagination className="mx-0 w-auto">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage - 1);
                                    }}
                                    className={
                                        currentPage === 1
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>

                            {getPageNumbers().map((page, index) => (
                                <PaginationItem key={index}>
                                    {typeof page === "string" ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === page}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page as number);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {page}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage + 1);
                                    }}
                                    className={
                                        currentPage === totalPages || totalItems === 0
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetails