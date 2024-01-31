import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavigationHeader from "./shared/components/navigation-header";
import { ReduxProvider } from "@/redux/provider";

const inter = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Event.IO",
  description: "Generate a event countdown timer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <NavigationHeader />
          <main className="flex flex-col items-center pr-40 pl-40 pt-4 text-center">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
