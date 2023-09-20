"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");
  return <div>{t("title")}</div>;
}
