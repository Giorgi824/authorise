import React, { useEffect, useState, useRef } from "react";
import LineSvg from "../../img/line.svg";
import RemoveSvg from "../../img/remove.svg";
function FooterSendNews() {
  const [mail, setMail] = useState("");
  const inputRef = useRef();
  const sendBtn = useRef();
  const parentInput = useRef();
  useEffect(() => {}, []);
  const btn = document.querySelector(".mm-valid-btn");
  const inputParent = document.querySelector(".mm-input");
  const input = document.getElementById("mm-valid-mail");
  const parentClassNames = ["rejected", "completed", "focused", "blanked"];
  const removeParentsClasses = (element, names) => {
    names.forEach((item) => {
      element.classList.remove(`${item}`);
    });
  };
  function removeRejection() {
    // btnSpan.textContent = btnsendText;
    sendBtn.current.classList.remove("rejected");
    parentInput.current.classList.remove("rejected");
    parentInput.current.classList.remove("blanked");
  }
  function ValidateEmail(inputText) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const val = inputText.value;
    if (val.trim() === "") {
      parentInput.current.classList.add("blanked");
      inputRef.current.focus();
      return;
    }
    if (val.match(mailformat)) {
      sendBtn.current.setAttribute("disabled", "true");
      sendBtn.current.classList.remove("rejected");
      parentInput.current.classList.remove("rejected");
      parentInput.current.classList.remove("blanked");
      parentInput.current.classList.add("completed");
    } else {
      sendBtn.current.removeAttribute("disabled");
      sendBtn.current.classList.add("rejected");
      parentInput.current.classList.remove("completed");
      parentInput.current.classList.remove("blanked");
      parentInput.current.classList.add("rejected");
    }
  }
  function defaultStyle() {
    if (
      sendBtn.current.hasAttribute("disabled") ||
      sendBtn.current.classList.contains("rejected")
    ) {
      setMail("");
      sendBtn.current.removeAttribute("disabled");
      removeParentsClasses(parentInput.current, parentClassNames);
      sendBtn.current.classList.remove("rejected");
    }
  }
  return (
    <div className="mm-send-form-text">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ValidateEmail(input);
        }}
      >
        <div className="mm-input" ref={parentInput}>
          <input
            id="mm-valid-mail"
            type="text"
            value={mail}
            placeholder="ელ-ფოსტა"
            autoComplete="off"
            ref={inputRef}
            data-text="placeText"
            onInput={(e) => {
              setMail(e.target.value);
              const mailformat =
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              const val = e.target.value;
              if (val.match(mailformat) || val === "") {
                removeRejection();
              }
            }}
            onBlur={() => {
              if (inputRef.current.value.trim().length !== 0) return;
              parentInput.current.classList.remove("focused");
            }}
            onFocus={() => {
              if (!sendBtn.current.classList.contains("rejected")) {
                defaultStyle();
              }
              parentInput.current.classList.add("focused");
            }}
          />
          <button
            className="mm-valid-btn"
            btnsend="გაგზავნა"
            ref={sendBtn}
            btnclear="გასუფთავება"
            data-svg="markSvg"
            onClick={(e) => {
              e.preventDefault();
              ValidateEmail(input);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 12L10.3343 16L17 8"
                stroke="#0DBB53"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <img className="green-line" src={LineSvg} alt="" />
            <img
              className="red-exit"
              src={RemoveSvg}
              alt=""
              onClick={() => {
                defaultStyle();
                setTimeout(() => {
                  inputParent.current.classList.remove("blanked");
                }, 0);
              }}
            />
          </button>
        </div>
        <div className="mm-input-text">
          <span className="complete" data-text="completeText"></span>
          <span className="reject" data-text="rejectText"></span>
          <span className="blanked" data-text="blankedText"></span>
        </div>
      </form>
      {/* <div className="condition-txt">
        <span className="success">
          თქვენ წარმატებით გამოწერეთ არხი. გთხოვთ, შეამოწმოთ თქვენი ელ. ფოსტა
        </span>
        <span className="rejection">
          მითითებული ელ.ფოსტის ფორმატი არასწორია
        </span>
      </div> */}
    </div>
  );
}

export default FooterSendNews;
