const db = require("../config/db");

exports.toggleLike = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM likes WHERE user_id = ? AND post_id = ?", [
        userId,
        postId,
      ]);

    if (rows.length > 0) {
      await db
        .promise()
        .query("DELETE FROM likes WHERE user_id = ? AND post_id = ?", [
          userId,
          postId,
        ]);
      return res.json({ message: "Post unliked" });
    } else {
      await db
        .promise()
        .query("INSERT INTO likes (user_id, post_id) VALUES (?, ?)", [
          userId,
          postId,
        ]);
      return res.json({ message: "Post liked" });
    }
  } catch (error) {
    console.error("Like error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLikeInfo = async (req, res) => {
  const userId = req.user.id;
  const postId = parseInt(req.params.postId);

  try {
    const [likeRow] = await db
      .promise()
      .query("SELECT 1 FROM likes WHERE user_id = ? AND post_id = ?", [
        userId,
        postId,
      ]);

    const [likedUsers] = await db.promise().query(
      `SELECT users.id, users.username, users.email
       FROM likes
       JOIN users ON likes.user_id = users.id
       WHERE likes.post_id = ?`,
      [postId]
    );

    const isLiked = likeRow.length > 0;

    res.json({ isLiked, likedBy: likedUsers });
  } catch (error) {
    console.error("getLikeInfo error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
