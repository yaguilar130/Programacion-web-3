import React, { useEffect, useState } from 'react';

const UserForm = ({ onSubmit, selectedUser }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser({ name: '', email: '' });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email) return;
    await onSubmit(user); // esperar a que el padre actualice todo
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={user.name}
        placeholder="Nombre"
        onChange={handleChange}
      />
      <input
        name="email"
        value={user.email}
        placeholder="Correo"
        onChange={handleChange}
      />
      <button type="submit">{user.id ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default UserForm;
