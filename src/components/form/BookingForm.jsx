"use client";

import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, MapPin, CreditCard, CreditCardIcon } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/shared/button/PrimaryButton";
import { calculateTotalPrice } from "@/lib/utils";

// Zod validation schema
const bookingFormSchema = z.object({
  durationType: z.string().min(1, "Please select a duration type"),
  quantity: z.coerce.number().min(1, "Please enter quantity"),
  division: z.string().min(1, "Please select your division"),
  district: z.string().min(1, "Please select your district"),
  address: z.string().optional(),
  paymentOption: z.enum(["half", "full"]),
});

const BookingForm = ({ service }) => {
  const [coverageAreas, setCoverageAreas] = useState([]);

  //Fetching coverage area data
  useEffect(() => {
    // Simulated API call to fetch coverage data
    fetch("/coverage.json")
      .then((response) => response.json())
      .then((data) => {
        setCoverageAreas(data);
      })
      .catch((error) => console.error("Error fetching coverage data:", error));
  }, []);

  // Initialize form with react-hook-form and zod
  const form = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      durationType: "",
      quantity: "1",
      division: "",
      district: "",
      address: "",
      paymentOption: "full",
    },
  });

  //Dynamically getting unique divisions from coverage areas
  const divisions = [...new Set(coverageAreas.map((area) => area.region))];
  const districts = (division) => {
    return coverageAreas.filter((div) => div.region === division);
  };
  const selectedDivision = useWatch({
    control: form.control,
    name: "division",
  });

  //getting selected duration type and quantity and division
  const durationType = useWatch({
    control: form.control,
    name: "durationType",
  });
  const quantity = useWatch({
    control: form.control,
    name: "quantity",
  });
  const division = useWatch({
    control: form.control,
    name: "division",
  });

  //Price Calculation Logic
  const totalPrice = calculateTotalPrice({
    durationType,
    quantity,
    division,
    service,
  });

  // Submit handler
  const onSubmit = (values) => {
    console.log("Booking Form Values:", values);

    // TODO: Add booking submission logic here
  };
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8"
      >
        {/* Pricing Block */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              Service Pricing
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {/* Per Hour */}
            <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Hourly Rate
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {service?.price?.perHour}{" "}
                <span className="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400">
                  $
                </span>
              </p>
            </div>
            {/* Per Day */}
            <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border border-cyan-200 dark:border-cyan-800">
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Daily Rate
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {service?.price?.perDay}{" "}
                <span className="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400">
                  $
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Duration Selection Block */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              Choose Your Duration
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {/* Duration Type Dropdown */}
            <FormField
              control={form.control}
              name="durationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration Type<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-11 text-sm rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400">
                        <SelectValue placeholder="Select duration type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Quantity Input */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Number of Hours/Days<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Enter quantity"
                      {...field}
                      disabled={isSubmitting}
                      className="h-9 text-sm rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Location Selection Block */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              Service Location
            </h4>
          </div>
          <div className="space-y-3 md:space-y-4">
            {/* Division Dropdown */}
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Division <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-11 text-sm rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400">
                        <SelectValue placeholder="Select your division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {divisions.map((division, i) => (
                        <SelectItem key={i} value={division}>
                          {division}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* District Dropdown */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    District <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-11 text-sm rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400">
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts(selectedDivision).map((district, i) => (
                        <SelectItem key={i} value={district.district}>
                          {district.district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Detailed Address Textarea */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Detailed Address (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="House/Flat number, Street name, Landmark..."
                      {...field}
                      disabled={isSubmitting}
                      className="text-sm rounded-xl border-gray-300 dark:border-gray-600 resize-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Total Cost Summary */}
        <div className="p-5 md:p-6 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 border-2 border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              Total Booking Cost
            </h4>
            <div className="px-2.5 md:px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Estimated
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              {totalPrice.toFixed(2)}
            </span>
            <span className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400">
              $
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
            Based on {quantity} {durationType} of service
          </p>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
            For services outside coverage areas, additional $500 as travel fee
            may apply.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Payment Options */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2">
            <CreditCardIcon className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              Choose Your Payment Options
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {/* Duration Type Dropdown */}
            <FormField
              control={form.control}
              name="paymentOption"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="half" id="half" />
                        <Label htmlFor="half">
                          Pay 50% in Advance ({(totalPrice / 2).toFixed(2)} $)
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="full" id="full" />
                        <Label htmlFor="full">
                          Full Payment ({totalPrice.toFixed(2)} $)
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/*  Submit Button */}
        <PrimaryButton
          label="Pay Now to Confirm Booking"
          type="submit"
          className="w-full"
        />
      </form>
    </Form>
  );
};

export default BookingForm;
