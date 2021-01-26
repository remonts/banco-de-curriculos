const express = require('express');
const { uuid } = require('uuidv4');

const app = express();
app.use(express.json());

const myApis = [];

app.get('/api', (request, response) => {
    const { name } = request.query;

    const results = name 
        ? myApis.filter(api => api.name.includes(name))
        : myApis;

    return response.json(results); 
});

app.post('/api', (request, response) => {
    const { name, age} = request.body;

    const api = { id: uuid(), name, age };

    myApis.push(api);

    return response.json(api);
});

app.put('/api/:id', (request, response) => {
    const { id } = request.params;
    const { name, age} = request.body;

    const apiIndex = myApis.findIndex(api => api.id === id);

    if (apiIndex < 0) {
        return response.status(400).json({ error: 'Item not found.' });
    }

    const api = {
        id,
        name,
        age
    };    

    myApis[apiIndex] = api;
    
    return response.json(api);
});

app.delete('/api/:id', (request, response) => {
    const { id } = request.params;

    const apiIndex = myApis.findIndex(api => api.id === id);

    if (apiIndex < 0) {
        return response.status(400).json({ error: 'Item not found.' });
    }

    myApis.splice(apiIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () =>{
    console.log('Back-end started! 🙌️');
});