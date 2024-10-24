import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import CartStore from './store/CartStore';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <Context.Provider value={{userStore: new UserStore(), productStore: new ProductStore(), cartStore: new CartStore()}}>
       <App/>
   </Context.Provider>
);
