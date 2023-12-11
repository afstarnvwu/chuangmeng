import React, { useState } from 'react';
import logo from './logo.svg';
import './ToolsButton.less';

function ToolsButton() {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    }
    return (
        <div className={`tools-button ${isActive ? 'active' : 'before'}`} onClick={handleClick}>
            <span></span>
            <span className='button-text'>文本</span>
        </div>
    );
}

export default ToolsButton;
