import React, { useState, useRef, useEffect } from "react";
import BlankSpace from "../../PlainFunctions/BlankAfterThree";
import ArrowSvg from "../../../svges/ArrowSvg";
import SearchSvg from "../../../svges/SearchSvg";
import EngSvg from "../../../img/eng.svg";
import RusSvg from "../../../img/rus.svg";
import GeoSvg from "../../../img/geo.svg";
import exclimationSvg from "../../../img/exclimation.svg";
import axios from "axios";
function PhoneInput() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneToggle, setPhoneToggle] = useState(false);
  const [phoneCodeList, setPhoneCodeList] = useState([]);
  const [staticPhoneCodeList, setStaticPhoneCodeList] = useState();
  const [chosenCountryCode, setChosenCountryCode] = useState({});
  const [active, setActive] = useState(false);
  if (!localStorage.getItem("MM.countryCode")) {
    // console.log(12);
  }

  function userChooseLang() {
    // alert(12);
  }

  // chosen country
  const langRef = useRef();
  const countryRef = useRef();
  // let globalCountries = [];
  useEffect(() => {
    result();
    document.addEventListener("click", () => {
      if (langRef.current.classList.contains("active")) {
        setPhoneToggle(false);
      }
    });
  }, []);
  const getFormatedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
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
            requestDate: "2023-01-12 09:34:10",
            language: "GE",
          },
        }
      );
      const data = res.data.data.map((item) => {
        return { ...item, isActive: false };
      });
      const defaultFlag = data[0];
      setChosenCountryCode(defaultFlag);
      setPhoneCodeList(data);
      setStaticPhoneCodeList(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mm-phone-fill">
      <label
        className="error labeled-div"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div
          className={`mm-phone-chosen ${phoneToggle ? "active" : ""}`}
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
                onInput={(e) => {
                  const curr = e.currentTarget.value;
                  const filteredCountry = staticPhoneCodeList.filter(
                    (item, idx) => {
                      return item.isocode.toLowerCase().includes(curr);
                    }
                  );
                  setPhoneCodeList(filteredCountry);
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
                    key={Math.random()}
                    onClick={(e) => {
                      const attr = e.currentTarget.getAttribute("data-code");
                      const result = staticPhoneCodeList.filter((item) => {
                        return item.code == attr;
                      });
                      setChosenCountryCode(...result);
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
        <div className="mm-phone-input">
          <input
            value={phoneNumber}
            onInput={(e) => {
              e.target.value = e.target.value.replaceAll(/\D/g, "");
              const result = BlankSpace(e.target.value);
              if (e.target.value.split("").length === 5) {
              }
              setPhoneNumber(result);
            }}
            placeholder={chosenCountryCode.example}
          />
        </div>
        <div className="mm-choose-lang">
          <div></div>
        </div>
      </label>
      <div className="mm-phone-error">
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
