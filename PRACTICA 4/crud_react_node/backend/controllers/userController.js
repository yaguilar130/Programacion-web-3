const User = require('../models/userModel');

exports.getUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  User.create(newUser, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Usuario creado');
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  User.update(id, updatedData, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Usuario actualizado');
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.delete(id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Usuario eliminado');
  });
};
