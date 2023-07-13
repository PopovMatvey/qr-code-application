import React from "react";
import "./css/style.css";
import { Route, Routes } from "react-router-dom";
import { ListTasks } from "../../page/ListTasks";
import { ContactData } from "../../page/ContactData";
import { Camera } from "../../page/Camera";
import { Tasks } from "../../page/Tasks";
import { SavePage } from "../../page/SavePage";

// Основной контент
export function MainContent() {

    return (
        <>
            <div className="main-content-container">
                <Routes>
                    <Route path="/" element={<ContactData title={"Данные контакта"} />} />
                    <Route path="/camera" element={<Camera title={"Камера"} />} />
                    <Route path="/list_tasks" element={<ListTasks title={"Список задач"} />} />
                    <Route path="/task" element={<Tasks title={"Задача"} />} />
                    <Route path="/save_page" element={<SavePage title={"Камера"} />} />
                </Routes>
            </div>
        </>
    )
}