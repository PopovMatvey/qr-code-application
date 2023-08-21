import React from "react";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
import { CameraContainer } from "../../components/CameraContainer";

// Камера
export function Camera({ title }: any) {

    return (
        <>
            <HeaderInformation title={title} />
            <CameraContainer />
            {/* <div className="camera-container">
                <h2>Область захвата камеры</h2>
            </div> */}
        </>
    )
}