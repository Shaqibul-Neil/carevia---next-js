"use client";

import { useState } from "react";

const ServiceDetailsTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState("info");

  // Extract tab content components from children
  const tabs = [
    { id: "info", label: "Additional Information" },
    { id: "policy", label: "Booking Policy" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation - Client Side */}
        <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content - Server Components */}
        <div>
          {activeTab === "info" && children[0]}
          {activeTab === "policy" && children[1]}
          {activeTab === "reviews" && children[2]}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsTabs;
