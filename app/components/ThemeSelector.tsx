import { useTheme } from "next-themes";
import { SunMoon, Moon, Sun, Orbit } from "lucide-react";
import { useTranslations } from "next-intl";

function ThemeSelector() {
  const t = useTranslations("HomePage");

  const themes = [
    {
      label: t("system"),
      name: "system",
      icon: <Orbit className="h-4 w-4" />,
    },
    {
      label: t("dark"),
      name: "dark",
      icon: <Moon className="h-4 w-4" />,
    },
    {
      label: t("light"),
      name: "light",
      icon: <Sun className="h-4 w-4" />,
    },
  ];

  const { theme: curTheme, setTheme } = useTheme();

  return (
    <div className="group relative">
      <button className="flex items-center">
        <SunMoon className="h-5 w-5 md:h-7 md:w-7" />
      </button>
      <div
        className="absolute -right-2 z-10 mt-1 hidden w-32 rounded-lg border border-gray-100
      bg-white text-left text-sm shadow-lg group-hover:block dark:bg-black"
      >
        <div className="p-1">
          {themes.map((theme) => {
            return (
              <div
                key={theme.name}
                onClick={() => setTheme(theme.name)}
                className={`flex w-full cursor-pointer items-center rounded-md px-3 py-2 
                hover:bg-gray-100 dark:hover:bg-neutral-800 ${
                  theme.name === curTheme
                    ? "text-violet-500"
                    : "text-neutral-700 dark:text-neutral-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {theme.icon}
                  {theme.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ThemeSelector;
