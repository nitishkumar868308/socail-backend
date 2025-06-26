const db = require('../config/db');

exports.createPost = async (req, res) => {
  const userId = req.user.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Post content is required' });
  }

  try {
    await db.promise().query(
      'INSERT INTO posts (user_id, content) VALUES (?, ?)',
      [userId, content]
    );
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Create post error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const [posts] = await db.promise().query(
      `SELECT posts.*, users.username 
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       ORDER BY posts.created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
