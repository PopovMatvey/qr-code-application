import React from "react";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";

// Данные контакта
export function ContactData({ title }: any) {

    return (
        <>
            <HeaderInformation title={title} />
        </>
    )
}