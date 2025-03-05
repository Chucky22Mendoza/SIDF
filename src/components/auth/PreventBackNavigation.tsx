'use client';

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function PreventBackNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handlePopState = (event: any) => {
      const previousUrl = document.referrer;
      if (previousUrl.includes("/admin")) {
        event.preventDefault();
        router.push("/login");
      }
    };

    if (pathname === "/login") {
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, router]);

  return null;
};

export default PreventBackNavigation;
