import React from "react";
import logo from '../../images/qrcode.jpeg';
import './css/style.css';

export function HeaderInformation() {
    return (
        <div className="header-information">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>QR app</h1>
        </div>
    );
}
