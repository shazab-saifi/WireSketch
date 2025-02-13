import type { Metadata } from "next";
// import wiresketchLogo from "@public/wiresketchLogo.png"
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "WireSketch",
  description: "Your digital canvas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="/wiresketchLogo.png" />
        <link rel="icon" href="/wiresketchLogo.png" type="image/png" />
      </head>
      <body className={montserrat.className}><meta property="og:image" content="../public/wiresketchLogo.png" /><meta property="og:image" content="../public/wiresketchLogo.png" />
        {children}
      </body>
    </html>
  );
}
