import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={4} className="text-center">
                        <h5>Контакты</h5>
                        <p>Телефон: +1 (123) 456-7890</p>
                        <p>Email: info@company.com</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Ссылки</h5>
                        <p>
                            <a href="/about" className="text-white">О нас</a><br />
                            <a href="/services" className="text-white">Услуги</a><br />
                            <a href="/contact" className="text-white">Контакты</a>
                        </p>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Социальные сети</h5>
                        <a href="https://facebook.com" className="text-white mx-2"><FaFacebook /></a>
                        <a href="https://twitter.com" className="text-white mx-2"><FaTwitter /></a>
                        <a href="https://instagram.com" className="text-white mx-2"><FaInstagram /></a>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Ваша компания. Все права защищены.</p>
                        <p>
                            <a href="/privacy-policy" className="text-white">Политика конфиденциальности</a> | 
                            <a href="/terms-of-service" className="text-white"> Условия обслуживания</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
