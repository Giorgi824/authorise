import React from "react";
import ThemeChoose from "../../GeneralComponents/ThemeChoose";
import LogoDarkLight from "./LogoDarkLight";
import CheckSvg from "../../../img/check.svg";
import { useNavigate } from "react-router-dom";
function EnterSidebar() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <aside>
      <div className="mp-aside-upper">
        <div className="mp-logo">
          <span onClick={navigateHome}>
            <LogoDarkLight />
          </span>
          <div>My Profile</div>
        </div>
        <ul>
          <li>
            <img src={CheckSvg} alt="check icon" />
            <span>საფულის შევსება</span>
          </li>
          <li>
            <img src={CheckSvg} alt="check icon" />
            <span>კომუნალური და სხვა გადახდები</span>
          </li>
          <li>
            <img src={CheckSvg} alt="check icon" />
            <span>სხვა არაფინანსური მომსახურება</span>
          </li>
          <li>
            <img src={CheckSvg} alt="check icon" />
            <span>ჩათი</span>
          </li>
        </ul>
      </div>
      <div className="mp-aside-bottom">
        <ThemeChoose />
        <p>© 2009-2023 LLC Money Movers</p>
      </div>
    </aside>
  );
}

export default EnterSidebar;
