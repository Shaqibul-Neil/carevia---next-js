"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/useTheme";
import React from "react";

const ToggleButton = () => {
  const { toggleTheme } = useTheme();
  return <Switch onClick={toggleTheme} className={"cursor-pointer"} />;
};

export default ToggleButton;
