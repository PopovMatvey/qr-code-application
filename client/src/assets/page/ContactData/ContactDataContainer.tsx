import React, { useContext, useState } from 'react';
import './css/data_contact_container.css';
import './css/modalNotification.css';
import { Input } from '../../components/Input';
import { useNotificationWindowState } from '../../hook/notificationWindowState';
import { ContextContactData } from '../../hook/contextContactData';

// Контейнер данных контакта
export function DataContactContainer() {
    // /* Поля ввода */
    const [nameInput, setNameInput] = useState("");                 // Состояние input "ФИО"
    const [phoneInput, setPhoneInput] = useState("+7");             // Состояние input "Телефон"
    const [emailInput, setEmailInput] = useState("");               // Состояние input "E-mail"
    const [jobTitleInput, setJobTitleInput] = useState("");         // Состояние input "Должность"
    const [companyInput, setCompanyInput] = useState("");           // Состояние input "Компания"
    const [nameEventInput, setNameEventInput] = useState("");       // Состояние input "Название мероприятия"
    const [responsibleInput, setResponsibleInput] = useState("");   // Состояние input "Ответсвенный"

    // const nameInput = useContext(ContextContactData);
    // const setNameInput = useContext(ContextContactData);

    /* Кнопки отправки */
    const [saveContactButton, setSaveContactButton] = useState(false);  // Состояние кнопки "Сохранить контакт"
    const [createDealButton, setCreateDealButton] = useState(false);    // Состояние кнопки "Создать сделку"

    /* Функции компонента */
    // Получить текущую длину строки
    function getCurrentLengthInput(event: any) {
        return event.target.value.length;
    }

    // Получить последний символ input
    function getLastChartInput(event: any) {
        return event.target.value[event.target.value.length - 1];
    }

    // Проверка input на валидность
    function checkValidateOnInput(array: any, chekedChart: string) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === chekedChart) {
                return true;
            }
        }

        return false;
    }

    // Обработчик на изменения поля "ФИО"
    const handlerNameOnChange = (event: any) => {
        const arrayValideteCharts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '"', "'", '`', '>', '<', '/', '?', ',', '.', '-', '_', '+', '=', ')', '(',
            '*', '&', '^', '%', '$', '#', '@', '!', '{', '}', '[', ']'];
        const lastChartInput = getLastChartInput(event);
        const targetElement = document.querySelector(`#${event.target.id}`);

        if (!checkValidateOnInput(arrayValideteCharts, lastChartInput)) {
            targetElement?.classList.remove('not-validate');
            setNameInput(event.target.value);
        } else {
            targetElement?.classList.add('not-validate');
        }
    }

    // Обработчик на изменение поля "Телефон"
    const handlerPhoneOnChange = (event: any) => {
        const arrayValideteCharts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const currentLengthInput = getCurrentLengthInput(event);
        const lastChartInput = getLastChartInput(event);
        const targetElement = document.querySelector(`#${event.target.id}`);

        console.log(currentLengthInput)

        if (checkValidateOnInput(arrayValideteCharts, lastChartInput)) {
            targetElement?.classList.remove('not-validate');

            if ((currentLengthInput >= 2) && (currentLengthInput < 13)) {
                setPhoneInput(event.target.value);
            }
        } else {
            targetElement?.classList.add('not-validate')
        }
    }

    // Обработчик на изменение поля "E-mail"
    const handlerEmailOnChange = (event: any) => {
        setEmailInput(event.target.value);
    }

    // Обработка на изменение поля "Должность"
    const handlerJobTitleOnChange = (event: any) => {
        setJobTitleInput(event.target.value);
    }

    // Обработка на изменение поля "Компания"
    const handlerCompanyOnChange = (event: any) => {
        setCompanyInput(event.target.value);
    }

    // Обработка на изменение поля "Название мероприятия"
    const handlerNameEventOnChange = (event: any) => {
        setNameEventInput(event.target.value);
    }

    // Обработка на изменение поля "Ответственный"
    const handlerResponsibleOnChange = (event: any) => {
        setResponsibleInput(event.target.value);
    }

    // Обработчик кнопки "Сохранить контакт"
    const handlerButtonSaveContack = () => {
        setSaveContactButton(true);
        setCreateDealButton(false);
    }

    // Обработчик кнопки "Создать сделку"
    const handlerButtonCreateDeal = () => {
        setSaveContactButton(false);
        setCreateDealButton(true);
    }

    // Получить JSON-объект для запроса
    function getJSONRequestObject() {
        return {
            name: nameInput,
            phone: phoneInput,
            email: emailInput,
            jobTitle: jobTitleInput,
            company: companyInput,
            nameEvent: nameEventInput,
            responsible: responsibleInput,
        }
    }

    // Проверка на пустоту поля "ФИО"
    function checkOnVoidNameInput() {
        return nameInput.length !== 0;
    }

    // Проверка на пустоту поля "Телефон"
    function checkOnVoidPhoneInput() {
        return phoneInput.length > 11;
    }

    // Проверка на пустоту поля "e-mail"
    function checkOnVoidEmailInput() {
        return emailInput.length !== 0;
    }

    // Проверка на пустоту поля "Должность"
    function checkOnVoidJobTitleInput() {
        return jobTitleInput.length !== 0;
    }

    // Проверка на пустоту поля "Компания"
    function checkOnVoidCompanyInput() {
        return companyInput.length !== 0;
    }

    // Проверка на пустоту поля "Название мероприятия"
    function checkOnVoidNameEventinput() {
        return nameEventInput.length !== 0;
    }

    // Проверка на пустоту поля "Ответственный"
    function checkOnVoidResponsibleInput() {
        return responsibleInput.length !== 0;
    }

    // Проверка на пустоту полей input
    function checkOnVoidInputs() {
        return checkOnVoidNameInput() && checkOnVoidPhoneInput() && checkOnVoidEmailInput()
            && checkOnVoidJobTitleInput() && checkOnVoidCompanyInput()
            && checkOnVoidNameEventinput() && checkOnVoidResponsibleInput();
    }

    // Отправка формы
    const handlerSubmitDataContact = (event: any) => {
        event.preventDefault();

        const jsonRequestObject = getJSONRequestObject();

        // console.log(checkOnVoidInputs());

        if (checkOnVoidInputs()) {
            if (saveContactButton) {
                console.log("form submit - save contact");
                console.log("JSON", jsonRequestObject);
            }

            if (createDealButton) {
                console.log("form submit - create deal");
                console.log("JSON", jsonRequestObject);
            }

            getModalWindow("Успех", "Данные отправлены успешно", true);
        } else {
            console.log("Заполните все поля");
            getModalWindow("Внимание", "Заполните все поля", true);
        }
    }

    /* Модальное окно */
    // Состояния модального окна
    const {
        titleText, setTitleText,
        bodyText, setBodyText,
        modalWindowState, setModalWindowState,
    } = useNotificationWindowState();

    // Получить модальное окно
    function getModalWindow(parTitleText: string, parBodyText: string, parModalWindowState: boolean) {
        setTitleText(parTitleText);
        setBodyText(parBodyText);
        setModalWindowState(parModalWindowState);
    }
    return (
        <>
            <h3>Заполните поля ниже</h3>
            <div className="data-contact-container">
                <form onSubmit={handlerSubmitDataContact}>
                    <Input type={"text"} id={"name"} title={"ФИО"} defaultValue={nameInput} handlerOnChange={handlerNameOnChange} />
                    <Input type={"text"} id={"phone"} title={"Телефон"} defaultValue={phoneInput} handlerOnChange={handlerPhoneOnChange} />
                    <Input type={"email"} id={"email"} title={"E-mail"} defaultValue={emailInput} handlerOnChange={handlerEmailOnChange} />
                    <Input type={"text"} id={"job_title"} title={"Должность"} defaultValue={jobTitleInput} handlerOnChange={handlerJobTitleOnChange} />
                    <Input type={"text"} id={"company"} title={"Компания"} defaultValue={companyInput} handlerOnChange={handlerCompanyOnChange} />
                    {/* Источник */}
                    <Input type={"text"} id={"name_event"} title={"Название мероприятия"} defaultValue={nameEventInput} handlerOnChange={handlerNameEventOnChange} />
                    {/* Фотограция */}
                    {/* Комментарий */}
                    {/* Голосовой комментарий */}
                    <Input type={"text"} id={"responsible"} title={"Ответственный"} defaultValue={responsibleInput} handlerOnChange={handlerResponsibleOnChange} />
                    <div className="data-contact-container_submit">
                        <input type="submit" value={'Сохранить контакт'} onClick={handlerButtonSaveContack} />
                        <input type="submit" value={'Создать сделку'} onClick={handlerButtonCreateDeal} />
                    </div>
                </form>
            </div>

            {/* Модальное окно */
                <>
                    {modalWindowState &&
                        < div id="modalWindow" >
                            <div className="body-modal-notification" onClick={() => {
                                setModalWindowState(false);
                            }} />
                            <div className="modal-notification">
                                <button onClick={() => {
                                    setModalWindowState(false);
                                }}>X</button>
                                <div className="modal-notification_content">
                                    <h1>{titleText}</h1>
                                    <span>{bodyText}</span>
                                </div>
                            </div>
                        </div >
                    }
                </>
            }
        </>
    )
}

