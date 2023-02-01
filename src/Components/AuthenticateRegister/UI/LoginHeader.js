import React from "react";
import LanguageChoose from "../../GeneralComponents/LanguageChoose";
import LoginHeaderText from "./LoginHeaderText";

function LoginHeader() {
  return (
    <header>
      <LoginHeaderText />
      <LanguageChoose />
    </header>
  );
}

export default LoginHeader;
