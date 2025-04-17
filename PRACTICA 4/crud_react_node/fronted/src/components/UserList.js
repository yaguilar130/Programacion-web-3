import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
    console.log('Renderizando UserList con usuarios:', users); // <-- LOG
  
    return (
      <div>
        <h2>Listado de Usuarios</h2>
        {users.length === 0 && <p>No hay usuarios aún.</p>}
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} - {u.email}
              <button onClick={() => onEdit(u)}>Editar</button>
              <button onClick={() => onDelete(u.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
export default UserList;


  