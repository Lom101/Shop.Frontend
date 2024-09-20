import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import Footer from './components/Footer';

const App = observer(() => {    
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
            <div className="d-flex flex-column min-vh-5">
                <Footer />
            </div>
        </BrowserRouter>
    );
});

export default App;