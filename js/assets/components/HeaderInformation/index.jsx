import React from "react";
import logo from '../../images/logo.jpeg';
import './css/style.css';

export function HeaderInformation({ title }) {
    return (
        <div className="header-information">
            <h1>{title}</h1>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
}
