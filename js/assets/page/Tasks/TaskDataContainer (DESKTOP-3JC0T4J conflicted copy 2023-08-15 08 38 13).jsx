import React, { useContext, useState } from 'react';
import './css/data_contact_container.css';
import './css/modalNotification.css';
import { Input } from '../../components/Input';
import { useNotificationWindowState } from '../../hook/notificationWindowState';
// import { ContextContactData } from '../../hook/contextContactData';
import BX24API           from '../../../Bitrix24/BX24';

// Контейнер данных контакта
export function TaskDataContainer({decodedText, data, setData}) {
    // /* Поля ввода */
    const [nameInput,        setNameInput]        = useState(data.name);        // Состояние input "Название задачи"
    const [descriptionInput, setDescriptionInput] = useState(data.description); // Состояние input "Описание задачи"
    const [dateInput,        setDateInput]        = useState(data.date);        // Состояние input "Крайний срок"
    const [responsibleInput, setResponsibleInput] = useState(data.responsible); // Состояние input "Ответсвенный"

    const [userResponsible, setUserResponsible]   = useState(data.userResponsible); // ID ответственного

    const [statusSaveDeal,  setStatusSaveDeal]    = useState("");

    // const nameInput = useContext(ContextContactData);
    // const setNameInput = useContext(ContextContactData);

    /* Кнопки отправки */
    const [addTaskButton, setAddTaskButton] = useState(false);  // Состояние кнопки "Поставить задачу"

    // Обработка на изменение поля "Название задачи"
    const handlerNameOnChange = (event) => {
        setData({
            name:            nameInput,
            description:     descriptionInput,
            date:            dateInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible
        });
        setNameInput(event.target.value);
    }

    // Обработка на изменение поля "Описание задачи"
    const handlerDescriptionOnChange = (event) => {
        setData({
            name:            nameInput,
            description:     descriptionInput,
            date:            dateInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible
        });
        setDescriptionInput(event.target.value);
    }

    // Обработка на изменение поля "Крайний срок"
    const handlerDataOnChange = (event) => {
        setData({
            name:            nameInput,
            description:     descriptionInput,
            date:            dateInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible
        });
        setDateInput(event.target.value);
    }

    // Обработка на изменение поля "Ответственный"
    const handlerResponsibleOnChange = (event) => {
        // Показать стандартный диалог одиночного выбора пользователя
        BX24.selectUser(selUser => {
            setData({
                name:            nameInput,
                description:     descriptionInput,
                date:            dateInput,
                responsible:     responsibleInput,
                userResponsible: userResponsible
            });
            setUserResponsible(selUser);
            setResponsibleInput(selUser.name);
        });
        // setResponsibleInput(event.target.value);
    }

    // Обработчик кнопки "Сохранить контакт"
    const handlerButtonAddTask = () => {
        setAddTaskButton(true);
    }

    // Получить JSON-объект для запроса
    function getJSONRequestObject() {
        return {
            name:            nameInput,
            description:     descriptionInput,
            date:            dateInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible
        }
    }

    // Проверка на пустоту поля "ФИО"
    function checkOnVoidNameInput() {
        return nameInput.length !== 0;
    }

    // Проверка на пустоту поля "Ответственный"
    function checkOnVoidResponsibleInput() {
        return responsibleInput.length !== 0;
    }

    // Проверка на пустоту полей input
    function checkOnVoidInputs() {
        return checkOnVoidNameInput() && checkOnVoidResponsibleInput();
    }
    const crmContactAdd = async (e) => {
        console.log("e in crmContactAdd",document.getElementById('object-photo'));
            return new Promise((resolve, reject) => {
                BX24.callMethod('crm.contact.add', { 
                        fields: { 
                            NAME: e.name, 
                            SECOND_NAME: "", 
                            LAST_NAME: "", 
                            POST: e.jobTitle,
                            EMAIL: [{
                                TYPE_ID: "EMAIL",
                                VALUE: e.email,
                                VALUE_TYPE: "WORK"
                            }],
                            UF_CRM_EVENTTITLE: e.nameEvent,
                            // UF_CRM_1691695348899: document.getElementById('object-photo'),
                            // UF_CRM_PHOTO: document.getElementById('object-photo'),
                            // PHOTO: document.getElementById('object-photo'),

                            // РаботаеТ!!!!
                            // UF_CRM_1691695348899: {"fileData": ["1.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]},
                            // UF_CRM_PHOTO: {"fileData": ["1.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]},
                            // PHOTO: {"fileData": ["1.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]},
                            // UF_CRM_1691695348899: {"fileData": document.getElementById('object-photo')},
                            UF_CRM_PHOTO: {"fileData": ["1.gif", document.getElementById('object-photo')]},
                            // PHOTO: {"fileData": document.getElementById('object-photo')},


                            // UF_CRM_PHOTO: ['1.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
                            OPENED: "Y", 
                            ASSIGNED_BY_ID: userResponsible, 
                            TYPE_ID: "CLIENT",
                            SOURCE_ID: "SELF",
                            COMMENTS: e.comment + ' \n\n\Отсканированные данные: ' + decodedText,
                            PHONE: [{ 
                                VALUE: e.phone, 
                                VALUE_TYPE: "WORK", 
                                TYPE_ID: "PHONE" 
                            }],
                        },
                        params: {
                            REGISTER_SONET_EVENT: "Y"
                        }			
                    }, e => {                        
                        if (e.answer.time.length != 0) {
                            if (e.answer.error_description == undefined) {
                                resolve(e.answer.result);
                                // return e.answer.result;
                            }
                            else {
                                console.log("ОШИБКА1!!! Не смогли создать контакт: ", e.answer.error_description);
                                getModalWindow("Внимание", "Не смогли создать контакт", true);
                                // setStatusSaveDeal("err");
                                reject ("err");
                            }
                        } 
                        else {
                            console.log("ОШИБКА2!!! Не смогли создать контакт");
                            getModalWindow("Внимание", "Не смогли создать контакт", true);
                            // setStatusSaveDeal("err");
                            reject ("err");
                        }
                    }
                );
            })
    }
    // ЭТО НАДО ИЗУЧИТЬ!!!
    // https://github.com/andrey-tech/bx24-wrapper-js
    const addDataInDeal = async (e) => {
        setStatusSaveDeal("load");
        

        // Метод создаёт контакт
        let idCreatedContact = -1;
        // console.log("e.phone",e.phone);
        // console.log("e.nameEvent",e.nameEvent);
        // console.log("userResponsible",userResponsible);
        // console.log("userResponsible.id",userResponsible.id);
        // console.log("e.email",e.email);
        
        idCreatedContact = await crmContactAdd(e);
        
        // Создаём компанию
        let idCreatedCompany = -1;
        console.log("e.company",e.company);
        {
            try {
                const response = await BX24API.callMethod('crm.company.add', { 
                    fields:
                    { 
                        TITLE: e.company
                    },
                    param: {

                    }
                });
                console.log("response2",response);
                if (response.time.length != 0) {
                if (response.error_description == undefined) {
                    idCreatedCompany = response.result;
                }
                else {
                    console.log("ОШИБКА!!! Не смогли создать компанию: ", response.error_description);
                    getModalWindow("Внимание", "Не смогли создать компанию", true);
                    // setStatusSaveDeal("err");
                    return ("err");
                }
            // updateDeal = response;
            // return await response;
            } 
            else {
                console.log("ОШИБКА!!! Не смогли создать компанию");
                getModalWindow("Внимание", "Не смогли создать компанию", true);
                // setStatusSaveDeal("err");
                return ("err");
            }
            } catch (e) {
                console.log("ОШИБКА!!! Не смогли создать компанию: ", e);
                getModalWindow("Внимание", "Не смогли создать компанию", true);
                // setStatusSaveDeal("err");
                return ("err");
            }
        }
        console.log("idCreatedCompany",idCreatedCompany);
        console.log("idCreatedContact перед отправкой",idCreatedContact);

        // Добавляем компанию к созданному контакту crm.contact.company.add(id, fields)

        // Метод добавляет компанию к созданному контакту
        {
            try {
                const response = await BX24API.callMethod('crm.contact.company.add', { 
                    id: idCreatedContact,
                    fields:
                    { 
                        COMPANY_ID: idCreatedCompany
                    }		
                });
                if (response.time.length != 0) {
                    if (response.error_description == undefined) {
                        
                    }
                    else {
                        console.log("ОШИБКА!!! Не смогли добавить компанию к контакту: ", response.error_description);
                        getModalWindow("Внимание", "Не смогли добавить компанию к контакту", true);
                        // setStatusSaveDeal("err");
                        return ("err");
                    }
                // updateDeal = response;
                // return await response;
                } 
                else {
                    console.log("ОШИБКА!!! Не смогли добавить компанию к контакту");
                    getModalWindow("Внимание", "Не смогли добавить компанию к контакту", true);
                    // setStatusSaveDeal("err");
                    return ("err");
                }
            } catch (e) {
                console.log("ОШИБКА!!! Не смогли добавить компанию к контакту: ", e);
                getModalWindow("Внимание", "Не смогли добавить компанию к контакту", true);
                // setStatusSaveDeal("err");
                return ("err");
            }
        }
        // Сброс введёных полей
        setData({
            name:            "",
            description:     "",
            date:            "",
            responsible:     "",
            userResponsible: ""
        });
        getModalWindow("Успех", "Данные отправлены успешно", true);
        // setStatusSaveDeal("ok");
      }


    // Отправка формы
    const handlerSubmitDataContact = (event) => {
        event.preventDefault();

        const jsonRequestObject = getJSONRequestObject();

        // console.log(checkOnVoidInputs());

        if (checkOnVoidInputs()) {
            if (saveContactButton) {
                addDataInDeal(jsonRequestObject);
                // console.log("form submit - save contact");
                // console.log("JSON", jsonRequestObject);
            }

            if (createDealButton) {
                // console.log("form submit - create deal");
                // console.log("JSON", jsonRequestObject);
            }

            // getModalWindow("Успех", "Данные отправлены успешно", true);
        } else {
            getModalWindow("Внимание", "Заполните поле Название задачи", true);
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
    function getModalWindow(parTitleText, parBodyText, parModalWindowState) {
        setTitleText(parTitleText);
        setBodyText(parBodyText);
        setModalWindowState(parModalWindowState);
    }

    return (
        <>
            {/* <h3>Заполните поля ниже</h3> */}
            {/* <div className="data-contact-container"> */}
            <div className="push">
                <form onSubmit={handlerSubmitDataContact}>
                    {/* <h4>Отсканированная информация: {decodedText}</h4> */}
                    <Input type={"text"} id={"name"}        title={"Название задачи"} defaultValue={nameInput}        handlerOnChange={handlerNameOnChange} />
                    <Input type={"text"} id={"description"} title={"Описание"}        defaultValue={descriptionInput} handlerOnChange={handlerDescriptionOnChange} />
                    <Input type={"date"} id={"date"}        title={"Крайний срок"}    defaultValue={dateInput}        handlerOnChange={handlerDataOnChange} />
                    <Input type={"text"} id={"responsible"} title={"Ответственный"}   defaultValue={responsibleInput} handlerOnChange={handlerResponsibleOnChange} />
                    <div className="data-contact-container_submit">
                        <table width="100%" /*className="iksweb"*/ /*border = "1px" solid="1px"*/>
                            <tbody>
                                <tr>
                                    <td align='center'>
                                        <input type="submit" value={'Поставить задачу'} onClick={handlerButtonAddTask} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

