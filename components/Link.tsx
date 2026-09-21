"use client";

import NextLink from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import React from "react";

type LinkProps = React.ComponentProps<typeof NextLink>;

export default function Link({ href, ...props }: LinkProps) {
  const { language } = useLanguage();

  let localizedHref = href;
  
  if (language === "ar") {
    if (typeof href === "string" && href.startsWith("/")) {
      if (!href.startsWith("/ar/") && href !== "/ar") {
        localizedHref = href === "/" ? "/ar" : `/ar${href}`;
      }
    } else if (typeof href === "object" && href && href.pathname && href.pathname.startsWith("/")) {
      const pathname = href.pathname;
      if (!pathname.startsWith("/ar/") && pathname !== "/ar") {
        localizedHref = {
          ...href,
          pathname: pathname === "/" ? "/ar" : `/ar${pathname}`,
        };
      }
    }
  }

  return <NextLink href={localizedHref} {...props} />;
}
