import React from "react";
import AppleSvg from "../../svges/AppleSvg";
import GoogleSvg from "../../svges/GoogleSvg";
import GoogleIconSvg from "../../svges/GoogleIconSvg";
function AppLinks() {
  return (
    <div className="mm-apps">
      <a
        href="https://apps.apple.com/us/app/mm-myprofile/id1561990665"
        target="_blank"
        data-svg="appleSvg"
      >
        <AppleSvg />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=ge.myprofile.mp"
        target="_blank"
        data-svg="googleIconSvg"
      >
        <GoogleIconSvg />
        <span data-svg="googleSvg">
          <GoogleSvg />
        </span>
      </a>
    </div>
  );
}

export default AppLinks;
