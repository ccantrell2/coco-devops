
//we are in ES6, use this. 
import 'dotenv/config'; 
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { MongoClient , ServerApiVersion, ObjectId} from 'mongodb';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI;  
const myVar = 'injected from server'; // Declare your variable


app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

// Creates new Mongo Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connects to MongoDB
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run();


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))

})

// CREATE (Current Progress)
// Source Code: app2.js from class and https://www.mongodb.com/docs/drivers/node/current/crud/insert/
app.post('/api/current', async (req, res) => {
  try {
    const { date, Setname, BagNumber, completed } = req.body;

    // Simple validation
    if (!date || !Setname || BagNumber == undefined || completed == undefined) {
      return res.status(400).json({ error: 'Date, Name of set, Current and overall bag number are required' });
    }

    const db = client.db('cis486');
    const collection = db.collection('current');

    const currentProgress = {
      date,
      Setname,
      BagNumber,
      completed,
      createdAt: new Date()
    };
    const result = await db.collection('current').insertOne(currentProgress);

    res.status(201).json({
      message: 'Current progress created successfully',
      currentId: result.insertedId,
      current: { ...currentProgress, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create current progress: ' + error.message });
  }
});

// READ (Current Progress)
// Source Code: app2.js from class and https://www.mongodb.com/docs/drivers/node/current/crud/find/
app.get('/api/current', async (req, res) => {
  try {
    const db = client.db('cis486');
    const currentProgress = await db.collection('current').find({}).toArray();
    res.json(currentProgress); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current progress records: ' + error.message });
  }
});

// UPDATE (Current Progress)
// source code: app2.js from class and https://www.mongodb.com/docs/drivers/node/current/crud/update/#update-a-single-document-by-id
app.put('/api/current/:id', async (req, res) => {
  try {
    const db = client.db('cis486'); 
    const { id } = req.params;
    const { date, Setname, BagNumber, completed } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const updateData = { updatedAt: new Date() };
    if (date) updateData.date = date;
    if (Setname) updateData.Setname = Setname;
    if (BagNumber) updateData.BagNumber = BagNumber;
    if (completed) updateData.completed = completed;

    const result = await db.collection('current').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Current progress record not found' });
    }

    res.json({
      message: 'Current progress updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update current progress: ' + error.message });
  }
});

// DELETE (Current Progress)
// Source Code: app2.js from class and https://www.mongodb.com/docs/drivers/node/current/crud/delete/#delete-a-single-document-by-id
app.delete('/api/current/:id', async (req, res) => {
  try {
    const db = client.db('cis486');
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const result = await db.collection('current').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Current progress record not found' });
    }

    res.json({
      message: 'Current progress deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete current progress: ' + error.message });
  }
});

// CREATE (Wishlist)
app.post('/api/wishlist', async (req, res) => {
  try {
    const { SetWish, theme, pieces, price } = req.body;

    // Simple validation
    if (!SetWish || !theme || pieces == undefined || price == undefined) {
      return res.status(400).json({ error: 'Set Name, Theme, Number of Pieces, and Price are required' });
    }

    const db = client.db('cis486');
    const collection = db.collection('wishlist');

    const wishlistItem = {
      SetWish,
      theme,
      pieces,
      price,
    };
    const result = await db.collection('wishlist').insertOne(wishlistItem);

    res.status(201).json({
      message: 'Wishlist item added successfully',
      wishlistId: result.insertedId,
      wishlist: { ...wishlistItem, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create current progress: ' + error.message });
  }
});

// READ (Wishlist)
app.get('/api/wishlist', async (req, res) => {
  try {
    const db = client.db('cis486');
    const wishlistItems = await db.collection('wishlist').find({}).toArray();
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist items: ' + error.message });
  }
});

// UPDATE (Wishlist)
app.put('/api/wishlist/:id', async (req, res) => {
  try {
    const db = client.db('cis486');
    const { id } = req.params;
    const { SetWish, theme, pieces, price } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const updateData = { updatedAt: new Date() };
    if (SetWish) updateData.SetWish = SetWish;
    if (theme) updateData.theme = theme;
    if (pieces) updateData.pieces = pieces;
    if (price) updateData.price = price;

    const result = await db.collection('wishlist').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }

    res.json({
      message: 'Wishlist item updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update wishlist item: ' + error.message });
  }
});

// DELETE (Wishlist)
app.delete('/api/wishlist/:id', async (req, res) => {
  try {
    const db = client.db('cis486');
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid User ID' });
    }

    const result = await db.collection('wishlist').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }

    res.json({
      message: 'Wishlist item deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete wishlist item: ' + error.message });
  }
});


// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
