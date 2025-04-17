import React, { useEffect, useState } from 'react';
import API from './Api';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [forceRefresh, setForceRefresh] = useState(false); // 🔄 clave

  /*
  const fetchUsers = async () => {
    try {
      const res = await API.get('/');
      setUsers(res.data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  };
*/

const fetchUsers = async () => {
  try {
    const res = await API.get('/');
    console.log('Usuarios actualizados:', res.data); // <-- LOG!
    setUsers(res.data);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
  }
};

  useEffect(() => {
    fetchUsers();
  }, [forceRefresh]); // ⬅️ importante: refresca al cambiar forceRefresh

  const createOrUpdateUser = async (user) => {
    try {
      if (user.id) {
        await API.put(`/${user.id}`, user);
      } else {
        await API.post('/', user);
      }
      setSelectedUser(null);
      setForceRefresh(prev => !prev); // ⬅️ truco para forzar useEffect
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/${id}`);
      setForceRefresh(prev => !prev);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };



  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD con React + Node.js + MySQL</h1>
      <UserForm onSubmit={createOrUpdateUser} selectedUser={selectedUser} />
       

      <UserList
  key={users.map(u => u.id).join('-')} // ⬅️ Fuerza re-render
  users={users}
  onEdit={handleEdit}
  onDelete={deleteUser}
/>

    </div>
  );
};

export default App;
