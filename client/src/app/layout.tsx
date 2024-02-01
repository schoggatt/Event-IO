import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavigationHeader from "./shared/components/navigation-header";
import { ReduxProvider } from "@/redux/provider";
import AuthProviders from "./auth/auth-provider";
import App from "./app";

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
        <AuthProviders>
          <ReduxProvider>
            <NavigationHeader />
            <App>{children}</App>
          </ReduxProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
