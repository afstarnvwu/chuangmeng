import React from 'react';
import logo from './logo.svg';
import './AppHeader.less';

function AppHeader() {
  return (
    <div className="header">
      <h1 className='logo'>LOGO</h1>
      <h2 className="title">标题</h2>
      <h3 className="user">用户</h3>
    </div>
  );
}

export default AppHeader;
