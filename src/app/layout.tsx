import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import NavbarHeader from "@/components/layout/NavbarHeader";

import Footer from "@/components/layout/Footer"
import { SessionProvider } from "next-auth/react";
import SessionWrapper from "@/lib/SessionWrapper";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website Name",
  description: "Website description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>,


) {
  return (


    < html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper >
          {/* <NavbarHeader /> */}
          <main>
            {children}
          </main>
          {/* <Footer /> */}
        </SessionWrapper>
      </body>
    </html >


  );
}
