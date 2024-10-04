import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-black text-white py-5 mt-auto">
            <Container>
                <Row className="justify-content-center">
                    <Col md={4} className="text-center mb-4 md:mb-0">
                        <h5 className="text-xl font-semibold mb-3">Контакты</h5>
                        <p className="mb-1">📞 +7 (999) 999-9999</p>
                        <p>✉ info@company.com</p>
                    </Col>
                    <Col md={4} className="text-center mb-4 md:mb-0">
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
                    <Col md={4} className="text-center">
                        <h5 className="text-xl font-semibold mb-3">Следите за нами</h5>
                        <div className="flex justify-center space-x-4 mt-2">
                            <a href="https://facebook.com" className="text-white transition-transform transform hover:scale-110 duration-300">
                                <FaFacebook size={28} />
                            </a>
                            <a href="https://twitter.com" className="text-white transition-transform transform hover:scale-110 duration-300">
                                <FaTwitter size={28} />
                            </a>
                            <a href="https://instagram.com" className="text-white transition-transform transform hover:scale-110 duration-300">
                                <FaInstagram size={28} />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-5">
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
