import React, { useContext } from "react";
import './RelatedProducts.css';
import { ShopContext } from '../../Context/ShopContext'; // Importar el contexto
import Item from '../Item/Item';

const RelatedProducts = () => {
    const { all_product } = useContext(ShopContext); // Obtener todos los productos del contexto

    // Aquí puedes filtrar los productos relacionados si es necesario
    // Por ejemplo, podrías mostrar los primeros 4 productos como relacionados
    const relatedProducts = all_product.slice(0, 4); // Ajusta este número según tus necesidades

    return (
        <div className='relatedProducts'>
            <h1>Productos relacionados</h1>
            <hr />
            <div className="relatedproducts-item">
                {relatedProducts.map((item) => (
                    <Item 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price} 
                    />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;