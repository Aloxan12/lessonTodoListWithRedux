import React from "react"
import './App.scss'
import {AppTitlePage} from "../../components/AppTitlePage/AppTitlePage";
import sergeyPhoto from '../../utils/images/sergey2.png'

export const App = ()=>{
    return <React.Fragment>
        <AppTitlePage title='Мой опыт' />
        <div className='my-experience-wrap'>
            <section>
                <p>Приветствую! Меня зовут Сергей, и я занимаюсь строительством уже более 10 лет, а установкой натяжных потолков - более 5 лет. Мой опыт включает работу с различными типами потолочных конструкций, установку светильников и выполнение дизайнерских решений.
                </p>
                <p>Я работаю только с высококачественными материалами и использую современное оборудование, что гарантирует моим клиентам высокое качество и надежность установки натяжных потолков. Если вы ищете профессионала для установки натяжных потолков, то я готов предложить свои услуги. Свяжитесь со мной, и мы вместе найдем наилучшее решение для вашего помещения.</p>
            </section>
            <aside>
                <img src={sergeyPhoto} alt='сергей'/>
            </aside>
        </div>
    </React.Fragment>
}