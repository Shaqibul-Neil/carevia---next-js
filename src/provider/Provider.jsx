import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import NextAuthProvider from "./NextAuthProvider";

const Provider = ({ children }) => {
  return (
    <NextAuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </NextAuthProvider>
  );
};

export default Provider;
