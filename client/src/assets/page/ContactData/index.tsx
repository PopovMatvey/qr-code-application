import React from "react";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
import { DataContactContainer } from "./ContactDataContainer";

// Данные контакта
export function ContactData({ title }: any) {

    return (
        <>
            <HeaderInformation title={title} />
            <DataContactContainer />
        </>
    )
}