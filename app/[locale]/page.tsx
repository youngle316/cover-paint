"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Slogan from "../components/Slogan";
import Cover from "@/app/components/Cover/Cover";

export default function Home() {
  const t = useTranslations("Index");
  const { setTheme } = useTheme();
  return (
    <>
      <main>
        <Slogan />
        <Cover />
      </main>
      <div className="text-blue-500 dark:text-red-500">
        {t("title")}
        <div>
          <Button onClick={() => setTheme("system")}>System</Button>
          <Button onClick={() => setTheme("dark")}>Dark</Button>
          <Button onClick={() => setTheme("light")}>Light</Button>
        </div>
      </div>
    </>
  );
}
