import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Book Management API is running 🚀');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
