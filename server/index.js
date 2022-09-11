const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const {
  getCompliment,
  getFortune,
  getGifs,
  createGif,
  deleteGif,
  editGif,
} = require('./controller');

app.get('/api/compliment', getCompliment);
app.get('/api/fortune', getFortune);
app.get('/api/gifs', getGifs);
app.post('/api/gifs', createGif);
app.delete('/api/gifs/:id', deleteGif);
app.put('/api/gifs/:id', editGif);

app.listen(4000, () => console.log('Server running on 4000'));
