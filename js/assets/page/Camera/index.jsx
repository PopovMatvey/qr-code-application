import React from "react";
import "./css/style.css";
import ReactDOM from 'react-dom';
import { HeaderInformation } from "../../components/HeaderInformation";
// import "html5-qrcode.min.js";
// import docReady from "./html5-qrcode-demo.js";
// import {Helmet} from 'react-helmet';
// import { Html5QrcodeScanner } from 'html5-qrcode';
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin.jsx'
import { useState, useCallback } from 'react'
import { QrScanner } from "@yudiel/react-qr-scanner";

// Камера
export function Camera(props) {
    //     const [scanned, setScanned] = useState(false);
    //     const [decodedTextCurrent, setDecodedTextCurrent] = useState("");
    //     const onNewScanResult = (decodedText, decodedResult) => {
    //         setScanned(true);
    //         let tmp = props.decodedText;
    //         tmp += " " + decodedText;
    //         props.setDecodedText(tmp);
    //         setDecodedTextCurrent(decodedText);
    //     };



    //     // let qrboxFunction = function(viewfinderWidth, viewfinderHeight) {
    //     //     let minEdgePercentage = 0.7; // 70%
    //     //     let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    //     //     let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    //     //     return {
    //     //         width: qrboxSize,
    //     //         height: qrboxSize
    //     //     };
    //     // }

    // //     // Create your forceUpdate hook
    // // function useForceUpdate() {
    // //     let [value, setState] = useState(true);
    // //     return () => setState(!value);
    // // }
    // //     const handleForceupdateMethod = useForceUpdate();

    //     // const [, updateState] = useState();
    //     // const handleForceupdateMethod = useCallback(() => updateState({}), []);
    //     return (
    //         <>
    //             <HeaderInformation title={props.title} />
    //             <div className="camera-container">
    //                 {/* <h2>Область захвата камеры</h2> */}
    //                 {/* <React.Fragment> */}
    //                 {/* <Helmet>
    //                     <script async={false} src='./html5-qrcode.min.js' />
    //                     <script async={false} src='./html5-qrcode-demo.js' />
    //                 </Helmet> */}
    //                 {/* <div id="qr-reader" style={{width: "400px"}}></div> */}
    //                 {/* <div id="qr-reader-results" html5QrcodeScanner={docReady}></div> */}

    //                 {/* {(!scanned) && <Html5QrcodePlugin */}
    //                 {(!scanned) && <Html5QrcodePlugin
    //                     fps={60}
    //                     qrbox={props.size}
    //                     disableFlip={false}
    //                     qrCodeSuccessCallback={onNewScanResult}
    //                 />}
    //                 <br></br><br></br>
    //             </div>
    //             {(scanned) && <>
    //                 <h3>Отсканированная информация: </h3>
    //                 <h3>{decodedTextCurrent}</h3>
    //                 <br></br><br></br>
    //                 <h3>Всё, что было отсканировано: </h3>
    //                 <h3>{props.decodedText}</h3>
    //             </>
    //             }
    //         </>
    //     )
    const [rangeInput, setRangeInput] = useState(100);
    const [arrayScanData, setArrayScanData] = useState([]);


    const styleContainerObject = {
        padding: `${rangeInput}px`,
        // width: "35%",
        // width:"75%",
        // height:"80%",
        // border: "1px solid blue",
    };

    const styleVideoObject = {
        // height: "100%",
        // width:"100%",
        // width:"00px",
        // height:"60vh",
        // marginLeft:"25%",
        // border: "1px solid black",
    };

    const constraintsObject = {
        facingMode: 'environment',
        frameRate: 120,
        aspectRatio: 1.2,
        resizeMode: "crop-and-scale",
    };
    const handlerRangeinput = (event) => {
        setRangeInput(event.target.value);
    }

    const handlerOnDecodeQR = (result) => {

        let returnedArray = arrayScanData;

        console.log(result);
        returnedArray.push(result);
        setArrayScanData(returnedArray);
        ReactDOM.render(
            arrayScanData.map((element, index) => (
                <span key={index}>{element}</span>
            )),
            document.querySelector('.qr-scanner-output-field')
        );
    }

    return (
        <>
            <div className="qr-scanner-container">
                <QrScanner
                    onDecode={(result) => {
                        handlerOnDecodeQR(result);
                    }}
                    onError={(error) => console.log(error?.message)}
                    containerStyle={styleContainerObject}
                    videoStyle={styleVideoObject}
                    constraints={constraintsObject}
                />
            </div>
            <input type="range" value={rangeInput} onChange={handlerRangeinput} min={100} max={250} />
            <div className="qr-scanner-output-field">
                {
                    arrayScanData.map((element, index) => (
                        <span key={index}>{element}</span>
                    ))
                }
            </div>
        </>
    )
    // const handlerRangeinput = (event) => {
    //     setRangeInput(event.target.value);
    // };

    // const checkOnExist = (parArray, parElement) => {

    //     for (let i = 0; i < parArray; i++) {
    //         if (parElement === parArray[i]) {
    //             return false;
    //         }
    //     }

    //     return true;
    // }

    // const handlerOnDecode = (result) => {
    //     let returnedArray = arrayScanData;
    //     // alert(checkOnExist(arrayScanData, result));

    //     if (checkOnExist(arrayScanData, result)) {
    //         returnedArray.push(result);
    //         setArrayScanData(returnedArray);
    //         ReactDOM.render(
    //             arrayScanData.map((element, index) => (
    //                 <span key={index}>{element}</span>
    //             )),
    //             document.querySelector('.qr-scanner-output-field')
    //         );
    //     } else {
    //         console.log("Уже отсканировано");
    //     }



    //     // setTimeout(1);
    //     // alert(arrayScanData);
    // }

    // return (
    //     <>
    //         <HeaderInformation title={props.title} />
    //         <div className="qr-scanner-container">
    //             <QrScanner
    //                 onDecode={(result) => { handlerOnDecode(result) }}
    //                 onError={(error) => console.log(error?.message)}
    //                 containerStyle={styleContainerObject}
    //                 videoStyle={styleVideoObject}
    //                 constraints={constraintsObject}
    //             />
    //         </div>
    //         <input type="range" value={rangeInput} onChange={handlerRangeinput} min={100} max={200} />
    //         <h5>Отсканированная информация</h5>
    //         <div className="qr-scanner-output-field">
    //             {
    //                 arrayScanData.map((element, index) => (
    //                     <span key={index}>{element}</span>
    //                 ))
    //             }
    //         </div>
    //     </>
    // )
}