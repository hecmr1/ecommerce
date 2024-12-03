import React, { useContext, useEffect } from "react";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import './ProductDisplay.css'
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  // Desplazar hacia arriba cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // El arreglo vacío asegura que esto solo se ejecute una vez al montar el componente

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>122</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-prices-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-prices-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          hola, soy la description de esto.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size-options">
            <div>Chica</div>
            <div>Mediana</div>
            <div>Grande</div>
          </div>
        </div>
        <button onClick={() => { (addToCart(product.id)) }}> AÑADIR AL CARRITO </button>
        <p className="productdisplay-right-category">
          <span>Category :</span> Vertice, camiseta
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span> Moderno, Excelencia
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;