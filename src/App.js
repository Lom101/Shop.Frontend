import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import Footer from './components/Footer';

const App = observer(() => {    
    return (
        <div className="flex flex-col min-h-screen">
                <BrowserRouter>
                    <NavBar/>
                    <AppRouter/>
                    <Footer/>
                </BrowserRouter>
        </div>
    );
});

export default App;