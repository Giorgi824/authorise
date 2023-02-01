import React from "react";
import LanguageChoose from "../GeneralComponents/LanguageChoose";
import Logo from "./LandingComponents/Logo";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const enterAuth = (e) => {
    e.preventDefault();
    navigate("/userenter");
  };
  return (
    <header>
      <div className="centered-element">
        <Logo />
        <div className="language-enter">
          <a href="/authentication" className="mm-blue-btn" onClick={enterAuth}>
            შესვლა
          </a>
          <LanguageChoose />
        </div>
      </div>
    </header>
  );
}

export default Header;
