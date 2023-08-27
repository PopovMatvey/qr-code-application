import React, { useCallback, useRef, useState } from "react";
import './css/style.css';
import Webcam from "react-webcam";
import { HeaderInformation } from "../HeaderInformation";

// Камера
export function CameraContainerWebcam({ title }) {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [captureFlag, setCaptureFlag] = useState(true);
    const [arrayPhoto] = useState([]);

    // Обработчик "Сделать фото"
    const handlerCreateCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setCaptureFlag(false);

        console.log(arrayPhoto);
    }, [webcamRef, arrayPhoto]);

    // Обработчик "Сохранить фото"
    const handlerSaveCaptuer = () => {
        arrayPhoto.push(imgSrc);
        setImgSrc(null);
        setCaptureFlag(true);

        console.log(arrayPhoto);
    }

    // Обработчик "Удалить фото"
    const handlerDeleteCaptuer = () => {
        setImgSrc(null);
        setCaptureFlag(true);

        console.log(arrayPhoto);
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
    // }

    return (
        <>
            <HeaderInformation title={title} />
            <div className="camera-container">
                {
                    imgSrc ? (
                        <img src={imgSrc} alt="webcam" />
                    ) : (
                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                ...videoConstraints,
                                facingMode
                            }}
                        />
                    )
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
                                    <button onClick={handlerSaveCaptuer}>Сохранить фото</button>
                                    <button onClick={handlerDeleteCaptuer}>Удалить фото</button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}