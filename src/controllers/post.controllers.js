const postServices = require('../services/post.services');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const newPost = await postServices.createPost({
      title,
      content,
      categoryIds,
      userId: id,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  const allPosts = await postServices.getAllPosts();
  res.status(200).json(allPosts);
};

module.exports = { createPost, getAllPosts };
