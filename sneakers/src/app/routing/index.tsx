import React from 'react';
import { Route, Routes } from 'react-router-dom';
import News from '../../page/News';
import Contact from '../../page/Contacts';
import Account from '../../page/Personal account';
import Sneakers from '../../page/Sneakers';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="contact" element={<Contact/>} />
      <Route path="News" element={< News/>} />
      <Route path='PersonalAccount' element={<Account/>}></Route>
      <Route path='Sneakers' element={<Sneakers/>}></Route>
    </Routes>
  );
};

export default MainRouter;