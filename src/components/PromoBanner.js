import React from 'react';
import { Button } from "react-bootstrap";

const PromoBanner = () => {
    return (
        <div className="relative bg-cover bg-center w-full h-64 text-black flex items-center justify-center mt-4 mb-8">
            <div className="w-9/12 bg-indigo-200 bg-opacity-70 p-6 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-3">Специальное предложение!</h2>
                <p className="mb-4">Скидка 20% на все кроссовки в этом месяце!</p>
                <Button
                    variant="primary"
                    size="lg"
                    href="/all"
                    className="shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    Узнать больше
                </Button>
            </div>
        </div>
    );
};

export default PromoBanner;
