import { useTranslations, useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { useTransition } from "react";
import { usePathname, useRouter } from "next-intl/client";

function LocaleSelector() {
  const t = useTranslations("HomePage");

  const locale = useLocale();
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const locales = [
    {
      label: `🇨🇳 ${t("chinese")}`,
      name: "zh",
    },
    {
      label: `🇺🇸 ${t("english")}`,
      name: "en",
    },
  ];

  const localeChange = (locale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div className="group relative">
      <button className="flex items-center">
        <Languages className="h-5 w-5 md:h-7 md:w-7" />
      </button>
      <div
        className="absolute -right-2 z-10 -mt-1 hidden w-32 rounded-lg border border-gray-100
      bg-white text-left text-sm shadow-lg group-hover:block dark:bg-black"
      >
        <div className="p-1">
          {locales.map((item) => {
            return (
              <div
                key={item.name}
                onClick={() => localeChange(item.name)}
                className={`flex w-full cursor-pointer items-center rounded-md px-3 py-2 
                hover:bg-gray-100 dark:hover:bg-neutral-800 ${
                  item.name === locale
                    ? "text-violet-500"
                    : "text-neutral-700 dark:text-neutral-300"
                }`}
              >
                <div className="flex items-center gap-2">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LocaleSelector;
