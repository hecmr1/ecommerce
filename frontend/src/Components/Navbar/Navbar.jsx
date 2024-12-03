import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const [selectedMenu, setSelectedMenu] = useState('');
    const [username, setUsername] = useState('Usuario'); // Estado para el nombre del usuario
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verifica si hay un token de autenticación en localStorage y obtiene el nombre del usuario
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decodifica el token
                setUsername(decodedToken.user.name); // Ajusta según la estructura del token
                setIsAuthenticated(true); // Usuario autenticado
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }, []);

    const handleMenuClick = (menuName) => {
        setSelectedMenu(menuName);
        console.log(`Menú seleccionado: ${menuName}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Elimina el token del localStorage
        setIsAuthenticated(false); // Actualiza el estado de autenticación
        setUsername('Usuario'); // Limpia el nombre del usuario
        navigate('/'); // Redirige a la página principal
    };

    return (
        <div className="header">
            <nav className="nav">
                <div className="nav__logo">
                    <img src={logo} alt="Logo" />
                    <p>ANÁHUAC</p>
                </div>
                <ul ref={menuRef} className="nav__menu">
                    <li className="nav__item" onClick={() => handleMenuClick('Inicio')}>
                        <Link to="/" className="nav__link inicio">Inicio</Link>
                    </li>
                    <li className="nav__item" onClick={() => handleMenuClick('Vértice')}>
                        <Link to="/vertice" className="nav__link vertice">Vértice</Link>
                    </li>
                    <li className="nav__item" onClick={() => handleMenuClick('Culmen')}>
                        <Link to="/culmen" className="nav__link culmen">Culmen</Link>
                    </li>
                    <li className="nav__item" onClick={() => handleMenuClick('Acción')}>
                        <Link to="/accion" className="nav__link accion">Acción</Link>
                    </li>
                    <li className="nav__item" onClick={() => handleMenuClick('Nuestros Productos')}>
                        <Link to="/productos" className="nav__link productos">Nuestros Productos</Link>
                    </li>
                </ul>
                <div className="nav__login-cart">
                    {isAuthenticated ? (
                        <div className="nav__user">
                            <span>Bienvenido, {username}</span>
                            <button onClick={handleLogout} className="nav__cta">Logout</button>
 </div>
                    ) : (
                        <Link to="/login">
                            <button className="nav__cta">Login</button>
                        </Link>
                    )}
                    <Link to="/cart">
                        <img src={cart_icon} alt="Carrito" />
                    </Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;