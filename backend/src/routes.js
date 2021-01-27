const { Router } = require('express');
const { uuid } = require('uuidv4');

const routes = Router();

const Users = [];

routes.get('/users', (request, response) => {
    const { name } = request.query;

    const results = name 
        ? Users.filter(user => user.name.includes(name))
        : Users;

    return response.json(results); 
});

routes.post('/users', (request, response) => {
    const { name, age } = request.body;

    const users = { id: uuid(), name, age };

    Users.push(users);

    return response.json(users);
});

routes.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const { name, age} = request.body;

    const userIndex = Users.findIndex(user => user.id === id);

    if (userIndex < 0) {
        return response.status(400).json({ error: 'User not found.' });
    }

    const user = {
        id,
        name,
        age
    };    

    Users[userIndex] = user;
    
    return response.json(user);
});

routes.delete('/users/:id', (request, response) => {
    const { id } = request.params;

    const userIndex = Users.findIndex(user => user.id === id);

    if (userIndex < 0) {
        return response.status(400).json({ error: 'Item not found.' });
    }

    Users.splice(userIndex, 1);

    return response.status(204).send();
});

module.exports = routes;