import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, RemoveFromCart } = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Producto</p>
        <p>Título</p>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Eliminar</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  src={remove_icon}
                  onClick={() => {
                    RemoveFromCart(e.id);
                  }}
                  alt="Eliminar artículo"
                />
              </div>
              <hr />
            </div>
          );
        } else {
          return null; // No renderizar si el producto no está en el carrito
        }
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Totales del carrito</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Costo de envío</p>
              <p>Gratis</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Finalizar pedido</button>
        </div>
        <div className="cartitems-promocode">
          <p>Si tienes un código de descuento, introdúcelo aquí</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Código de descuento'/>
            <button>Canjear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;