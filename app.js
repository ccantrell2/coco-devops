import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

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
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
run();

// JWT authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Access token required',
      message: 'You must be logged in to access this resource'
    });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: 'Invalid or expired token',
        message: 'Please log in again'
      });
    }

    req.user = user;
    next();
  });
}

// Default route goes to login page
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'login.html'));
});

// =========================
// AUTH ROUTES
// =========================

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const db = client.db('legoList');
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Must have a Username and Password to enter' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password has to be 6 characters in length' });
    }

    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await db.collection('users').insertOne(user);

    console.log(`New user registered: ${username}`);

    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertedId,
      username: username
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: 'Failed to register user: ' + error.message });
  }
});

// Login existing user
app.post('/api/auth/login', async (req, res) => {
  try {
    const db = client.db('legoList');
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Must have a Username and Password to enter' });
    }

    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const payload = {
      userId: user._id.toString(),
      username: user.username
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

    console.log(`User logged in: ${username}`);

    res.json({
      message: 'Login successful',
      token: token,
      user: { id: user._id, username: user.username }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Failed to login: ' + error.message });
  }
});

// Get current logged-in user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const db = client.db('legoList');

    const user = await db.collection('users').findOne(
      { _id: new ObjectId(req.user.userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user info: ' + error.message });
  }
});

// =========================
// CURRENT PROGRESS ROUTES
// =========================

// CREATE current progress
app.post('/api/current', authenticateToken, async (req, res) => {
  try {
    const { date, Setname, BagNumber, completed } = req.body;

    if (!date || !Setname || BagNumber == undefined || completed == undefined) {
      return res.status(400).json({ error: 'Date, Name of set, Current and overall bag number are required' });
    }

    const db = client.db('legoList');

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

// READ current progress
app.get('/api/current', authenticateToken, async (req, res) => {
  try {
    const db = client.db('legoList');
    const currentProgress = await db.collection('current').find({}).toArray();
    res.json(currentProgress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current progress records: ' + error.message });
  }
});

// UPDATE current progress
app.put('/api/current/:id', authenticateToken, async (req, res) => {
  try {
    const db = client.db('legoList');
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

// DELETE current progress
app.delete('/api/current/:id', authenticateToken, async (req, res) => {
  try {
    const db = client.db('legoList');
    const { id } = req.params;

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

// =========================
// WISHLIST ROUTES
// =========================

// CREATE wishlist item
app.post('/api/wishlist', authenticateToken, async (req, res) => {
  try {
    const { SetWish, theme, pieces, price } = req.body;

    if (!SetWish || !theme || pieces == undefined || price == undefined) {
      return res.status(400).json({ error: 'Set Name, Theme, Number of Pieces, and Price are required' });
    }

    const db = client.db('legoList');

    const wishlistItem = {
      SetWish,
      theme,
      pieces,
      price,
      createdAt: new Date()
    };

    const result = await db.collection('wishlist').insertOne(wishlistItem);

    res.status(201).json({
      message: 'Wishlist item added successfully',
      wishlistId: result.insertedId,
      wishlist: { ...wishlistItem, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create wishlist item: ' + error.message });
  }
});

// READ wishlist
app.get('/api/wishlist', authenticateToken, async (req, res) => {
  try {
    const db = client.db('legoList');
    const wishlistItems = await db.collection('wishlist').find({}).toArray();
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist items: ' + error.message });
  }
});

// UPDATE wishlist
app.put('/api/wishlist/:id', authenticateToken, async (req, res) => {
  try {
    const db = client.db('legoList');
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

// DELETE wishlist
app.delete('/api/wishlist/:id', authenticateToken, async (req, res) => {
  try {
    const db = client.db('legoList');
    const { id } = req.params;

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

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});