const express = require('express');
const app = express();
const port = 3001;

const data = [
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
    res.send(data);
});

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${data.length} people <br><br> ${new Date()}`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
