import React from "react";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
import { DataContactContainer } from "./ContactDataContainer";

// Данные контакта
export function ContactData({ title, decodedText, data, setData, IdItemCutawayApp, setDecodedText, dataListDepartaments, setDataListDepartaments, listUsersBitrix, idUserDefault, date, listContacts, listCompany, arrayPhoto, setArrayPhoto }) {
    return (
        <>
            <HeaderInformation title={title} />
            <DataContactContainer decodedText={decodedText} data={data} setData={setData} IdItemCutawayApp={IdItemCutawayApp} setDecodedText={setDecodedText} 
                dataListDepartaments={dataListDepartaments} setDataListDepartaments={setDataListDepartaments} listUsersBitrix={listUsersBitrix} idUserDefault={idUserDefault} 
                date={date} listContacts={listContacts} listCompany={listCompany} arrayPhoto = {arrayPhoto} setArrayPhoto = {setArrayPhoto} />
        </>
    )
}