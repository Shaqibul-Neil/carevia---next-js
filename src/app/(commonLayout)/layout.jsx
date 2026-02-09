import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import React from "react";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
