const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const port = 3001;

let phonebookData = [
      {
        "name": "Hermione Granger",
        "number": "39-07592385",
        "id": 1
      },
      {
        "name": "Ron Wisley",
        "number": "89-34589236",
        "id": 2
      },
      {
        "name": "Harry Potter",
        "number": "829-1095209",
        "id": 3
      },
      {
        "name": "Severus Snape",
        "number": "81-81095392",
        "id": 4
      }
    ];

app.get('/api/persons', (req, res) => {
    res.send(phonebookData);
});

app.get('/api/persons/:id', (req, res) => {
    
    const id = Number(req.params.id);
    let phonebookIds = [];

    // fetch single phonebook entry based on id
    phonebookData.map(contact => {
        phonebookIds.push(contact.id);

        if (contact.id === id) {
            res.send(contact);
        }
    });

    // if id is not found, respond with appropriate status code
    if (!phonebookIds.includes(id)) {
        res.status(404).end();
    }
    
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebookData = phonebookData.filter(contact => contact.id !== id);
    res.status(204).end();
});

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${phonebookData.length} people <br><br> ${new Date()}`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
