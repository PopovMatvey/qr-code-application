import React from 'react';
// import { Context } from '../Context/Context.js'
import './css/style.css';
import { ButtonsContainer } from "../assets/components/ButtonsContainer/index";
import BX24API from '../Bitrix24/BX24';
import Preloader from '../Preloader/Preloader';

import { QRScaner } from '../assets/page/QRScaner/index.jsx';
import { Tasks } from '../assets/page/Tasks/index.jsx';
import { ContactData } from '../assets/page/ContactData/index.jsx';
import { CameraContainerWebcam } from '../assets/components/CameraContainerWebcam';

const { useState, useEffect } = React;

function mainTabs() {
  let date = new Date();
  let month = (date.getMonth() < 10) ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
  let day = (date.getDate() < 10) ? ("0" + date.getDate()) : date.getDate();

  const [dataListDepartaments, setDataListDepartaments] = useState([]);
  const [listUsersBitrix, setListUsersBitrix] = useState([]);
  const [IdItemCutawayApp, setIdItemCutawayApp] = useState(-1); // идентификатор элемента хранилища, в котором хранится последнее название мероприятия

  // const [idNameEventEntity, setIdNameEventEntity] = useState(-1); 
  const [load, setLoad] = useState(false);
  const [idUserDefault, setIdUserDefault] = useState(-1);

  const [nTab, setNTab] = useState(0);
  const [decodedText, setDecodedText] = useState("");
  const [data, setData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    surName: "",
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

  const [dataTask, setDataTask] = useState({
    name: "",
    description: "",
    date: date.getFullYear() + '-' + month + '-' + day,
    responsible: "",
    userResponsible: ""
  });



  useEffect(() => {
    // Настройка портала Bitrix24
    const customiserBitrix24 = async (e) => {
      // // Создаём пользовательское поле "Название мероприятия" в контакте. 
      // {
      //   try {
      //     const response = await BX24API.callMethod('crm.contact.userfield.add', {
      //       fields: {
      //         FIELD_NAME: "eventTitle",
      //         EDIT_FORM_LABEL: "Название мероприятия",
      //         LIST_COLUMN_LABEL: "Название мероприятия",
      //         USER_TYPE_ID: "string",
      //         XML_ID: "eventTitleXmlId"
      //       }
      //     });
      //     if (response.length != 0) {
      //       if (response.error_description == undefined) {
      //         console.log("response crm.contact.userfield.add", response);
      //       }
      //       else {
      //         console.log("ОШИБКА!!! Не смогли создать кастомное поле: ", response.error_description);
      //         return ("err");
      //       }
      //     } else {
      //       console.log("ОШИБКА!!! Не смогли создать кастомное поле");
      //       return ("err");
      //     }
      //   } catch (e) {
      //     console.log("ОШИБКА!!! Не смогли создать кастомное поле: ", e);
      //     return ("err");
      //   }
      // }

      // // Создаём пользовательское поле "Фотографии с мероприятий" в контакте.
      // {
      //   try {
      //     const response = await BX24API.callMethod('crm.contact.userfield.add', {
      //       fields: {
      //         FIELD_NAME: "Photo",
      //         EDIT_FORM_LABEL: "Фотографии с мероприятий",
      //         LIST_COLUMN_LABEL: "Фотографии с мероприятий",
      //         USER_TYPE_ID: "file",
      //         XML_ID: "eventPhotoXmlId",
      //         MULTIPLE: "Y"
      //       }
      //     });
      //     if (response.length != 0) {
      //       if (response.error_description == undefined) {
      //         console.log("response crm.contact.userfield.add", response);
      //       }
      //       else {
      //         console.log("ОШИБКА!!! Не смогли создать кастомное поле: ", response.error_description);
      //         return ("err");
      //       }
      //       // return await response;
      //     } else {
      //       console.log("ОШИБКА!!! Не смогли создать кастомное поле");
      //       return ("err");
      //     }
      //   } catch (e) {
      //     console.log("ОШИБКА!!! Не смогли создать кастомное поле: ", e);
      //     return ("err");
      //   }
      // }

      // Удалить хранилище "cutawayApp"
      {
        // try {
        //   const response = await BX24API.callMethod('entity.delete', { ENTITY: 'cutawayApp' });
        //   if (response.length != 0) {
        //     if (response.error_description == undefined) {
        //       console.log("response entity.delete", response);
        //     }
        //     else {
        //       console.log("ОШИБКА!!! Не смогли удалить хранилище: ", response.error_description);
        //       return ("err");
        //     }
        //   } else {
        //     console.log("ОШИБКА!!! Не смогли удалить хранилище");
        //     return ("err");
        //   }
        // } catch (e) {
        //   console.log("ОШИБКА!!! Не смогли удалить хранилище: ", e);
        //   getModalWindow("Ошибка", "Не смогли удалить хранилище: " + e, true);
        //   return ("err");
        // }
      }

      // Создаём хранилище "cutawayApp"
      {
        // U1 - пользователь с id =1
        // AU - все авторизованные пользователи
        // D1 - подразделение с id=1
        // G1 - группа с id=1
        try {
          const response = await BX24API.callMethod('entity.add', {
            ENTITY: 'cutawayApp',
            NAME: 'База данных для приложения cutawayApp',
            ACCESS: { U1: 'X', AU: 'X' }
          });
          if (response.length != 0) {
            if (response.error_description == undefined) {
              console.log("response entity.add", response);
            }
            else {
              console.log("ОШИБКА!!! Не смогли создать хранилище: ", response.error_description);
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!! Не смогли создать хранилище");
            return ("err");
          }
        } catch (e) {
          console.log("ОШИБКА!!! Не смогли создать хранилище: ", e);
          return ("err");
        }
      }

      // Добавляем новое свойство "Название мероприятия" для хранилища "cutawayApp"
      {
        try {
          const response = await BX24API.callMethod('entity.item.property.add', {
            ENTITY: 'cutawayApp',
            PROPERTY: 'nameEvent',
            NAME: "Название мероприятия",
            TYPE: "S"
          });
          if (response.length != 0) {
            if (response.error_description == undefined) {
              console.log("response entity.item.property.add", response);
            }
            else {
              console.log("ОШИБКА!!! Не смогли добавить новое свойство для элементов хранилища: ", response.error_description);
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!! Не смогли добавить новое свойство для элементов хранилища");
            return ("err");
          }
        } catch (e) {
          console.log("ОШИБКА!!! Не смогли добавить новое свойство для элементов хранилища: ", e);
          return ("err");
        }
      }

      // Добавляем новое свойство "Последняя дата пользователя" для хранилища "cutawayApp"
      {
        try {
          const response = await BX24API.callMethod('entity.item.property.add', {
            ENTITY: 'cutawayApp',
            PROPERTY: 'lastDate',
            NAME: "Последняя дата пользователя",
            TYPE: "S"
          });
          if (response.length != 0) {
            if (response.error_description == undefined) {
              console.log("response entity.item.property.add", response);
            }
            else {
              console.log("ОШИБКА!!! Не смогли добавить новое свойство для элементов хранилища: ", response.error_description);
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!! Не смогли добавить новое свойство для элементов хранилища");
            return ("err");
          }
        } catch (e) {
          console.log("ОШИБКА!!! Не смогли добавить новое свойство для элементов хранилища: ", e);
          return ("err");
        }
      }

      // Добавляем новое свойство "Ответственный" для хранилища "cutawayApp"
      {
        try {
          const response = await BX24API.callMethod('entity.item.property.add', {
            ENTITY: 'cutawayApp',
            PROPERTY: 'userResponsible',
            NAME: "Ответственный",
            TYPE: "S"
          });
          if (response.length != 0) {
            if (response.error_description == undefined) {
              console.log("response entity.item.property.add", response);
            }
            else {
              console.log("ОШИБКА!!! Не смогли добавить новое свойство для элементов хранилища: ", response.error_description);
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!! Не смогли добавить новое свойство для элементов хранилища");
            return ("err");
          }
        } catch (e) {
          console.log("ОШИБКА!!! Не смогли добавить новое свойство для элементов хранилища: ", e);
          return ("err");
        }
      }

      // // Обновляем свойство "Название мероприятия" в хранилище "cutawayApp"
      // {
      //   try {
      //     const response = await BX24API.callMethod('entity.item.update', {
      //       ENTITY: 'cutawayApp',
      //       ID: IdNameEvent,
      //       PROPERTY_VALUES: {
      //         nameEvent: "Армия 2023"
      //       }
      //     });
      //     if (response.length != 0) {
      //       if (response.error_description == undefined) {
      //         console.log("response entity.item.update", response);
      //       }
      //       else {
      //         console.log("ОШИБКА!!! Не смогли обновить свойство для элемента хранилища: ", response.error_description);
      //         return ("err");
      //       }
      //     } else {
      //       console.log("ОШИБКА!!! Не смогли обновить свойство для элемента хранилища");
      //       return ("err");
      //     }
      //   } catch (e) {
      //     console.log("ОШИБКА!!! Не смогли обновить свойство для элемента хранилища: ", e);
      //     return ("err");
      //   }
      // }

      // // Читаем элемент "Название мероприятия" из хранилища "cutawayApp"
      // {
      //     try {
      //         const response = await BX24API.callMethod('entity.item.get', {
      //             ENTITY: 'cutawayApp', 
      //         });
      //         if (response.length != 0) {
      //         if (response.error_description == undefined) {
      //             console.log("response entity.item.get", response);
      //         }
      //         else {
      //             console.log("ОШИБКА!!! Не смогли прочитать элемент из хранилища: ", response.error_description);
      //             getModalWindow("Ошибка", "Не смогли прочитать элемент из хранилища: " + response.error_description, true);
      //             return ("err");
      //         }
      //         } else {
      //             console.log("ОШИБКА!!! Не смогли прочитать элемент из хранилища");
      //             getModalWindow("Ошибка", "Не смогли прочитать элемент из хранилища", true);
      //             return ("err");
      //         }
      //     } catch (e) {
      //         console.log("ОШИБКА!!! Не смогли прочитать элемент из хранилища: ", e);
      //         getModalWindow("Ошибка", "Не смогли прочитать элемент из хранилища: " + e, true);
      //         return ("err");
      //     }
      // }

      // Создадим в сделке пользовательское поле "Название мероприятия"
      let idNameEventDeal = -1; // 352
      {
        try {
          const response = await BX24API.callMethod('crm.deal.userfield.add', {
            fields: {
              FIELD_NAME: "nameEvent",
              EDIT_FORM_LABEL: "Название мероприятия",
              LIST_COLUMN_LABEL: "Название мероприятия",
              USER_TYPE_ID: "string",
              XML_ID: "nameEventXMLID"
            }
          });
          if (response.length != 0) {
            if (response.error_description == undefined) {
              console.log("response crm.deal.userfield.add", response);
              idNameEventDeal = response.result;
            }
            else {
              console.log("ОШИБКА!!! Не смогли прочитать создать в сделке пользовательское поле: ", response.error_description);
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!! Не смогли прочитать создать в сделке пользовательское поле");
            return ("err");
          }
        } catch (e) {
          console.log("ОШИБКА!!! Не смогли прочитать создать в сделке пользовательское поле: ", e);
          return ("err");
        }
      }

      // Создадим в сделке пользовательское поле "Фотографии с мероприятия"
      let idPhotoDeal = -1; // 354
      {
        try {
          const response = await BX24API.callMethod('crm.deal.userfield.add', {
            fields: {
              FIELD_NAME: "PHOTODEAL",
              EDIT_FORM_LABEL: "Фотографии с мероприятия",
              LIST_COLUMN_LABEL: "Фотографии с мероприятия",
              USER_TYPE_ID: "file",
              XML_ID: "PHOTOXMLID",
              MULTIPLE: "Y"
            }
          });
          if (response.length != 0) {
            if (response.error_description == undefined) {
              console.log("response crm.deal.userfield.add", response);
              idPhotoDeal = response.result;
            }
            else {
              console.log("ОШИБКА!!! Не смогли прочитать создать в сделке пользовательское поле: ", response.error_description);
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!! Не смогли прочитать создать в сделке пользовательское поле");
            return ("err");
          }
        } catch (e) {
          console.log("ОШИБКА!!! Не смогли прочитать создать в сделке пользовательское поле: ", e);
          return ("err");
        }
      }


      // // Читаем доступные поля сделок
      // {
      //     try {
      //         const response = await BX24API.callMethod('crm.deal.fields');
      //         if (response.length != 0) {
      //         if (response.error_description == undefined) {
      //             console.log("response crm.deal.fields", response);
      //         }
      //         else {
      //             console.log("ОШИБКА!!! Не смогли прочитать доступные поля сделок: ", response.error_description);
      //             getModalWindow("Ошибка", "Не смогли прочитать доступные поля сделок: " + e, true);
      //             return ("err");
      //         }
      //         } else {
      //             console.log("ОШИБКА!!! Не смогли прочитать доступные поля сделок");
      //             getModalWindow("Ошибка", "Не смогли прочитать доступные поля сделок", true);
      //             return ("err");
      //         }
      //     } catch (e) {
      //         console.log("ОШИБКА!!! Не смогли прочитать доступные поля сделок: ", e);
      //         getModalWindow("Ошибка", "Не смогли прочитать доступные поля сделок: " + e, true);
      //         return ("err");
      //     }
      // }

      // // Метод возвращает описание полей справочника. crm.status.fields() crm.status.list() с фильтром filter[ENTITY_ID]=SOURCE
      // {
      //     try {
      //         const response = await BX24API.callMethod('crm.status.list');
      //         if (response.length != 0) {
      //         if (response.error_description == undefined) {
      //             console.log("response crm.status.list", response);
      //         }
      //         else {
      //             console.log("ОШИБКА!!! Не смогли прочитать описание полей справочника: ", response.error_description);
      //             getModalWindow("Ошибка", "Не смогли прочитать описание полей справочника: " + e, true);
      //             return ("err");
      //         }
      //         } else {
      //             console.log("ОШИБКА!!! Не смогли прочитать описание полей справочника");
      //             getModalWindow("Ошибка", "Не смогли прочитать описание полей справочника", true);
      //             return ("err");
      //         }
      //     } catch (e) {
      //         console.log("ОШИБКА!!! Не смогли прочитать описание полей справочника: ", e);
      //         getModalWindow("Ошибка", "Не смогли прочитать описание полей справочника: " + e, true);
      //         return ("err");
      //     }
      // }
    }
    // Загрузка информации о пользователе, который запустил программу
    async function getDataDB() {
      let idUser = null;
      let responsible = null;
      // let nameEvent   = null;
      // let tmpData     = data;
      // let tmpDataTask = dataTask;
      // Получаем данные о текущем пользователе
      {
        try {
          const response = await BX24API.callMethod('user.current');
          if (response.length != 0) {
            if (response.error_description == undefined) {
              idUser = response.result.ID;
              responsible = response.result.NAME + ' ' + response.result.LAST_NAME;
            }
            else {
              console.log("ОШИБКА!!! Не смогли получить ID пользователя, запустившего программу: ", response.error_description);
              location.reload();
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!! Не смогли получить ID пользователя, запустившего программу");
            location.reload();
            return ("err");
          }
        } catch (e) {
          console.log("ОШИБКА!!! Не смогли получить ID пользователя, запустившего программу: ", e);
          location.reload();
          return ("err");
        }
        if (idUser == null) {
          return ("err");
        }
      }



      // // Читаем элемент "Название мероприятия" из хранилища "cutawayApp"
      // {
      //   try {
      //       const response = await BX24API.callMethod('entity.item.get', {
      //         ENTITY: 'cutawayApp',
      //         FILTER: {
      //           NAME: "nameEvent",
      //         }
      //       });
      //       if (response.length != 0) {
      //         if (response.error_description == undefined) {
      //           setIdNameEventEntity(response.result[0].ID);
      //           nameEvent = response.result[0].PROPERTY_VALUES.nameEvent;
      //         }
      //         else {
      //           console.log("ОШИБКА!!!1 Не смогли загрузить предыдущее название мероприятия: ", response.error_description);
      //           return ("err");
      //         }
      //       } else {
      //         console.log("ОШИБКА!!!2 Не смогли загрузить предыдущее название мероприятия");
      //         return ("err");
      //       }
      //   } 
      //   catch (e) {
      //       console.log("ОШИБКА!!!3 Не смогли загрузить предыдущее название мероприятия: ", e);
      //       return ("err");
      //   }
      // }

      // try {
      //   const response = await BX24API.callMethod('entity.item.delete', {
      //     ENTITY: 'cutawayApp',
      //     ID: 864
      //   });
      //   if (response.length != 0) {
      //     if (response.error_description == undefined) {
      //       console.log("response entity.item.delete",response);
      //     }
      //     else {
      //       console.log("ОШИБКА!!!1 Не смогли удалить элемент из хранилища: ", response.error_description);
      //       return ("err");
      //     }
      //   } else {
      //     console.log("ОШИБКА!!!2 Не смогли удалить элемент из хранилища");
      //     return ("err");
      //   }
      // } 
      // catch (e) {
      //   console.log("ОШИБКА!!!3 Не смогли удалить элемент из хранилища: ", e);
      //   return ("err");
      // }

      // Читаем хранилищe "cutawayApp"
      let dataBaseApp = [];
      {
        try {
          const response = await BX24API.callMethod('entity.item.get', {
            ENTITY: 'cutawayApp',
            // FILTER: {
            //   NAME: "nameEvent",
            // }
          });
          if (response.length != 0) {
            if (response.error_description == undefined) {
              // console.log("response entity.item.get",response);
              dataBaseApp = response.result;
            }
            else {
              console.log("ОШИБКА!!!1 Не смогли загрузить базу данных приложения: ", response.error_description);
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!!2 Не смогли загрузить базу данных приложения");
            return ("err");
          }
        }
        catch (e) {
          console.log("ОШИБКА!!!3 Не смогли загрузить базу данных приложения: ", e);
          return ("err");
        }
      }
      let filteredDB = dataBaseApp.filter(e => e.CREATED_BY == idUser);
      let idUserChecked = idUser;

      // Если нет данных по текущаему пользователю, то создаём
      let IdItemCutawayApp = -1;
      if (filteredDB[0] == undefined) {
        // Создаём элемент "Последняя дата пользователя" в хранилище "cutawayApp"
        {
          try {
            const response = await BX24API.callMethod('entity.item.add', {
              ENTITY: 'cutawayApp',
              NAME: 'nameEvent',
              PROPERTY_VALUES: {
                lastDate: dataTask.date,
                userResponsible: dataTask.userResponsible,
                nameEvent: data.nameEvent
              }
            });
            if (response.length != 0) {
              if (response.error_description == undefined) {
                // console.log("response entity.item.add", response);
                IdItemCutawayApp = response.result; // ИД, чтобы обновить элемент из хранилища "cutawayApp"
              }
              else {
                console.log("ОШИБКА!!! Не смогли создать элемент в хранилище: ", response.error_description);
                return ("err");
              }
            } else {
              console.log("ОШИБКА!!! Не смогли создать элемент в хранилище");
              return ("err");
            }
          } catch (e) {
            console.log("ОШИБКА!!! Не смогли создать элемент в хранилище: ", e);
            return ("err");
          }
          setIdItemCutawayApp(IdItemCutawayApp);
        }
      }
      else {
        let tmp = data;
        tmp.nameEvent = filteredDB[0].PROPERTY_VALUES.nameEvent;
        tmp.userResponsible = filteredDB[0].PROPERTY_VALUES.userResponsible;
        setData(tmp);
        let tmp2 = dataTask;
        tmp2.nameEvent = filteredDB[0].PROPERTY_VALUES.nameEvent;
        tmp2.userResponsible = filteredDB[0].PROPERTY_VALUES.userResponsible;
        tmp2.date = filteredDB[0].PROPERTY_VALUES.lastDate;

        if (tmp2.userResponsible == "") tmp2.userResponsible = idUser;
        setDataTask(tmp2);
        setIdItemCutawayApp(filteredDB[0].ID);
        idUserChecked = filteredDB[0].PROPERTY_VALUES.userResponsible;
      }

      // Метод возвращает подразделения
      let departmentsBitrix = [];
      {
        try {
          const response = await BX24API.callMethod('department.get');
          if (response.length != 0) {
            if (response.error_description == undefined) {
              // console.log("response department.get", response);
              departmentsBitrix = response.result;
            }
            else {
              console.log("ОШИБКА!!! Не смогли прочитать подразделения: ", response.error_description);
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!! Не смогли прочитать подразделения");
            return ("err");
          }
        } catch (e) {
          console.log("ОШИБКА!!! Не смогли прочитать подразделения: ", e);
          return ("err");
        }
      }

      let listDepartamentsID = departmentsBitrix.map(e => e.ID);

      // Метод возвращает пользователей портала
      let usersBitrix = [];
      {
        try {
          const response = await BX24API.callMethod('user.search');
          if (response.length != 0) {
            if (response.error_description == undefined) {
              // console.log("response user.search", response);
              usersBitrix = response.result;
            }
            else {
              console.log("ОШИБКА!!! Не смогли прочитать подразделения: ", response.error_description);
              return ("err");
            }
          } else {
            console.log("ОШИБКА!!! Не смогли прочитать подразделения");
            return ("err");
          }
        } catch (e) {
          console.log("ОШИБКА!!! Не смогли прочитать подразделения: ", e);
          return ("err");
        }
      }
      setListUsersBitrix(usersBitrix);
      let dataListDepartaments = [];
      departmentsBitrix.map((e, i) => {
        let users = usersBitrix.filter(e => e.UF_DEPARTMENT.includes(Number(listDepartamentsID[i])));
        let children = [];
        users.map((e, i) => children[i] = {
          label: " " + users[i].LAST_NAME + " " + users[i].NAME,
          checked: false,
          value: users[i].ID,
        });
        dataListDepartaments[i] = {
          label: " " + e.NAME,
          checked: false,
          expanded: false,
          children: children
        }
      });

      if (idUserChecked == "") idUserChecked = idUser;
      // Выбираем для начального отображения последнего сохранившегося ответственного
      let fined = false;
      dataListDepartaments.map((e, i) => e.children.map((e1, j) => {
        if ((e1.value == idUserChecked) && !fined) {
          dataListDepartaments[i].children[j].checked = true;
          fined = true;
        }
      }))
      setDataListDepartaments(dataListDepartaments);
      setIdUserDefault(idUser);
      setLoad(true);
    }

    // customiserBitrix24();
    getDataDB();
  }, [])

  if (!load) {
    return (
      <Preloader />
    )
  }
  else {
    return (
      <>
        <div class="navbar">
          <ButtonsContainer setNTab={setNTab} />
        </div>

        <div class="main">
          {
            (nTab == 0) && <>
              <QRScaner
                title={"Сканер"}
                setDecodedText={setDecodedText}
                decodedText={decodedText}
              />
            </>
          }
          {
            (nTab == 1) && <>
              <ContactData
                title={"Контакт"}
                decodedText={decodedText}
                data={data}
                setData={setData}
                date={dataTask.date}
                IdItemCutawayApp={IdItemCutawayApp}
                setDecodedText={setDecodedText}
                dataListDepartaments={dataListDepartaments}
                setDataListDepartaments={setDataListDepartaments}
                listUsersBitrix={listUsersBitrix}
                idUserDefault={idUserDefault}
              />
            </>}

          {
            (nTab == 2) && <>
              <Tasks
                title={"Задачи"}
                dataTask={dataTask}
                setDataTask={setDataTask}
                idUserDefault={idUserDefault}
                listUsersBitrix={listUsersBitrix}
                dataListDepartaments={dataListDepartaments}
                setDataListDepartaments={setDataListDepartaments}
                nameEvent={data.nameEvent}
                IdItemCutawayApp={IdItemCutawayApp}
              />
            </>
          }
          {
            (nTab == 3) && <>
              <CameraContainerWebcam
                title={"Камера"}
              />
              {/* <QRScaner
                title={"Сканер"}
                setDecodedText={setDecodedText}
                decodedText={decodedText}
              /> */}
            </>
          }
        </div>
      </>
    )
  }
}

export default mainTabs
