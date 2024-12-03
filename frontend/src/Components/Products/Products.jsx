import React, { useContext } from "react";
import './Products.css';
import { ShopContext } from '../../Context/ShopContext';
import dropdown_icon from '../Assets/dropdown_icon.png';
import Item from '../Item/Item';

const Products = () => {
    const { all_product } = useContext(ShopContext);

    return (
        <div className='shop-category'>
            <div className="shopcategory-indexSort">
                <p>
                    <span>Mostrando 1-{Math.min(all_product.length, 12)}</span> de {all_product.length} productos
                </p>
                <div className="shopcategory-sort">
                    Ordenar por <img src={dropdown_icon} alt="Ordenar" />
                </div>
            </div>
            <div className="shopcategory-products">
                {all_product.length > 0 ? (
                    all_product.map((item) => (
                        <Item 
                            key={item.id} 
                            id={item.id} 
                            name={item.name} 
                            image={item.image} 
                            new_price={item.new_price} 
                            old_price={item.old_price} 
                        />
                    ))
                ) : (
                    <p>No hay productos disponibles en este momento.</p>
                )}
            </div>
        </div>
    );
};

export default Products;