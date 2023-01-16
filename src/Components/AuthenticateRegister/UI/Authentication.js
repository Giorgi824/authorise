import { useState, useEffect } from "react";
import "../../../styles/css/authentication.css";
import "../../../styles/css/languageStyle.css";
import AuthoriseLogoLight from "../../../svges/AuthoriseLogoLight";
import AuthoriseLogoDark from "../../../svges/AuthoriseLogoDark";
import MoonSvg from "../../../svges/MoonSvg";
import SunSvg from "../../../svges/SunSvg";
import CheckSvg from "../../../img/check.svg";
import LangSymbol from "../../../svges/LangSymbol";
import ArrowSvg from "../../../svges/ArrowSvg";
import EngSvg from "../../../img/eng.svg";
import RusSvg from "../../../img/rus.svg";
import GeoSvg from "../../../img/geo.svg";
import markSvg from "../../../img/mark.svg";
import exclimationSvg from "../../../img/exclimation.svg";
import axios from "axios";
import SearchSvg from "../../../svges/SearchSvg";
import PhoneInput from "../../LegalEntity/UI/PhoneInput";
const Authentication = () => {
  const [mode, setMode] = useState(null);
  const getCurrentTheme = () => {
    let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    let storage = localStorage.getItem("MM.theme")
      ? (theme = localStorage.getItem("MM.theme"))
      : null;
    return theme;
  };
  useEffect(() => {
    const res = getCurrentTheme();
    loadTheme(res);
  }, []);
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
    <main className="mm-authenticate">
      <aside>
        <div className="mp-aside-upper">
          <div className="mp-logo">
            <span>
              {mode === "dark" ? <AuthoriseLogoDark /> : <AuthoriseLogoLight />}
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
          <p>© 2009-2022 LLC Money Movers</p>
        </div>
      </aside>
      <section>
        <header>
          <div className="mp-condition">
            <div className="mp-registration">
              არ ხარ ავტორიზირებული?
              <span>დარეგისტრირდი</span>
            </div>
            <div className="mp-authorization">
              ავტორიზირებული ხარ?
              <span>ავტორიზაცია</span>
            </div>
          </div>
          <div className="mm-lang">
            <div className="mm-lang__current">
              <div className="mm-lang__symbol">
                <span className="mm-lang__icon">
                  <LangSymbol />
                </span>
                <span className="mm-lang__lang">ქარ</span>
              </div>
              <span className="mm-lang__arrow">
                <ArrowSvg />
              </span>
            </div>
            <div className="mm-lang__choose">
              <a href="en" data-short="ENG">
                <img src={EngSvg} alt="eng flag" /> English
                <span className="mark-icon">
                  <img src={markSvg} alt="" />
                </span>
              </a>
              <a href="ge" data-short="ქარ" className="active">
                <img src={GeoSvg} alt="geo flag" /> ქართული
                <span className="mark-icon">
                  <img src={markSvg} alt="" />
                </span>
              </a>
              <a href="ru" data-short="RUS">
                <img src={RusSvg} alt="rus flag" /> Русский
                <span className="mark-icon">
                  <img src={markSvg} alt="" />
                </span>
              </a>
            </div>
          </div>
        </header>
        <div className="mp-body">
          <div className="mp-body__child">
            <h1>ავტორიზაცია</h1>
            <span>შეუზღუდავი ონლაინ შესაძლებლობები</span>
            <form>
              <PhoneInput />
              <div className="mm-password">
                <div className="labeled-div">
                  <input type="password" placeholder="პაროლი" />
                </div>
              </div>
              <div className="mm-forget-password">
                <span>დაგავიწყდა პაროლი?</span>
              </div>
              <div className="mm-phone-error both-error">
                <div className="mm-phone-error__text">
                  <img src={exclimationSvg} alt="warning sign icon" />
                  <span>ტელეფონის ნომერი ან პაროლი არასწორია</span>
                  <div className="tooltip">
                    <p>
                      ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია
                      მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი .
                    </p>
                  </div>
                </div>
              </div>
              <button disabled>შესვლა</button>
            </form>
            <p>
              ეს საიტი დაცულია MM.ge-ით და Google-ის კონფიდენციალურობის
              პოლიტიკით.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Authentication;
