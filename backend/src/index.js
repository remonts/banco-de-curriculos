const express = require('express');
const { uuid } = require('uuidv4');

const app = express();
app.use(express.json());

const myApis = [];

app.get('/api', (request, response) => {
    //const { title, owner } = request.query;

    //console.log(title);
    //console.log(owner);

    return response.json(myApis);
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
        return response.status(400).json({ error: 'Project not found.' });
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
    return response.json([
        'Usuário 2',
        'Usuário 3',
    ]);
});

app.listen(3333, () =>{
    console.log('Back-end started! 🙌️');
});