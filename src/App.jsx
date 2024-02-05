import React from 'react';
import MainPage from './Pages/MainPage/MainPage';
import s from './global.module.scss'
import PlayBar from './coponents/PlayBar/PlayBar';

const App = () => {
  return (
    <div className={s.wrapper}>
      <MainPage />
      <PlayBar />
    </div>
  );
};

export default App;