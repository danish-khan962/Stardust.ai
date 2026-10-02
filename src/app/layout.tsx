import type { Metadata } from "next";
import { Roboto_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"

const robotoMono = Roboto_Mono({
  variable: "--font-robotoMono",
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
    <html
      lang="en"
      className={`${robotoMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
