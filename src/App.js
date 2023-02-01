import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./Components/AuthenticateRegister/UI/Authentication";
import LegalEntity from "./Components/LegalEntity/LegalEntity";
import "./styles/fonts.css";
import "./styles/css/variables.css";
import "./styles/css/general.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import UserEnter from "./Components/AuthenticateRegister/UI/UserEnter";
import ForgetPassword from "./Components/AuthenticateRegister/UI/ForgetPassword";
import Register from "./Components/AuthenticateRegister/UI/Register";

function App() {
  const [user, setUser] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="userenter" element={<UserEnter />}>
          <Route index element={<Authentication />}></Route>
          <Route path="forget-password" element={<ForgetPassword />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route path="legal-entity" element={<LegalEntity />} />
      </Routes>
    </>
  );
}

export default App;
