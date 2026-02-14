"use client";

import { useState } from "react";
import { FileText, Calendar, Star } from "lucide-react";

const ServiceDetailsTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState("info");

  // Extract tab content components from children
  const tabs = [
    { id: "info", label: "Additional Information", icon: FileText },
    { id: "policy", label: "Booking Policy", icon: Calendar },
    { id: "reviews", label: "Reviews & Ratings", icon: Star },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation - Client Side */}
        <div className="flex gap-3 mb-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-xs text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer border-2 ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400 shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
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
