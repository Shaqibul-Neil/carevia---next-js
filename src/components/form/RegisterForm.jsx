"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userRegistrationSchema } from "@/lib/formSchema/userSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "../ui/button";

const RegisterForm = () => {
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
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        console.log("Reg success");
      }
    } catch (error) {}
  };

  const { isSubmitting } = form.formState;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
