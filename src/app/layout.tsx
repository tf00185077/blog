import type { Metadata } from "next";
import Header from "./components/header";
import localFont from "next/font/local";
import "../scss/globals.css";

const geistSans = localFont({
  src: "../scss/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../scss/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-outer`}>
        <div className="max-w-[1600px] mx-auto bg-bg-main">
          <Header />
          <div className="">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
