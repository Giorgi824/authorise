import { useState, useEffect } from "react";
import { sha256, sha512 } from "crypto-hash";
// import { JSEncrypt } from "jsencrypt";
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
  const [trs, setTrs] = useState(false);
  const [mode, setMode] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [countryInputCode, setChosenCountryCode] = useState([]);
  const [countriesCode, setCountriesCode] = useState(false);
  const [psw, setPsw] = useState("");
  const [numberCt, setNumberCt] = useState("");
  const getCurrentTheme = () => {
    let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    let storage = localStorage.getItem("MM.theme")
      ? (theme = localStorage.getItem("MM.theme"))
      : null;
    return theme;
  };
  const handleTextInput = (val, algorithm) => {
    // Get the value
    let value = val;

    let result = "";

    // Get the current active algorithm and hash the value using it.
    if (algorithm == "sha256") {
      result = sha256(value);
    } else if (algorithm == "sha512") {
      result = sha512(value);
    }
    console.log(result);
    return result;
  };
  const test2 = (psw, username) => {
    const obj = {
      type: "login",
      username,
      platform: "web",
      hash: "",
      hash2: "",
    };
    const shaPassword = handleTextInput(psw, "sha512");
    const shaDate = handleTextInput("2021-04-28 09:15:52", "sha512");
    obj.hash = handleTextInput(`${shaPassword}${shaDate}`, "sha512");
    const shaPassword2 = handleTextInput(psw, "sha256");
    const shaDate2 = handleTextInput("2021-04-28 09:15:52", "sha256");
    obj.hash2 = handleTextInput(`${shaPassword2}${shaDate2}`, "sha256");
    Promise.all([obj.hash2, obj.hash]).then((values) => {
      console.log(values);
    });
    const publicKey = ` -----BEGIN PUBLIC KEY-----
    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApBPNy2D9usnRVw7J+gMY dY71/Nh4LZe5j9Fy10igk7Aw+J++UPL+Fs5LAJAvBUr6PfHqL+Dz9LydOHaQ3hA1 Hph5ndAglZ1jqf9JBAxoy7H6w/+eocuH1/TIEz6OySHrl0oDCbN83JNQXXjWaMkr 2ibZ+567c2MprvWUVBvpmXlUA1QwQ9V1NXPVRRkO2YX/1HwyB3PmHdILKL+L047c 9aorYJf3+eqLiysU47gkQ6NNSF/+YhkN1Phe2l8NLYWfoB0kYNxBS+qwlMmidhS4 JK1VyxQC1y/uEBnrLWaAmXIK1EUTkxbyb46ibldVIxF1NjzWb7LtxA4hqQ/6tWm6 juZHU3QFWzeh2Kc9qPlHcaO1dzS1OLE76dDYHaGkUqycH8fFEywM0waVopb+HS9W VqT27BLu8MO7o3Dd2TtvOFQFPrrWNqu41IowjC52bTmmm5bF/bS5+H/t0ngadX7k //0pqKQuL127wlk0wjNl9zNLSTliJg7YwtYbOMyUV6LJXTTy+SMraY4EGWFg7M1H r7xAAKGjoCV2jXewbyjl9b84n/bWq7D9BFWJWD6YCFn0+SjgHZZawwQOYgEWlhXe 43o+SfwaSElrbFWj4zET1B5qzarrGihkIJ3EWwbucFkMToMpakbrbWUPiAIBAn8L qHjI8ffZhqJrM/VKUtSV8PECAwEAAQ==
    -----END PUBLIC KEY----- `;
    // const encrypt = new JSEncrypt();
    // encrypt.setPublicKey(publicKey);
    // const encrypted = encrypt.encrypt(obj);
    // console.log(encrypted);
    // return encrypted;
    // return obj;
  };
  const sendAuthorise = async (e) => {
    e.preventDefault();
    try {
      const finalResult = test2(psw, `${countryInputCode.at(-1)}${numberCt}`);
      const { hash, hash2 } = finalResult;
      // console.log(hash, hash2);
      return;
      const res = await axios.post(
        "https://dev-api.mp.ge/authentication/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            soft: "mp_web_app",
            softVersion: "3.0.0",
            requestDate: "2021-04-28 09:15:52",
            language: "GE",
          },
          data: {
            encryption: test2(),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
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
  const checkInputFillment = (...args) => {
    setChosenCountryCode(args);
  };
  //regex funcs
  function regexed(regex, input) {
    if (input) {
      let regEx = new RegExp(`^(${regex})$`, "g");
      return regEx.test(input);
    } else {
      return false;
    }
  }
  useEffect(() => {
    const [numberCode, regex] = countryInputCode;
    const result = regexed(regex, numberCode);
    setCountriesCode(result);
    setNumberCt(numberCode);
    if (result && psw) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [countryInputCode, psw]);
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
              <PhoneInput onCodeInput={checkInputFillment} />
              <div className="mm-password">
                <div
                  className={`labeled-div ${
                    trs ? "bg-transparent focused" : ""
                  }`}
                >
                  <input
                    type="password"
                    placeholder="პაროლი"
                    value={psw}
                    onInput={(e) => {
                      setPsw(e.currentTarget.value);
                    }}
                    onFocus={(e) => {
                      setTrs(true);
                    }}
                    onBlur={(e) => {
                      setTrs(false);
                    }}
                  />
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
              <button
                disabled={disabledBtn ? false : true}
                onClick={sendAuthorise}
              >
                შესვლა
              </button>
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
