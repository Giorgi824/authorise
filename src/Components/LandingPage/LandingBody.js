import React, { useState, useEffect } from "react";
import desktopPng from "../../img/desktop.png";
import desktopDarkPng from "../../img/desktop-dark.png";
import AppLinks from "../GeneralComponents/AppLinks";
function LandingBody() {
  const [themeMode, setThemeMode] = useState(null);
  useEffect(() => {
    const currentTheme = localStorage.getItem("MM.theme");
    setThemeMode(currentTheme);
    document.querySelectorAll(".dark-light-mode button").forEach((item) => {
      item.addEventListener("click", (e) => {
        const currTheme = e.currentTarget.classList[0];
        localStorage.setItem("MM.theme", currTheme);
        setThemeMode(localStorage.getItem("MM.theme"));
      });
    });
  }, []);
  return (
    <main>
      <div className="mm-desk-img">
        <div className="mm-lf">
          <div className="mm-lf-title">შეუზღუდავი ონლაინ შესაძლებლობები</div>
          <p>
            ჩამოტვირთე და გამოიყენე My Profile - ის აპლიკაცია! მართე ფინანსები,
            იყავი მუდამ კავშირზე და ისარგებლე უამრავი სერვისით ერთ სივრცეში.
          </p>
          <AppLinks />
        </div>
        <span>
          <img
            src={themeMode === "dark" ? desktopDarkPng : desktopPng}
            alt="desktop photo"
          />
        </span>
      </div>
    </main>
  );
}

export default LandingBody;
