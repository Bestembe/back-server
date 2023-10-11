const Openai = require('openai');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8888;

app.use(cors());
app.use(express.json());
const OPEN_API_KEY = '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';

const openai = new Openai({
  apiKey: OPEN_API_KEY
});

async function main(message) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'gpt-4',
  });

  return chatCompletion.choices
}

app.post('/sendmessage', (req, res) => {
  const { message } = req.body;
  // console.log(message)
  main(message).then(response => {
    console.log(response)
    const content = response[0].message?.content;
    if (content) {
      res.send({ originmessage: message, 'content': content })
    }
  })
})
// main().then(e => console.log(e));


app.listen(port, e => {
  console.log(`Server is running on port ${port}`);
});