"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const AccordionFilter = ({ title, icon: Icon, content }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title} className={"border-none"}>
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {title}
          </div>
        </AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionFilter;
