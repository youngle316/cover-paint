"use client";

import Link from "next-intl/link";
import Logo from "@/app/components/Logo";
import { Button } from "@/components/ui/button";
import ThemeSelector from "@/app/components/ThemeSelector";
import LocaleSelector from "@/app/components/LocaleSelector";

function Header() {
  return (
    <div className="flex justify-between pt-5">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-bold md:text-2xl"
      >
        <Logo />
        CoverPaint
      </Link>
      <div className="flex items-center gap-3 md:gap-6">
        <LocaleSelector />
        <ThemeSelector />
        <Button asChild className="hidden md:flex">
          <Link
            target="_blank"
            href="https://github.com/youngle316/power-chatgpt"
          >
            ⭐ Star on GitHub
          </Link>
        </Button>
        <Button asChild className="flex md:hidden">
          <Link
            target="_blank"
            href="https://github.com/youngle316/power-chatgpt"
          >
            ⭐
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
