import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";


export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <Context.Provider value={{userStore: new UserStore(), productStore: new ProductStore()}}>
       <App/>
   </Context.Provider>
);

// return (
//     <Navbar bg="dark" variant="dark" className="navbar-store">
//         <Container fluid>
//             <Row className="w-100 d-flex align-items-center">
//                 <Col xs={9} className="d-flex align-items-center">
//                     <NavLink className="logo-title" to={MAIN_ROUTE}>
//                         Магазин
//                     </NavLink>
//                     <div className="ml-2">
//                         <GenderSelector />
//                     </div>
//                 </Col>
//                 <Col xs={3} className="d-flex justify-content-end">
//                     <Nav className="ml-2">
//                         {userStore.isAuth ? (
//                             <>
//                                 {isAdmin() && (
//                                     <Nav.Item>
//                                         <Nav.Link
//                                             className="navbar-button"
//                                             onClick={() => navigate(ADMIN_ROUTE)}
//                                         >
//                                             Админ панель
//                                         </Nav.Link>
//                                     </Nav.Item>
//                                 )}
//                                 <Nav.Item>
//                                     <Nav.Link
//                                         className="btn-login"
//                                         onClick={logout_user}
//                                     >
//                                         Выйти
//                                     </Nav.Link>
//                                 </Nav.Item>
//                                 <Nav.Item>
//                                     <CurtainMenu />
//                                 </Nav.Item>
//                             </>
//                         ) : (
//                             <Nav.Item>
//                                 <Nav.Link
//                                     className="navbar-button"
//                                     onClick={() => navigate(LOGIN_ROUTE)}
//                                 >
//                                     Авторизация
//                                 </Nav.Link>
//                             </Nav.Item>
//                         )}
//                     </Nav>
//                 </Col>
//             </Row>
//         </Container>
//     </Navbar>
// );
