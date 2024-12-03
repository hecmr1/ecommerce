import React from "react";
import './Item.css';
import { Link } from "react-router-dom";

const Item = (props) => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazamiento suave hacia arriba

    return (
        <div className='item'>
            <Link to={`/product/${props.id}`} onClick={scrollToTop}>
                <img src={props.image} alt={props.name || "Imagen de producto"} />
            </Link>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    ${props.new_price.toFixed(2)} {/* Formato de precios */}
                </div>
                {props.old?.price && ( /* Uso de encadenamiento opcional para mayor limpieza */
                    <div className="item-price-old">
                        ${props.old.price.toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Item;
