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
import { loginFormSchema } from "@/lib/formSchema/userSchema";
import {
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "@/lib/utils";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  //to get the desired path before login
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  //defining the form with default values
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //defining the submit handler
  const onSubmit = async (values) => {
    showLoadingAlert("Signing in...", "Please wait");

    try {
      // Use NextAuth signIn with credentials
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // Handle redirect manually
      });
      //console.log(result);

      if (result?.ok) {
        //Show success and redirect
        showSuccessAlert("Welcome to Carevia!", "Logged in successfully");
        router.push(callbackUrl);
        router.refresh(); //refresh to update session
      } else {
        // Login failed - show error
        showErrorAlert(
          "Login Failed",
          result?.error || "Invalid email or password",
        );
      }
    } catch (error) {
      Swal.close();
      //console.error("Login error:", error);
      showErrorAlert("Login Failed", "Something went wrong. Please try again.");
    }
  };

  const { isSubmitting } = form.formState;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
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
          </div>

          <Button className={"w-full h-10"}>Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
