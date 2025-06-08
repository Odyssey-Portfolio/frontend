import NavBar from "@/_components/NavBar";
import SnackbarList from "@/_components/Snackbars";
import WavyBackground from "@/_components/WavyBackground";
import { Providers } from "@/_redux/Providers";
import type { Metadata } from "next";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
  const rootClassname = `max-w-screen-sm
                      md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl`;

  return (
    <html lang="en" className={rootClassname}>
      <head>
        <link rel="icon" href="/airplane.ico" type="image/png" />
      </head>
      <Providers>
        <body className={`antialiased ${rootClassname}`}>
          <div className={navbarClassname}>
            <NavBar />
          </div>
          <WavyBackground>{children}</WavyBackground>
          <SnackbarList />
        </body>
      </Providers>
    </html>
  );
}
