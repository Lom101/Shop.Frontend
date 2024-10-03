import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-container bg-dark text-white py-5 mt-auto">
            <Container>
                <Row>
                    <Col md={4} className="text-center">
                        <h5>Контакты</h5>
                        <p>📞 +7 (999) 999-9999</p>
                        <p>✉ info@company.com</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Полезные ссылки</h5>
                        <ul className="list-unstyled">
                            <li><a href="/about" className="text-white">О нас</a></li>
                            <li><a href="/shop" className="text-white">Магазин</a></li>
                            <li><a href="/contact" className="text-white">Контакты</a></li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Следите за нами</h5>
                        <div className="flex justify-center mt-2">
                            <a href="https://facebook.com" className="text-white mx-2">
                                <FaFacebook size={28}/>
                            </a>
                            <a href="https://twitter.com" className="text-white mx-2">
                                <FaTwitter size={28}/>
                            </a>
                            <a href="https://instagram.com" className="text-white mx-2">
                                <FaInstagram size={28}/>
                            </a>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-5">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Магазин Кроссовок. Все права защищены.</p>
                        <p>
                            <a href="/privacy-policy" className="text-white">Политика конфиденциальности</a> |
                            <a href="/terms-of-service" className="text-white"> Условия использования</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
