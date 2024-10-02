import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import Footer from './components/Footer';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51Q53yhKGJp4CXm6iZcGeA1nSqBrOUSfL9eDP3ZOPK4jNa0SnzmDKBBYHVuxqNc3VepeXyICm7mfOUSKWwmdLFPw700Exd3W2RT");


const App = observer(() => {    
    return (
        // для корректной работы оплаты
        <Elements stripe={stripePromise}>
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
                <Footer />
            </BrowserRouter>
        </Elements>
    );
});

export default App;