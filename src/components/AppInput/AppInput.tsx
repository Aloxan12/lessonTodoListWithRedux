import React from 'react';
import './AppInput.scss'

interface IAppInputProps{
    label?: string
    error?: string
}

export const AppInput = ({label, error}: IAppInputProps) => {
    return (
        <div className='app-input'>
            {label && <label className='input-label'>{label}</label>}
            <input className='input-base'/>
            {error && <div className='input-error'>{error}</div>}
        </div>
    );
};