import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/provider/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: { default: "Carevia", template: "%s - Carevia" },
  description: "Care That Comes Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
