import AdminPage from "./pages/AdminPage";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Auth from "./pages/Auth";
import OrdersPage from "./pages/OrdersPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import {ADMIN_ROUTE, BASKET_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE,
    ORDERS_ROUTE, SETTINGS_ROUTE, PROFILE_ROUTE
} from "./utils/consts";

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
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
        path: ADMIN_ROUTE,
        Component: AdminPage
    }
];

// export const adminRoutes = [
//     {
//         path: ADMIN_ROUTE,
//         Component: AdminPage
//     }
// ];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
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