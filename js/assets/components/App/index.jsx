// import React, { useState } from 'react';
import './css/style.css';
import { MainContent } from '../MainContent';
import { ButtonsContainer } from '../ButtonsContainer';
// import { ContextContactData } from '../../hook/contextContactData';

function App() {
  /* Поля ввода */
  // const [nameInput, setNameInput] = useState("");                 // Состояние input "ФИО"
  //  const [phoneInput, setPhoneInput] = useState("+7");             // Состояние input "Телефон"
  //  const [emailInput, setEmailInput] = useState("");               // Состояние input "E-mail"
  //  const [jobTitleInput, setJobTitleInput] = useState("");         // Состояние input "Должность"
  //  const [companyInput, setCompanyInput] = useState("");           // Состояние input "Компания"
  //  const [nameEventInput, setNameEventInput] = useState("");       // Состояние input "Название мероприятия"
  //  const [responsibleInput, setResponsibleInput] = useState("");   // Состояние input "Ответсвенный"

  return (
    <>

      {/* <ContextContactData.Provider value={nameInput}>
        <ContextContactData.Provider value={setNameInput}> */}
          <MainContent />
          <ButtonsContainer />
        {/* </ContextContactData.Provider>
      </ContextContactData.Provider> */}
    </>
  );
}

export default App;
