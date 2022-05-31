const express = require('express');
const app = express();
const PORT = 8000;

const todos = [
    { task: 'Köp kaffe' },
    { task: 'Köp kaka' },
    { task: 'Brygg kaffe' },
    { task: 'Drick kaffe' }
];

const apiKeys = [
    '7BTxHCyHhzIME5TI',
    'ngfeNG1iaq9Q2PJK',
    'zaCmZA74PLKCrD8Y',
    'KwOi5vm2TYNmi8Dd',
    'edVCa1E6zDZRztaq'
];

// Vår middleware går alltid in hit innan den går in i en endpoint nedan
function auth(request, response, next) {
    console.log('----I middleware----');
    console.log(`Middleware: ${request.url}`);
    console.log(`API key: ${JSON.stringify(request.headers['api-key'])}`);
    const apiKey = request.headers['api-key'];

    if (apiKey && apiKeys.includes(apiKey) ) {
        next(); // Kör vidare till vald endpoint i request.url
    } else {
        const resObj = {
            error: 'Access denied! I find your lack of API-key disturbing!'
        }

        response.json(resObj);
    }
}

//app.use(auth); // Detta gör att vår auth - funktion körs innan alla endpoints

app.get('/api/todo', auth, (request, response) => {
    console.log('----I /api/todo----');
    const resObj = {
        todos: todos
    }

    response.json(resObj);
});

app.post('/api/todo', auth, (request, response) => {
    console.log('I post /api/todo');
});

app.get('/api/key', (request, response) => {
    console.log('----I /api/key----');
    const index = Math.floor(Math.random() * apiKeys.length);
    const apiKey = apiKeys[index];

    const resObj = {
        key: apiKey
    }

    response.json(resObj);
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});