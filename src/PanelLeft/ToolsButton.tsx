import React, { useState } from 'react';
import logo from '../images/logo.svg';
import './ToolsButton.less';

interface ButtonProps {
    imageUrl: string;
}
function ToolsButton(imageUrl: ButtonProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    }
    return (
        <div className='tools'>
            <img className='button-image' src={imageUrl.imageUrl} alt="Button Image" />
            <span className='button-text'>文本</span>
            <span className={`tools-button ${isActive ? 'active' : 'before'}`} onClick={handleClick}></span>
        </div>
    );
}

export default ToolsButton;
