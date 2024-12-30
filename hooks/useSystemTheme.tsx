import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { BaseThemeTaggedType } from "@clerk/types";

export default function useAppTheme() {
  const [theme, setTheme] = useState<BaseThemeTaggedType | undefined>(
    undefined
  );
  const { systemTheme } = useTheme();

  useEffect(() => {
    if (systemTheme === "dark") {
      setTheme(dark);
    } else {
      setTheme(undefined);
    }
  }, [theme]);

  return { theme, setTheme };
}
