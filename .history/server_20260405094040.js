import express from 'express';
import models from './src/modelData/models.js';

const app = express();
const PORT = 3000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API endpoints
app.get('/test/info', (req, res) => {
  res.json(models.schemaInfo());
});

app.get('/user/list', (req, res) => {
  res.json(models.userListModel());
});

app.get('/user/:id', (req, res) => {
  const user = models.userModel(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.get('/photosOfUser/:id', (req, res) => {
  const photos = models.photoOfUserModel(req.params.id);
  res.json(photos);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

