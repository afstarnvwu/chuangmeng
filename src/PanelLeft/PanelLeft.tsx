import React from 'react';
import logo from '../images/logo.svg';
import './PanelLeft.less';
import { default as ToolsButton } from './ToolsButton';

function PanelLeft() {
  return (
    <div className="left-panel">
      <div style={{ height: '50px' }} />
      <ToolsButton imageUrl={logo} />
    </div>
  );
}

export default PanelLeft;
