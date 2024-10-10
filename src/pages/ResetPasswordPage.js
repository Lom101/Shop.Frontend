import React, { useState } from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {forgotPasswordRequest, resetPassword} from "../http/userAPI";
import {useNavigate} from 'react-router-dom';
import {MAIN_ROUTE} from "../utils/consts";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false); // Для отображения формы ввода кода
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPasswordRequest(email);
            setMessage('A password reset code has been sent to your email.');
            setIsCodeSent(true);  // Показать форму для ввода кода
        } catch (error) {
            setMessage('Error sending password reset link.');
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email, resetCode, newPassword);  // Завершаем сброс пароля
            setMessage('Пароль успешно изменен.');
            setTimeout(() => navigate(MAIN_ROUTE), 3000);  // Redirect after 3 seconds
        } catch (error) {
            console.log(error);
            setMessage(`Ошибка при сбросе пароля. \n${error.response.data.errors[0]}`);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '85vh' }}>
            <Card className="p-5 card-auth">
                <h2 className="m-auto">Восстановление пароля</h2>
                {!isCodeSent ? (
                    <Form onSubmit={handleEmailSubmit} style={{ width: '60vh' }}>
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Button
                            className="mt-3"
                            variant={"outline-success"}
                            type="submit"
                        >
                            Отправить ссылку для восстановления
                        </Button>
                        {message && <div className="mt-3">{message}</div>}
                    </Form>
                ) : (
                    <Form onSubmit={handleResetSubmit} style={{ width: '60vh' }}>
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите код восстановления..."
                            value={resetCode}
                            onChange={e => setResetCode(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите новый пароль..."
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            type="password"
                            autoComplete="new-password" // Отключаем автозаполнение
                        />
                        <Button
                            className="mt-3"
                            variant={"outline-success"}
                            type="submit"
                        >
                            Сбросить пароль
                        </Button>
                        {message && <div className="mt-3">{message}</div>}
                    </Form>
                )}
            </Card>
        </Container>
    );
};

export default ResetPassword;
