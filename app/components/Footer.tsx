"use client";

import React from "react";
import Logo from "@/app/components/Logo";
import Link from "next-intl/link";
import Balancer from "react-wrap-balancer";

const footers = [
  {
    title: "Contact",
    content: [
      { title: "Email", href: "mailto:youngle316@gmail.com?subject=Feedback" },
      { title: "Twitter", href: "https://twitter.com/youngle316" },
      { title: "GitHub", href: "https://github.com/youngle316" },
    ],
  },
  {
    title: "Product",
    content: [
      {
        title: "CoverPaint",
        href: "https://github.com/youngle316/cover-paint",
      },
      {
        title: "PowerChat",
        href: "https://github.com/youngle316/power-chatgpt",
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="py-10 text-sm">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold hover:text-violet-500 md:text-xl"
          >
            <Logo className="h-6 w-6" />
            CoverPaint
          </Link>
          <div className="text-sm text-neutral-500">
            <Balancer>
              Cover creation assistant, powered by Unsplash and Next.js
            </Balancer>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-10 text-left md:mt-0 md:flex md:gap-24">
          {footers.map((footer) => {
            return (
              <div key={footer.title}>
                <h3 className="font-semibold text-neutral-700">
                  {footer.title}
                </h3>
                <ul className="mt-4 space-y-2 text-neutral-500">
                  {footer.content.map((item) => {
                    return (
                      <li key={item.title} className="text-sm hover:underline">
                        <a target="_blank" href={item.href}>
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
