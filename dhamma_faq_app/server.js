const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

const app = express();
const port = 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL_NAME = process.env.OPENAI_API_MODEL_NAME;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: MODEL_NAME,
      prompt: prompt,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).send('Error generating text');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
