import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Logo = ({ height = "20", fontSize = "20px", fontColor = "#f1f1f1" }) => {
  return (
    <div className="logo">
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={height} style={{ marginRight: "5px" }} />
        <span style={{ fontSize: fontSize, color: fontColor }}>React</span>
      </Link>
    </div>
  );
};

export default Logo;
