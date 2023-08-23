import React, { useContext, useState } from 'react';
import './css/data_contact_container.css';
import './css/modalNotification.css';
import { Input } from '../../components/Input';
import { useNotificationWindowState } from '../../hook/notificationWindowState';
import { ContextContactData } from '../../hook/contextContactData';
import BX24API           from '../../../Bitrix24/BX24';

// Контейнер данных контакта
export function DataContactContainer({decodedText, data, setData, idNameEventEntity}) {
    console.log("Зашёл!");
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

    const [userResponsible, setUserResponsible] = useState(data.userResponsible);

    const [statusSaveDeal, setStatusSaveDeal] = useState("");

    // const nameInput = useContext(ContextContactData);
    // const setNameInput = useContext(ContextContactData);

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
        const arrayValideteCharts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '"', "'", '`', '>', '<', '/', '?', ',', '.', '-', '_', '+', '=', ')', '(',
            '*', '&', '^', '%', '$', '#', '@', '!', '{', '}', '[', ']'];
        const lastChartInput = getLastChartInput(event);
        const targetElement = document.querySelector(`#${event.target.id}`);

        if (!checkValidateOnInput(arrayValideteCharts, lastChartInput)) {
            targetElement?.classList.remove('not-validate');
            setData({
                name: event.target.value,
                phone: phoneInput,
                email: emailInput,
                jobTitle: jobTitleInput,
                company: companyInput,
                nameEvent: nameEventInput,
                responsible: responsibleInput,
                userResponsible: userResponsible,
                comment: commentInput,
                photo: photoInput
            });
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
                    name: nameInput,
                    phone: event.target.value,
                    email: emailInput,
                    jobTitle: jobTitleInput,
                    company: companyInput,
                    nameEvent: nameEventInput,
                    responsible: responsibleInput,
                    userResponsible: userResponsible,
                    comment: commentInput,
                    photo: photoInput
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
            name: nameInput,
            phone: phoneInput,
            email: event.target.value,
            jobTitle: jobTitleInput,
            company: companyInput,
            nameEvent: nameEventInput,
            responsible: responsibleInput,
            userResponsible: userResponsible,
            comment: commentInput,
            photo: photoInput
        });
        setEmailInput(event.target.value);
    }

    // Обработка на изменение поля "Должность"
    const handlerJobTitleOnChange = (event) => {
        setData({
            name: nameInput,
            phone: phoneInput,
            email: emailInput,
            jobTitle: event.target.value,
            company: companyInput,
            nameEvent: nameEventInput,
            responsible: responsibleInput,
            userResponsible: userResponsible,
            comment: commentInput,
            photo: photoInput
        });
        setJobTitleInput(event.target.value);
    }

    // Обработка на изменение поля "Компания"
    const handlerCompanyOnChange = (event) => {
        setData({
            name: nameInput,
            phone: phoneInput,
            email: emailInput,
            jobTitle: jobTitleInput,
            company: event.target.value,
            nameEvent: nameEventInput,
            responsible: responsibleInput,
            userResponsible: userResponsible,
            comment: commentInput,
            photo: photoInput
        });
        setCompanyInput(event.target.value);
    }

    // Обработка на изменение поля "Название мероприятия"
    const handlerNameEventOnChange = (event) => {
        setData({
            name: nameInput,
            phone: phoneInput,
            email: emailInput,
            jobTitle: jobTitleInput,
            company: companyInput,
            nameEvent: event.target.value,
            responsible: responsibleInput,
            userResponsible: userResponsible,
            comment: commentInput,
            photo: photoInput
        });
        setNameEventInput(event.target.value);
    }

    // Обработка на изменение поля "Ответственный"
    const handlerResponsibleOnChange = (event) => {
        // Показать стандартный диалог одиночного выбора пользователя
        BX24.selectUser(selUser => {
            setData({
                name:            nameInput,
                phone:           phoneInput,
                email:           emailInput,
                jobTitle:        jobTitleInput,
                company:         companyInput,
                nameEvent:       nameEventInput,
                responsible:     selUser.name,
                userResponsible: selUser.id,
                comment:         commentInput,
                photo:           photoInput
            });
            setUserResponsible(selUser);
            setResponsibleInput(selUser.name);
        });
        // setResponsibleInput(event.target.value);
    }

    // Обработка на изменение поля "Комментарий"
    const handlerCommentOnChange = (event) => {
        setData({
            name:            nameInput,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        jobTitleInput,
            company:         companyInput,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         event.target.value,
            photo:           photoInput
        });
        setCommentInput(event.target.value);
    }

    // Обработка на изменение поля "Фото"
    const handlerPhotoOnChange = (event) => {
        console.log("photo", event);
        setData({
            name:            nameInput,
            phone:           phoneInput,
            email:           emailInput,
            jobTitle:        jobTitleInput,
            company:         companyInput,
            nameEvent:       nameEventInput,
            responsible:     responsibleInput,
            userResponsible: userResponsible,
            comment:         commentInput,
            photo:           event.target.files
        });
        setPhotoInput(event.target.files);
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
            name:        nameInput,
            phone:       phoneInput,
            email:       emailInput,
            jobTitle:    jobTitleInput,
            company:     companyInput,
            nameEvent:   nameEventInput,
            responsible: responsibleInput,
            comment:     commentInput,
            photo:       photoInput
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
        // console.log("event in addDataInDeal",e);
        
        // Находим ID пользователя, который запустил программу
        // let idUser = -1;
        // {
        //     try {
        //         const response = await BX24API.callMethod('user.current');
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response BX24.placement.info()", response);
        //             idUser = response.result.ID;
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли получить ID пользователя: ", response.error_description);
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли получить ID пользователя");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли получить ID пользователя: ", e);
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //     }
        // }
        // console.log("Id текущего пользователя: ", idUser);
        
        //selUser.id - это выбранный ответственный за контакт!!!!!!!

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
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли запросить требуемые поля для создания контакта");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли запросить требуемые поля для создания контакта: ", e);
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //     }
        // }
        // Поля, которые могут потребоваться, чтобы к контакту привязать сделку
        // {
        //     "result": {
        //       "ID": {
        //         "type": "integer",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "ID"
        //       },
        //       "HONORIFIC": {
        //         "type": "crm_status",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "statusType": "HONORIFIC",
        //         "title": "Обращение"
        //       },
        //       "NAME": {
        //         "type": "string",
        //         "isRequired": true,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Имя"
        //       },
        //       "SECOND_NAME": {
        //         "type": "string",
        //         "isRequired": true,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Отчество"
        //       },
        //       "LAST_NAME": {
        //         "type": "string",
        //         "isRequired": true,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Фамилия"
        //       },
        //       "PHOTO": {
        //         "type": "file",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Фотография"
        //       },
        //       "BIRTHDATE": {
        //         "type": "date",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Дата рождения"
        //       },
        //       "TYPE_ID": {
        //         "type": "crm_status",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "statusType": "CONTACT_TYPE",
        //         "title": "Тип контакта"
        //       },
        //       "SOURCE_ID": {
        //         "type": "crm_status",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "statusType": "SOURCE",
        //         "title": "Источник"
        //       },
        //       "SOURCE_DESCRIPTION": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Дополнительно об источнике"
        //       },
        //       "POST": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Должность"
        //       },
        //       "ADDRESS": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Адрес"
        //       },
        //       "ADDRESS_2": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Адрес (стр. 2)"
        //       },
        //       "ADDRESS_CITY": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Город"
        //       },
        //       "ADDRESS_POSTAL_CODE": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Почтовый индекс"
        //       },
        //       "ADDRESS_REGION": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Район"
        //       },
        //       "ADDRESS_PROVINCE": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Область"
        //       },
        //       "ADDRESS_COUNTRY": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Страна"
        //       },
        //       "ADDRESS_COUNTRY_CODE": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Код страны"
        //       },
        //       "ADDRESS_LOC_ADDR_ID": {
        //         "type": "integer",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Идентификатор адреса местоположения"
        //       },
        //       "COMMENTS": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Комментарий"
        //       },
        //       "OPENED": {
        //         "type": "char",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Доступен для всех"
        //       },
        //       "EXPORT": {
        //         "type": "char",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Участвует в экспорте контактов"
        //       },
        //       "HAS_PHONE": {
        //         "type": "char",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Задан телефон"
        //       },
        //       "HAS_EMAIL": {
        //         "type": "char",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Задан e-mail"
        //       },
        //       "HAS_IMOL": {
        //         "type": "char",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Задана открытая линия"
        //       },
        //       "ASSIGNED_BY_ID": {
        //         "type": "user",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Ответственный"
        //       },
        //       "CREATED_BY_ID": {
        //         "type": "user",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Кем создан"
        //       },
        //       "MODIFY_BY_ID": {
        //         "type": "user",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Кем изменен"
        //       },
        //       "DATE_CREATE": {
        //         "type": "datetime",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Дата создания"
        //       },
        //       "DATE_MODIFY": {
        //         "type": "datetime",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Дата изменения"
        //       },
        //       "COMPANY_ID": {
        //         "type": "crm_company",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "isDeprecated": true,
        //         "title": "Компания"
        //       },
        //       "COMPANY_IDS": {
        //         "type": "crm_company",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": true,
        //         "isDynamic": false,
        //         "title": "COMPANY_IDS"
        //       },
        //       "LEAD_ID": {
        //         "type": "crm_lead",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Лид",
        //         "settings": {
        //           "parentEntityTypeId": 1
        //         }
        //       },
        //       "ORIGINATOR_ID": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Внешний источник"
        //       },
        //       "ORIGIN_ID": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Идентификатор элемента во внешнем источнике"
        //       },
        //       "ORIGIN_VERSION": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Версия оригинала"
        //       },
        //       "FACE_ID": {
        //         "type": "integer",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Привязка к лицам из модуля faceid"
        //       },
        //       "UTM_SOURCE": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Рекламная система"
        //       },
        //       "UTM_MEDIUM": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Тип трафика"
        //       },
        //       "UTM_CAMPAIGN": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Обозначение рекламной кампании"
        //       },
        //       "UTM_CONTENT": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Содержание кампании"
        //       },
        //       "UTM_TERM": {
        //         "type": "string",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Условие поиска кампании"
        //       },
        //       "LAST_ACTIVITY_TIME": {
        //         "type": "datetime",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Активность"
        //       },
        //       "LAST_ACTIVITY_BY": {
        //         "type": "user",
        //         "isRequired": false,
        //         "isReadOnly": true,
        //         "isImmutable": false,
        //         "isMultiple": false,
        //         "isDynamic": false,
        //         "title": "Кем осуществлена последняя активность в таймлайне"
        //       },
        //       "PHONE": {
        //         "type": "crm_multifield",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": true,
        //         "isDynamic": false,
        //         "title": "Телефон"
        //       },
        //       "EMAIL": {
        //         "type": "crm_multifield",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": true,
        //         "isDynamic": false,
        //         "title": "E-mail"
        //       },
        //       "WEB": {
        //         "type": "crm_multifield",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": true,
        //         "isDynamic": false,
        //         "title": "Сайт"
        //       },
        //       "IM": {
        //         "type": "crm_multifield",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": true,
        //         "isDynamic": false,
        //         "title": "Мессенджер"
        //       },
        //       "LINK": {
        //         "type": "crm_multifield",
        //         "isRequired": false,
        //         "isReadOnly": false,
        //         "isImmutable": false,
        //         "isMultiple": true,
        //         "isDynamic": false,
        //         "title": "LINK"
        //       }
        //     },
        //     "time": {
        //       "start": 1691603881.43882,
        //       "finish": 1691603881.483782,
        //       "duration": 0.044962167739868164,
        //       "processing": 0.01011204719543457,
        //       "date_start": "2023-08-09T20:58:01+03:00",
        //       "date_finish": "2023-08-09T20:58:01+03:00",
        //       "operating_reset_at": 1691604481,
        //       "operating": 0
        //     }
        //   }

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
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли запросить данные контакта");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли запросить данные контакта: ", e);
        //         // setStatusSaveDeal("err");
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
        // {
        //     "ID": {
        //       "type": "integer",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "ID"
        //     },
        //     "HONORIFIC": {
        //       "type": "crm_status",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "statusType": "HONORIFIC",
        //       "title": "Обращение"
        //     },
        //     "NAME": {
        //       "type": "string",
        //       "isRequired": true,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Имя"
        //     },
        //     "SECOND_NAME": {
        //       "type": "string",
        //       "isRequired": true,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Отчество"
        //     },
        //     "LAST_NAME": {
        //       "type": "string",
        //       "isRequired": true,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Фамилия"
        //     },
        //     "PHOTO": {
        //       "type": "file",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Фотография"
        //     },
        //     "BIRTHDATE": {
        //       "type": "date",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Дата рождения"
        //     },
        //     "TYPE_ID": {
        //       "type": "crm_status",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "statusType": "CONTACT_TYPE",
        //       "title": "Тип контакта"
        //     },
        //     "SOURCE_ID": {
        //       "type": "crm_status",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "statusType": "SOURCE",
        //       "title": "Источник"
        //     },
        //     "SOURCE_DESCRIPTION": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Дополнительно об источнике"
        //     },
        //     "POST": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Должность"
        //     },
        //     "ADDRESS": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Адрес"
        //     },
        //     "ADDRESS_2": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Адрес (стр. 2)"
        //     },
        //     "ADDRESS_CITY": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Город"
        //     },
        //     "ADDRESS_POSTAL_CODE": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Почтовый индекс"
        //     },
        //     "ADDRESS_REGION": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Район"
        //     },
        //     "ADDRESS_PROVINCE": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Область"
        //     },
        //     "ADDRESS_COUNTRY": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Страна"
        //     },
        //     "ADDRESS_COUNTRY_CODE": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Код страны"
        //     },
        //     "ADDRESS_LOC_ADDR_ID": {
        //       "type": "integer",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Идентификатор адреса местоположения"
        //     },
        //     "COMMENTS": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Комментарий"
        //     },
        //     "OPENED": {
        //       "type": "char",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Доступен для всех"
        //     },
        //     "EXPORT": {
        //       "type": "char",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Участвует в экспорте контактов"
        //     },
        //     "HAS_PHONE": {
        //       "type": "char",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Задан телефон"
        //     },
        //     "HAS_EMAIL": {
        //       "type": "char",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Задан e-mail"
        //     },
        //     "HAS_IMOL": {
        //       "type": "char",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Задана открытая линия"
        //     },
        //     "ASSIGNED_BY_ID": {
        //       "type": "user",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Ответственный"
        //     },
        //     "CREATED_BY_ID": {
        //       "type": "user",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Кем создан"
        //     },
        //     "MODIFY_BY_ID": {
        //       "type": "user",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Кем изменен"
        //     },
        //     "DATE_CREATE": {
        //       "type": "datetime",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Дата создания"
        //     },
        //     "DATE_MODIFY": {
        //       "type": "datetime",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Дата изменения"
        //     },
        //     "COMPANY_ID": {
        //       "type": "crm_company",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "isDeprecated": true,
        //       "title": "Компания"
        //     },
        //     "COMPANY_IDS": {
        //       "type": "crm_company",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": true,
        //       "isDynamic": false,
        //       "title": "COMPANY_IDS"
        //     },
        //     "LEAD_ID": {
        //       "type": "crm_lead",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Лид",
        //       "settings": {
        //         "parentEntityTypeId": 1
        //       }
        //     },
        //     "ORIGINATOR_ID": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Внешний источник"
        //     },
        //     "ORIGIN_ID": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Идентификатор элемента во внешнем источнике"
        //     },
        //     "ORIGIN_VERSION": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Версия оригинала"
        //     },
        //     "FACE_ID": {
        //       "type": "integer",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Привязка к лицам из модуля faceid"
        //     },
        //     "UTM_SOURCE": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Рекламная система"
        //     },
        //     "UTM_MEDIUM": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Тип трафика"
        //     },
        //     "UTM_CAMPAIGN": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Обозначение рекламной кампании"
        //     },
        //     "UTM_CONTENT": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Содержание кампании"
        //     },
        //     "UTM_TERM": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Условие поиска кампании"
        //     },
        //     "LAST_ACTIVITY_TIME": {
        //       "type": "datetime",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Активность"
        //     },
        //     "LAST_ACTIVITY_BY": {
        //       "type": "user",
        //       "isRequired": false,
        //       "isReadOnly": true,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": false,
        //       "title": "Кем осуществлена последняя активность в таймлайне"
        //     },
        //     "PHONE": {
        //       "type": "crm_multifield",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": true,
        //       "isDynamic": false,
        //       "title": "Телефон"
        //     },
        //     "EMAIL": {
        //       "type": "crm_multifield",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": true,
        //       "isDynamic": false,
        //       "title": "E-mail"
        //     },
        //     "WEB": {
        //       "type": "crm_multifield",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": true,
        //       "isDynamic": false,
        //       "title": "Сайт"
        //     },
        //     "IM": {
        //       "type": "crm_multifield",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": true,
        //       "isDynamic": false,
        //       "title": "Мессенджер"
        //     },
        //     "LINK": {
        //       "type": "crm_multifield",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": true,
        //       "isDynamic": false,
        //       "title": "LINK"
        //     },
        //     "UF_CRM_EVENTTITLE": {
        //       "type": "string",
        //       "isRequired": false,
        //       "isReadOnly": false,
        //       "isImmutable": false,
        //       "isMultiple": false,
        //       "isDynamic": true,
        //       "title": "UF_CRM_EVENTTITLE",
        //       "listLabel": "Название мероприятия",
        //       "formLabel": "Название мероприятия",
        //       "filterLabel": "UF_CRM_EVENTTITLE",
        //       "settings": {
        //         "SIZE": 20,
        //         "ROWS": 1,
        //         "REGEXP": "",
        //         "MIN_LENGTH": 0,
        //         "MAX_LENGTH": 0,
        //         "DEFAULT_VALUE": ""
        //       }
        //     }
        //   }

        

        

        // Метод создаёт контакт
        let idCreatedContact = -1;
        // console.log("e.phone",e.phone);
        // console.log("e.nameEvent",e.nameEvent);
        // console.log("userResponsible",userResponsible);
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
console.log("nameEventInput",nameEventInput);
        // Обновляем свойство "Название мероприятия" в хранилище "cutawayApp"
        {
            try {
                const response = await BX24API.callMethod('entity.item.update', {
                    ENTITY:   'cutawayApp',
                    ID:       idNameEventEntity,
                    PROPERTY_VALUES: {
                        nameEvent: nameEventInput
                    }
                });
                if (response.length != 0) {
                if (response.error_description == undefined) {
                    console.log("response entity.item.update", response);
                }
                else {
                    console.log("ОШИБКА!!! Не смогли обновиьт свойство для элемента хранилища: ", response.error_description);
                    // setStatusSaveDeal("err");
                    return ("err");
                }
                // return await response;
                } else {
                console.log("ОШИБКА!!! Не смогли обновиьт свойство для элемента хранилища");
                // setStatusSaveDeal("err");
                return ("err");
                }
            } catch (e) {
                console.log("ОШИБКА!!! Не смогли обновиьт свойство для элемента хранилища: ", e);
                // setStatusSaveDeal("err");
                return ("err");
            }
        }

        // Сброс введёных полей
        setData({
            name: "",
            phone: "+7",
            email: "",
            jobTitle: "",
            company: "",
            nameEvent: "",
            responsible: "",
            userResponsible: "",
            comment: "",
            photo: []
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

    const customiserBitrix24 = async (e) => {
        // Создаём пользовательское поле "Название мероприятия" в контакте. 
        // {
        //     try {
        //         const response = await BX24API.callMethod('crm.contact.userfield.add', {
        //             fields: {
        //                 FIELD_NAME: "eventTitle",
        //                 EDIT_FORM_LABEL: "Название мероприятия",
        //                 LIST_COLUMN_LABEL: "Название мероприятия",
        //                 USER_TYPE_ID: "string",
        //                 XML_ID: "eventTitleXmlId"
        //             }
        //         });
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response crm.contact.userfield.add", response);
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли создать кастомное поле: ", response.error_description);
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли создать кастомное поле");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли создать кастомное поле: ", e);
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //     }
        // }

        // Создаём пользовательское поле "Фото" в контакте.
        // {
        //     try {
        //         const response = await BX24API.callMethod('crm.contact.userfield.add', {
        //             fields: {
        //                 FIELD_NAME: "Photo",
        //                 EDIT_FORM_LABEL: "Фото",
        //                 LIST_COLUMN_LABEL: "Фото",
        //                 USER_TYPE_ID: "file",
        //                 XML_ID: "eventPhotoXmlId"
        //             }
        //         });
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response crm.contact.userfield.add", response);
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли создать кастомное поле: ", response.error_description);
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли создать кастомное поле");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли создать кастомное поле: ", e);
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //     }
        // }

        // Создаём хранилище "cutawayApp" поле "Фото" в контакте.
        // {
        //     try {
        //         const response = await BX24API.callMethod('entity.add', {
        //             ENTITY: 'cutawayApp', 
        //             NAME:   'База данных для приложения cutawayApp', 
        //             ACCESS: {U1:'W', AU:'R'}
        //         });
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response entity.add", response);
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли создать хранилище: ", response.error_description);
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли создать хранилище");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли создать хранилище: ", e);
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //     }
        // }

        // Создаём элемент "Название мероприятия" в хранилище "cutawayApp"
        // {
        //     try {
        //         const response = await BX24API.callMethod('entity.item.add', {
        //             ENTITY: 'cutawayApp', 
        //             NAME:   'nameEvent'
        //         });
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response entity.item.add", response);
        //             let IdNameEvent = response.result; // ИД, чтобы обновить элемент "Название мероприятия" из хранилища "cutawayApp"
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли создать элемент в хранилище: ", response.error_description);
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли создать элемент в хранилище");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли создать элемент в хранилище: ", e);
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //     }
        // }

        // Добавляем новое свойство "Название мероприятия" для хранилища "cutawayApp"
        // {
        //     try {
        //         const response = await BX24API.callMethod('entity.item.property.add', {
        //             ENTITY:   'cutawayApp',
        //             PROPERTY: 'nameEvent',
        //             NAME:     "Название мероприятия",
        //             TYPE:     "S"
        //         });
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response entity.item.property.add", response);
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли создать новое свойство для элементов хранилища: ", response.error_description);
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли создать новое свойство для элементов хранилища");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли создать новое свойство для элементов хранилища: ", e);
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //     }
        // }

        // Обновляем свойство "Название мероприятия" в хранилище "cutawayApp"
        // {
        //     try {
        //         const response = await BX24API.callMethod('entity.item.update', {
        //             ENTITY:   'cutawayApp',
        //             ID:       844,
        //             PROPERTY_VALUES: {
        //                 nameEvent: "Армия 2023"
        //             }
        //         });
        //         if (response.length != 0) {
        //         if (response.error_description == undefined) {
        //             console.log("response entity.item.update", response);
        //         }
        //         else {
        //             console.log("ОШИБКА!!! Не смогли обновиьт свойство для элемента хранилища: ", response.error_description);
        //             // setStatusSaveDeal("err");
        //             return ("err");
        //         }
        //         // return await response;
        //         } else {
        //         console.log("ОШИБКА!!! Не смогли обновиьт свойство для элемента хранилища");
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //         }
        //     } catch (e) {
        //         console.log("ОШИБКА!!! Не смогли обновиьт свойство для элемента хранилища: ", e);
        //         // setStatusSaveDeal("err");
        //         return ("err");
        //     }
        // }

        // Читаем элемент "Название мероприятия" из хранилища "cutawayApp"
        {
            try {
                const response = await BX24API.callMethod('entity.item.get', {
                    ENTITY: 'cutawayApp', 
                });
                if (response.length != 0) {
                if (response.error_description == undefined) {
                    console.log("response entity.item.get", response);
                }
                else {
                    console.log("ОШИБКА!!! Не смогли прочитать элемент в хранилище: ", response.error_description);
                    // setStatusSaveDeal("err");
                    return ("err");
                }
                // return await response;
                } else {
                console.log("ОШИБКА!!! Не смогли прочитать элемент в хранилище");
                // setStatusSaveDeal("err");
                return ("err");
                }
            } catch (e) {
                console.log("ОШИБКА!!! Не смогли прочитать элемент в хранилище: ", e);
                // setStatusSaveDeal("err");
                return ("err");
            }
        }
        
    }
    
    


    return (
        <>
            {/* <h3>Заполните поля ниже</h3> */}
            {/* <div className="data-contact-container"> */}
            <div className="push">
                <form onSubmit={handlerSubmitDataContact}>
                    {/* <h4>Отсканированная информация: {decodedText}</h4> */}
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
                    {/* <GetSelectResponsibleUser/> */}
                    <Input type={"file"} id={"object-photo"} title={"Фото"} name="object-photo" accept="image/*;capture=camera" handlerOnChange={handlerPhotoOnChange}/>
                    <Input type={"text"} id={"comment"} title={"Комментарий"} defaultValue={commentInput} handlerOnChange={handlerCommentOnChange} />
                    <div className="data-contact-container_submit">
                        <table width="100%" /*className="iksweb"*/ /*border = "1px" solid="1px"*/>
                            <tbody>
                                <tr>
                                    <td align='center'>
                                        <input type="submit" value={'Сохранить контакт'} onClick={handlerButtonSaveContack} />
                                    </td>
                                    <td align='center'>
                                        <input type="submit" value={'Создать сделку'} onClick={handlerButtonCreateDeal} />
                                    </td>
                                    <td align='center'>
                                        <input type="submit" value={'Настроить поля в Битрикс24'} onClick={customiserBitrix24} />
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

