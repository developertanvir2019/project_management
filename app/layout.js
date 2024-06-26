import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-center">
          <ReactQueryProvider>
            <div style={{ maxWidth: "1200px" }} className="w-full">
              <Navbar />
              {children}
            </div>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
