import Link from "next-intl/link";
import Logo from "@/app/components/Logo";
import { Button } from "@/components/ui/button";

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
      <div>
        <Button asChild>
          <Link
            target="_blank"
            href="https://github.com/youngle316/power-chatgpt"
          >
            ⭐ Star On GitHub
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
