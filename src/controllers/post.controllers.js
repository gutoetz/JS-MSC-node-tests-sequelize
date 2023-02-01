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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postServices.getPostById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(post);
};

const attPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content } = req.body;
    const mutedPost = await postServices.attPost({ content, title, id, userId });
    res.status(200).json(mutedPost);
  } catch (error) {
    // const err = JSON.parse(error.message);
    res.status(400).json({ message: 'err.message' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await postServices.deletePost({ id, userId });
    res.status(204).json();
  } catch (error) {
    const err = JSON.parse(error.message);
    res.status(err.status).json({ message: err.message });
  }
};

const searchQuery = async (req, res) => {
  const { query: { q } } = req;
  const searchPost = await postServices.searchQuery(q);
  res.status(200).json(searchPost);
};

module.exports = { deletePost, createPost, getAllPosts, getPostById, attPost, searchQuery };
