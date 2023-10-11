import React, { useState, useEffect } from "react";
// import QrReader from 'react-qr-scanner'
import { Html5Qrcode } from "html5-qrcode";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
// import { QRscaner } from '../../../QRscaner'
// import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

// import "html5-qrcode.min.js";
// import docReady from "./html5-qrcode-demo.js";
// import {Helmet} from 'react-helmet';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import Html5QrcodePlugin from './Html5QrcodeScannerPlugin.jsx'
// import { useState, useCallback } from 'react'
// import { QRscaner } from "../../components/QRscaner";

// Камера
export function Camera(props) {
    const [scanned, setScanned] = useState(false);
    const [decodedTextCurrent, setDecodedTextCurrent] = useState("");
    const [data, setData] = React.useState("Не найден");
    const onNewScanResult = (decodedText, decodedResult) => {
        setScanned(true);
        let tmp = props.decodedText;
        tmp += " " + decodedText;
        props.setDecodedText(tmp);
        setDecodedTextCurrent(decodedText);
    };



    // let qrboxFunction = function(viewfinderWidth, viewfinderHeight) {
    //     let minEdgePercentage = 0.7; // 70%
    //     let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    //     let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    //     return {
    //         width: qrboxSize,
    //         height: qrboxSize
    //     };
    // }

    //     // Create your forceUpdate hook
    // function useForceUpdate() {
    //     let [value, setState] = useState(true);
    //     return () => setState(!value);
    // }
    //     const handleForceupdateMethod = useForceUpdate();

    // const [, updateState] = useState();
    // const handleForceupdateMethod = useCallback(() => updateState({}), []);

    const handleScan = (data) => {
        if (data !== null) {
            console.log(data);
        }
    }

    const handleError = (data) => {
        if (data !== null) {
            console.log(data);
        }
    }

    const [qrMessage, setQrMessage] = useState("");
    const [inputRange, setInputRange] = useState(150);

    const handlerInputRange = (event) => {
        setInputRange(event.target.value);
    }

    useEffect(() => {
        const config = { fps: 30, qrbox: { width: inputRange, height: inputRange } };
        const html5QrCode = new Html5Qrcode("qrCodeContainer");
        const qrCodeContainer = document.querySelector('#qr-shaded-region');

        if (qrCodeContainer != null) {
            console.log(qrCodeContainer.style.borderWidth);
            // console.log(qrCodeContainer.style.borderWidth);
            qrCodeContainer.style.borderWidth = `${inputRange}px  !important`;
            console.log(qrCodeContainer.style.borderWidth);
        }
        // qrCodeContainer.style.width = `${inputRange}px`;
        // qrCodeContainer.style.height = `${inputRange}px`;
        // qrCodeContainer.style.boderWidth = `${inputRange}px`;

        const qrCodeSuccess = (decodedText) => {
            setQrMessage(decodedText);
            console.log(decodedText);
        };

        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess);
    }, [inputRange]);

    return (
        <>
            <HeaderInformation title={props.title} />
            <div className="camera-container">
                <div className="scaner">
                    <div id="qrCodeContainer" />
                    <input type="range" step={50} min={150} max={500} onChange={handlerInputRange} value={inputRange} />
                </div>
                {qrMessage && <span className="qr-message">{qrMessage}</span>}
                <br></br><br></br>
            </div>
            {(scanned) && <>
                <h3>Отсканированная информация: </h3>
                <h3>{decodedTextCurrent}</h3>
                <br></br><br></br>
                <h3>Всё, что было отсканировано: </h3>
                <h3>{props.decodedText}</h3>
            </>
            }
        </>
    )
}