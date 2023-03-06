import React from 'react';
import './AppInput.scss'

interface IAppInputProps{
    label?: string
}

export const AppInput = ({label}: IAppInputProps) => {
    return (
        <div className='app-input'>
            {label && <label className='input-label'>{label}</label>}
            <input className='input-base'/>
        </div>
    );
};