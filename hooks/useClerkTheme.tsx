"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { BaseThemeTaggedType } from "@clerk/types";

export default function useClerkTheme() {
  const { theme } = useTheme();

  const [clerkTheme, setClerkTheme] = useState<BaseThemeTaggedType | undefined>(
    undefined
  );

  useEffect(() => {
    const hasSystemDarkMode =
      theme === "system" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    setClerkTheme(theme === "dark" || hasSystemDarkMode ? dark : undefined);
  }, [theme]);

  return { clerkTheme, setClerkTheme };
}
