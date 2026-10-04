import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"

//  TRPC
import { TRPCReactProvider } from "@/trpc/client"

const manropeFont = Manrope({
  variable: "--font-manrope-font",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Stardust AI",
  description: "Get AI agents into your meetings and calls.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <TRPCReactProvider>
      <html
        lang="en"
        className={`${manropeFont.variable} ${inter.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Toaster />
          {children}
        </body>
      </html>
    </TRPCReactProvider>
  );
}
