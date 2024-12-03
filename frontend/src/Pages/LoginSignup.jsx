import React, { useState } from "react";
import axios from "axios";
import './CSS/LoginSignup.css';

const ShopSignup = () => {
    const [isAdmin] = useState(false); // Estado para el checkbox de administrador

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage(''); // Limpia el mensaje de error al cambiar el input
        setSuccessMessage(''); // Limpia el mensaje de éxito al cambiar el input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = state === "Login" ? "http://localhost:4000/login" : "http://localhost:4000/signup";
        try {
            const response = await axios.post(url, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                isAdmin: false, // Asegúrate de enviar false si no es un admin
            });
            
            if (state === "Signup") {
                // Si es registro, muestra el mensaje de éxito
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    setState("Login"); // Cambia a Login después de 3 segundos
                }, 3000);
                return; // Salir de la función para evitar el flujo de inicio de sesión
            }

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('isAdmin', response.data.user.isAdmin);
            }
    
            // Redirigir según el estado de isAdmin
            if (response.data.user && response.data.user.isAdmin) {
                window.location.href = "/addproduct";
            } else {
                window.location.href = "/";
            }
            
        } catch (error) {
            console.error(error);
            if (error.response) {
                // Si hay una respuesta del servidor
                if (error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage("Ocurrió un error desconocido.");
                }
            } else {
                setErrorMessage("Error de red, por favor intenta de nuevo.");
            }
        }
    };

    return (
        <div>
            <div className="loginsignup">
                <div className="loginsignup-container">
                    <h1>{state}</h1>
                    <form onSubmit={handleSubmit}>
                        {state === "Signup" && (
                            <input
                                type="text"
                                name="username"
                                placeholder='Nombre'
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder='Correo Electrónico'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder='Contraseña'
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Continuar</button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra el mensaje de error */}
                    {successMessage && <p className="success-message">{successMessage}</p>} {/* Muestra el mensaje de éxito */}
                    <p className="loginSignup-login" onClick={() => setState(state === "Login" ? "Signup" : "Login")}>
                        {state === "Login" ? "¿No tienes una cuenta? Regístrate" : "¿Ya tienes una cuenta registrada?"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShopSignup;