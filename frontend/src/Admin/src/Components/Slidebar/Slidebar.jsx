import React from 'react'
import './Slidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../Assets/Product_Cart.svg'
import list_product_icon from '../../Assets/Product_list_icon.svg'
import users from '../../Assets/users.png'
import admin from '../../Assets/user_icon.png'

const Slidebar = () => {
  return (
    <div className='slidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="slidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Agregar producto</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="slidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Lista de productos</p>
            </div>
        </Link>
        <Link to={'/listusers'} style={{textDecoration:"none"}}>
            <div className="slidebar-item">
                <img src={users} alt="" />
                <p>Lista de Usuarios</p>
            </div>
        </Link>
        <Link to={'/addadmin'} style={{textDecoration:"none"}}>
            <div className="slidebar-item">
                <img src={admin} alt="" />
                <p>Añadir Administrador</p>
            </div>
        </Link>
    </div>
  )
}

export default Slidebar