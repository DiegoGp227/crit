import "../../style/globals.css";
import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { SWRProvider } from "@/provider/StoreProvider";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "crit",
  description: "fullstack application",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased w-full h-screen overflow-hidden flex flex-col bg-bg text-text`}
      >
        <SWRProvider>
          <div className="flex-1 w-full flex flex-col min-h-0">
            {children}
          </div>
        </SWRProvider>
      </body>
    </html>
  );
}
