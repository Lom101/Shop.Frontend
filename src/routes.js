import AdminPage from "./pages/AdminPage";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductPage";
import Auth from "./pages/Auth";
import OrdersPage from "./pages/OrdersPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";

import {
    ADMIN_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE,
    ORDERS_ROUTE, SETTINGS_ROUTE, PROFILE_ROUTE, MAIN_ROUTE, PRODUCT_LIST_ROUTE,
    CART_ROUTE, CHECKOUT_ROUTE
} from "./utils/consts";
import CheckoutPage from "./pages/CheckoutPage";

export const authRoutes = [
    {
        path: CART_ROUTE,
        Component: CartPage
    },
    {
        path: ORDERS_ROUTE,
        Component: OrdersPage
    },
    {
        path: SETTINGS_ROUTE,
        Component: SettingsPage
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: CHECKOUT_ROUTE,
        Component: CheckoutPage
    },

];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: PRODUCT_LIST_ROUTE,
        Component: ProductListPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
];

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    }
];
