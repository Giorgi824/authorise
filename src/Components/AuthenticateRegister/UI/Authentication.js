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
import ExitSvg from "../../../svges/Exit";
import RedoSvg from "../../../svges/Redo";
import exclimationSvg from "../../../img/exclimation.svg";
import axios from "axios";
import SearchSvg from "../../../svges/SearchSvg";
import PhoneInput from "../../LegalEntity/UI/PhoneInput";
import BlankSpace from "../../PlainFunctions/BlankAfterThree";
import LanguageChoose from "../../GeneralComponents/LanguageChoose";

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
  const [operationId, setOperationId] = useState("");
  const [pincode, setPincode] = useState(null);
  const [crDate, setCrDate] = useState("");
  const [leftChance, setLeftChance] = useState(null);
  const [timing, setTiming] = useState(null);
  const [expiration, setExpiration] = useState(false);
  const [remainMinute, setRemainMinute] = useState("");
  const [remainSecond, setRemainSecond] = useState("");
  const [langDrop, setLangDrop] = useState(false);
  //OTP
  function handleChange(OTP) {
    setOTP(OTP);
    const lg = OTP.length;
    if (lg == 4) {
      setSendFourDigitBtn(true);
      setPincode(OTP);
    } else {
      setSendFourDigitBtn(false);
    }
    if (lg == 0) {
      // setValidDigit(true);
    }
  }
  // End of OTP
  // timer
  const [seconds, setSeconds] = useState(null);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }
  function reset() {
    setSeconds(0);
    setIsActive(false);
  }
  function timerss(second) {
    const minute = seconds % 60;
  }
  useEffect(() => {
    let interval = null;
    if (isActive) {
      setExpiration(false);
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        if (seconds > 0) {
          let remaind = Number(seconds % 60);
          const second = remaind < 10 ? (remaind = `0${remaind}`) : remaind;
          const minute = Math.floor(seconds / 60);
          setRemainMinute(minute);
          setRemainSecond(second);
        } else {
          setIsActive(false);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      setExpiration(true);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  // end of timer
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
  // encryption function
  function encryptFunc(key, objNm) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(key);
    const encrypted = encrypt.encrypt(JSON.stringify(objNm));
    return encrypted;
  }

  // function for recieving phone input value and cleaning it

  async function shaForAuthorise(sha, username, time, psw) {
    const shaUsername = await handleTextInput(username, sha);
    const shaDate = await handleTextInput(time, sha);
    const shaPsw = await handleTextInput(psw, sha);
    const results = `${shaPsw}${shaUsername}${shaDate}`;
    return results;
  }
  async function shaDigitAuthorise(
    sha,
    psw,
    pincode,
    countryInputCode,
    numberCt,
    secretKey,
    currentDate
  ) {
    const hashedPsw = await handleTextInput(psw, sha);
    const hashedPinPhoneSecret = await handleTextInput(
      `${pincode}${countryInputCode.at(-1)}${numberCt}${secretKey}`,
      sha
    );
    const hashedDate = await handleTextInput(currentDate, sha);
    const arrConcat = `${hashedPsw}${hashedPinPhoneSecret}${hashedDate}`;
    const hashedConcat = await handleTextInput(arrConcat, sha);
    return hashedConcat;
  }

  const publicKey = ` -----BEGIN PUBLIC KEY-----
    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApBPNy2D9usnRVw7J+gMY dY71/Nh4LZe5j9Fy10igk7Aw+J++UPL+Fs5LAJAvBUr6PfHqL+Dz9LydOHaQ3hA1 Hph5ndAglZ1jqf9JBAxoy7H6w/+eocuH1/TIEz6OySHrl0oDCbN83JNQXXjWaMkr 2ibZ+567c2MprvWUVBvpmXlUA1QwQ9V1NXPVRRkO2YX/1HwyB3PmHdILKL+L047c 9aorYJf3+eqLiysU47gkQ6NNSF/+YhkN1Phe2l8NLYWfoB0kYNxBS+qwlMmidhS4 JK1VyxQC1y/uEBnrLWaAmXIK1EUTkxbyb46ibldVIxF1NjzWb7LtxA4hqQ/6tWm6 juZHU3QFWzeh2Kc9qPlHcaO1dzS1OLE76dDYHaGkUqycH8fFEywM0waVopb+HS9W VqT27BLu8MO7o3Dd2TtvOFQFPrrWNqu41IowjC52bTmmm5bF/bS5+H/t0ngadX7k //0pqKQuL127wlk0wjNl9zNLSTliJg7YwtYbOMyUV6LJXTTy+SMraY4EGWFg7M1H r7xAAKGjoCV2jXewbyjl9b84n/bWq7D9BFWJWD6YCFn0+SjgHZZawwQOYgEWlhXe 43o+SfwaSElrbFWj4zET1B5qzarrGihkIJ3EWwbucFkMToMpakbrbWUPiAIBAn8L qHjI8ffZhqJrM/VKUtSV8PECAwEAAQ==
    -----END PUBLIC KEY----- `;
  const secretKey = "d31315ea127832d4c22d16a26f53b39ff1b723cac75cd327fe4f4448";
  const beforeAuthorise = async (psw, username, time) => {
    const obj = {
      type: "login",
      username,
      platform: "web",
      hash: "",
      hash2: "",
    };
    const auth1 = await shaForAuthorise("sha512", username, time, psw);
    obj.hash = await handleTextInput(auth1, "sha512");
    const auth2 = await shaForAuthorise("sha256", username, time, psw);
    obj.hash2 = await handleTextInput(auth2, "sha256");

    return obj;
  };
  const afterSendingDigit = async () => {
    const currentDate = crDate;
    const allHashed = await shaDigitAuthorise(
      "sha512",
      psw,
      pincode,
      countryInputCode,
      numberCt,
      secretKey,
      currentDate
    );
    const allHashed2 = await shaDigitAuthorise(
      "sha256",
      psw,
      pincode,
      countryInputCode,
      numberCt,
      secretKey,
      currentDate
    );
    const afterObj = {
      type: "finishLogin",
      username: `${countryInputCode.at(-1)}${numberCt}`,
      operation_id: `${operationId}`,
      hash: allHashed,
      hash2: allHashed2,
      system: "web",
      client: "dev-api.mp.ge",
      platform: "web",
      platform_version: "10.0",
      brand: "chrome",
      model: "2",
      mp_version: "2.0",
    };
    const encryptedObject = encryptFunc(publicKey, afterObj);
    const res = await axios.post(
      "https://dev-api.mp.ge/authentication/login",
      { encryption: encryptedObject },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          soft: "mp_web_app",
          softVersion: "3.0.0",
          language: "GE",
          requestDate: currentDate,
        },
      }
    );
    const { errorMessage } = res.data;
    const lastDigit = +errorMessage.at(-1);
    const digitNm = Number(lastDigit);
    if (digitNm) {
      setLeftChance(lastDigit);
      setValidDigit(false);
    } else {
      setTryContainer(false);
      setValidDigit(true);
      // setExpiration(true);
      // setSeconds(timing);
      // setIsActive(true);
    }
  };
  const sendAuthorise = async (e) => {
    const currentTime = getFormatedDate();
    try {
      const finalResult = await beforeAuthorise(
        psw,
        `${countryInputCode.at(-1)}${numberCt}`,
        currentTime
      );
      const encryptedObject = encryptFunc(publicKey, finalResult);
      const res = await axios.post(
        "https://dev-api.mp.ge/authentication/login",
        { encryption: encryptedObject },
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
      let expire;
      if (res.data.data) {
        expire = res.data.data.expire;
        // expire = 70;
      }
      // res.data.data ? ({ expire } = res.data.data) : null;
      // const { expire } = res.data.data;

      // console.log(res.data.data.operation_id);
      const errorCodeCheck = errorCode === 0 ? true : false;
      if (errorCodeCheck) {
        setOperationId(res.data.data.operation_id);
        setCrDate(currentTime);
        // console.log(expire);
        // setSeconds(11);
        setSeconds(expire);
        setIsActive(true);
      }
      setCheckPasswordName(errorCodeCheck);
      setAuthContainer(errorCodeCheck);
    } catch (error) {
      console.log(error);
    }
  };
  const shemdegiBtn = async (e) => {
    const currentTime = getFormatedDate();
    try {
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
          <LanguageChoose />
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
                  chPswLg={psw}
                  errorFunc={setCheckPasswordName}
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
                        if (
                          countryInputCode[0].length == 0 &&
                          e.target.value == ""
                        ) {
                          setCheckPasswordName(true);
                        }
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
                    // setAuthContainer(!checkPasswordName);
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
                  <small
                    className="mm-clean-inputs"
                    onClick={() => {
                      setCheckPasswordName(true);
                      setAuthContainer(false);
                      setPsw("");
                      setIsActive(false);
                    }}
                  >
                    <ExitSvg />
                  </small>
                </div>
                <div
                  className={`mm-code-tryout ${tryContainer ? "" : "active"}`}
                >
                  <div className="mm-timer">
                    <div
                      className={`mm-phone-error both-error ${
                        expiration ? "" : "active"
                      }`}
                    >
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
                    <div
                      className={`mm-resend-digits ${
                        expiration ? "" : "active"
                      }`}
                    >
                      <small>კოდის მოთხოვნა შესაძლებელია</small>
                      <div>{`${remainMinute}:${remainSecond}`}</div>
                    </div>
                  </div>
                  <div className={`mm-no-timer ${expiration ? "active" : ""}`}>
                    <span>ლოდინის დრო გავიდა</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        sendAuthorise();
                        setTryContainer(true);
                        setValidDigit(true);
                        setOTP();
                        document
                          .querySelector(".otp-input>div>div:first-child input")
                          .focus();
                      }}
                    >
                      მოითხოვე კოდი
                    </button>
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
                      დარჩა {leftChance} მცდელობა
                    </span>
                    <div className={`otp-input ${validDigit ? "" : "reddish"}`}>
                      <OtpInput
                        onChange={handleChange}
                        value={OTP}
                        numInputs={4}
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
                    onClick={(e) => {
                      e.preventDefault();
                      afterSendingDigit();
                    }}
                  >
                    შემდეგი
                  </button>
                  <div
                    className={`mm-resend-digits ${
                      tryContainer ? "active" : ""
                    }`}
                  >
                    <p>არ მიგიღიათ კოდი?</p>
                    <span
                      onClick={() => {
                        setOTP();
                        setValidDigit(true);
                        sendAuthorise();
                      }}
                    >
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
