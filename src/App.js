import { useState } from "react";
import Authentication from "./Components/AuthenticateRegister/UI/Authentication";
import LegalEntity from "./Components/LegalEntity/LegalEntity";
import "./styles/fonts.css";
import "./styles/css/variables.css";
import "./styles/css/general.css";
function App() {
  const [user, setUser] = useState(false);
  return <>{user ? <LegalEntity /> : <Authentication />}</>;
}

export default App;
