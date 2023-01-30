import React, { useState, useEffect } from "react";
import AuthoriseLogoDark from "../../../svges/AuthoriseLogoDark";
import AuthoriseLogoLight from "../../../svges/AuthoriseLogoLight";

function LogoDarkLight() {
  const [themeMode, setThemeMode] = useState(null);
  useEffect(() => {
    const currentTheme = localStorage.getItem("MM.theme");
    setThemeMode(currentTheme);
    document.querySelectorAll(".dark-light-mode button").forEach((item) => {
      item.addEventListener("click", (e) => {
        const currTheme = e.currentTarget.classList[0];
        setThemeMode(localStorage.getItem("MM.theme"));
      });
    });
  }, []);
  return (
    <div>
      {themeMode === "dark" ? <AuthoriseLogoDark /> : <AuthoriseLogoLight />}
    </div>
  );
}

export default LogoDarkLight;
