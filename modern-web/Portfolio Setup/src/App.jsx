import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import Home from "./Home";
import Education from "./Education";
import Experience from "./Experience";
import Overview from "./Overview";

const App = () => {
  return (
    <>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-logo">
            <a>Nahom Mesele</a>
          </div>

          <div className="resume">
            <a
              href="/resume.pdf"
              download="Nahom_Mesele_Resume.pdf"
              className="btn btn-primary"
            >
              Resume
            </a>
          </div>
        </nav>

        {/* Main content */}
        <div>
          <Home />
          <Education />
          <Experience />
          <Overview />
        </div>

        {/* Footer */}
        <footer className="footer">
          <hr></hr>
          <ul>
            <li>
              <a href="mailto:nahommese@gmail.com" style={{ fontSize: "30px" }}>
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/nahommesele/"
                target="_blank"
                style={{ fontSize: "30px" }}
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Nahom-M"
                target="_blank"
                style={{ fontSize: "30px" }}
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default App;
