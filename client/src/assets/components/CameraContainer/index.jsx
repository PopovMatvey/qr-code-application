import React, { useCallback, useRef, useState } from "react";
import './css/style.css';
import Webcam from "react-webcam";

// Камера
export function CameraContainer() {
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
    }, [webcamRef]);

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

    return (
        <>
            <h1>Камера</h1>
            <div className="camera-container">
                {
                    imgSrc ? (
                        <img src={imgSrc} alt="webcam" />
                    ) : (
                        <Webcam ref={webcamRef} />
                    )
                }
                <div className="camera-container_buttons">
                    {
                        captureFlag ? (
                            <>
                                <div className="camera-container_buttons__create-capture">
                                    <button onClick={handlerCreateCapture}>Сделать фото</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="camera-container_buttons__procces-capture">
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