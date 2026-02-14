"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/shared/button/PrimaryButton";
import { reviewFormSchema } from "@/lib/formSchema";

const ReviewsForm = () => {
  // Initialize form with react-hook-form and zod
  const form = useForm({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: "",
      title: "",
      review: "",
      terms: false,
    },
  });

  // Submit handler
  const onSubmit = (values) => {
    console.log("Review Form Values:", values);
    // TODO: Add review submission logic here
  };

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-5"
      >
        {/* Name and Email - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name Input */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                  Your Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    {...field}
                    disabled={isSubmitting}
                    className="h-10 md:h-11 text-sm rounded-xs border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />

          {/* Email Input */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                  Email Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    disabled={isSubmitting}
                    className="h-10 md:h-11 text-sm rounded-xs border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />
        </div>

        {/* Rating Input */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                Your Rating <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full h-10 md:h-11 text-sm rounded-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400">
                    <SelectValue placeholder="Select your rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                  <SelectItem value="2">⭐⭐ Fair</SelectItem>
                  <SelectItem value="1">⭐ Poor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />

        {/* Review Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                Review Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Summarize your experience"
                  {...field}
                  disabled={isSubmitting}
                  className="h-10 md:h-11 text-sm rounded-xs border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                />
              </FormControl>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />

        {/* Review Textarea */}
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                Your Review <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Share details about your experience with this service. What did you like? What could be improved?"
                  {...field}
                  disabled={isSubmitting}
                  className="text-sm rounded-xs border-gray-300 dark:border-gray-600 resize-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                />
              </FormControl>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                Minimum 50 characters
              </p>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />

        {/* Checkbox */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-xs text-gray-600 dark:text-gray-400 font-normal">
                  I confirm that I have used this service and this review is
                  based on my own experience
                </FormLabel>
                <FormMessage className="text-xs font-medium" />
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <PrimaryButton label="Submit Review" type="submit" className="w-full" />
      </form>
    </Form>
  );
};

export default ReviewsForm;
