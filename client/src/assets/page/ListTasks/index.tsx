import React from "react";
import "./css/style.css";
import { HeaderInformation } from "../../components/HeaderInformation";

// Список задач
export function ListTasks({ title }: any) {

    return (
        <>
            <HeaderInformation title={title} />
        </>
    )
}