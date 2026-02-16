import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import React from "react";

/* src/app/layout.jsx */

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL),
  title: {
    default: "Carevia",
    template: "%s | Carevia",
  },
  description:
    "Care That Comes Home - Professional home care services and medical support at your doorstep.",
  keywords: [
    "Carevia",
    "Home Care",
    "Medical Services",
    "Doctor Appointment",
    "Nursing",
    "Healthcare",
  ],
  authors: [{ name: "Carevia Team" }],
  creator: "Carevia",
  publisher: "Carevia",

  // 1. ICONS (Using LOGO)
  // This sets the favicon and apple touch icon to your logo
  icons: {
    icon: "https://i.postimg.cc/wTysjpcH/Screenshot-2026-02-17-045035.png",
    shortcut: "https://i.postimg.cc/wTysjpcH/Screenshot-2026-02-17-045035.png",
    apple: "https://i.postimg.cc/wTysjpcH/Screenshot-2026-02-17-045035.png",
  },

  // 2. SOCIAL MEDIA PREVIEWS (Using BANNER)
  // This ensures the big banner appears when shared on FB/LinkedIn
  openGraph: {
    title: "Carevia - Care That Comes Home",
    description:
      "Experience professional home care services with Carevia. Reliable, compassionate, and expert medical support.",
    url: "https://carevia.vercel.app",
    siteName: "Carevia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://i.postimg.cc/yxr9r6hB/Screenshot-2026-02-17-044919.png",
        width: 1200,
        height: 630,
        alt: "Carevia Home Care Services Banner",
      },
    ],
  },

  // 3. TWITTER CARDS (Using BANNER)
  twitter: {
    card: "summary_large_image", //
    title: "Carevia - Care That Comes Home",
    description:
      "Professional home care services and medical support at your doorstep.",
    images: ["https://i.postimg.cc/yxr9r6hB/Screenshot-2026-02-17-044919.png"], // BANNER
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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
