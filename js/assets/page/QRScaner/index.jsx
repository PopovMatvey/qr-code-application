import React from "react";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin.jsx';
import { useState } from 'react';

// import "html5-qrcode.min.js";
// import docReady from "./html5-qrcode-demo.js";
// import {Helmet} from 'react-helmet';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// Камера
export function QRScaner(props) {
    const [scanned, setScanned] = useState(false);
    const [decodedTextCurrent, setDecodedTextCurrent] = useState("");
    const onNewScanResult = (decodedText, decodedResult) => {
        setScanned(true);
        let tmp = props.decodedText;
        tmp += " " + decodedText;
        props.setDecodedText(tmp);
        setDecodedTextCurrent(decodedText);
    };

    return (
        <>
            <HeaderInformation title={props.title} />
            <div className="camera-container">
                {/* <h2>Область захвата камеры</h2> */}
                {/* <React.Fragment> */}
                {/* <Helmet>
                    <script async={false} src='./html5-qrcode.min.js' />
                    <script async={false} src='./html5-qrcode-demo.js' />
                </Helmet> */}
                {/* <div id="qr-reader" style={{width: "400px"}}></div> */}
                {/* <div id="qr-reader-results" html5QrcodeScanner={docReady}></div> */}

                {(!scanned) && <Html5QrcodePlugin
                    fps={10}
                    qrbox={280}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />}
            </div>

            {(scanned) &&
                <>
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