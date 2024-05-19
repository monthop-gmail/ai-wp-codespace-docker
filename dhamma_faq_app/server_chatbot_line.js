const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { Client, middleware } = require('@line/bot-sdk');
const path = require('path');
require('dotenv').config();  // โหลดค่า environment variables จากไฟล์ .env

const app = express();
const port = 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL_NAME = process.env.OPENAI_API_MODEL_NAME;

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new Client(config);

app.use(bodyParser.json());
app.use(middleware(config));

async function generateResponse(prompt) {
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
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating text:', error);
    return 'Sorry, I could not process your request.';
  }
}

app.post('/webhook', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const userMessage = event.message.text;
  const replyMessage = await generateResponse(userMessage);

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyMessage
  });
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
