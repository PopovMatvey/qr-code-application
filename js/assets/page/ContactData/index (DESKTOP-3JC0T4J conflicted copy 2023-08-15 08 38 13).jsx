import React from "react";
// import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
import { DataContactContainer } from "./ContactDataContainer";

// Данные контакта
export function ContactData({ title, decodedText, data, setData, idNameEventEntity }) {

    return (
        <>
            <HeaderInformation title={title} />
            <DataContactContainer decodedText={decodedText} data={data} setData={setData} idNameEventEntity={idNameEventEntity} />
        </>
    )
}