"use client";

import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, CreditCard, CreditCardIcon, CalendarIcon } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/shared/button/PrimaryButton";
import { calculateTotalPrice, cn, showErrorAlert } from "@/lib/utils";
import { format } from "date-fns";
import { bookingFormSchema } from "@/lib/formSchema";

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
      .catch((error) => showErrorAlert("Error fetching coverage data:", error));
  }, []);

  // Initialize form with react-hook-form and zod
  const form = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      bookingDate: undefined,
      slot: "",
      durationType: "",
      quantity: "",
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

  //Base Price
  const basePrice =
    durationType === "days"
      ? parseInt(quantity) * service.price.perDay
      : durationType === "hours"
        ? parseInt(quantity) * service.price.perHour
        : 0;

  //Additional Cost (for outside coverage areas)
  const additionalCost =
    division && !service.locationCoverage.supportedDivisions.includes(division)
      ? 500
      : 0;

  //Generate Time slots(8AM to 8PM)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8;
    const endHour = 20;
    for (let i = startHour; i <= endHour; i++) {
      const hour = i > 12 ? i - 12 : i;
      const ampm = i >= 12 ? "PM" : "AM";
      slots.push(`${hour}:00 ${ampm}`);
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();

  // Submit handler
  const onSubmit = async (values) => {
    try {
      const { _id } = service;
      const bookingItem = {
        serviceId: _id,
        ...values,
        totalPrice,
      };

      //Call api to create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingItem),
      });
      const data = await response.json();
      //console.log(data);

      // Check if response is successful
      if (!response.ok) {
        throw new Error(data.message || "Failed to create checkout session");
      }

      //Redirect to stripe checkout
      if (data.success && data.data?.url) {
        window.location.assign(data.data.url);
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      //console.log(error);
      showErrorAlert(error.message || "Failed to proceed to payment");
    }
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
            <div className="p-4 md:p-5 rounded-xs bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800">
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
            <div className="p-4 md:p-5 rounded-xs bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border border-cyan-200 dark:border-cyan-800">
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

        {/* Date & Duration Selection Block */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              Choose Your Date & Duration
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {/* Date Selection */}
            <FormField
              control={form.control}
              name="bookingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Booking Date<span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-9 text-sm rounded-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Time Slot Selection */}
            <FormField
              control={form.control}
              name="slot"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-11 text-sm rounded-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400">
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {timeSlots.map((slot, idx) => (
                        <SelectItem key={idx} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
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
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-11 text-sm rounded-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400">
                        <SelectValue placeholder="Duration type" />
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
                    Number of{" "}
                    {durationType === "hours"
                      ? "Hours"
                      : durationType === "days"
                        ? "Days"
                        : "Hours/Days"}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!durationType || isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-11 text-sm rounded-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400">
                        <SelectValue
                          placeholder={
                            durationType
                              ? "Select quantity"
                              : "Select duration type first"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {durationType === "hours" &&
                        Array.from({ length: 23 }, (_, i) => i + 1).map(
                          (num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Hour" : "Hours"}
                            </SelectItem>
                          ),
                        )}
                      {durationType === "days" &&
                        Array.from({ length: 30 }, (_, i) => i + 1).map(
                          (num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Day" : "Days"}
                            </SelectItem>
                          ),
                        )}
                      {!durationType && (
                        <SelectItem value="0">
                          Please select a duration type first
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
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
                    onValueChange={(value) => {
                      field.onChange(value);
                      //reset district when division changes
                      form.setValue("district", "");
                    }}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-11 text-sm rounded-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400">
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
                    value={field.value}
                    disabled={!selectedDivision || isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-11 text-sm rounded-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400">
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
                    Detailed Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="House/Flat number, Street name, Landmark..."
                      {...field}
                      disabled={isSubmitting}
                      className="text-sm rounded-xs border-gray-300 dark:border-gray-600 resize-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
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
        <div className="p-5 md:p-6 rounded-xs bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 border-2 border-emerald-200 dark:border-emerald-800">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              Cost Breakdown
            </h4>
            <div className="px-2.5 md:px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Estimated
            </div>
          </div>

          {/* Cost Items */}
          <div className="space-y-3">
            <div>
              {/* Base Price */}
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  Base Service Cost
                </span>
                <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  ${basePrice.toFixed(2)}
                </span>
              </div>

              {/* Additional Cost */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200 dark:border-emerald-800">
                <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  Travel Fee {additionalCost > 0 && "(Outside Coverage)"}
                </span>
                <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  ${additionalCost.toFixed(2)}
                </span>
              </div>
            </div>
            {/* Total Cost */}
            <div className="flex items-center justify-between">
              <span className="text-base md:text-lg font-bold text-emerald-700 dark:text-emerald-400">
                Total Cost
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {totalPrice.toFixed(2)}
                </span>
                <span className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400">
                  $
                </span>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-4 pt-4">
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Based on {quantity} {durationType} of service
            </p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
              For services outside coverage areas, additional $500 as travel fee
              applies.
            </p>
          </div>
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
                          Pay 50% in Advance (${(totalPrice / 2).toFixed(2)})
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="full" id="full" />
                        <Label htmlFor="full">
                          Full Payment (${totalPrice.toFixed(2)})
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
          label="Pay Now to Confirm"
          type="submit"
          className="w-full"
        />
      </form>
    </Form>
  );
};

export default BookingForm;
