import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import './Popular.css'; // Asegúrate de tener estilos para este componente

const Popular = () => {
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/popularproducts');
                const data = await response.json();
                setPopularProducts(data);
            } catch (error) {
                console.error("Error al obtener productos populares:", error);
            }
        };

        fetchPopularProducts();
    }, []);

    return (
        <div className='popular-products'>
            <h2>Productos Populares</h2>
            <div className='products-list'>
                {popularProducts.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} className='product-item'> {/* Enlaza al ProductDisplay */}
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>${product.new_price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Popular;