import React, { useState } from 'react';
import imgCamera           from "../../images/camera.png"
import imgUser             from "../../images/user.png"
import imgTask             from "../../images/task.png"
import imgScan             from "../../images/scan.png"

import './css/style.css';

// Контейнер кнопок
export function ButtonsContainer(props) {

    const [
        arrayButtonsContainer,
    ] = useState(
        [
            {
                id: 0,
                textButton: "Сканер",
                className:  "button1",
                src:        imgScan,
            },
            {
                id: 1,
                textButton: "Камера",
                className:  "button0",
                href:       "/camera",
                src:        imgCamera,
            },
            {
                id: 2,
                textButton: "Данные контакта",
                className:  "button2",
                src: imgUser,
            },
            {
                id: 3,
                textButton: "Задачи",
                className: "button3",
                src:        imgTask,
            },
        ]
    );

    // Обработчик кнопок
    const hendlerButtonContainerItem = (event) => {
        props.setNTab(event.target.id);
    }

    return (
        <>
            <div className="buttons-container">
                {arrayButtonsContainer.map((element) => (
                    <a
                        key       = {element.id}
                        id        = {element.id}
                        className = {element.className}
                        onClick   = {hendlerButtonContainerItem}
                    >
                        <img
                            src       = {element.src}
                            id        = {element.id}
                            onClick   = {hendlerButtonContainerItem}
                            alt       = "иконка кнопки"
                            className = {element.className}
                        />
                    </a>
                ))}
            </div>
        </>
    )
}