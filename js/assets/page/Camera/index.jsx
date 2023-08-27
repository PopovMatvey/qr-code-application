import React from "react";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin.jsx'
import { useState, useCallback, useContext, useEffect } from 'react'
import { Context } from '../../../Context/Context'

// Камера
export function Camera(props) {
    const [scanned, setScanned] = useState(false);
    const [decodedTextCurrent, setDecodedTextCurrent] = useState("");
    const [size, setSize] = useState(100);
    // const [size, setSize] = useContext(Context);

    const onNewScanResult = (decodedText, decodedResult) => {
        setScanned(true);
        let tmp = props.decodedText;
        tmp += " " + decodedText;
        props.setDecodedText(tmp);
        setDecodedTextCurrent(decodedText);
    };

    const onChangeSlider = (e) => {
        // setMyKey(e.target.value);
        // handleForceupdateMethod();
        // setMyKey(e.target.value);
        setSize(e.target.value);
    }

    useEffect(() => {

        console.log("context", size);
        setSize(size);
    }, [size])

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
    return (

        <Context.Consumer>
            {(size) => (
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
                        {(!scanned) && <Html5QrcodePlugin
                            fps={30}
                            qrbox={props.size}
                            disableFlip={false}
                            qrCodeSuccessCallback={onNewScanResult}
                        />}
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
                    {/* <h5 className='custom-slider-text'>Размер сканера: {size}</h5>
                    <input
                        type='range'
                        onChange={onChangeSlider}
                        min={50}
                        max={250}
                        step={1}
                        value={size}
                        className='custom-slider'>
                    </input> */}
                </>
            )}
        </Context.Consumer>

    )
}