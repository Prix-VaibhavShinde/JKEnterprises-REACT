import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Building2,
  Receipt,
  Save,
  RotateCcw,
  Percent,
  Hash,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ICompany } from "@/interfaces/ICompany";
import { companyService } from "@/services/Company";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const validateDecimal = (value: string | number) => {
  if (value === null || value === undefined || value === "") return true;
  const strVal = String(value);
  const decimalRegex = /^\d{1,3}(\.\d{1,2})?$/;
  return (
    decimalRegex.test(strVal) ||
    "Enter a valid decimal (max 5 digits total, up to 2 decimal places)"
  );
};

const CompanyAdd: React.FC = () => {
  const { selectedCompany, selectCompany, addCompany } = useApp();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ICompany>({
    mode: "onTouched",
    defaultValues: {
      nm: "",
      employeeStartCode: "",
      serviceCharge: "",
      mobileNumber: "",
      gstin: "",
      pf: "",
      mlwf: "",
      address: "",
      state: "MAHARASHTRA",
    },
  });

  useEffect(() => {
    if (!selectedCompany) {
      reset({
        nm: "",
        employeeStartCode: "",
        serviceCharge: "",
        gstin: "",
        pf: "",
        mlwf: "",
        address: "",
        state: "MAHARASHTRA",
      });
      return;
    }

    reset({
      nm: selectedCompany.nm,
      employeeStartCode: selectedCompany.employeeStartCode,
      serviceCharge: selectedCompany.serviceCharge,
      gstin: selectedCompany.gstin,
      pf: selectedCompany.pf,
      mlwf: selectedCompany.mlwf,
      address: selectedCompany.address,
      state: selectedCompany.state,
      isActive: selectedCompany.isActive,
    });
  }, [selectedCompany, reset]);

  const onSubmit = async (data: ICompany) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      if (selectedCompany) {
        const companyId = selectedCompany?.id;
        await companyService.update(companyId, data as any);
        toast.success("Company updated successfully!");
      } else {
        const res = await companyService.create(data as any);
        addCompany(res.value);
        toast.success("Company saved successfully!");
      }
      reset();
      selectCompany(null);
    } catch (err: any) {
      console.log(err.response?.data);
      const message =
        err?.response?.data ||
        "Failed to register company. Please try again.";
      setSubmitError(message);
    }
  };

  return (
    <div className="w-full md:p-5 bg-background flex flex-col">
      <Card className="w-full flex flex-col border shadow-sm rounded-lg overflow-hidden ">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Register New Company</CardTitle>
              <CardDescription>
                Enter organization details, compliance codes, and state
                information.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col ">
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
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      autoComplete="off"
                      placeholder="e.g. Abcd Solutions Pvt Ltd"
                      {...register("nm", {
                        required: "Company name is required",
                        maxLength: {
                          value: 30,
                          message: "Company name cannot exceed 30 characters",
                        },
                        minLength: {
                          value: 2,
                          message: "Company name must be at least 3 characters.",
                        },
                      })}
                    />
                    {errors.nm && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.nm.message}
                      </p>
                    )}
                  </div>

                  {/* Employee Start Code */}
                  <div className="space-y-2">
                    <Label htmlFor="empStartCode">Employee Start Code *</Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="empStartCode"
                        className="pl-9"
                        autoComplete="off"
                        placeholder="e.g. EMP-1000"
                        {...register("employeeStartCode", {
                          required: "Employee start code is required",
                        })}
                      />
                    </div>
                    {errors.employeeStartCode && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.employeeStartCode.message}
                      </p>
                    )}
                  </div>

                  {/* Service Charge */}
                  <div className="space-y-2">
                    <Label htmlFor="serviceCharge">Service Charge (%) *</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="serviceCharge"
                        type="number"
                        step="0.01"
                        autoComplete="off"
                        className="pl-9"
                        placeholder="5.00"
                        {...register("serviceCharge", {
                          required: "Service charge is required",
                          validate: (value) => {
                            if (Number(value) >= 0 && Number(value) <= 100) {
                              const decimalRegex = /^\d+(\.\d{1,2})?$/;
                              return (
                                decimalRegex.test(String(value)) ||
                                "Maximum 2 decimal places allowed"
                              );
                            } else {
                              return "Percentage must be between 0 and 100.";
                            }
                          },
                        })}
                      />
                    </div>
                    {errors.serviceCharge && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.serviceCharge.message}
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

              {/* Section 2: Statutory & Compliance */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* PF */}
                  <div className="space-y-2">
                    <Label htmlFor="pf">PF *</Label>
                    <Input
                      id="pf"
                      type="number"
                      step="0.01"
                      autoComplete="off"
                      placeholder="e.g. 10.00"
                      {...register("pf", {
                        required: "PF is required",
                        validate: validateDecimal,
                      })}
                    />
                    {errors.pf && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.pf.message}
                      </p>
                    )}
                  </div>

                  {/* MLWF */}
                  <div className="space-y-2">
                    <Label htmlFor="mlwf">MLWF *</Label>
                    <Input
                      id="mlwf"
                      type="number"
                      step="0.01"
                      autoComplete="off"
                      placeholder="e.g. 12.00"
                      {...register("mlwf", {
                        required: "MLWF is required",
                        validate: validateDecimal,
                      })}
                    />
                    {errors.mlwf && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.mlwf.message}
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

                  {/* State */}
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      type="text"
                      autoComplete="off"
                      value="MAHARASHTRA"
                      placeholder="MAHARASHTRA"
                      readOnly
                    />
                    {errors.state && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions - Pinned to the Bottom */}
            <div className="flex items-center justify-end gap-3 mt-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  selectCompany(null);
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
                    <Save className="mr-2 h-4 w-4" /> Save Company
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

export default CompanyAdd;