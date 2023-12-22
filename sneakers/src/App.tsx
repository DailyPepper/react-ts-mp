import React from 'react';
import { Link } from 'react-router-dom';
import MainRouter from './app/routing';
import './styles/style.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar/>
      <MainRouter />
    </>
  );
}

export default App;
