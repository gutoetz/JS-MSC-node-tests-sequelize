const { Category } = require('../models');

const createCategory = async (name) => {
    if (!name) return new Error();
    const newCategory = await Category.create(name);
    const { id } = newCategory.dataValues;
    const createdCategory = {
        id, ...name,
    };
    return createdCategory;
};

const getAllCategories = async () => {
    const allCategories = await Category.findAll();
    return allCategories;
};

module.exports = { createCategory, getAllCategories };