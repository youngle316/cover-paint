"use client";

import { useTranslations } from "next-intl";
import Balancer from "react-wrap-balancer";

function Slogan() {
  const t = useTranslations("HomePage");

  return (
    <div className="mx-auto my-14 cursor-default select-none md:my-28">
      <h1
        className="font-display mx-auto bg-gradient-to-br from-black to-stone-500 bg-clip-text
            pt-2 text-4xl font-bold text-transparent drop-shadow-sm dark:from-white dark:to-stone-500
            md:text-center md:text-5xl xl:text-6xl 2xl:text-7xl"
      >
        <div className="hidden md:block">
          <span>Create </span>
          <span>Cover Image</span>
          <span> in Seconds</span>
        </div>
        <div className="block md:hidden">
          <span>Create Cover Image</span>
          <br />
          <span> in Seconds</span>
        </div>
        <span>It's Super </span>
        <span className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
          Easy
        </span>
      </h1>
      <p className="mt-4 text-left text-lg text-slate-400 md:text-center">
        <Balancer>{t("slogan")}</Balancer>
      </p>
    </div>
  );
}

export default Slogan;
