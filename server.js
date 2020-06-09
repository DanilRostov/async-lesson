const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const calculations = {
  workingHours: 124,
  paymentPerHour: 20,
  workingDays: 18,
};

const benefits = {
  premium: 450,
  vacation: 30,
}

app.use(cors());

app.get('/', (req, res) => res.send('Server is alive'));

app.get('/calculations', (req, res) => {
  setTimeout(() => res.json(calculations), 3000);
});

app.get('/benefits', (req, res) => {
  setTimeout(() => res.json(benefits), 2000);
});

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))