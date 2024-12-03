import React from 'react'
import './ListProduct.css'
import { useState } from 'react'
import { useEffect } from 'react'
import cross_icon from '../../Assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async ()=>{
      await fetch('http://localhost:4000/allproducts')
      .then((res)=>res.json())
      .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
      fetchInfo();
    },[])

    const remove_product = async (id) =>{
      await fetch('http://localhost:4000/removeproduct',{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Productos</p>
          <p>Titulo</p>
          <p>Precio</p>
          <p>Precio en descuento</p>
          <p>Imagen</p>
          <p>Categoria</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
            {allproducts.map((product,index)=>{
              return <> 
              <div key={index} className="listproduct-format-main listproduct-format">
                  <img src={product.image} alt="" className="listproduct-product-title" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
              </div>
              <hr />
              </>
            })}
        </div>
    </div>
  )
}

export default ListProduct