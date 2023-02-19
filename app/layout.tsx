"use client"
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import Header from "./Header";
import './global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">
          <Header>
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </Header>
        </ThemeProvider>
      </body>
    </html>
  );
}
