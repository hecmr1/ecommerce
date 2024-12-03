import React from "react";
import { Link } from "react-router-dom";
import './Hero.css';
import vertice from '../Assets/vertice.png';
import culmen from '../Assets/culmen.png';
import accion from '../Assets/accion.png';

const Hero = () => {
    const programs = [
        {
            id: 1,
            name: 'Vértice',
            image: vertice,
            path: '/vertice',
        },
        {
            id: 2,
            name: 'Culmen',
            image: culmen,
            path: '/culmen',
        },
        {
            id: 3,
            name: 'Acción',
            image: accion,
            path: '/accion',
        },
    ];

    return (
        <section className="hero">
            <div className="hero-left">
                <h2>Merch oficial de los programas de liderazgo Anáhuac</h2>
                <p>
                    Descubre nuestra exclusiva colección de productos diseñados para
                    inspirar y motivar a los líderes del mañana. Desde ropa,accesorios y souvenirs, tenemos todo lo que necesitas 
                    para mostrar tu orgullopor tu programa y tu universidad.
                </p>
                
                <Link to="/productos" className="hero-button">
                    Explorar Productos
                </Link>
            </div>
            <div className="hero-right">
                {programs.map((program) => (
                    <Link
                        to={program.path}
                        key={program.id}
                        className="product-image"
                        aria-label={`Ver más sobre el programa ${program.name}`}
                    >
                        <img 
                            src={program.image} 
                            alt={`Imagen de ${program.name}`} 
                            onError={(e) => { e.target.src = 'path/to/default-image.png'; }} // Ensure this path is correct
                            loading="lazy" // Lazy loading for performance
                        />
                        <p>{program.name}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Hero;