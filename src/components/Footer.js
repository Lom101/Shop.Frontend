import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaVk, FaTelegram, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-black text-white py-5 mt-auto">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={4} className="text-center mb-4">
                        <h5 className="text-xl font-semibold mb-3">Контакты</h5>
                        <p className="mb-1">📞 +7 (999) 999-9999</p>
                        <p>✉ shakirov.bulat.contact@gmail.com</p>
                    </Col>
                    <Col xs={12} md={4} className="text-center mb-4">
                        <h5 className="text-xl font-semibold mb-3">Полезные ссылки</h5>
                        <ul className="list-unstyled space-y-2">
                            <li>
                                <a href="/about" className="text-white transition-colors duration-300 hover:text-gray-400">
                                    О нас
                                </a>
                            </li>
                            <li>
                                <a href="/shop" className="text-white transition-colors duration-300 hover:text-gray-400">
                                    Магазин
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-white transition-colors duration-300 hover:text-gray-400">
                                    Контакты
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12} md={4} className="text-center">
                        <h5 className="text-xl font-semibold mb-3">Следите за нами</h5>
                        <div className="d-flex justify-content-center space-x-4 mt-2">
                            <a href="https://vk.com/bulat_letov" className="text-white transition-transform transform hover:scale-110 duration-300" target="_blank" rel="noopener noreferrer">
                                <FaVk size={28} />
                            </a>
                            <a href="https://t.me/BulatShakirov0" className="text-white transition-transform transform hover:scale-110 duration-300" target="_blank" rel="noopener noreferrer">
                                <FaTelegram size={28} />
                            </a>
                            <a href="https://github.com/Lom101" className="text-white transition-transform transform hover:scale-110 duration-300" target="_blank" rel="noopener noreferrer">
                                <FaGithub size={28} />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="text-center mt-5">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Магазин Кроссовок. Все права защищены.</p>
                        <p>
                            <a href="/privacy-policy" className="text-white transition-colors duration-300 hover:text-gray-400">Политика конфиденциальности</a> |
                            <a href="/terms-of-service" className="text-white transition-colors duration-300 hover:text-gray-400"> Условия использования</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
