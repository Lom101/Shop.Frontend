import React, { useState } from 'react';

const InterestingButton = () => {
    const [text, setText] = useState("Нажмите кнопку, чтобы изменить этот текст!");

    const handleClick = () => {
        const messages = [
            "Вы сделали отличный выбор!",
            "Кнопка была нажата!",
            "Вы победитель!",
            "Отлично! Продолжайте в том же духе!",
            "Каждый клик - это шаг к успеху!"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setText(randomMessage);
    };

    return (
        <div className="container mx-auto text-center my-10">
            <button
                onClick={handleClick}
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
                Нажми меня!
            </button>
            <h2 className="text-2xl font-bold mt-4">{text}</h2>
        </div>
    );
};

export default InterestingButton;
