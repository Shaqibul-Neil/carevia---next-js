"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NewsLetterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto overflow-hidden rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-lg mt-8 mb-4"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="h-12 border-0 rounded-none bg-white dark:bg-slate-900 px-6 focus-visible:ring-0"
        required
      />
      <Button
        type="submit"
        className="h-12 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white font-semibold text-lg shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 dark:hover:shadow-emerald-500/30 rounded-none cursor-pointer"
      >
        Subscribe
      </Button>
    </form>
  );
};

export default NewsLetterForm;
