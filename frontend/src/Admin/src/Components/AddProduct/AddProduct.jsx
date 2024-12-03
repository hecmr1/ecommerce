import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../Assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [ProductDetails, setProductsDetails] = useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: "",
        popular: false,
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        const { name, type, checked, value } = e.target;
        setProductsDetails({ 
            ...ProductDetails, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const Add_Product = async () => {
        if (!ProductDetails.name || !ProductDetails.category || !ProductDetails.new_price || !ProductDetails.old_price || !image) {
            alert("Por favor, completa todos los campos y selecciona una imagen.");
            return;
        }

        let responseData;
        let product = { ...ProductDetails };

        let formData = new FormData();
        formData.append('product', image);

        try {
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            responseData = await uploadResponse.json();

            if (responseData.success) {
                product.image = responseData.image_url;
                const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                const addProductData = await addProductResponse.json();
                addProductData.success ? alert("Producto agregado") : alert("Error al agregar el producto");
            } else {
                alert("Error al subir la imagen");
            }
        } catch (error) {
            console.error("Ocurrió un error:", error);
            alert("Ocurrió un error al agregar el producto. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Nombre del producto</p>
                <input 
                    value={ProductDetails.name} 
                    onChange={changeHandler} 
                    type="text" 
                    name='name' 
                    placeholder="Nombre del producto" 
                />
            </div>
            <div className="add-product-price">
                <div className="addproduct-itemfields">
                    <p>Precio del producto</p>
                    <input 
                        value={ProductDetails.old_price} 
                        onChange={changeHandler} 
                        type="number" 
                        name="old_price" 
                        placeholder='Precio pasado' 
                    />
                </div>
                <div className="addproduct-itemfields">
                    <p>Precio de oferta</p>
                    <input 
                        value={ProductDetails.new_price} 
                        onChange={changeHandler} 
                        type="number" 
                        name="new_price" 
                        placeholder='Precio de oferta' 
                    />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Categoría de producto</p>
                <select 
                    value={ProductDetails.category} 
                    onChange={changeHandler} 
                    name="category" 
                    className='add-product-selector'
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="Vertice">Vertice</option>
                    <option value="Culmen">Culmen</option>
                    <option value="Accion">Accion</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img 
                        src={image ? URL.createObjectURL(image) : upload_area} 
                        className='addproduct-thumnail-img' 
                        alt="" 
                    />
                </label>
                <input 
                    onChange={imageHandler} 
                    type="file" 
                    name='image' 
                    id='file-input' 
                    hidden 
                />
            </div>
            <div className="addproduct-itemfield">
                <label>
                    <input 
                        type="checkbox" 
                        name="popular" 
                        checked={ProductDetails.popular} 
                        onChange={changeHandler}
                    />
                    ¿Es un producto popular?
                </label>
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>Agregar Producto</button>
        </div>
    );
}

export default AddProduct;
