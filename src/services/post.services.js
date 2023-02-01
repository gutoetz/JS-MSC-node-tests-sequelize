const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const postSchema = async ({ title, content, categoryIds }) => {
  if (!title || !content) return new Error('Some required fields are missing');
  if (!categoryIds) return new Error('one or more "categoryIds" not found');
  const validateCategory = categoryIds.map((e) =>
    Category.findOne({ where: { id: e } }));
  const resolvedPromises = await Promise.all(validateCategory);
  if (resolvedPromises.includes(null)) { return new Error('one or more "categoryIds" not found'); }
};

const changingPostSchema = async ({ content, title, id, userId }) => {
  if (!content || !title) {
 return new Error(JSON.stringify({
    status: 400,
    message: 'Some required fields are missing',
  })); 
} 

const post = await BlogPost.findOne({ where: { id } });
if (post.userId !== userId) {
  return new Error(JSON.stringify({
    status: 401,
    message: 'Unauthorized user',
  }));
}
};

const createPost = async ({ title, content, categoryIds, userId }) => {
  const error = await postSchema({ title, content, categoryIds });
  if (error) throw new Error(error.message);
  const newPost = await BlogPost.create({ title, content, userId });
  await PostCategory.bulkCreate(
    categoryIds.map((e) => ({ postId: newPost.id, categoryId: e })),
  );
  return newPost;
};

const deletingSchema = async ({ id, userId }) => {
  const checkingPost = await BlogPost.findOne({ where: { id } });
  if (!checkingPost) {
    const error = {
      status: 404,
      message: 'Post does not exist',
    };
    return new Error(JSON.stringify(error));
  }
  if (checkingPost.userId !== userId) {
    const error = {
      status: 401,
      message: 'Unauthorized user',
    };
    return new Error(JSON.stringify(error));
  }
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return allPosts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const attPost = async ({ content, title, id, userId }) => {
  const error = await changingPostSchema({ content, title, id, userId });
  if (error) throw new Error(error);
  const changingPost = await BlogPost.update({ content, title }, { where: { id } });
  if (changingPost[0]) {
    const changedPost = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exlude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return changedPost;
  }
};

const deletePost = async ({ id, userId }) => {
  const error = await deletingSchema({ id, userId });
  if (error) throw new Error(error.message);
  await BlogPost.destroy({ where: { id } });
};

const searchQuery = async (q) => {
  console.log(q);
  if (!q) return getAllPosts();
  const searchByTitle = await BlogPost.findAll({
    where: { title: { [Op.substring]: q } },
    include: [
      { model: User, as: 'user', attributes: { exlude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
   if (searchByTitle.length > 0) return searchByTitle;
  const searchByContent = await BlogPost.findAll({
    where: { content: { [Op.substring]: q } },
    include: [
      { model: User, as: 'user', attributes: { exlude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  }); return searchByContent;
};

module.exports = { createPost, getAllPosts, getPostById, attPost, deletePost, searchQuery };
