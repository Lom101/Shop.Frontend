import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import Footer from './components/Footer';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import {Container} from "react-bootstrap";

const stripePromise = loadStripe("pk_test_51Q53yhKGJp4CXm6iZcGeA1nSqBrOUSfL9eDP3ZOPK4jNa0SnzmDKBBYHVuxqNc3VepeXyICm7mfOUSKWwmdLFPw700Exd3W2RT");


const App = observer(() => {    
    return (
        <div className="flex flex-col min-h-screen">
            <Elements stripe={stripePromise}>
                <BrowserRouter>
                    <NavBar/>
                    <AppRouter/>
                    <Footer/>
                </BrowserRouter>
            </Elements>
        </div>
    );
});

export default App;