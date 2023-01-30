import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import LandingBody from "./LandingBody";
import "../../styles/css/landing-header.css";
import "../../styles/css/landing-footer.css";
import "../../styles/css/landing-general.css";
function LandingPage() {
  return (
    <>
      <Header />
      <LandingBody />
      <Footer />
    </>
  );
}

export default LandingPage;
