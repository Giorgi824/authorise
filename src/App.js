import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./Components/AuthenticateRegister/UI/Authentication";
import LegalEntity from "./Components/LegalEntity/LegalEntity";
import "./styles/fonts.css";
import "./styles/css/variables.css";
import "./styles/css/general.css";
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  const [user, setUser] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="authentication" element={<Authentication />}></Route>
        <Route path="legal-entity" element={<LegalEntity />}></Route>
      </Routes>
      {/* {user ? <LegalEntity /> : <Authentication />} */}
    </>
  );
}

export default App;
