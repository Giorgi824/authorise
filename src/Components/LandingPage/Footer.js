import React from "react";
import AppLinks from "../GeneralComponents/AppLinks";
import ThemeChoose from "../GeneralComponents/ThemeChoose";
import FooterSocial from "./FooterSocial";
import ArrowGetSvg from "../../svges/ArrowGetSvg";
import FooterSendNews from "./FooterSendNews";
function Footer() {
  return (
    <footer>
      <div className="mm-top-footer">
        <div className="centered-element">
          <div className="mm-top-footer__item btns-mode">
            <div className="title">გადმოწერეთ ჩვენი აპლიკაცია</div>
            <p>
              იყავი მუდამ კავშირზე და ისარგებლე უამრავი სერვისით ერთ სივრცეში!
              <span>მალე</span>
            </p>
            <AppLinks />
          </div>
          <div className="mm-top-footer__item footer-contacts">
            <span data-text="contactTitle">კონტაქტი</span>
            <div className="mm-address-btn">
              <span className="mm-address">
                საქართველო, თბილისი, 0131 დ.აღმაშენებლის ხეივანი 172ბ
              </span>
              <a
                href="https://goo.gl/maps/KRo9q4jBLxuYC7wx8"
                target="_blank"
                data-svg="sendSvg"
                className="mm-blue-btn"
              >
                <ArrowGetSvg />
                <span>როგორ მივიდე</span>
              </a>
            </div>
            <a href="tel:+995322500555">+995 32 2 500-555</a>
            <a href="mailto:info@mp.ge" className="mm-mail">
              info@mp.ge
            </a>
            <div className="mm-send-news">
              <span>სიახლეების გამოწერა</span>
              <FooterSendNews />
            </div>
          </div>
          {/* <button data-svg="sendSvg" className="mm-blue-btn">
            <span>როგორ მივიდე</span>
          </button> */}
        </div>
      </div>
      <div className="mm-mode-and-privacy centered-element">
        <ThemeChoose />
        <a href="docs/privacypolicy.html" target="_blank">
          პერსონალური მონაცემების დაცვის პოლიტიკა
        </a>
      </div>
      <div className="mm-bottom-footer">
        <div className="centered-element">
          <p className="mm-copyright">© 2009-2023 LLC Money Movers</p>
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
