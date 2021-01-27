const { uuid } = require('uuidv4');

const Users = [];

module.exports = {
    index (request, response) {
        const { name } = request.query;
    
        const results = name 
            ? Users.filter(user => user.name.includes(name))
            : Users;
    
        return response.json(results); 
    },

    create (request, response) {
        const { name, age } = request.body;
    
        const users = { id: uuid(), name, age };
    
        Users.push(users);
    
        return response.json(users);
    },

    update (request, response) {
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
    },

    destroy (request, response) {
        const { id } = request.params;
    
        const userIndex = Users.findIndex(user => user.id === id);
    
        if (userIndex < 0) {
            return response.status(400).json({ error: 'Item not found.' });
        }
    
        Users.splice(userIndex, 1);
    
        return response.status(204).send();
    }
};

