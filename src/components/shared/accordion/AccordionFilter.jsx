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
            <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-md">
              <Icon className="w-3.5 h-3.5" />
            </div>

            {title}
          </div>
        </AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionFilter;
