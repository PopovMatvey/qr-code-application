import React, { useState } from 'react';
import imgCamera from "../../images/camera.png"
import imgUser from "../../images/user.png"
import imgTask from "../../images/task.png"

import './css/style.css';

// Контейнер кнопок
export function ButtonsContainer(props) {

    const [
        arrayButtonsContainer
    ] = useState(
        [
            {
                id: 0,
                textButton: "Сканер",
                className: "button0",
                // href: "/camera",
                src: imgCamera,
                targetFlag: false,
            },
            {
                id: 1,
                textButton: "Данные контакта",
                className: "button1",
                // href: "/",
                src: imgUser,
                targetFlag: true,
            },
            {
                id: 2,
                textButton: "Задачи",
                className: "button2",
                // href: "/task",
                src: imgTask,
                targetFlag: false,
            },
            {
                id: 3,
                textButton: "Камера",
                className: "button3",
                // href: "/task",
                src: imgCamera,
                targetFlag: false,
            },
        ]
    );

    // console.log(arrayButtonsContainer)

    // Обработчик кнопок
    const hendlerButtonContainerItem = (event) => {
        console.log("event в кнопке", event);
        console.log("Номер кнопки:", event.target.id);

        props.setNTab(event.target.id);


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
                {/* <table width="100%"  border="1px" solid="1px">
                    <tbody>
                        <tr>
                            <td align='center'>
                                <a
                                    key={arrayButtonsContainer[0].id}
                                    id={0}
                                    className={arrayButtonsContainer[0].className}
                                    onClick={hendlerButtonContainerItem}
                                    // href={element.href}
                                >
                                    <img
                                        id={0}
                                        src={arrayButtonsContainer[0].src}
                                        alt="иконка кнопки"
                                        className={arrayButtonsContainer[0].className}
                                    />
                                </a>
                            </td>
                            <td align='center'>
                                <a
                                    key={arrayButtonsContainer[1].id}
                                    id={1}
                                    className={arrayButtonsContainer[1].className}
                                    onClick={hendlerButtonContainerItem}
                                    // href={element.href}
                                >
                                    <img
                                        id={1}
                                        src={arrayButtonsContainer[1].src}
                                        alt="иконка кнопки"
                                        className={arrayButtonsContainer[1].className}
                                    />
                                </a>
                            </td>
                            <td align='center'>
                                <a
                                    key={arrayButtonsContainer[2].id}
                                    id={2}
                                    className={arrayButtonsContainer[2].className}
                                    onClick={hendlerButtonContainerItem}
                                    // href={element.href}
                                >
                                    <img
                                        id={2}
                                        src={arrayButtonsContainer[2].src}
                                        alt="иконка кнопки"
                                        className={arrayButtonsContainer[2].className}
                                    />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table> */}

                {arrayButtonsContainer.map((element) => (
                    <a
                        key={element.id}

                        className={element.className}
                        onClick={hendlerButtonContainerItem}
                    >
                        <img
                            src={element.src}
                            id={element.id}
                            alt="иконка кнопки"
                            className={element.className}
                        />
                    </a>
                ))}
            </div>
        </>
    )
}