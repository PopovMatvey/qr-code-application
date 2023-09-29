import React, { useCallback, useRef, useState } from "react";
import './css/style.css';
import Webcam from "react-webcam";
import { HeaderInformation } from "../HeaderInformation";

// Камера
export function CameraContainerWebcam({ title, arrayPhoto }) {
    const webcamRef = useRef(null);
    // const webcamProcessedRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [captureFlag, setCaptureFlag] = useState(true);

    // Обработчик "Сделать фото"
    const handlerCreateCapture = useCallback(() => {
        // const imageSrc = webcamProcessedRef.current.getScreenshot();
        let imageSrc = imageSrc = webcamRef.current.getScreenshot();;
        let fileName = `${Math.floor(Math.random() * (1000000000000 - 0 + 1) + 0)}.jpeg`;

        // while (imageSrc == null) {
        //     imageSrc = webcamRef.current.getScreenshot();

        //     if (imageSrc != null) {
        //         break;
        //     }
        // }

        setImgSrc({ "fileData": [fileName, imageSrc] });
        setCaptureFlag(false);
    }, [webcamRef, arrayPhoto]);
    // }, [webcamProcessedRef, arrayPhoto]);

    // Обработчик "Сохранить фото"
    const handlerSaveCaptuer = () => {
        arrayPhoto.push(imgSrc);
        setImgSrc(null);
        setCaptureFlag(true);
    }

    // Обработчик "Удалить фото"
    const handlerDeleteCaptuer = () => {
        setImgSrc(null);
        setCaptureFlag(true);

        console.log("img", arrayPhoto);
    }

    const FACING_MODE_USER = "user";
    const FACING_MODE_ENVIRONMENT = "environment";

    const videoConstraints = {
        facingMode: FACING_MODE_ENVIRONMENT
    };

    // const WebcamCapture = () => {
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);

    const handleClick = React.useCallback(() => {
        setFacingMode(
            prevState =>
                prevState === FACING_MODE_USER
                    ? FACING_MODE_ENVIRONMENT
                    : FACING_MODE_USER
        );
    }, []);

    return (
        <>
            <HeaderInformation title={title} />
            <div className="camera-container">
                {
                    // imgSrc ? (
                    //     <img src={imgSrc.fileData[1]} alt="webcam" />
                    // ) : (
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        screenshotQuality={1}
                        minScreenshotHeight={3000}
                        minScreenshotWidth={4000}
                        videoConstraints={{
                            ...videoConstraints,
                            facingMode,
                            frameRate: { ideal: 60, max: 60, },
                        }}
                    />
                    // )
                }
                <div className="camera-container_buttons">
                    {
                        captureFlag ? (
                            <>
                                <div className="camera-container_buttons_wrap">
                                    <button onClick={handlerCreateCapture}>Сделать фото</button>
                                    <button onClick={handleClick}>Сменить камеру</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="camera-container_buttons_wrap">
                                    <button onClick={handlerSaveCaptuer}>Продолжить</button>
                                    {/* <button onClick={handlerSaveCaptuer}>Сохранить фото</button>
                                            <button onClick={handlerDeleteCaptuer}>Удалить фото</button> */}
                                </div>
                            </>
                        )
                    }
                </div>
                {/* <div className="webcam-container">
                    <Webcam
                        ref={webcamProcessedRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            ...videoConstraints,
                            facingMode,
                            frameRate: { ideal: 60, max: 60, },
                        }}
                    />
                </div> */}
            </div>
        </>
    )
}