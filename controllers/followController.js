const db = require("../config/db");

exports.toggleFollow = async (req, res) => {
  const followerId = req.user.id;
  const followingId = parseInt(req.params.userId);

  if (followerId === followingId) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT * FROM follows WHERE follower_id = ? AND following_id = ?",
        [followerId, followingId]
      );

    if (rows.length > 0) {
      await db
        .promise()
        .query(
          "DELETE FROM follows WHERE follower_id = ? AND following_id = ?",
          [followerId, followingId]
        );
      return res.json({ message: "Unfollowed user" });
    } else {
      await db
        .promise()
        .query(
          "INSERT INTO follows (follower_id, following_id) VALUES (?, ?)",
          [followerId, followingId]
        );
      return res.json({ message: "Followed user" });
    }
  } catch (error) {
    console.error("Follow error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyFollowersFollowing = async (req, res) => {
  const currentUserId = req.user.id;

  try {
    const [followers] = await db.promise().query(
      `SELECT users.id, users.username, users.email
         FROM follows
         JOIN users ON follows.follower_id = users.id
         WHERE follows.following_id = ?`,
      [currentUserId]
    );

    const [following] = await db.promise().query(
      `SELECT users.id, users.username, users.email
         FROM follows
         JOIN users ON follows.following_id = users.id
         WHERE follows.follower_id = ?`,
      [currentUserId]
    );

    res.json({
      followers,
      following,
    });
  } catch (error) {
    console.error("getMyFollowersFollowing error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
