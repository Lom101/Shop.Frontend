import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer (() => {
    const {userStore} = useContext(Context);
    return (
        <Routes className="flex-grow-1">
            {userStore.isAuth && userStore.isAdmin() && adminRoutes.map(({ path, Component }) => // Проверка на админа
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {userStore.isAuth && authRoutes.map(({ path, Component }) => // проверка авторизован ли юзер
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) => // routes для неавторизованные юзеров
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {/* Редирект на главную страницу, если ввели неправильный адрес */}
            <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;