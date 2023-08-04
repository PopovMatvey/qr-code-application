import React from "react";
import logo from '../../images/qrcode.jpeg';
import './css/style.css';

export function HeaderInformation({ title }: any) {
    return (
        <div className="header-information">
            <h1>{title}</h1>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
}
