import React, {useCallback, useState} from 'react';
import './Calculator.scss'
import {AppInput, InputMaskType} from "../../components/AppInput/AppInput";

export const Calculator = () => {
    return (
        <div className='calculator-wrap'>
            <CalculatorTitle/>
            <RoomForm/>
        </div>
    );
};

const CalculatorTitle = React.memo(() => {
    return <div className='calculator-wrap'>
        <h1>Калькулятор</h1>
        <h3>Здесь вы можете рассчитать примерную смоимость.</h3>
    </div>
})

interface IRoom {
    id?: string
    title: string
    lampCount: number
    square: number
}

const RoomForm = React.memo(() => {
    const [newRoom, setNewRoom] = useState<IRoom>({
        title: '',
        square: 0,
        lampCount: 0
    })

    const changeTitleHandler = useCallback((value: string) => setNewRoom(prevState => ({
        ...prevState,
        title: value
    })), [])

    const changeSquareHandler = useCallback((value: string) => setNewRoom(prevState => ({
        ...prevState,
        square: Number(value)
    })), [])
    const changeLampCountHandler = useCallback((value: string) => setNewRoom(prevState => ({
        ...prevState,
        lampCount: Number(value)
    })), [])

    return <div className='calculator-form'>
        <AppInput
            value={newRoom.title}
            label={'Название помещения'}
            onChange={changeTitleHandler}/>
        <div className={'input-row'}>
            <AppInput
                value={newRoom.square}
                label={`Площадь помещения(м²)`}
                onChange={changeSquareHandler}
                inputMask={InputMaskType.integer}
            />
            <AppInput
                value={newRoom.lampCount}
                label={'Количество светильников(Шт.)'}
                onChange={changeLampCountHandler}
                inputMask={InputMaskType.integer}
            />
        </div>
    </div>
})

