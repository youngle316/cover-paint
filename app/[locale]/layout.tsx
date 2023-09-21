import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { ThemeProvider } from "@/app/components/providers/ThemeProvider";
import Header from "@/app/components/Header";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: "Cover Paint",
  description: "Cover Paint",
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
      <body className="bg-slate-50 dark:bg-slate-950">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <div className="absolute inset-x-0 top-0 z-0 h-[400px] bg-gradient-to-b from-violet-100 to-slate-50 dark:from-violet-900 dark:to-slate-950"></div>
            <div className="relative mx-auto max-w-7xl px-5">
              <header>
                <Header />
              </header>
              {children}
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
