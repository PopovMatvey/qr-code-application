import React from 'react';
import './css/style.css';

// Контейнер кнопок
export function ButtonsContainer() {

    const arrayButtonsContainer = [
        {
            id: 0,
            textButton: "Камера",
            className: "",
            href: "/camera",
            targetFlag: false,
        },
        {
            id: 1,
            textButton: "Данные контакта",
            className: "",
            href: "/",
            targetFlag: false,
        },
        {
            id: 2,
            textButton: "Задачи",
            className: "",
            href: "/list_tasks",
            targetFlag: false,
        },
    ]

    // обработчик кнопок
    const hendlerButtonContainerItem = () => {

    }

    return (
        <>
            <div className="buttons-container">
                {arrayButtonsContainer.map((element: any) => (
                    <a
                        key={element.id}
                        className={element.className}
                        onClick={hendlerButtonContainerItem}
                        href={element.href}
                    >
                        {element.textButton}
                    </a>
                ))}
            </div>
        </>
    )
}