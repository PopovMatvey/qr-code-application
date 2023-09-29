import React, { useContext, useState } from 'react';
import './css/data_contact_container.css';
import './css/modalNotification.css';
import { Input } from '../../components/Input';
import { useNotificationWindowState } from '../../hook/notificationWindowState';
import { ContextContactData } from '../../hook/contextContactData';
import BX24API           from '../../../Bitrix24/BX24';
import DropdownHOC       from '../../../DpopdownTreeSelect/DropdownHOC';
import 'toolcool-range-slider'

// Контейнер данных контакта
export function DataContactContainer({decodedText, data, date, setData, IdItemCutawayApp, setDecodedText, dataListDepartaments, setDataListDepartaments, listUsersBitrix, idUserDefault, listContacts, listCompany, arrayPhoto, setArrayPhoto }) {
    // /* Поля ввода */
    const [nameInput,        setNameInput]        = useState(data.name);        // Состояние input "ФИО"
    const [phoneInput,       setPhoneInput]       = useState(data.phone);       // Состояние input "Телефон"
    const [emailInput,       setEmailInput]       = useState(data.email);       // Состояние input "E-mail"
    const [jobTitleInput,    setJobTitleInput]    = useState(data.jobTitle);    // Состояние input "Должность"
    const [companyInput,     setCompanyInput]     = useState(data.company);     // Состояние input "Компания"
    const [nameEventInput,   setNameEventInput]   = useState(data.nameEvent);   // Состояние input "Название мероприятия"
    const [responsibleInput, setResponsibleInput] = useState(data.responsible); // Состояние input "Ответсвенный"
    const [commentInput,     setCommentInput]     = useState(data.comment);     // Состояние input "Комментарий"
    const [photoInput,       setPhotoInput]       = useState(data.photo);       // Состояние input "Фото"

    const [userResponsible, setUserResponsible] = useState(data.userResponsible); // ID ответственого
    const [firstNameInput,  setFirstName]       = useState(data.firstName);       // Имя
    const [lastNameInput,   setLastName]        = useState(data.lastName);        // Фамилия
    const [secondNameInput, setSecondName]      = useState(data.secondName);      // Отчество

    const [idFolder] = useState(data.idFolder);
    const [showContacts, setShowContacts] = useState(false);
    const [showCompany, setShowCompany]   = useState(false);
    const [filteredListContacts, setFilteredListContacts] = useState(listContacts);
    const [filteredListCompany, setFilteredListCompany]   = useState(listCompany);

    const [update, setUpdate] = useState(false);
    const [valueInputTypeFile, setValueInputTypeFile] = useState(undefined); // Для сброса input type file
    /* Кнопки отправки */
    const [saveContactButton, setSaveContactButton] = useState(false);  // Состояние кнопки "Сохранить контакт"
    const [createDealButton, setCreateDealButton] = useState(false);    // Состояние кнопки "Создать сделку"

    /* Функции компонента */
    // Получить текущую длину строки
    function getCurrentLengthInput(event) {
        return event.target.value.length;
    }

    // Получить последний символ input
    function getLastChartInput(event) {
        return event.target.value[event.target.value.length - 1];
    }

    // Проверка input на валидность
    function checkValidateOnInput(array, chekedChart) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === chekedChart) {
                return true;
            }
        }
        return false;
    }

    // Обработчик на изменения поля "ФИО"
    const handlerNameOnChange = (event) => {
        setShowContacts(true);
        let filteredListContacts = [];
        let sourceStr = ""; 
        listContacts.filter((e, i) => {
            sourceStr = ((e.LAST_NAME == null) ? "" : e.LAST_NAME) + ' ' + ((e.NAME == null) ? "" : e.NAME) + ' ' + ((e.SECOND_NAME == null) ? "" : e.SECOND_NAME);
            if (sourceStr.toLowerCase().includes(event.target.value.toLowerCase())) filteredListContacts.push(e);
        });
        setFilteredListContacts(filteredListContacts);

        const arrayValideteCharts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            // '"', "'", '`', '>', '<', '/', '?', ',', '.', '-', '_', '+', '=', ')', '(',
            '"', "'", '`', '>', '<', '/', '?', ',', '.', '_', '+', '=', ')', '(',
            '*', '&', '^', '%', '$', '#', '@', '!', '{', '}', '[', ']'];
        const lastChartInput = getLastChartInput(event);
        const targetElement = document.querySelector(`#${event.target.id}`);        

        // Проверка полных ФИО с двойной Фамилией через тире (с учётом буквы Ё ё) и не менее 3 букв:        
        let fio = targetElement.value.match(/^[А-ЯЁ][а-яё]{2,}([-][А-ЯЁ][а-яё]{2,})?\s[А-ЯЁ][а-яё]{2,}\s[А-ЯЁ][а-яё]{2,}$/);

        let arrayOfStrings = targetElement.value.split(" ");
        
        let firstName  = ""; // Имя
        let lastName   = ""; // Фамилия
        let secondName = ""; // Отчество

        if (arrayOfStrings.length != 0){
            switch(arrayOfStrings.length) {
                case 1: { 
                    firstName = arrayOfStrings[0];
                    break;
                };
                case 2: {
                    lastName  = arrayOfStrings[0];
                    firstName = arrayOfStrings[1];
                    break;
                };
                case 3: {
                    lastName  = arrayOfStrings[0];
                    firstName = arrayOfStrings[1];
                    secondName   = arrayOfStrings[2];
                    break;
                };
                default: {
                    lastName  = arrayOfStrings[0];
                    firstName = arrayOfStrings[1];
                    for (let i = 2; i < arrayOfStrings.length; i++){
                        secondName += arrayOfStrings[i] + " ";
                    }
                    break;
                };
            }
        }        

        if (!checkValidateOnInput(arrayValideteCharts, lastChartInput)) {
            targetElement?.classList.remove('not-validate');
            setData({
                name:            event.target.value,
                firstName:       firstName,
                lastName:        lastName,
                secondName:      secondName,
                phone:           phoneInput,
                email:           emailInput,
                jobTitle:        jobTitleInput,
                company:         companyInput,
                nameEvent:       nameEventInput,
                responsible:     responsibleInput,
                userResponsible: userResponsible,
                comment:         commentInput,
                photo:           photoInput,
                idFolder:        idFolder
            });
            setFirstName(firstName);
            setLastName(lastName);
            setSecondName(secondName);
            setNameInput(event.target.value);
        } else {
            targetElement?.classList.add('not-validate');
        }
    }

    // Обработчик на изменение поля "Телефон"
    const handlerPhoneOnChange = (event) => {
        const arrayValideteCharts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const currentLengthInput = getCurrentLengthInput(event);
        const lastChartInput = getLastChartInput(event);
        const targetElement = document.querySelector(`#${event.target.id}`);

        // console.log(currentLengthInput)

        if (checkValidateOnInput(arrayValideteCharts, lastChartInput)) {
            targetElement?.classList.remove('not-validate');

            if ((currentLengthInput >= 2) && (currentLengthInput < 13)) {
                setData({
                    name:            nameInput,
                    firstName:       firstNameInput,
                    lastName:        lastNameInput,
                    secondName:      secondNameInput,
                    phone:           event.target.value,
                    email:           emailInput,
                    jobTitle:        jobTitleInput,
                    company:         companyInput,
                    nameEvent:       nameEventInput,
                    responsible:     responsibleInput,
                    userResponsible: userResponsible,
                    comment:         commentInput,
                    photo:           photoInput,
                    idFolder:        idFolder
                });
                setPhoneInput(event.target.value);
            }
        } else {
            targetElement?.classList.add('not-validate')
        }
    }

    // Обработчик на изменение поля "E-mail"
    const handlerEmailOnChange = (event) => {
        setData({
            name:            nameInput,
            firstName:       firstNameInput,
            lastName:        lastNameInput,
            secondName:      secondNameInput,
            phone:           phoneInput,
            email:           event.target.value,
            jobTitle:        jobTitleInput,
            company:         companyInput,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         commentInput,
            photo:           photoInput,
            idFolder:        idFolder
        });
        setEmailInput(event.target.value);
    }

    // Обработка на изменение поля "Должность"
    const handlerJobTitleOnChange = (event) => {
        setData({
            name:            nameInput,
            firstName:       firstNameInput,
            lastName:        lastNameInput,
            secondName:      secondNameInput,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        event.target.value,
            company:         companyInput,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         commentInput,
            photo:           photoInput,
            idFolder:        idFolder
        });
        setJobTitleInput(event.target.value);
    }

    // Обработка на изменение поля "Компания"
    const handlerCompanyOnChange = (event) => {
        setShowCompany(true);
        let filteredListCompany = [];
        listCompany.filter((e, i) => {
            if (e.TITLE.toLowerCase().includes(event.target.value.toLowerCase())) filteredListCompany.push(e);
        });
        setFilteredListCompany(filteredListCompany);
        setData({
            name:            nameInput,
            firstName:       firstNameInput,
            lastName:        lastNameInput,
            secondName:      secondNameInput,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        jobTitleInput,
            company:         event.target.value,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         commentInput,
            photo:           photoInput,
            idFolder:        idFolder
        });
        setCompanyInput(event.target.value);
    }

    // Обработка на изменение поля "Название мероприятия"
    const handlerNameEventOnChange = (event) => {
        setData({
            name:            nameInput,
            firstName:       firstNameInput,
            lastName:        lastNameInput,
            secondName:      secondNameInput,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        jobTitleInput,
            company:         companyInput,
            nameEvent:       event.target.value,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         commentInput,
            photo:           photoInput,
            idFolder:        idFolder
        });
        setNameEventInput(event.target.value);
    }

    // Обработка на изменение поля "Ответственный"
    const handlerResponsibleOnChange = (event) => {
        // Показать стандартный диалог одиночного выбора пользователя
        BX24.selectUser(selUser => {
            setData({
                name:            nameInput,
                firstName:       firstNameInput,
                lastName:        lastNameInput,
                secondName:      secondNameInput,
                phone:           phoneInput,
                email:           emailInput,
                jobTitle:        jobTitleInput,
                company:         companyInput,
                nameEvent:       nameEventInput,
                responsible:     selUser.name,
                userResponsible: selUser.id,
                comment:         commentInput,
                photo:           photoInput,
                idFolder:        idFolder
            });
            setUserResponsible(selUser.id);
            setResponsibleInput(selUser.name);
        });
        // setResponsibleInput(event.target.value);
    }

    // Обработка на изменение поля "Комментарий"
    const handlerCommentOnChange = (event) => {
        setData({
            name:            nameInput,
            firstName:       firstNameInput,
            lastName:        lastNameInput,
            secondName:      secondNameInput,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        jobTitleInput,
            company:         companyInput,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         event.target.value,
            photo:           photoInput,
            idFolder:        idFolder
        });
        setCommentInput(event.target.value);
    }

    
    // ^ - начало строки
    // .*[\/\\] - 0 и более символов, отличных от символов перевода строки, как можно больше, до последнего \ or / в строке
    // | - или
    //  ( - строка  (
    // \d+ - 1 и более цифр
    // \)\. - строка ).
    // \w+ - 1 и более букв/цифр/_
    // $ - конец строки

    // // Работает!!! Показывает полученое изображение в <img src="" id={"img"} height="200" alt="Image preview..."></img>
    // function handlerPhotoOnChange5(event) {
    //     // console.log("event in handlerPhotoOnChange", event);
    //     setImgBase64("");
    //     let reader = new FileReader(),
    //     input = document.getElementById('object-photo').files[0],
    //     output = document.getElementById('img');
    //     // let test = "";
    //     reader.addEventListener("loadend", function(result) {
    //         console.log("result.target.result",result.target.result);
    //         setImgBase64(result.target.result.slice());
    //         // test = result.target.result;
    //         output.innerHTML = result.target.result; // Кодирует изображение в base64
    //         output.src = result.target.result;  // Показывает изображение
    //     }, false);
    //     reader.readAsDataURL(input);
    //     // console.log("reader",reader.result);
    //     // setImgBase64(reader.result);
    // }

    // Обработка на изменение поля "Фото"
    const handlerPhotoOnChange = async (event) => {
        setValueInputTypeFile(undefined);
        for (let i = 0; i < document.getElementById('object-photo').files.length; i++) {
            let tmp = false;
            let result = await readerFileIndex(i);
            arrayPhoto.map(e => { if (e.fileData[0] == document.getElementById('object-photo').files[i].name) tmp = true});
            if (!tmp) arrayPhoto.push({"fileData": [document.getElementById('object-photo').files[i].name, result.target.result]});
        }
        
        setData({
            name:            nameInput,
            firstName:       firstNameInput,
            lastName:        lastNameInput,
            secondName:      secondNameInput,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        jobTitleInput,
            company:         companyInput,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         commentInput,
            photo:           event.target.files, // НЕ РАБОТАЕТ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            idFolder:        idFolder
        });
        setPhotoInput(event.target);
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
            name:            nameInput,
            firstName:       firstNameInput,
            lastName:        lastNameInput,
            secondName:      secondNameInput,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        jobTitleInput,
            company:         companyInput,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         commentInput,
            photo:           photoInput,
            idFolder:        idFolder
        }
    }

    // Проверка на пустоту поля "ФИО"
    function checkOnVoidNameInput() {
        return nameInput.length !== 0;
    }

    // Проверка на пустоту поля "Телефон"
    function checkOnVoidPhoneInput() {
        return (phoneInput.length > 11) || (phoneInput=="+7");
    }

    // Проверка на пустоту поля "e-mail"
    function checkOnVoidEmailInput() {
        return (emailInput.length !== 0);
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
        return checkOnVoidNameInput() && checkOnVoidPhoneInput();// && checkOnVoidEmailInput();
        // return checkOnVoidNameInput() && checkOnVoidPhoneInput() && checkOnVoidEmailInput()
        //     && checkOnVoidJobTitleInput() && checkOnVoidCompanyInput()
        //     && checkOnVoidNameEventinput() && checkOnVoidResponsibleInput();
    }

    const readerFileIndex = async (i) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader(), input = (document.getElementById('object-photo').files.length != 0) ? document.getElementById('object-photo').files[i] : new Blob([''], {type: 'text/plain'}); // Заглушка...сработало, вроде
            reader.addEventListener("loadend", function(result) {
                resolve(result)
            }, false);
            reader.readAsDataURL(input);
        })
    }

    const crmContactAdd = async ({e, arrayPhotoTMP}) => {
        return new Promise((resolve, reject) => {
            BX24.callMethod('crm.contact.add', { 
                fields: { 
                    NAME:        e.firstName, 
                    SECOND_NAME: e.secondName, 
                    LAST_NAME:   e.lastName, 
                    POST:        e.jobTitle,
                    EMAIL: [{
                        TYPE_ID:    "EMAIL",
                        VALUE:      e.email,
                        VALUE_TYPE: "WORK"
                    }],
                    UF_CRM_EVENTTITLE: e.nameEvent,
                    UF_CRM_PHOTO:      arrayPhotoTMP,
                    OPENED:            "Y", 
                    ASSIGNED_BY_ID:    e.userResponsible, 
                    TYPE_ID:           "CLIENT",
                    SOURCE_ID:         "SELF",
                    // SOURCE_ID: // crm.status.list с фильтром filter[ENTITY_ID]=SOURCE
                    COMMENTS: e.comment + ' \n\n\Отсканированные данные: ' + decodedText,
                    PHONE: [{ 
                        VALUE:      e.phone, 
                        VALUE_TYPE: "WORK", 
                        TYPE_ID:    "PHONE" 
                        }],
                },
                params: {
                    REGISTER_SONET_EVENT: "Y"
                }}, e => {                        
                    if (e.answer.time.length != 0) {
                        if (e.answer.error_description == undefined) {
                            resolve(e.answer.result);
                        }
                        else {
                            console.log("ОШИБКА1!!! Не смогли создать контакт: ", e.answer.error_description);
                            getModalWindow("Внимание", "Не смогли создать контакт", true);
                            reject ("err");
                        }
                    } 
                    else {
                        console.log("ОШИБКА2!!! Не смогли создать контакт");
                        getModalWindow("Внимание", "Не смогли создать контакт", true);
                        reject ("err");
                    }
                }
            );
        })   
    }

    const crmDealAdd = async ({e, arrayPhotoTMP, idCreatedCompany, idCreatedContact}) => {
        return new Promise((resolve, reject) => {
            BX24.callMethod('crm.deal.add', { 
                fields: {
                    COMPANY_ID:       idCreatedCompany,
                    CONTACT_ID:       idCreatedContact,
                    COMMENTS:         e.comment + ' \n\n\Отсканированные данные: ' + decodedText,
                    ASSIGNED_BY_ID:   userResponsible, 
                    UF_CRM_NAMEEVENT: e.nameEvent,
                    UF_CRM_PHOTODEAL: arrayPhotoTMP
                    // SOURCE_ID: // crm.status.list с фильтром filter[ENTITY_ID]=SOURCE
                }}, e => {                        
                    if (e.answer.time.length != 0) {
                        if (e.answer.error_description == undefined) {
                            resolve(e.answer.result);
                        }
                        else {
                            console.log("ОШИБКА1!!! Не смогли создать сделку: ", e.answer.error_description);
                            getModalWindow("Внимание", "Не смогли создать сделку", true);
                            reject ("err");
                        }
                    } 
                    else {
                        console.log("ОШИБКА2!!! Не смогли создать сделку");
                        getModalWindow("Внимание", "Не смогли создать сделку", true);
                        reject ("err");
                    }
                }
            );
        })   
    }

    // ЭТО НАДО ИЗУЧИТЬ!!!
    // https://github.com/andrey-tech/bx24-wrapper-js
    const addDataInDeal = async (e) => {
        {
        // Находим поля, чтобы добавить компанию к контакту
        // {
        //     try {
        //         const response = await BX24API.callMethod('crm.contact.fields');
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response crm.contact.fields", response);
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли запросить требуемые поля для создания контакта: ", response.error_description);
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли запросить требуемые поля для создания контакта");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли запросить требуемые поля для создания контакта: ", e);
        //         return ("err");
        //     }
        // }
        

        // Запросим данные контакта crm.contact.get(id)
        // {
        //     try {
        //         const response = await BX24API.callMethod('crm.contact.get', {id: 202});
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response crm.contact.get id=202", response);
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли запросить данные контакта: ", response.error_description);
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли запросить данные контакта");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли запросить данные контакта: ", e);
        //         return ("err");
        //     }
        // }

        // Метод возвращает поля, которые могут потребоваться для его создания
        // {
        //     try {
        //         const response = await BX24API.callMethod('crm.contact.fields');
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response crm.contact.fields",response);
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли поля контакта: ", response.error_description);
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли поля контакта");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли поля контакта: ", e);
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //     }
        // }
        }
              
        // // Готовим фотографии/файлы для передачи на сервер Bitrix24
        // let arrPhoto = [];
        // for (let i = 0; i < document.getElementById('object-photo').files.length; i++) {
        //     let result = await readerFileIndex(i);
        //     arrPhoto[i] = {"fileData": [document.getElementById('object-photo').files[i].name, result.target.result.split("base64,")[1]]}
        //     // arrPhoto[i] = {"fileData": [document.getElementById('object-photo').files[i].name, result.target.result]}
        // }

        // Готовим фотографии/файлы для передачи на сервер Bitrix24
        let arrayPhotoTMP = arrayPhoto;
        arrayPhoto.map((e, i) => {
            let img = e.fileData[1].split("base64,")[1];
            arrayPhotoTMP[i].fileData[1] = img;
        });

        // Метод создаёт контакт
        let idCreatedContact = -1;
        // idCreatedContact = await crmContactAdd({e, arrPhoto});
        idCreatedContact = await crmContactAdd({e, arrayPhotoTMP});
        
        // Создаём компанию
        let idCreatedCompany = -1;
        if (e.company != "") {
            {
                try {
                    const response = await BX24API.callMethod('crm.company.add', { 
                        fields:
                        { 
                            TITLE: e.company,
                            ASSIGNED_BY_ID: e.userResponsible, 
                            // SOURCE_ID: // crm.status.list с фильтром filter[ENTITY_ID]=SOURCE
                        },
                        param: {
                            
                        }
                    });
                    if (response.time.length != 0) {
                    if (response.error_description == undefined) {
                        idCreatedCompany = response.result;
                    }
                    else {
                        console.log("ОШИБКА1!!! Не смогли создать компанию: ", response.error_description);
                        getModalWindow("Внимание", "Не смогли создать компанию" + response.error_description, true);
                        return ("err");
                    }
                } 
                else {
                    console.log("ОШИБКА2!!! Не смогли создать компанию");
                    getModalWindow("Внимание", "Не смогли создать компанию", true);
                    return ("err");
                }
                } catch (e) {
                    console.log("ОШИБКА3!!! Не смогли создать компанию: ", e);
                    getModalWindow("Внимание", "Не смогли создать компанию" + e, true);
                    return ("err");
                }
            }
        
            // Добавляем компанию к созданному контакту crm.contact.company.add(id, fields)
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
                            // console.log("response crm.contact.company.add", response);
                        }
                        else {
                            console.log("ОШИБКА!!! Не смогли добавить компанию к контакту: ", response.error_description);
                            getModalWindow("Внимание", "Не смогли добавить компанию к контакту " + response.error_description, true);
                            return ("err");
                        }
                    } 
                    else {
                        console.log("ОШИБКА!!! Не смогли добавить компанию к контакту");
                        getModalWindow("Внимание", "Не смогли добавить компанию к контакту", true);
                        return ("err");
                    }
                } catch (e) {
                    console.log("ОШИБКА!!! Не смогли добавить компанию к контакту: " + e, e);
                    getModalWindow("Внимание", "Не смогли добавить компанию к контакту", true);
                    return ("err");
                }
            }
        }

        // // Обновляем свойство "Название мероприятия" в хранилище "cutawayApp"
        // {
        //     try {
        //         const response = await BX24API.callMethod('entity.item.update', {
        //             ENTITY:   'cutawayApp',
        //             ID:       IdItemCutawayApp,
        //             PROPERTY_VALUES: {
        //                 nameEvent: nameEventInput
        //             }
        //         });
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             // console.log("response entity.item.update", response);
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли обновить свойство для элемента хранилища: ", response.error_description);
        //             getModalWindow("Ошибка", "ОШИБКА!!! Не смогли обновить свойство для элемента хранилища: " + response.error_description, true);
        //             return ("err");
        //         }
        //         } else {
        //             console.log("ОШИБКА!!! Не смогли обновить свойство для элемента хранилища");
        //             getModalWindow("Ошибка", "ОШИБКА!!! Не смогли обновить свойство для элемента хранилища", true);
        //             return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли обновить свойство для элемента хранилища: ", e);
        //         getModalWindow("Ошибка", "ОШИБКА!!! Не смогли обновить свойство для элемента хранилища: " + e, true);
        //         return ("err");
        //     }
        // }

        // Обновляем данные в хранилище "cutawayApp"
        {
            try {
                const response = await BX24API.callMethod('entity.item.update', {
                    ENTITY: 'cutawayApp',
                    ID:     IdItemCutawayApp,
                    PROPERTY_VALUES: {
                        lastDate:        date,
                        userResponsible: e.userResponsible,
                        nameEvent:       nameEventInput,
                        idFolder:        idFolder
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

        if (createDealButton) {
            // await crmDealAdd({e, arrPhoto, idCreatedCompany, idCreatedContact});
            await crmDealAdd({e, arrayPhotoTMP, idCreatedCompany, idCreatedContact});
        }

        // Сброс введёных полей
        setData({
            name:            "",
            firstName:       "",
            lastName:        "",
            secondName:      "",
            phone:           "+7",
            email:           "",
            jobTitle:        "",
            company:         "",
            nameEvent:       "",
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         "",
            photo:           [],
            idFolder:        idFolder
        });
        setNameInput("");
        setPhoneInput("+7");
        setEmailInput("");
        setJobTitleInput("");
        setCompanyInput("");
        setCommentInput("");
        setPhotoInput([]);
        setDecodedText("");
        setArrayPhoto([]);
        setValueInputTypeFile("");
        getModalWindow("Успех", "Данные отправлены успешно", true);
      }


    // Отправка формы
    const handlerSubmitDataContact = (event) => {
        event.preventDefault();

        const jsonRequestObject = getJSONRequestObject();

        // console.log(checkOnVoidInputs());

        if (checkOnVoidInputs()) {
            // if (saveContactButton) {
                getModalWindow("Загрузка", "Пожалуйста, подождите...", true);
                addDataInDeal(jsonRequestObject);
                // console.log("form submit - save contact");
                // console.log("JSON", jsonRequestObject);
            // }

            // if (createDealButton) {
            //     // console.log("form submit - create deal");
            //     // console.log("JSON", jsonRequestObject);
            // }

            // getModalWindow("Успех", "Данные отправлены успешно", true);
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
    function getModalWindow(parTitleText, parBodyText, parModalWindowState) {
        setTitleText(parTitleText);
        setBodyText(parBodyText);
        setModalWindowState(parModalWindowState);
    }
    
    const getSelectedData = (event, lists) => {
        let severalID = event._id.match(/(\d+(\.\d+)?)/g).map(v => +v);
        if (event._depth == 0) {
            let tmp = dataListDepartaments;
            tmp[severalID[1]].expanded = !tmp[severalID[1]].expanded ;
            tmp[severalID[1]].checked = false;
            setDataListDepartaments(tmp);
        }

        if (severalID.length > 2) {
            let tmp = dataListDepartaments;
            tmp.map(e => {e.children.map(e1 => e1.checked = false)});
            tmp[severalID[1]].children[severalID[2]].checked = event.checked;
            setDataListDepartaments(tmp);
        }

        let idUser = listUsersBitrix.map(e => e.ID).indexOf(event.value);
        if (idUser != -1) {
            setResponsibleInput(listUsersBitrix[idUser].LAST_NAME + " " + listUsersBitrix[idUser].NAME);
            setUserResponsible(listUsersBitrix[idUser].ID);
            setData({
                name:            nameInput,
                firstName:       firstNameInput,
                lastName:        lastNameInput,
                secondName:      secondNameInput,
                phone:           phoneInput,
                email:           emailInput,
                jobTitle:        jobTitleInput,
                company:         companyInput,
                nameEvent:       nameEventInput,
                responsible:     listUsersBitrix[idUser].LAST_NAME + " " + listUsersBitrix[idUser].NAME,
                userResponsible: listUsersBitrix[idUser].ID,
                comment:         commentInput,
                photo:           photoInput,
                idFolder:        idFolder
            })
        }
        
        if (!event.checked) {
            setUserResponsible(idUserDefault);
            setData({
                name:            nameInput,
                firstName:       firstNameInput,
                lastName:        lastNameInput,
                secondName:      secondNameInput,
                phone:           phoneInput,
                email:           emailInput,
                jobTitle:        jobTitleInput,
                company:         companyInput,
                nameEvent:       nameEventInput,
                responsible:     "",
                userResponsible: idUserDefault,
                comment:         commentInput,
                photo:           photoInput,
                idFolder:        idFolder
            })
        };
        setUpdate(!update);
    }

    const onBlurContact = () => {
        // setShowContacts(false);
    }

    const onBlurCompany = () => {
        // setShowCompany(false);
    }

    

    const setNameContact = (event) => {
        setData({
            name:            ((event.LAST_NAME == null) ? "" : event.LAST_NAME) + ' ' + ((event.NAME == null) ? "" : event.NAME) + ' ' + ((event.SECOND_NAME == null) ? "" : event.SECOND_NAME),
            firstName:       event.NAME,
            lastName:        event.LAST_NAME,
            secondName:      event.SECOND_NAME,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        jobTitleInput,
            company:         companyInput,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         commentInput,
            photo:           photoInput,
            idFolder:        idFolder
        });
        setFirstName(event.NAME);
        setLastName(event.LAST_NAME);
        setSecondName(event.SECOND_NAME);
        setNameInput(((event.LAST_NAME == null) ? "" : event.LAST_NAME) + ' ' + ((event.NAME == null) ? "" : event.NAME) + ' ' + ((event.SECOND_NAME == null) ? "" : event.SECOND_NAME));
        setShowContacts(false);
    }

    const setNameCompany = (event) => {
        setData({
            name:            nameInput,
            firstName:       firstNameInput,
            lastName:        lastNameInput,
            secondName:      secondNameInput,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        jobTitleInput,
            company:         event.TITLE,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         commentInput,
            photo:           photoInput,
            idFolder:        idFolder
        });
        setCompanyInput(event.TITLE);
        setShowCompany(false);
    }

    let contactsForShow = [];
    filteredListContacts.forEach((e, i) => {
        contactsForShow.push(<label key={i} style={{visible: "false"}} className='listContact' align={'center'} onClick={() => setNameContact(e)}>
        {((e.LAST_NAME == null) ? "" : e.LAST_NAME) + ' ' + ((e.NAME == null) ? "" : e.NAME) + ' ' + ((e.SECOND_NAME == null) ? "" : e.SECOND_NAME)}</label>);
    });

    let companyForShow = [];
    filteredListCompany.forEach((e, i) => {
        companyForShow.push(<h4 key={i} className='listContact' align={'center'} onClick={() => setNameCompany(e)}>{e.TITLE}</h4>);
    });

    return (
        <>
            {/* <h3>Заполните поля ниже</h3> */}
            {/* <div className="data-contact-container"> */}
            <div className="push">
                <form onSubmit={handlerSubmitDataContact}>       
                    {/* <h4>Отсканированная информация: {decodedText}</h4> */}
                    <Input type={"text"}  id={"name"}         title={"ФИО"}                  defaultValue={nameInput}        handlerOnChange={handlerNameOnChange} onBlur={onBlurContact} />
                    {showContacts && contactsForShow}
                    <Input type={"text"}  id={"phone"}        title={"Телефон"}              defaultValue={phoneInput}       handlerOnChange={handlerPhoneOnChange} />
                    <Input type={"email"} id={"email"}        title={"E-mail"}               defaultValue={emailInput}       handlerOnChange={handlerEmailOnChange} />
                    <Input type={"text"}  id={"job_title"}    title={"Должность"}            defaultValue={jobTitleInput}    handlerOnChange={handlerJobTitleOnChange} />
                    <Input type={"text"}  id={"company"}      title={"Компания"}             defaultValue={companyInput}     handlerOnChange={handlerCompanyOnChange} onBlur={onBlurCompany} />
                    {showCompany && companyForShow}
                    {/* Источник */}
                    <Input type={"text"}  id={"name_event"}   title={"Название мероприятия"} defaultValue={nameEventInput}   handlerOnChange={handlerNameEventOnChange} />
                    {/* Фотограция */}
                    {/* Комментарий */}
                    {/* Голосовой комментарий */}
                    {/* <Input type={"text"}  id={"responsible"}  title={"Ответственный"}        defaultValue={responsibleInput}     handlerOnChange={handlerResponsibleOnChange} /> */}
                    <label style={{margin: "15px"}} htmlFor={"responsible"}>{"Ответственный"}</label>
                    <DropdownHOC 
                        idFull          = "0"
                        mode            = "hierarchical"
                        placeholder     = "Поиск пользователя"
                        data            = {dataListDepartaments}
                        getSelectedData = {getSelectedData} 
                        />
                    {/* <GetSelectResponsibleUser/> */}
                    <Input type={"file"}  id={"object-photo"} title={"Фото/Файлы"} name="object-photo" accept="image/*;capture=camera" defaultValue={valueInputTypeFile} handlerOnChange={handlerPhotoOnChange}/>
                    {arrayPhoto.map((e, i) => (<img key={i} src={arrayPhoto[i].fileData[1]} id={"img"} height="50" style={{padding: "5px"}} alt={arrayPhoto[i].fileData[0]}></img>))} 
                    <Input type={"text"}  id={"comment"}      title={"Комментарий"}          defaultValue={commentInput}         handlerOnChange={handlerCommentOnChange} />
                    {/* <Input type={"text"}  id={"contacts"}      title={"ФИО"}          defaultValue={commentInput}     onKeyUpFunc={handlerCommentOnChange} /> */}
                    
                    <div className="data-contact-container_submit">
                        <table width="100%" className="tableInDataContainer" /*border = "1px" solid="1px"*/>
                            <tbody>
                                <tr>
                                    <td align='center'>
                                        <input type="submit" value={'Сохранить контакт'}          onClick={handlerButtonSaveContack} />
                                    </td>
                                    <td align='center'>
                                        <input type="submit" value={'Создать сделку'}             onClick={handlerButtonCreateDeal} />
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

