import React from "react";
import "./ConnectWithUs.css";

import fbImg from "../connectus/assets/facebook1.jpg";
import instaImg from "../connectus/assets/instagram1.jpg";
import twitterImg from "../connectus/assets/twitter1.jpg";
import ytImg from "../connectus/assets/youtube.jpg";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const ConnectWithUs = () => {
  return (
    <section className="connect-section">
      <h2 className="connect-title">Connect With Us</h2>
      <div className="connect-grid">
        {/* Row 1 */}
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="connect-card"
        >
          <img src={fbImg} alt="Facebook" className="connect-img" />
          <div className="connect-header">
            <span className="connect-icon" style={{ color: "#1877f2" }}>
              <FaFacebookF />
            </span>
            <span className="connect-name">Facebook</span>
          </div>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="connect-card"
        >
          <img src={instaImg} alt="Instagram" className="connect-img" />
          <div className="connect-header">
            <span className="connect-icon" style={{ color: "#e4405f" }}>
              <FaInstagram />
            </span>
            <span className="connect-name">Instagram</span>
          </div>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="connect-card"
        >
          <img src={twitterImg} alt="Twitter" className="connect-img" />
          <div className="connect-header">
            <span className="connect-icon" style={{ color: "#1da1f2" }}>
              <FaTwitter />
            </span>
            <span className="connect-name">Twitter</span>
          </div>
        </a>

        {/* Row 2 (YouTube alone) */}
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="connect-card youtube-card"
        >
          <img src={ytImg} alt="Youtube" className="connect-img" />
          <div className="connect-header">
            <span className="connect-icon" style={{ color: "#ff0000" }}>
              <FaYoutube />
            </span>
            <span className="connect-name">YouTube</span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default ConnectWithUs;
