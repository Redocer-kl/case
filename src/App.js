import React, { useState } from 'react'; //импорт реакта и хука, библиотеки для перемещения и стиля
import Draggable from 'react-draggable';
import styled from 'styled-components';

const x = Math.round(window.screen.width * 0.8 / 100) //переменная нужна для определенмя границ слайда

//слайд
const Slide = styled.div`
background: white;
position: absolute;
top: 20%;
left: 10%;
height: 70%;
width: 80%;
border-radius: 8px;
overflow: hidden;
box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
`;

//круг
const Circle = styled.div`
width: ${props => props.size * x}px;
height: ${props => props.size * x}px;
border-radius: 50%;
position: absolute;
top: ${props => props.top}%;
left: ${props => props.left}%;
background: #00b0f0;
`;

//кнопка
const AddCircleButton = styled.button 
`position: absolute;
top: 7%;
left: 42%;
width: 18%;
text-align: center;
background: #00b0f0;
font-size: 16px;
border: None;
padding: 1% 1%;
color: white;
border-radius: 8px;
сursor: pointer;
box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
`;

function App() {
    let del = -1;
    //хук для кругов
    const [circles, setCircles] = useState([]);
    //добавление круга
    const addCircle = () => {
        const size = Math.random() * 15 + 5; // случайный размер от 5 ло 20
        const position = {
            top: Math.random() * (100 - size), // случайная позиция при этом внутри слайда
            left: Math.random() * (100 - size),
        };
        setCircles([...circles, { size, ...position }]); //обновить состояние
    };

    const handleMouseOver = (index) => { //если мышка над кружком, его индекс помещаем в удаление 
        del = index;
    }
    
    const handleMouseOut = () => { //если мышка над кружком, его индекс помещаем в удаление 
        del = -1;
    }

    const handleKeyDown = (event) => {
        console.log(del)
        if (event.keyCode === 8) {;         
            if (del !== -1){ //если удаление не пустое при нажатой backspace производим удаление
                const newCircles = [...circles];
                newCircles.splice(del, 1);
                setCircles(newCircles);
                del = -1;
            }
        }
    } ;

    //вывод jsx элемента
    return (
        <div onKeyDown={handleKeyDown}> 
            <AddCircleButton  onClick={addCircle}>Добавить круг</AddCircleButton>
            <Slide>
                {circles.map((circle, i) => (
                    <Draggable>
                        <Circle size={circle.size} top={circle.top} left={circle.left} key={i} onMouseOver={() => handleMouseOver(i)} onMouseOut ={() => handleMouseOut()}/>
                    </Draggable>
                ))}
            </Slide>
        </div>
    );
}
export default App;

