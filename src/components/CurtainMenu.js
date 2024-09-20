// import React, { useState } from 'react';
// import { Offcanvas, Nav } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom'; // Импорт из react-router-dom
// import { ORDERS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from '../utils/consts';
// import { FaUser } from 'react-icons/fa';
// const CurtainMenu = () => {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return (
//         <>
//             <Nav.Item>
//                 <Nav.Link variant="dark" onClick={handleShow}>
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <FaUser size={24} /> {/* Размер иконки */}
//                         <span style={{ marginLeft: '8px' }}>Личный кабинет</span> {/* Текст */}
//                     </div>
//                 </Nav.Link>
//             </Nav.Item>

//             <Offcanvas show={show} onHide={handleClose} placement="end" className="bg-dark text-light">
//                 <Offcanvas.Header closeButton className="bg-dark text-light">
//                     <Offcanvas.Title>Меню</Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                     <ul>
//                         <li>
//                             <NavLink to={PROFILE_ROUTE} onClick={handleClose} className="text-light">
//                                 Личный кабинет
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to={ORDERS_ROUTE} onClick={handleClose} className="text-light">
//                                 Мои заказы
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to={SETTINGS_ROUTE} onClick={handleClose} className="text-light">
//                                 Настройки
//                             </NavLink>
//                         </li>
//                     </ul>
//                 </Offcanvas.Body>
//             </Offcanvas>
//         </>
//     );
// };

// export default CurtainMenu;