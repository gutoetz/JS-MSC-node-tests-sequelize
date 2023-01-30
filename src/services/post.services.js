const { BlogPost, PostCategory, User, Category } = require('../models');

const postSchema = async ({ title, content, categoryIds }) => {
  if (!title || !content) return new Error('Some required fields are missing');
  if (!categoryIds) return new Error('one or more "categoryIds" not found');
  const validateCategory = categoryIds.map((e) =>
    Category.findOne({ where: { id: e } }));
  const resolvedPromises = await Promise.all(validateCategory);
  console.log(resolvedPromises);
  if (resolvedPromises.includes(null)) { return new Error('one or more "categoryIds" not found'); }
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

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] }},
    ],
  });
  return allPosts;
};

module.exports = { createPost, getAllPosts };
