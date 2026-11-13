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
  } else if (language === "hi") {
    if (typeof href === "string" && href.startsWith("/")) {
      if (!href.startsWith("/hi/") && href !== "/hi") {
        localizedHref = href === "/" ? "/hi" : `/hi${href}`;
      }
    } else if (typeof href === "object" && href && href.pathname && href.pathname.startsWith("/")) {
      const pathname = href.pathname;
      if (!pathname.startsWith("/hi/") && pathname !== "/hi") {
        localizedHref = {
          ...href,
          pathname: pathname === "/" ? "/hi" : `/hi${pathname}`,
        };
      }
    }
  } else if (language === "es") {
    if (typeof href === "string" && href.startsWith("/")) {
      if (!href.startsWith("/es/") && href !== "/es") {
        localizedHref = href === "/" ? "/es" : `/es${href}`;
      }
    } else if (typeof href === "object" && href && href.pathname && href.pathname.startsWith("/")) {
      const pathname = href.pathname;
      if (!pathname.startsWith("/es/") && pathname !== "/es") {
        localizedHref = {
          ...href,
          pathname: pathname === "/" ? "/es" : `/es${pathname}`,
        };
      }
    }
  } else if (language === "pt") {
    if (typeof href === "string" && href.startsWith("/")) {
      if (!href.startsWith("/pt/") && href !== "/pt") {
        localizedHref = href === "/" ? "/pt" : `/pt${href}`;
      }
    } else if (typeof href === "object" && href && href.pathname && href.pathname.startsWith("/")) {
      const pathname = href.pathname;
      if (!pathname.startsWith("/pt/") && pathname !== "/pt") {
        localizedHref = {
          ...href,
          pathname: pathname === "/" ? "/pt" : `/pt${pathname}`,
        };
      }
    }
  } else if (language === "fr") {
    if (typeof href === "string" && href.startsWith("/")) {
      if (!href.startsWith("/fr/") && href !== "/fr") {
        localizedHref = href === "/" ? "/fr" : `/fr${href}`;
      }
    } else if (typeof href === "object" && href && href.pathname && href.pathname.startsWith("/")) {
      const pathname = href.pathname;
      if (!pathname.startsWith("/fr/") && pathname !== "/fr") {
        localizedHref = {
          ...href,
          pathname: pathname === "/" ? "/fr" : `/fr${pathname}`,
        };
      }
    }
  } else if (language === "ru") {
    if (typeof href === "string" && href.startsWith("/")) {
      if (!href.startsWith("/ru/") && href !== "/ru") {
        localizedHref = href === "/" ? "/ru" : `/ru${href}`;
      }
    } else if (typeof href === "object" && href && href.pathname && href.pathname.startsWith("/")) {
      const pathname = href.pathname;
      if (!pathname.startsWith("/ru/") && pathname !== "/ru") {
        localizedHref = {
          ...href,
          pathname: pathname === "/" ? "/ru" : `/ru${pathname}`,
        };
      }
    }
  }

  return <NextLink href={localizedHref} {...props} />;
}
