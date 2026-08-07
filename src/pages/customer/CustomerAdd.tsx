import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Building2, Receipt, Save, RotateCcw, Loader2, CheckCircle2, AlertCircle, Phone, } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import type { ICustomer } from "@/interfaces/ICustomer";
import { customerService } from "@/services/Customer";

const CustomerAdd: React.FC = () => {
    const { selectedCustomer, selectCustomer, addCustomer } = useApp();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<ICustomer>({
        mode: "onTouched",
        defaultValues: {
            nm: "",
            mobile: "",
            gstin: "",
            address: "",
            isActive: true,
        },
    });

    useEffect(() => {
        if (!selectedCustomer) {
            reset({
                nm: "",
                mobile: "",
                gstin: "",
                address: "",
                isActive: true,
            });
            return;
        }

        reset({
            nm: selectedCustomer.nm,
            mobile: selectedCustomer.mobile,
            gstin: selectedCustomer.gstin,
            address: selectedCustomer.address,
            isActive: selectedCustomer.isActive,
        });
    }, [selectedCustomer, reset]);

    const onSubmit = async (data: ICustomer) => {
        setSubmitError(null);
        setSubmitSuccess(null);

        try {
            if (selectedCustomer) {
                const customerId = selectedCustomer?.id;
                await customerService.update(customerId, data as any);
                toast.success("Customer updated successfully!");
            } else {
                const res = await customerService.create(data as any);
                addCustomer(res.value);
                toast.success("Customer saved successfully!");
            }
            reset();
            selectCustomer(null);
        } catch (err: any) {
            console.error(err?.response?.data);
            const message =
                err?.response?.data ||
                "Failed to register customer. Please try again.";
            setSubmitError(message);
        }
    };

    return (
        <div className="w-full md:p-5 bg-background flex flex-col">
            <Card className="w-full flex flex-col border shadow-sm rounded-lg overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">
                                {selectedCustomer ? "Edit Customer" : "Register New Customer"}
                            </CardTitle>
                            <CardDescription>
                                Enter customer details, compliance codes, and state
                                information.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col pt-6">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-10"
                        onClick={() => setSubmitError(null)}
                    >
                        <div className="space-y-6">
                            {/* Success Banner */}
                            {submitSuccess && (
                                <div className="p-4 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-sm">
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                    <span>{submitSuccess}</span>
                                </div>
                            )}

                            {/* Error Banner */}
                            {submitError && (
                                <div className="p-3 bg-destructive/10 text-destructive rounded-md border border-destructive/20 flex items-center gap-3 text-sm">
                                    <AlertCircle className="h-5 w-5 shrink-0" />
                                    <span>{submitError}</span>
                                </div>
                            )}

                            {/* Section 1: Basic Information */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-2 lg:col-span-3">
                                        <Label htmlFor="companyName">Customer Name *</Label>
                                        <Input
                                            id="companyName"
                                            autoComplete="off"
                                            placeholder="e.g. John Doe"
                                            {...register("nm", {
                                                required: "Customer name is required",
                                                maxLength: {
                                                    value: 30,
                                                    message: "Customer name cannot exceed 30 characters",
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: "Customer name must be at least 2 characters",
                                                },
                                            })}
                                        />
                                        {errors.nm && (
                                            <p className="text-xs text-destructive font-medium">
                                                {errors.nm.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* 3a. Mobile Number */}
                                    <div className="space-y-2">
                                        <Label htmlFor="mobile">Mobile Number *</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="mobile"
                                                type="tel"
                                                className="pl-9"
                                                autoComplete="off"
                                                maxLength={10}
                                                placeholder="10-digit mobile number"
                                                {...register("mobile", {
                                                    required: "Mobile number is required",
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: "Mobile number must be exactly 10 digits",
                                                    },
                                                })}
                                            />
                                        </div>
                                        {errors.mobile && (
                                            <p className="text-xs text-destructive font-medium">
                                                {errors.mobile.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* GSTIN */}
                                    <div className="space-y-2">
                                        <Label htmlFor="gstin">GSTIN *</Label>
                                        <div className="relative">
                                            <Receipt className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="gstin"
                                                className="pl-9 uppercase"
                                                autoComplete="off"
                                                maxLength={20}
                                                placeholder="27AAAAA0000A1Z5"
                                                {...register("gstin", {
                                                    required: "GSTIN is required",
                                                    maxLength: {
                                                        value: 20,
                                                        message: "GSTIN cannot exceed 20 characters",
                                                    },
                                                    pattern: {
                                                        value:
                                                            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                                                        message: "Invalid GSTIN format",
                                                    },
                                                    onChange: (e) => {
                                                        e.target.value = e.target.value.toUpperCase();
                                                    },
                                                })}
                                            />
                                        </div>
                                        {errors.gstin && (
                                            <p className="text-xs text-destructive font-medium">
                                                {errors.gstin.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Location Details */}
                            <div className="space-y-4 pt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Address */}
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address *</Label>
                                        <Input
                                            id="address"
                                            autoComplete="off"
                                            placeholder="Plot No, Street, Industrial Area, City..."
                                            {...register("address", {
                                                required: "Address is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Address must be at least 2 characters",
                                                },
                                                maxLength: {
                                                    value: 200,
                                                    message: "Address cannot exceed 200 characters",
                                                },
                                            })}
                                        />
                                        {errors.address && (
                                            <p className="text-xs text-destructive font-medium">
                                                {errors.address.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end gap-3 mt-auto">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    reset();
                                    selectCustomer(null);
                                    setSubmitError(null);
                                    setSubmitSuccess(null);
                                }}
                                disabled={isSubmitting}
                            >
                                <RotateCcw className="mr-2 h-4 w-4" /> Reset
                            </Button>
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />{" "}
                                        {selectedCustomer ? "Update Customer" : "Save Customer"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CustomerAdd;