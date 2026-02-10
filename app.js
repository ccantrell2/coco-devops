import 'dotenv/config';
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { MongoClient , ServerApiVersion} from 'mongodb';

//const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI; 
const myVar = 'Injected from server';

app.use(express.static(join(__dirname, 'public')));
app.use(express.json()); 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// middlewares aka endpoints aka 'get to slash' {http verb} to slash {your name your endpoint}
app.get('/', (req, res) => {
<<<<<<< HEAD
  res.send('Hello World')
=======
  //res.send('Hello World');// string 
  //res.sendFile('index.html'); // doesn't work without import
  res.sendFile(join(__dirname, 'public', 'index.html'))
>>>>>>> origin/dev
})

app.get('/inject', (req, res) => {
  readFile(join(__dirname, 'public', 'inject.html'), 'utf8')
    .then(html => {
      const injectedHtml = html.replace('{{myVar}}', myVar);
      res.send(injectedHtml);
    })
    .catch(err => {
      res.status(500).send('Error loading page');
    });
});

app.get('/api/json', (req, res) =>{
  const myVar = 'Hello from server!';
  res.json({ myVar });
});

app.get('/api/query', (req, res) => {
  console.log("client request with query param:", req.query.name); 
  res.json({"message": req.query.name});
});

app.get('/api/url/:legos', (req, res) => {
  console.log("client request with url param:", req.params.legos); 
  res.json({"message": `Hi, ${req.params.legos}. How are you?`});
});

app.post('/api/body', (req, res) => {
  // console.log("the body:", req.body);
  console.log("client request with body:", req.body.name); 
  res.json({"message": req.body.name});
});

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
