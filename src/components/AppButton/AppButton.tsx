import React from 'react';
import './AppButton.scss'

interface IAppButtonProps {
    title: string
    onClick: () => void
    disabled?: boolean
}

export const AppButton = React.memo(({title, onClick, disabled}: IAppButtonProps) => {
    return (
        <button
            className='app-button'
            onClick={onClick}
            disabled={disabled}
        >{title}
        </button>
    );
})