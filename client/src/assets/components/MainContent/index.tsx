import React from "react";
import "./css/style.css";
import { Route, Routes } from "react-router-dom";

// Основной контент
export function MainContent() {

    return (
        <>
            <div className="main-content-container">
                <Routes>
                    <Route path="/" element={<h1>Данные контакта</h1>} />
                    <Route path="camera" element={<h1>Камера</h1>} />
                    <Route path="list_tasks" element={<h1>Список задач</h1>} />
                    <Route path="task" element={<h1>Задача</h1>} />
                </Routes>
            </div>
        </>
    )
}