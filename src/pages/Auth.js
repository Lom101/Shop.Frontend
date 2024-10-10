import React, {useContext, useState } from 'react';
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE, RESET_PASSWORD_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';
import {Context} from "../index";
import {jwtDecode} from 'jwt-decode';

const Auth = observer (() => {
    const {userStore} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null); // Состояние для хранения ошибки

    const click = async () => {
        try {
            setError(null); // Сбрасываем ошибку перед попыткой логина/регистрации
            if(isLogin){
               await login(email, password)
            } else {
               await registration(email, email.split("@")[0], password);
            }

            const token = localStorage.getItem('authToken');
            if (token) {
                // Декодируйте токен
                const decoded = jwtDecode(token);

                // Предполагаем, что ваши данные пользователя находятся в decoded.user
                const userData = {
                    id: decoded.id,
                    email: decoded.email,
                    // name: decoded.name
                };
                userStore.setUser(userData); // Установите данные пользователя в userStore
            }

            userStore.setUser(true); // userStore
            userStore.setIsAuth(true);   
            navigate(MAIN_ROUTE);
        } catch (error) {
            console.error(error);
            setError(error.response.data.errors[0] || error.response.data.errors.Username[0]); // Устанавливаем сообщение об ошибке
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center " style={{ height: '85vh' }}>
                    <Card className="p-5 card-auth">
                        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

                        {error && (
                            <Alert variant="danger" className="mt-3">
                                {error}
                            </Alert>
                        )}

                        <Form className="" style={{  width: '60vh' }}>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш email..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш пароль..."
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <div className="d-flex justify-content-between mt-3">
                                {isLogin ?
                                    <div>
                                        Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                    </div>
                                    :
                                    <div>
                                        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                    </div>
                                }
                                <Button
                                    className="px-3"
                                    variant={"outline-success"}
                                    onClick={click}
                                >
                                    {isLogin ? 'Войти' : 'Регистрация'}
                                </Button>
                            </div>
                            {isLogin && (
                                <div className="mt-3">
                                    <NavLink to={RESET_PASSWORD_ROUTE}>Забыли пароль?</NavLink>
                                </div>
                            )}
                        </Form>
                    </Card>
                </Container>
    );
});

export default Auth;
