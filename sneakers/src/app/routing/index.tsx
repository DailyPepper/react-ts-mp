import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Artem from '../../page/Artem';
import Vlad from '../../page/Vlad';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="Artem" element={<Artem />} />
      <Route path="Vlad" element={<Vlad />} />
    </Routes>
  );
};

export default MainRouter;