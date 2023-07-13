import React from "react";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";

// Задачи
export function Tasks({ title }: any) {

    return (
        <>
            <HeaderInformation title={title}/>
        </>
    )
}