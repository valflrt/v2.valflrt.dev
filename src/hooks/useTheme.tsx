import { useEffect, useState } from "react";

let useTheme = () => {
  let [theme, setTheme] = useState<string>(
    localStorage.getItem("color_theme") ?? "light"
  );

  useEffect(() => {
    localStorage.setItem("color_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  let switchTheme = () => {
    setTheme((old) => (old === "light" ? "dark" : "light"));
  };

  return [theme, switchTheme] as ["light" | "dark", () => void];
};

export default useTheme;
