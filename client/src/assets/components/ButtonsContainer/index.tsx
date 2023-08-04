import React, { useState } from 'react';
import './css/style.css';

// Контейнер кнопок
export function ButtonsContainer() {

    const [
        arrayButtonsContainer,
        //  setArrayButtonsContainer
    ] = useState(
        [
            {
                id: 0,
                textButton: "Камера",
                className: "button0",
                href: "/camera",
                // href: "#camera",
                src: "./images/camera.png",
                targetFlag: false,
            },
            {
                id: 1,
                textButton: "Данные контакта",
                className: "button1",
                // href: "#",
                href: "/",
                src: "./images/user.png",
                targetFlag: true,
            },
            {
                id: 2,
                textButton: "Задачи",
                className: "button2",
                // href: "#task",
                href: "/task",
                src: "./images/task.png",
                targetFlag: false,
            },
        ]
    );

    // console.log(arrayButtonsContainer)

    // Обработчик кнопок
    const hendlerButtonContainerItem = (event: any) => {
        // const arrayButtonContainerBlock = document.querySelectorAll('.buttons-container')[0].children;
        // const elementButtonContainer = document.querySelector(`.${event.target.className}`);

        // if()
        // arrayButtonsContainer[1].targetFlag = false;
        // setArrayButtonsContainer(
        //     [
        //         {
        //             id: 1,
        //             textButton: "Данные контакта",
        //             className: "button1 button-disable",
        //             // href: "#af",
        //             href: "#",
        //             src: "./images/user.png",
        //             targetFlag: false,
        //         },
        //     ]
        // );
        // for (let i = 0; i < arrayButtonContainerBlock.length; i++) {
        //     arrayButtonContainerBlock[i].classList.remove('button-disable');
        // }

        // elementButtonContainer?.classList.add('button-disable');
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
                        <img
                            src={element.src}
                            alt="иконка кнопки"
                            className={element.className}
                        />
                    </a>
                ))}
            </div>
        </>
    )
}