import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json()); 

// middlewares aka endpoints aka 'get to slash' {http verb} to slash {your name your endpoint}
app.post('/', (req, res) => {
  //res.send('Hello World');// string 
  //res.sendFile('index.html'); // doesn't work without import
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

app.get('/api/json', (req, res) =>{
  const myVar = 'Hello from server!';
  res.json({ myVar });
})

app.get('/api/body', (req, res) => {
  console.log("client request with body", req.body);
  console.log("client request with body:", req.body.name); 
  res.json({"name": req.body.name});
});

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})