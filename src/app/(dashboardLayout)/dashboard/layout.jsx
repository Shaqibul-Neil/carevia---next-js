import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/shared/dashboard/sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
