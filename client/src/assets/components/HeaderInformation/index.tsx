import React from "react";
import logo from '../../images/floppy-disk.png';
import './css/style.css';

export function HeaderInformation({ title }: any) {
    return (
        <div className="header-information">
            <h1>{title}</h1>
            <a href="/save_page">
                <img src={logo} className="App-logo" alt="logo" />
            </a>
        </div>
    );
}
