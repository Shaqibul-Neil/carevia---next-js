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

const LoginForm = () => {
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
    console.log(values);
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
