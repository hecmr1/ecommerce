// AddAdmin.jsx
import React, { useState } from 'react';
import './AddAdmin.css'
import axios from 'axios';

const AddAdmin = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/signup', {
                ...formData,
                isAdmin: true, // Establecer isAdmin en true
            });
            alert('Administrador creado con éxito');
        } catch (error) {
            console.error(error);
            if (error.response) {
                setErrorMessage(error.response.data.error || 'Error desconocido');
            } else {
                setErrorMessage('Error de red, por favor intenta de nuevo.');
            }
        }
    };

    return (
        <div>
            <h2>Agregar Administrador</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Crear Administrador</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default AddAdmin;