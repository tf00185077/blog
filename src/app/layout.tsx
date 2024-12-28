import type { Metadata } from "next";
import Header from "./(web)/_components/Header";
import localFont from "next/font/local";
import { Provider } from "@/components/ui/provider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-outer min-h-[100dvh]`}>
        <Provider>
          <div className="flex flex-col max-w-[1600px] mx-auto bg-bg-main min-h-[100dvh]">
            <Header />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
