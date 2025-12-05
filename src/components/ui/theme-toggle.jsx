"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-9 h-9"
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 border-[#4DB8AC]/30 dark:border-[#4DB8AC]/40 bg-gradient-to-br from-[#4DB8AC]/5 to-[#1E6B8C]/5 dark:bg-gradient-to-br dark:from-[#1E6B8C]/10 dark:to-[#4DB8AC]/10 hover:bg-[#4DB8AC]/10 dark:hover:bg-[#4DB8AC]/20"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-[#4DB8AC] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-[#1E6B8C] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
