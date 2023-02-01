import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function LoginHeaderText() {
  const navigate = useNavigate();
  const [text, setText] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes("register")) {
      setText(["ავტორიზირებული", "ავტორიზაცია", ""]);
    } else {
      setText(["დარეგისტრირებული", "დარეგისტრირდი", "register"]);
    }
  }, [location.pathname]);
  return (
    <div className="mp-condition">
      <div className="mp-registration">
        არ ხარ {text[0]}?
        <span
          onClick={() => {
            navigate(text.at(-1));
          }}
        >
          {text[1]}
        </span>
      </div>
      {/* <div className="mp-authorization">
        ავტორიზირებული ხარ?
        <span>ავტორიზაცია</span>
      </div> */}
    </div>
  );
}

export default LoginHeaderText;
