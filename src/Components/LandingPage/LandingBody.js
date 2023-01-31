import React from "react";
import desktopPng from "../../img/desktop.png";
import AppLinks from "../GeneralComponents/AppLinks";
function LandingBody() {
  return (
    <main>
      <div className="mm-desk-img">
        <div className="mm-lf">
          <h1>შეუზღუდავი ონლაინ შესაძლებლობები</h1>
          <p>
            ჩამოტვირთე და გამოიყენე My Profile - ის აპლიკაცია! მართე ფინანსები,
            იყავი მუდამ კავშირზე და ისარგებლე უამრავი სერვისით ერთ სივრცეში.
          </p>
          <AppLinks />
        </div>
        <span>
          <img src={desktopPng} alt="desktop photo" />
        </span>
      </div>
    </main>
  );
}

export default LandingBody;
