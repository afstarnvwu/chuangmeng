import React from 'react';
import logo from './images/logo.svg';
import './App.less';
import AppHeader from './PanelHeader/AppHeader';
import PanelLeft from './PanelLeft/PanelLeft';
import PanelRight from './PanelRight/PanelRight';
import Canvas from './PanelCanvas/Canvas';

function App() {
  return (
    <div className="App">
      <div className='main-page'>
        <div className='main-page-content'>
          <Canvas/>
          <PanelLeft />
          <PanelRight />
        </div>
      </div>
      <AppHeader />
    </div>
  );
}

export default App;
