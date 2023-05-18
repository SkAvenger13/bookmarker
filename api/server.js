const express = require('express');
const bookmarksHTML = require('../views/bookmarks');
const categoriesHTML = require('../views/categories');
const {Bookmark, Category} = require('../db/index');

const app = express();

app.get('/bookmarks', async (req, res, next) => {
    try {
        const bookmarks = await Bookmark.findAll({
            attributes: ['id', 'name', 'url'],
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name']
                }
            ]
        });
        const categories = await Category.findAll({
            attributes: ['id', 'name']
        })
        res.send(bookmarksHTML(bookmarks, categories));
    } catch (error) {
        next(error);
    }
});

app.get('/', (req, res) => {
    res.redirect('/bookmarks');
});

app.get('/categories/:id', async (req, res, next) => {
    try {
        const bookmarks = await Bookmark.findAll({
            where: {categoryId: req.params.id},
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name']
                }
            ]
        });
        res.send(categoriesHTML(bookmarks));
    } catch (error) {
        next(error);
    }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});