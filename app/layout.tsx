import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskManager",
  description: "TaskManager with React, Typescript, Tailwind, MongoDB and .NET.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
