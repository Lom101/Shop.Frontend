import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NewsSection = () => {
    const newsItems = [
        { title: "Новая коллекция!", content: "Запуск новой линейки кроссовок." },
        { title: "Распродажа!", content: "Скидки до 50% на старые модели." }
    ];

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Новости</h2>
            <div className="ps-5 pe-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                {newsItems.map((item, index) => (
                    <div key={index} className=" bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-700 mb-4">{item.content}</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
                            Читайте далее
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};



export default NewsSection;
