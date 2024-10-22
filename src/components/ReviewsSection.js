import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ReviewsSection = () => {
    const reviews = [
        { user: "Анна", review: "Отличные кроссовки! Очень удобные.", rating: 5 },
        { user: "Иван", review: "Купил на распродаже, качество супер!", rating: 4 }
    ];

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Отзывы</h2>
            <div className="ps-5 pe-5  space-y-6">
                {reviews.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="font-semibold">{item.user}</h3>
                        <div className="text-yellow-400 mb-2">
                            {[...Array(item.rating)].map((_, i) => (
                                <span key={i}>⭐</span>
                            ))}
                        </div>
                        <p className="text-gray-600">{item.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};



export default ReviewsSection;
