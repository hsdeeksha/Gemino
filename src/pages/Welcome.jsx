// src/pages/Welcome.jsx
import React, { useState } from "react";
import "./Welcome.css";
import logo from "../assets/logo.png";
import Auth from "./Auth";

export default function Welcome() {
  const [showAuth, setShowAuth] = useState(false);

  // Accept onAuth prop from App.jsx to update app state after login
  return (
    <div className="welcome-sheet">
      <img src={logo} alt="Logo" className="welcome-logo" />

      <div className="welcome-content">
        <div className="welcome-left">
          <h1>
            <span className="welcome-black-text">Hello, I'm<br />Your </span>
            <span className="welcome-you">Gemino!</span>
          </h1>
          <button className="welcome-start" onClick={() => setShowAuth(true)}>
            Start
          </button>
        </div>

        <div className="welcome-right">
          <svg
            className="welcome-waves"
            viewBox="0 0 600 900"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M300 0 Q400 150 300 300 Q200 450 300 600 Q400 750 300 900 L600 900 L600 0 Z"
              fill="#c6286e"
              opacity="0.95"
            />
            <path
              d="M400 0 Q500 180 400 360 Q300 540 400 720 Q500 900 400 900 L600 900 L600 0 Z"
              fill="#e04a6a"
              opacity="0.85"
            />
            <path
              d="M600 0 Q650 225 600 450 Q550 675 600 900 L600 900 L600 0 Z"
              fill="#fa8072"
              opacity="0.85"
            />
          </svg>
        </div>
      </div>

      {showAuth && (
        <Auth
          onAuth={() => {
            setShowAuth(false);
            window.dispatchEvent(new Event('google-login-success'));
          }}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
}
