import { useState, useEffect } from "react";
import { sha256, sha512 } from "crypto-hash";
import OtpInput from "react-otp-input";
import JSEncrypt from "jsencrypt";
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
import ExitSvg from "../../../svges/Exit";
import RedoSvg from "../../../svges/Redo";
import exclimationSvg from "../../../img/exclimation.svg";
import axios from "axios";
import SearchSvg from "../../../svges/SearchSvg";
import PhoneInput from "../../LegalEntity/UI/PhoneInput";
import BlankSpace from "../../PlainFunctions/BlankAfterThree";
const Authentication = () => {
  // dublicated function
  const getFormatedDate = () => {
    const date = new Date();
    const monthCompare = date.getMonth() + 1;
    const minuteCompare = date.getMinutes();
    const hourCompare = date.getHours();
    const secondCompare = date.getSeconds();
    const dayCompare = date.getDate();
    const year = date.getFullYear();
    const month = monthCompare < 10 ? `0${monthCompare}` : monthCompare;
    const day = dayCompare < 10 ? `0${dayCompare}` : dayCompare;
    const hours = hourCompare < 10 ? `0${hourCompare}` : hourCompare;
    const minutes = minuteCompare < 10 ? `0${minuteCompare}` : minuteCompare;
    const seconds = secondCompare < 10 ? `0${secondCompare}` : secondCompare;
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  const [trs, setTrs] = useState(false);
  const [mode, setMode] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [countryInputCode, setChosenCountryCode] = useState([]);
  const [countriesCode, setCountriesCode] = useState(false);
  const [psw, setPsw] = useState("");
  const [numberCt, setNumberCt] = useState("");
  const [checkPasswordName, setCheckPasswordName] = useState(true);
  const [OTP, setOTP] = useState("");
  const [authContainer, setAuthContainer] = useState(false);
  const [tryContainer, setTryContainer] = useState(true);
  const [sendFourDigitBtn, setSendFourDigitBtn] = useState(false);
  const [validDigit, setValidDigit] = useState(true);
  function handleChange(OTP) {
    setOTP(OTP);
    const lg = OTP.length;
    if (lg == 4) {
      setSendFourDigitBtn(true);
    } else {
      setSendFourDigitBtn(false);
    }
  }
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
    return result;
  };

  // check username password validity
  function passwordNameValid(cl) {
    return checkPasswordName ? "" : cl;
  }

  const publicKey = ` -----BEGIN PUBLIC KEY-----
    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApBPNy2D9usnRVw7J+gMY dY71/Nh4LZe5j9Fy10igk7Aw+J++UPL+Fs5LAJAvBUr6PfHqL+Dz9LydOHaQ3hA1 Hph5ndAglZ1jqf9JBAxoy7H6w/+eocuH1/TIEz6OySHrl0oDCbN83JNQXXjWaMkr 2ibZ+567c2MprvWUVBvpmXlUA1QwQ9V1NXPVRRkO2YX/1HwyB3PmHdILKL+L047c 9aorYJf3+eqLiysU47gkQ6NNSF/+YhkN1Phe2l8NLYWfoB0kYNxBS+qwlMmidhS4 JK1VyxQC1y/uEBnrLWaAmXIK1EUTkxbyb46ibldVIxF1NjzWb7LtxA4hqQ/6tWm6 juZHU3QFWzeh2Kc9qPlHcaO1dzS1OLE76dDYHaGkUqycH8fFEywM0waVopb+HS9W VqT27BLu8MO7o3Dd2TtvOFQFPrrWNqu41IowjC52bTmmm5bF/bS5+H/t0ngadX7k //0pqKQuL127wlk0wjNl9zNLSTliJg7YwtYbOMyUV6LJXTTy+SMraY4EGWFg7M1H r7xAAKGjoCV2jXewbyjl9b84n/bWq7D9BFWJWD6YCFn0+SjgHZZawwQOYgEWlhXe 43o+SfwaSElrbFWj4zET1B5qzarrGihkIJ3EWwbucFkMToMpakbrbWUPiAIBAn8L qHjI8ffZhqJrM/VKUtSV8PECAwEAAQ==
    -----END PUBLIC KEY----- `;
  const test2 = async (psw, username, time) => {
    const obj = {
      type: "login",
      username,
      platform: "web",
      hash: "",
      hash2: "",
    };
    const shaUsername = await handleTextInput(username, "sha512");
    const shaDate = await handleTextInput(time, "sha512");
    const shaPsw = await handleTextInput(psw, "sha512");
    obj.hash = await handleTextInput(
      `${shaPsw}${shaUsername}${shaDate}`,
      "sha512"
    );
    const shaUsername2 = await handleTextInput(psw, "sha256");
    const shaDate2 = await handleTextInput(time, "sha256");
    const shaPsw2 = await handleTextInput(psw, "sha256");
    obj.hash2 = await handleTextInput(
      `${shaPsw2}${shaUsername2}${shaDate2}`,
      "sha256"
    );

    return obj;
  };
  const sendAuthorise = async (e) => {
    const currentTime = getFormatedDate();
    try {
      const finalResult = await test2(
        psw,
        `${countryInputCode.at(-1)}${numberCt}`,
        currentTime
      );
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      const encrypted = encrypt.encrypt(JSON.stringify(finalResult));
      const res = await axios.post(
        "https://dev-api.mp.ge/authentication/login",
        { encryption: encrypted },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            soft: "mp_web_app",
            softVersion: "3.0.0",
            language: "GE",
            requestDate: currentTime,
          },
        }
      );
      const { errorCode } = res.data;
      console.log(errorCode);
      setCheckPasswordName(errorCode == 0 ? true : false);
    } catch (error) {
      console.log(error);
    }
  };

  function userPhoneExit() {
    if (!numberCt) return;
    const firstThree = numberCt.slice(0, 3);
    const lastTwo = numberCt.slice(-2);
    const res = numberCt.length - 5 > 0 ? true : false;
    if (res) {
      const x = numberCt
        .slice(3, numberCt.length - 2)
        .replaceAll(/[0-9]/g, "x");
      return (
        <span>{`+${countryInputCode.at(-1)}${firstThree}${x}${lastTwo}`}</span>
      );
    }
  }

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
              <div className={`authorising ${authContainer ? "" : "active"}`}>
                <PhoneInput
                  onCodeInput={checkInputFillment}
                  checkingFc={passwordNameValid}
                  checkingBoolean={checkPasswordName}
                />
                <div className="mm-password">
                  <div
                    className={`labeled-div ${
                      trs ? "bg-transparent focused" : ""
                    } ${passwordNameValid("error")}`}
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
                <div
                  className={`mm-phone-error both-error ${passwordNameValid(
                    "active"
                  )}`}
                >
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
                  onClick={(e) => {
                    e.preventDefault();
                    sendAuthorise();
                    setAuthContainer(true);
                  }}
                >
                  შესვლა
                </button>
              </div>
              <div className={`authorised ${authContainer ? "active" : ""}`}>
                <div className="labeled-div">
                  <span className="entered-phone">
                    {numberCt ? BlankSpace(numberCt) : ""}
                  </span>
                  <ExitSvg />
                </div>
                <div
                  className={`mm-code-tryout ${tryContainer ? "" : "active"}`}
                >
                  <div className="mm-timer">
                    <div className={`mm-phone-error both-error`}>
                      <div className="mm-phone-error__text">
                        <img src={exclimationSvg} alt="warning sign icon" />
                        <span>მცდელობების რაოდენობა ამოიწურა</span>
                        <div className="tooltip">
                          <p>
                            ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს
                            შეუძლია მკითხველის ყურადღება მიიზიდოს და დიზაინის
                            აღქმაში ხელი .
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mm-resend-digits">
                      <small>კოდის მოთხოვნა შესაძლებელია</small>
                      <div>
                        2<span>:</span>56
                      </div>
                    </div>
                  </div>
                  <div className="mm-no-timer">
                    <span>ლოდინის დრო გავიდა</span>
                    <button>მოითხოვე კოდი</button>
                  </div>
                </div>
                <div
                  className={`mm-code-input ${tryContainer ? "active" : ""}`}
                >
                  <div className="user-txt">
                    მითითებულ ტელ.ნომერზე
                    {userPhoneExit()}
                    გამოიგზავნა 4 ნიშნა კოდი
                  </div>
                  <div className="digit-texts">
                    <span className={`${validDigit ? "" : "active"}`}>
                      დარჩა 2 მცდელობა
                    </span>
                    <div className="otp-input">
                      <OtpInput
                        onChange={handleChange}
                        value={OTP}
                        numInputs={4}
                        className={`${validDigit ? "" : "reddish"}`}
                      />
                    </div>
                  </div>
                  <div
                    className={`mm-phone-error ${validDigit ? "" : "active"}`}
                  >
                    <div className="mm-phone-error__text">
                      <img src={exclimationSvg} alt="warning sign icon" />
                      <span>თქვენ მიერ შეყვანილი კოდი არასწორია</span>
                      <div className="tooltip">
                        <p>
                          ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია
                          მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={sendFourDigitBtn ? false : true}
                    onClick={() => {}}
                  >
                    შემდეგი
                  </button>
                  <div className="mm-resend-digits">
                    <p>არ მიგიღიათ კოდი?</p>
                    <span>
                      <RedoSvg />
                      მოთხოვნა
                    </span>
                  </div>
                </div>
              </div>
            </form>
            <p className={`mm-txt ${authContainer ? "" : "active"}`}>
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
