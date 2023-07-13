import React from "react";
import "./css/style.css"
import { HeaderInformation } from "../../components/HeaderInformation";

// Страница сохранения
export function SavePage({ title }: any) {

    return (
        <>
            <HeaderInformation title={title} />
        </>
    )
}