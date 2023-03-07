import React from 'react';
import './AppCheckbox.scss'

interface IAppCheckboxProps {
    text?: string
    value: boolean
    onChange: (value: boolean) => void
    id: string
}

export const AppCheckbox = React.memo(({id, value, onChange, text}: IAppCheckboxProps) => {
    return (
        <div>
            <input id={id} className="checkbox" name={id} type="checkbox"
                   checked={value}
                   onChange={(e) => onChange(e.currentTarget.checked)}/>
            <label htmlFor={id} className="checkbox-label">{text}</label>
        </div>
    );
})