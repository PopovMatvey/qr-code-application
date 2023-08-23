import React from "react";
import logo from '../../images/qrcode.jpeg';
import "./css/style.css";

export function Footer() {

    return (
        <footer>
            <div className="footer-content">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>QR app</h1>
            </div>
            <span>Все права защищены</span>
        </footer>
    );
}