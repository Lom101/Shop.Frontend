import React, { useEffect, useRef, useState } from 'react';

const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;

    return function (...args) {
        const context = this;

        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

const AddressInput = ({ onAddressChange }) => {
    const [address, setAddress] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);
    const YANDEX_API_KEY = process.env.REACT_APP_YANDEX_API_KEY;
    const cache = {};

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${YANDEX_API_KEY}`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const ymaps = window.ymaps;

            if (ymaps && inputRef.current) {
                const throttledGeocode = throttle((inputValue) => {
                    if (cache[inputValue]) {
                        setSuggestions(cache[inputValue]);
                        return;
                    }

                    ymaps.geocode(inputValue).then((res) => {
                        const geoObjects = res.geoObjects;
                        const newSuggestions = [];

                        geoObjects.each((geoObject) => {
                            newSuggestions.push(geoObject.getAddressLine());
                        });

                        cache[inputValue] = newSuggestions; // Сохраните результаты в кэш
                        setSuggestions(newSuggestions);
                    }).catch((error) => {
                        console.error("Ошибка при получении адресов:", error);
                    });
                }, 5000); // Запросы не чаще, чем раз в 1000 мс

                inputRef.current.addEventListener('input', (event) => {
                    const inputValue = event.target.value;
                    setAddress(inputValue);
                    setSuggestions([]);

                    if (inputValue.length > 2) { // Минимальная длина 3 символа
                        throttledGeocode(inputValue); // Используем throttle
                    }
                });
            } else {
                console.error("Yandex Maps API не доступен или inputRef не определен.");
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSuggestionClick = (suggestion) => {
        setAddress(suggestion);
        onAddressChange(suggestion);
        setSuggestions([]);
    };

    return (
        <div>
            <input
                type="text"
                ref={inputRef}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Введите адрес"
                className="form-control"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            <style>
                {`
                    .suggestions-list {
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                        border: 1px solid #ccc;
                        max-height: 150px;
                        overflow-y: auto;
                        position: absolute;
                        background-color: white;
                        z-index: 1000;
                    }
                    .suggestions-list li {
                        padding: 8px;
                        cursor: pointer;
                    }
                    .suggestions-list li:hover {
                        background-color: #f0f0f0;
                    }
                `}
            </style>
        </div>
    );
};

export default AddressInput;
