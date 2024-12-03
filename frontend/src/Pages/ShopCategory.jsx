import React, { useContext } from "react";
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);

    // Verifica que all_product sea un arreglo
    if (!Array.isArray(all_product)) {
        return <p>No hay productos disponibles.</p>;
    }

    // Filtra los productos por la categoría seleccionada
    const filteredProducts = all_product.filter(item => item.category === props.category);
    const totalProducts = filteredProducts.length; // Total de productos en la categoría
    const displayedCount = Math.min(totalProducts, 12); // Número de productos que se mostrarán (máximo 12)

    return (
        <div className='shop-category'>
            <div className="shopcategory-indexSort">
                <p>
                    <span>Mostrando 1-{displayedCount}</span> de {totalProducts} productos
                </p>
                <div className="shopcategory-sort">
                    Ordenar por <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {filteredProducts.map((item) => {
                    return (
                        <Item 
                            key={item.id} // Usa item.id como clave única
                            id={item.id} 
                            name={item.name} 
                            image={item.image} 
                            new_price={item.new_price} 
                            old_price={item.old_price} 
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ShopCategory;