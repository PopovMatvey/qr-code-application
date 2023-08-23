import React, { useContext, useState } from 'react';
import './css/data_contact_container.css';
import './css/modalNotification.css';
import { Input } from '../../components/Input';
import { useNotificationWindowState } from '../../hook/notificationWindowState';
import BX24API from '../../../Bitrix24/BX24';
import DropdownHOC from '../../../DpopdownTreeSelect/DropdownHOC';

// import { ContextContactData } from '../../hook/contextContactData';

// Контейнер данных контакта
export function TaskDataContainer({ data, setData, idUserDefault, listUsersBitrix, dataListDepartaments, setDataListDepartaments, nameEvent, IdItemCutawayApp }) {
    /* Поля ввода */
    const [nameInput, setNameInput] = useState(data.name);                          // Состояние input "Название задачи"
    const [descriptionInput, setDescriptionInput] = useState(data.description);     // Состояние input "Описание задачи"
    const [dateInput, setDateInput] = useState(data.date);                          // Состояние input "Крайний срок"
    const [responsibleInput, setResponsibleInput] = useState(data.responsible);     // Состояние input "Ответсвенный"
    const [userResponsible, setUserResponsible] = useState(data.userResponsible);   // ID ответственного
    const [update, setUpdate] = useState(false);                                    // ??? 

    // const nameInput = useContext(ContextContactData);
    // const setNameInput = useContext(ContextContactData);

    // Обработка на изменение поля "Название задачи"
    const handlerNameOnChange = (event) => {
        setData({
            name: nameInput,
            description: descriptionInput,
            date: dateInput,
            responsible: responsibleInput,
            userResponsible: userResponsible
        });
        setNameInput(event.target.value);
    }

    // Обработка на изменение поля "Описание задачи"
    const handlerDescriptionOnChange = (event) => {
        setData({
            name: nameInput,
            description: descriptionInput,
            date: dateInput,
            responsible: responsibleInput,
            userResponsible: userResponsible
        });
        setDescriptionInput(event.target.value);
    }

    // Обработка на изменение поля "Крайний срок"
    const handlerDataOnChange = (event) => {
        setData({
            name: nameInput,
            description: descriptionInput,
            date: event.target.value,
            responsible: responsibleInput,
            userResponsible: userResponsible
        });
        setDateInput(event.target.value);
    }

    // Обработка на изменение поля "Ответственный"
    const getSelectedData = (event, lists) => {
        let severalID = event._id.match(/(\d+(\.\d+)?)/g).map(v => +v);
        if (event._depth == 0) {
            let tmp = dataListDepartaments;
            tmp[severalID[1]].expanded = !tmp[severalID[1]].expanded;
            tmp[severalID[1]].checked = false;
            setDataListDepartaments(tmp);
        }

        if (severalID.length > 2) {
            let tmp = dataListDepartaments;
            tmp.map(e => { e.children.map(e1 => e1.checked = false) });
            tmp[severalID[1]].children[severalID[2]].checked = event.checked;
            setDataListDepartaments(tmp);
        }

        let idUser = listUsersBitrix.map(e => e.ID).indexOf(event.value);
        if (idUser != -1) {
            setResponsibleInput(listUsersBitrix[idUser].LAST_NAME + " " + listUsersBitrix[idUser].NAME);
            setUserResponsible(listUsersBitrix[idUser].ID);
            setData({
                name: nameInput,
                description: descriptionInput,
                date: dateInput,
                responsible: listUsersBitrix[idUser].LAST_NAME + " " + listUsersBitrix[idUser].NAME,
                userResponsible: listUsersBitrix[idUser].ID
            });
        }

        if (!event.checked) {
            setUserResponsible(idUserDefault);
            setData({
                name: nameInput,
                description: descriptionInput,
                date: dateInput,
                responsible: "",
                userResponsible: idUserDefault
            });
        };
        setUpdate(!update);
    }

    // Обработка на изменение поля "Ответственный"
    const handlerResponsibleOnChange = (event) => {
        // Показать стандартный диалог одиночного выбора пользователя
        BX24.selectUser(selUser => {
            setData({
                name: nameInput,
                description: descriptionInput,
                date: dateInput,
                responsible: selUser.name,
                userResponsible: selUser.id
            });
            setUserResponsible(selUser.id);
            setResponsibleInput(selUser.name);
        });
        // setResponsibleInput(event.target.value);
    }

    // Получить JSON-объект для запроса
    function getJSONRequestObject() {
        return {
            name: nameInput,
            description: descriptionInput,
            date: dateInput,
            responsible: responsibleInput,
            userResponsible: userResponsible
        }
    }

    // Проверка на пустоту поля "Название задачи"
    function checkOnVoidNameInput() {
        return nameInput.length !== 0;
    }

    // Проверка на пустоту поля "Ответственный"
    function checkOnVoidResponsibleInput() {
        return responsibleInput.length !== 0;
    }

    // Проверка на пустоту полей input
    function checkOnVoidInputs() {
        return checkOnVoidNameInput()
        // && checkOnVoidResponsibleInput();
    }

    const readerFileIndex = async (i) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader(), input = (document.getElementById('object-photo').files.length != 0) ? document.getElementById('object-photo').files[i] : new Blob([''], { type: 'text/plain' }); // Заглушка...сработало, вроде
            reader.addEventListener("loadend", function (result) {
                resolve(result)
            }, false);
            reader.readAsDataURL(input);
        })
    }

    // ЭТО НАДО ИЗУЧИТЬ!!!
    // https://github.com/andrey-tech/bx24-wrapper-js
    const addTask = async (e) => {

        // Готовим фотографии/файлы для передачи на сервер Bitrix24
        let arrPhoto = [];
        // let strPhoto = "";
        for (let i = 0; i < document.getElementById('object-photo').files.length; i++) {
            let result = await readerFileIndex(i);
            arrPhoto[i] = { "fileData": [document.getElementById('object-photo').files[i].name, result.target.result.split("base64,")[1]] }
            // arrPhoto[i] = {"fileData": [document.getElementById('object-photo').files[i].name, result.target.result]}
            // strPhoto = "[img]" + result.target.result + "[/img]";
        }

        // Метод для прикрепления загруженного на диск файла к задаче.
        // tasks.task.files.attach(taskId, fileId, params)

        // console.log("strPhoto",strPhoto);

        console.log("arrPhoto[0][0]", arrPhoto[0].fileData[0]);
        console.log("arrPhoto[0]", arrPhoto[0]);

        // Загружаем файл на диск
        {
            try {
                const response = await BX24API.callMethod('disk.storage.uploadFile', {
                    id: 3,
                    data: {
                        NAME: arrPhoto[0].fileData[0]
                    },
                    fileContent: arrPhoto[0]
                });
                console.log("response disk.storage.uploadFile", response);
                if (response.time.length != 0) {
                    if (response.error_description == undefined) {

                    }
                    else {
                        console.log("ОШИБКА!!! Не смогли загрузить файл на диск: ", response.error_description);
                        getModalWindow("Внимание", "Не смогли загрузить файл на диск", true);
                        return ("err");
                    }
                }
                else {
                    console.log("ОШИБКА!!! Не смогли загрузить файл на диск");
                    getModalWindow("Внимание", "Не смогли загрузить файл на диск", true);
                    return ("err");
                }
            } catch (e) {
                console.log("ОШИБКА!!! Не смогли загрузить файл на диск: ", e);
                getModalWindow("Внимание", "Не смогли загрузить файл на диск " + e, true);
                return ("err");
            }
        }


        // Создаём задачу
        {
            try {
                const response = await BX24API.callMethod('tasks.task.add', {
                    fields:
                    {
                        TITLE: e.name,            // Название задачи
                        DESCRIPTION: e.description + "Материалы к задаче: " + strPhoto,     // Описание задачи
                        CREATED_BY: idUserDefault,     // Постановщик задачи
                        RESPONSIBLE_ID: e.userResponsible, // Исполнитель
                        DEADLINE: e.date,            // Крайний срок
                    }
                });
                if (response.time.length != 0) {
                    if (response.error_description == undefined) {
                        // console.log("response tasks.task.add",response);
                    }
                    else {
                        console.log("ОШИБКА!!! Не смогли поставить задачу: ", response.error_description);
                        getModalWindow("Внимание", "Не смогли поставить задачу", true);
                        return ("err");
                    }
                }
                else {
                    console.log("ОШИБКА!!! Не смогли поставить задачу");
                    getModalWindow("Внимание", "Не смогли поставить задачу", true);
                    return ("err");
                }
            } catch (e) {
                console.log("ОШИБКА!!! Не смогли поставить задачу: ", e);
                getModalWindow("Внимание", "Не смогли поставить задачу " + e, true);
                return ("err");
            }
        }

        // Обновляем данные в хранилище "cutawayApp"
        {
            try {
                const response = await BX24API.callMethod('entity.item.update', {
                    ENTITY: 'cutawayApp',
                    ID: IdItemCutawayApp,
                    PROPERTY_VALUES: {
                        lastDate: e.date,
                        userResponsible: e.userResponsible,
                        nameEvent: nameEvent
                    }
                });
                if (response.length != 0) {
                    if (response.error_description == undefined) {
                        // console.log("response entity.item.update", response);
                    }
                    else {
                        console.log("ОШИБКА!!! Не смогли обновить свойство для элемента хранилища: ", response.error_description);
                        getModalWindow("Ошибка", "Не смогли обновить свойство для элемента хранилища: " + response.error_description, true);
                        return ("err");
                    }
                } else {
                    console.log("ОШИБКА!!! Не смогли обновить свойство для элемента хранилища");
                    getModalWindow("Ошибка", "Не смогли обновить свойство для элемента хранилища", true);
                    return ("err");
                }
            } catch (e) {
                console.log("ОШИБКА!!! Не смогли обновить свойство для элемента хранилища: ", e);
                getModalWindow("Ошибка", "Не смогли обновить свойство для элемента хранилища: " + e, true);
                return ("err");
            }
        }

        // Сброс введёных полей
        setData({
            name: "",
            description: "",
            date: "",
            responsible: responsibleInput,
            userResponsible: userResponsible,
        });
        getModalWindow("Успех", "Данные отправлены успешно", true);
    }


    // Отправка формы
    const handlerSubmitDataContact = (event) => {
        event.preventDefault();

        const jsonRequestObject = getJSONRequestObject();

        // console.log(checkOnVoidInputs());

        if (checkOnVoidInputs()) {
            getModalWindow("Загрузка", "Пожалуйста, подождите...", true);
            addTask(jsonRequestObject);
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
            {/* <div className="data-contact-container"> */}
            <div className="push">
                <form onSubmit={handlerSubmitDataContact}>
                    {/* <h4>Отсканированная информация: {decodedText}</h4> */}
                    <Input type={"text"} id={"name"} title={"Название задачи"} defaultValue={nameInput} handlerOnChange={handlerNameOnChange} />
                    <Input type={"text"} id={"description"} title={"Описание"} defaultValue={descriptionInput} handlerOnChange={handlerDescriptionOnChange} />
                    <Input type={"date"} id={"date"} title={"Крайний срок"} defaultValue={dateInput} handlerOnChange={handlerDataOnChange} />
                    <Input type={"file"} id={"object-photo"} title={"Фото"} name="object-photo" accept="image/*;capture=camera" />
                    {/* <Input type={"text"} id={"responsible"} title={"Ответственный"}   defaultValue={responsibleInput} handlerOnChange={handlerResponsibleOnChange} /> */}
                    <label style={{ margin: "15px" }} htmlFor={"responsible"}>{"Ответственный"}</label>
                    <DropdownHOC
                        idFull="1"
                        mode="hierarchical"
                        placeholder="Поиск пользователя"
                        data={dataListDepartaments}
                        getSelectedData={getSelectedData}
                    />
                    <div className="data-contact-container_submit">
                        <table width="100%" className="tableInTask" /*border = "1px" solid="1px"*/>
                            <tbody>
                                <tr>
                                    <td align='center'>
                                        <input type="submit" value={'Поставить задачу'} />
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

