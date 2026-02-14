"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "@/lib/utils";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { userRegistrationSchema } from "@/lib/formSchema";

const RegisterForm = () => {
  const router = useRouter();
  //defining the form with default values
  const form = useForm({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      nid: "",
      phoneNumber: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });
  //defining the submit handler
  const onSubmit = async (formData) => {
    showLoadingAlert("Creating account...", "Please wait");
    try {
      // Register the user
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Auto login after successful registration
        Swal.update({
          title: "Success",
          text: "Signing you in...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
        });

        // NextAuth signIn with credentials
        const signInResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false, // Handle redirect manually
        });

        //Close sweet alert loading
        Swal.close();
        if (signInResult?.ok) {
          //Show success and redirect
          showSuccessAlert(
            "Welcome to Carevia!",
            "Account created successfully.",
          );
          router.push("/bookings");
          router.refresh(); //refresh to update session
        } else {
          // Registration successful but auto-login failed
          // Still show success but redirect to login
          await showSuccessAlert(
            "Account Created!",
            "Please login with your credentials",
          );
          router.push("/login");
        }
      } else {
        showErrorAlert("Registration Failed", result.message);
      }
    } catch (error) {
      Swal.close();
      showErrorAlert();
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Custom Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                role="button"
                tabIndex={0}
                className="w-24 h-24 overflow-hidden cursor-pointer border border-border transition-all flex items-center justify-center rounded-xs group hover:border-primary duration-300"
              >
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="text-xs mt-1.5 group-hover:text-primary">
                    Click to upload
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="absolute -bottom-2 -right-1 w-7 h-7 bg-primary flex items-center justify-center cursor-pointer focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1 active:scale-95   transition-all transform hover:-translate-y-0.5"
                aria-label="Upload photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-camera w-4 h-4 text-white"
                  aria-hidden="true"
                >
                  <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>
                  <circle cx="12" cy="13" r="3"></circle>
                </svg>
              </button>
              <input type="file" className="hidden" />
            </div>
            <p className="text-muted-foreground text-xs mt-2">
              Click avatar or camera icon to upload
            </p>
            <p className="text-muted-foreground text-xs">
              Max 5MB (JPG, PNG, GIF, WebP)
            </p>
          </div>
          {/* Text Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    First Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Enter your first name"
                    />
                  </FormControl>
                  <FormMessage className="text-[0.65rem] font-bold" />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    Last Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Enter your last name"
                    />
                  </FormControl>
                  <FormMessage className="text-[0.65rem] font-bold" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              type="email"
              autoComplete="off"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    Email Address*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter your email address"
                    />
                  </FormControl>
                  <FormMessage className="text-[0.65rem] font-bold" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    Password*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isSubmitting}
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage className="text-[0.65rem] font-bold" />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    Phone Number*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      disabled={isSubmitting}
                      placeholder="Enter your phone number"
                    />
                  </FormControl>
                  <FormMessage className="text-[0.65rem] font-bold" />
                </FormItem>
              )}
            />

            {/* NID */}
            <FormField
              control={form.control}
              name="nid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    NID*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      disabled={isSubmitting}
                      placeholder="Enter your NID number"
                    />
                  </FormControl>
                  <FormMessage className="text-[0.65rem] font-bold" />
                </FormItem>
              )}
            />

            {/* Address — FULL WIDTH */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    Address*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Write your full address"
                    />
                  </FormControl>
                  <FormMessage className="text-[0.65rem] font-bold" />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    City*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Your current city"
                    />
                  </FormControl>
                  <FormMessage className="text-[0.65rem] font-bold" />
                </FormItem>
              )}
            />

            {/* Postal Code */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    Post Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Post code"
                    />
                  </FormControl>
                  <FormMessage className="text-[0.65rem] font-bold" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between items-center gap-6 pt-4 flex-wrap">
            <Button className={"w-full h-10"}>Register</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
