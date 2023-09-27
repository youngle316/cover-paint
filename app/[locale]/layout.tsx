import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import { ThemeProvider } from "@/app/components/providers/ThemeProvider";
import Header from "@/app/components/Header";
import { Lexend } from "next/font/google";
import Footer from "@/app/components/Footer";

const lexend = Lexend({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const ogImage =
  "https://tohvlvtcdfndxfxeeeaa.supabase.co/storage/v1/object/public/my-website/assets/cover.png";

export const metadata: Metadata = {
  title: "Cover Paint",
  description: "Cover Paint - Create Cover Image in Seconds - It's Super Easy",
  authors: [{ url: "https://xiaole.site", name: "xiaole" }],
  keywords: "cover, paint, image, create, easy, super, seconds, xiaole",
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
  openGraph: {
    title: {
      default: "Cover Paint",
      template: "%s | xiaole",
    },
    description:
      "Cover Paint - Create Cover Image in Seconds - It's Super Easy",
    siteName: "Cover Paint",
    locale: "zh_CN",
    type: "website",
    url: "https://coverpaint.xiaole.site",
    images: [
      {
        url: ogImage,
        width: 1920,
        height: 1440,
      },
    ],
  },
  twitter: {
    site: "https://twitter.com/youngle316",
    card: "summary_large_image",
    title: "Cover Paint - xiaole",
    description:
      "Cover Paint | Create Cover Image in Seconds - It's Super Easy",
    images: [ogImage],
  },
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={`${lexend.className} bg-slate-50 dark:bg-slate-950`}>
        <Analytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <div className="absolute inset-x-0 top-0 z-0 h-[400px] bg-gradient-to-b from-violet-100 to-slate-50 dark:from-violet-900 dark:to-slate-950"></div>
            <div className="relative mx-auto max-w-7xl px-5">
              <header>
                <Header />
              </header>
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
