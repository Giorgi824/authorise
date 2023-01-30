import React, { useEffect, useState } from "react";
import MoonSvg from "../../svges/MoonSvg";
import SunSvg from "../../svges/SunSvg";
function ThemeChoose() {
  const [mode, setMode] = useState(null);
  useEffect(() => {
    const res = getCurrentTheme();
    loadTheme(res);
  }, []);
  const getCurrentTheme = () => {
    let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    let storage = localStorage.getItem("MM.theme")
      ? (theme = localStorage.getItem("MM.theme"))
      : null;
    return theme;
  };
  const loadTheme = (theme) => {
    const root = document.querySelector(":root");
    root.setAttribute("color-scheme", theme);
    setMode(theme);
  };
  const btnFunc = function (e) {
    const currClass = e.currentTarget.classList[0];
    localStorage.setItem("MM.theme", currClass);
    loadTheme(currClass);
  };
  return (
    <div className="dark-light-mode">
      <div>
        <div className="mm-btn-div mm-light">
          <button
            onClick={function (e) {
              btnFunc(e);
            }}
            className="light"
            role="mode switch"
            arial-label="light mode"
            data-svg="sunSvg"
          >
            <SunSvg />
            <span data-text="lightMode">ღია</span>
          </button>
        </div>
        <div className="mm-btn-div mm-dark">
          <button
            onClick={function (e) {
              btnFunc(e);
            }}
            className="dark"
            role="mode switch"
            arial-label="dark mode"
            data-svg="moonSvg"
          >
            <MoonSvg />
            <span data-text="darkMode">მუქი</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThemeChoose;
