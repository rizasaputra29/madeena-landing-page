import "~/styles/globals.css";

import { type Metadata } from "next";
import { Onest } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://almadeenaislamicschool.sch.id",
  ),
  title: {
    default: "Al Madeena Islamic School",
    template: "%s | Al Madeena Islamic School",
  },
  description:
    "Mewujudkan generasi global yang berkarakter Islami, cerdas, dan kompetitif.",
  keywords: [
    "Islamic School",
    "Al Madeena",
    "Sekolah Islam",
    "Education",
    "Indonesia",
    "International School",
    "Tahfizh",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Al Madeena Islamic School",
    description:
      "Mewujudkan generasi global yang berkarakter Islami, cerdas, dan kompetitif.",
    url:
      process.env.NEXT_PUBLIC_APP_URL ??
      "https://almadeenaislamicschool.sch.id",
    siteName: "Al Madeena Islamic School",
    locale: "id_ID",
    type: "website",
  },
};

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${onest.className}`} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Al Madeena" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
