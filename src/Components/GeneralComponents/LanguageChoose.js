import React, { useState, useEffect, useRef } from "react";
import ArrowSvg from "../../svges/ArrowSvg";
import LangSymbol from "../../svges/LangSymbol";
import EngSvg from "../../img/eng.svg";
import RusSvg from "../../img/rus.svg";
import GeoSvg from "../../img/geo.svg";
import MarkSvg from "../../img/check-rectangle.svg";
function LanguageChoose() {
  const [langDrop, setLangDrop] = useState(false);
  const [lgList, setLgList] = useState([]);
  const [shortLang, setShortLang] = useState(null);
  const langDefault = localStorage.getItem("MM.language");
  if (!langDefault) {
    localStorage.setItem("MM.language", "ge");
    setShortLang(langDefault);
  }
  const langToggle = () => {
    return langDrop ? "active" : "";
  };
  const langChooseRef = useRef();
  useEffect(() => {
    document.addEventListener("click", () => {
      if (langChooseRef.current?.classList.contains("active")) {
        setLangDrop(false);
      }
    });
    const loadedLang = langList.filter((item) => {
      return item.href === langDefault;
    });
    const { dataShort } = loadedLang[0];
    setShortLang(dataShort);
  }, []);

  const langList = [
    {
      href: "en",
      dataShort: "ENG",
      src: EngSvg,
      alt: "eng flag",
      txt: "English",
    },
    {
      href: "ge",
      dataShort: "ქარ",
      src: GeoSvg,
      alt: "geo flag",
      txt: "ქართული",
    },
    {
      href: "ru",
      dataShort: "RUS",
      src: RusSvg,
      alt: "rus flag",
      txt: "Русский",
    },
  ];

  return (
    <div className="mm-lang">
      <div
        className={`mm-lang__current ${langToggle()}`}
        ref={langChooseRef}
        onClick={(e) => {
          e.stopPropagation();
          setLangDrop((pre) => !pre);
        }}
      >
        <div className="mm-lang__symbol">
          <span className="mm-lang__icon">
            <LangSymbol />
          </span>
          <span className="mm-lang__lang">{shortLang}</span>
        </div>
        <span className="mm-lang__arrow">
          <ArrowSvg />
        </span>
      </div>
      <div className={`mm-lang__choose ${langToggle()}`}>
        {langList.map((item) => {
          const { alt, dataShort, href, src, txt } = item;
          return (
            <a
              className={langDefault == href ? "active" : ""}
              key={txt}
              href={href}
              data-short={dataShort}
              onClick={(e) => {
                e.preventDefault();
                const hr = e.target.getAttribute("href");
                localStorage.setItem("MM.language", hr);
                setShortLang(e.target.dataset.short);
              }}
            >
              <img src={src} alt={alt} /> {txt}
              <span className="mark-icon">
                <img src={MarkSvg} alt="" />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageChoose;
