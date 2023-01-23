import React, { useState, useRef, useEffect, useCallback } from "react";
import BlankSpace from "../../PlainFunctions/BlankAfterThree";
import ArrowSvg from "../../../svges/ArrowSvg";
import SearchSvg from "../../../svges/SearchSvg";
import exclimationSvg from "../../../img/exclimation.svg";
import axios from "axios";
function PhoneInput({ onCodeInput, checkingFc }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneToggle, setPhoneToggle] = useState(false);
  const [phoneCodeList, setPhoneCodeList] = useState([]);
  const [staticPhoneCodeList, setStaticPhoneCodeList] = useState();
  const [chosenCountryCode, setChosenCountryCode] = useState({});
  const [debounceCode, setDebounceCode] = useState("");
  const [errorDrop, setErrorDrop] = useState(true);
  const [focusedInput, setFocusedInput] = useState(false);
  const handleChange = (result) => setDebounceCode(result);
  const debounce = (func, delay = 1500) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  };
  const optimizedFn = useCallback(debounce(handleChange), []);
  // end of debounce function

  function activatedCode(country, attr) {
    phoneCodeList.map((country) => {
      country.code === attr
        ? (country.isActive = true)
        : (country.isActive = false);
    });
  }
  function emptyCountryInput(input) {
    const curr = input.current.value;
    const filteredCountry = staticPhoneCodeList.filter((item, idx) => {
      return item.isocode.toLowerCase().includes(curr);
    });
    setPhoneCodeList(filteredCountry);
  }

  // chosen country
  const langRef = useRef();
  const countryRef = useRef();
  const codeRef = useRef();
  useEffect(() => {
    codeRef.current.focus();
    result();
    document.addEventListener("click", () => {
      if (langRef.current.classList.contains("active")) {
        setPhoneToggle(false);
      }
    });
  }, []);

  //regex funcs
  function regexed(regex, input) {
    let regEx = new RegExp(`^(${regex})$`, "g");

    return regEx.test(input);
  }

  function checkingCode(val) {
    const currRegex = chosenCountryCode.regex;
    const currInput = val;
    const result = regexed(currRegex, currInput);
    if (currInput.trim().length !== 0) {
      setErrorDrop(result);
    } else if (currInput.trim().length == 0) {
      setErrorDrop(true);
    }
  }

  // debounce useeffect
  useEffect(() => {
    checkingCode(debounceCode);
  }, [debounceCode]);

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
  const result = async () => {
    try {
      const res = await axios.get(
        "https://dev-api.mp.ge/authentication/getCountries",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            soft: "mp_web_app",
            softVersion: "3.0.0",
            requestDate: getFormatedDate(),
            language: "GE",
          },
        }
      );
      const data = res.data.data.map((item) => {
        return { ...item, isActive: null };
      });
      const defaultFlag = data[0];
      if (!localStorage.getItem("MM.countryCode")) {
        setChosenCountryCode(defaultFlag);
      } else {
        const obj = JSON.parse(localStorage.getItem("MM.countryCode"));
        setChosenCountryCode(obj);
      }
      setPhoneCodeList(data);

      setStaticPhoneCodeList(data);
    } catch (error) {
      console.log(error);
    }
  };
  activatedCode(phoneCodeList, chosenCountryCode.code);
  return (
    <div className="mm-phone-fill">
      <label
        className={`labeled-div ${errorDrop ? "" : "error"} ${
          focusedInput ? "focused bg-transparent" : ""
        } ${checkingFc("error")}`}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div
          className={`mm-phone-chosen ${phoneToggle ? "active" : ""} ${
            focusedInput ? "bg-transparent" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setPhoneToggle(!phoneToggle);
            e.currentTarget.classList.toggle("active");
          }}
        >
          <img
            src={`data:image/jpeg;base64,${chosenCountryCode.image}`}
            alt=""
          />
          <span className="mm-phone-code">+{chosenCountryCode.code}</span>
          <span className="mm-phone-arrow">
            <ArrowSvg />
          </span>
          <div
            ref={langRef}
            className={`mm-phone-drop ${phoneToggle ? "active" : ""}`}
          >
            <div>
              <div
                className="mm-phone-search"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <button type="button">
                  <SearchSvg />
                </button>
                <input
                  type="text"
                  placeholder="ძიება"
                  ref={countryRef}
                  onChange={(e) => {
                    emptyCountryInput(countryRef);
                  }}
                />
              </div>
              <ul className="mm-phone-country__codes">
                {phoneCodeList.map((item) => {
                  return (
                    <li
                      data-ccode={item.ccode}
                      data-code={item.code}
                      data-country={item.country}
                      data-placeholder={item.example}
                      data-img={`data:image/jpeg;base64,${item.image}`}
                      data-regex={item.regex}
                      data-code-length={item.length}
                      className={item.isActive ? "active" : ""}
                      key={Math.random()}
                      onClick={(e) => {
                        const attr = e.currentTarget.getAttribute("data-code");
                        const result = staticPhoneCodeList.filter((item) => {
                          return item.code == attr;
                        });
                        localStorage.setItem(
                          "MM.countryCode",
                          JSON.stringify(...result)
                        );
                        setChosenCountryCode(...result);
                        countryRef.current.value = "";
                        setPhoneNumber("");
                        emptyCountryInput(countryRef);
                        codeRef.current.focus();
                      }}
                    >
                      <div className="mm-phone-country">
                        <img
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt={`${item.isocode} Flag`}
                        />
                        <span>{item.isocode}</span>
                      </div>
                      <span className="mm-phone__digit">{`+${item.code}`}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="mm-phone-input">
          <input
            value={phoneNumber}
            ref={codeRef}
            onInput={(e) => {
              let curr = e.target.value;
              curr = curr.replaceAll(/\D/g, "");
              let result = BlankSpace(curr);
              if (curr.split("").length > chosenCountryCode.length) {
                return false;
              }
              onCodeInput(
                curr,
                chosenCountryCode.regex,
                chosenCountryCode.code
              );
              const debounceText = optimizedFn(curr);
              setPhoneNumber(result);
            }}
            onFocus={(e) => {
              // console.log("test");
              setFocusedInput(true);
            }}
            placeholder={chosenCountryCode.example}
            onBlur={(e) => {
              checkingCode(e.target.value.replace(/\s/g, ""));
              setFocusedInput(false);
            }}
          />
        </div>
        <div className="mm-choose-lang">
          <div></div>
        </div>
      </label>
      <div className={`mm-phone-error ${errorDrop ? "" : "active"}`}>
        <div className="mm-phone-error__text">
          <img src={exclimationSvg} alt="warning sign icon" />
          <span>ტელ.ნომერის ფორმატი არასწორია</span>
          <div className="tooltip">
            <p>
              ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის
              ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneInput;
