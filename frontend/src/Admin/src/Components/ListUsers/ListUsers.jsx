import React, { useEffect, useState } from 'react';
import './ListUsers.css'; // Asegúrate de tener un archivo CSS para estilos
import cross_icon from '../../Assets/cross_icon.png'


const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null); // Manejo de errores

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:4000/allusers', {
                method: 'GET',
                headers: {
                    'x-auth-token': localStorage.getItem('authToken'), // Asegúrate de enviar el token
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener usuarios');
            }

            const data = await response.json();
            setUsers(data); // Establece los usuarios en el estado
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setError(error.message); // Establece el mensaje de error
        }
    };

    useEffect(() => {
        fetchUsers(); // Llama a la función para obtener usuarios
    }, []);

    const remove_user = async (id) =>{
        await fetch('http://localhost:4000/removeuser',{
          method: 'POST',
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({id:id})
      })
      await fetchUsers();
    }

    return (
        <div className='list-users'>
            <h1>Lista de Usuarios</h1>
            {error && <p className="error-message">{error}</p>} {/* Muestra el mensaje de error si existe */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Es Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Sí' : 'No'}</td>
                            <img onClick={() => { remove_user(user._id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListUsers;