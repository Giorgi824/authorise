import React from "react";
import LanguageChoose from "../GeneralComponents/LanguageChoose";
import Logo from "./LandingComponents/Logo";
function Header() {
  return (
    <header>
      <div className="centered-element">
        <Logo />
        <div className="language-enter">
          <a href="/authentication" className="mm-blue-btn">
            შესვლა
          </a>
          <LanguageChoose />
        </div>
      </div>
    </header>
  );
}

export default Header;
