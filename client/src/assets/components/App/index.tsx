import React from 'react';
import './css/style.css';
import { Header } from '../Header';
import { Footer } from '../Footer';
// import { useExempleState } from '../../hook/useStateExemple';
import { MainContent } from '../MainContent';
import { ButtonsContainer } from '../ButtonsContainer';

function App() {
  // const { exemple } = useExempleState();

  // console.log(exemple + "  nothing");

  return (
    <>
      <Header />
      <MainContent />
      <ButtonsContainer/>
      <Footer />
    </>
  );
}

export default App;
