import React, {useCallback, useState} from 'react';
import './Calculator.scss'
import {AppInput, InputMaskType} from "../../components/AppInput/AppInput";
import {AppToggle} from "../../components/AppToggle/AppToggle";

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
    chandelier: boolean
    cornice: boolean
}

const RoomForm = React.memo(() => {
    const [newRoom, setNewRoom] = useState<IRoom>({
        title: '',
        square: 0,
        lampCount: 0,
        chandelier: false,
        cornice: false
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
    const changeChandelierHandler = useCallback((value: boolean) => setNewRoom(prevState => ({
        ...prevState,
        chandelier: value
    })), [])
    const changeCorniceHandler = useCallback((value: boolean) => setNewRoom(prevState => ({
        ...prevState,
        cornice: value
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
        <div className={'checkbox-row'}>
            <AppToggle
                value={newRoom.chandelier}
                onChange={changeChandelierHandler}
                text={'Добавить люстру'}
            />
            <AppToggle
                value={newRoom.cornice}
                onChange={changeCorniceHandler}
                text={'Добавить карниз'}
            />
        </div>
    </div>
})

