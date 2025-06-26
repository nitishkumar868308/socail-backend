const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');
const followRoutes = require('./routes/followRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', likeRoutes); 
app.use('/api/users', followRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
