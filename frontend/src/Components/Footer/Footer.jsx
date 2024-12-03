import React from "react";
import './Footer.css'
import logo from '../Assets/logo.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pinterest_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';


const Footer = () => {
    return(
    <div className='footer'>
        <div className="footer">
            <img src={logo} alt="" />
            <p>ANÁHUAC</p>
        </div>
        <ul className="footer-links">
            <li>Universidad</li>
            <li>Oficinas Vértice</li>
            <li>Oficinas Culmen</li>
            <li>Oficinas Acción</li>
            <li>Contacto</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pinterest_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="copyright">
            <hr />
            <p>Copyright @ 2024 - Todos los derechos reservados.</p>
        </div>
    </div>
    )
}

export default Footer;