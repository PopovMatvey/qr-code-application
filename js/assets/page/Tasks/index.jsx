import React from "react";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";
import { TaskDataContainer } from "../Tasks/TaskDataContainer.jsx"

// Задачи
export function Tasks({ title, dataTask, setDataTask, idUserDefault, listUsersBitrix, dataListDepartaments, setDataListDepartaments, nameEvent, IdItemCutawayApp }) {

    return (
        <>
            <HeaderInformation title={title}/>
            <TaskDataContainer data={dataTask} setData={setDataTask} idUserDefault={idUserDefault} listUsersBitrix={listUsersBitrix} 
            dataListDepartaments={dataListDepartaments} setDataListDepartaments={setDataListDepartaments} nameEvent={nameEvent} IdItemCutawayApp={IdItemCutawayApp} />
        </>
    )
}