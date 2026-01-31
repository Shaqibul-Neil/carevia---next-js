import Header from "@/components/shared/Header/Header";
import React from "react";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default CommonLayout;
