import React from 'react';
import './AppButton.scss'

interface IAppButtonProps {
    title: string
    onClick: () => void
}

export const AppButton = React.memo(({title, onClick}: IAppButtonProps) => {
    return (
        <button
            className='app-button'
            onClick={onClick}
        >{title}
        </button>
    );
})