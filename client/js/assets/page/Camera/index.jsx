import React from "react";
// import QrReader from 'react-qr-scanner'
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
// import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

// import "html5-qrcode.min.js";
// import docReady from "./html5-qrcode-demo.js";
// import {Helmet} from 'react-helmet';
// import { Html5QrcodeScanner } from 'html5-qrcode';
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin.jsx'
import { useState, useCallback } from 'react'

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

                {/* {(!scanned) && <Html5QrcodePlugin */}
                {/* {(!scanned) && <Html5QrcodePlugin
                    fps={60}
                    // qrbox={props.size}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />} */
                    // LOAD_WASM().subscribe((res) => console.log('LOAD_WASM', res))
                    // <QrReader
                    //     delay={100}
                    //     style={{
                    //         width: '100%',
                    //     }}
                    //     facingMode='rear'
                    //     onError={handleError}
                    //     onScan={handleScan}
                    // />
                    <BarcodeScannerComponent
                        width={200}
                        height={200}
                        onUpdate={(err, result) => {
                            if (result) {
                                setData(result.text);
                                alert(data);
                            }
                            else {
                                setData("Not Found");
                                // alert(data);
                            }
                            // alert(data);
                        }}
                    // facingMode={'environment '}
                    />
                }
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