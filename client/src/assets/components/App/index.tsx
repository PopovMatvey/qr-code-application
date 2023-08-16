import React, { useState } from 'react';
import './css/style.css';
import { MainContent } from '../MainContent';
import { ButtonsContainer } from '../ButtonsContainer';
import { ContextContactData } from '../../hook/contextContactData';
// import { ContextContactData } from '../../hook/contextContactData';

function App() {

  // const ContextContactData = createContext();
  /* Поля ввода */
  const [nameInput, setNameInput] = useState("");                 // Состояние input "ФИО"
  //  const [phoneInput, setPhoneInput] = useState("+7");             // Состояние input "Телефон"
  //  const [emailInput, setEmailInput] = useState("");               // Состояние input "E-mail"
  //  const [jobTitleInput, setJobTitleInput] = useState("");         // Состояние input "Должность"
  //  const [companyInput, setCompanyInput] = useState("");           // Состояние input "Компания"
  //  const [nameEventInput, setNameEventInput] = useState("");       // Состояние input "Название мероприятия"
  //  const [responsibleInput, setResponsibleInput] = useState("");   // Состояние input "Ответсвенный"

  // console.log(nameInput);

  return (
    <>

      <ContextContactData.Provider value={{ nameInput, setNameInput }}>
        {/* <ContextContactData.Provider value={setNameInput}> */}
        <MainContent />
        <ButtonsContainer />
      </ContextContactData.Provider>
      {/* </ContextContactData.Provider> */}
    </>
  );
}

export default App;
