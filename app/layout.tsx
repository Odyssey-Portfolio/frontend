import NavBar from "@/_components/NavBar";
import SnackbarList from "@/_components/Snackbars";
import { Providers } from "@/_redux/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Odyssey Portfolio",
  description:
    "A portfolio showcasing my achievements in software development over the years.",
  icons: {
    icon: "/airplane.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarClassname = "flex flex-row justify-center";
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/airplane.ico" type="image/png" />
      </head>
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className={navbarClassname}>
            <NavBar />
          </div>
          {children}
          <SnackbarList />
        </body>
      </Providers>
    </html>
  );
}
