import React from "react";
// import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
// import { PhotoContainer } from "../Photo/PhotoContainer.jsx"

// Задачи
export function Photo({ title }) {

    return (
        <>
            <HeaderInformation title={title}/>
            {/* <PhotoContainer/> */}
        </>
    )
}