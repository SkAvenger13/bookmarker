const express = require('express');
const bookmarksHTML = require('../views/bookmarks');
const categoriesHTML = require('../views/categories');
const {Bookmark, Category} = require('../db/index');
const override = require("method-override");

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(override("_method"));

app.get('/bookmarks', async (req, res, next) => {
    try {
        const bookmarks = await Bookmark.findAll({
            attributes: ['id', 'name', 'url', 'categoryId'],
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
        res.status(500).json({message: "Failed to access database.", error});
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
        res.status(500).json({message: "Failed to access category.", error});
    }
});

app.post('/bookmarks', async (req, res, next) => {
    try {
        const {bookmarkName, url, categoryName} = req.body;
        let [category] = await Category.findAll({
            where: {name: `${categoryName}`}
        });
        if (category) {
            await Bookmark.create({name: `${bookmarkName}`, url: `${url}`, categoryId: `${category.id}`});
        }
        else {
            category = await Category.create({name: `${categoryName}`});
            await Bookmark.create({name: `${bookmarkName}`, url: `${url}`, categoryId: `${category.id}`});
        }
        res.redirect(`/categories/${category.id}`);
    } catch (error) {
        next(error);
        res.status(500).json({message: "Failed to add to database.", error});
    }
});

app.delete('/bookmarks/:id', async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findByPk(req.params.id);
        if (bookmark) {
            bookmark.destroy();
        }
        res.redirect('/');
    } catch (error) {
        next(error);
        res.status(500).json({message: "Failed to delete from database.", error});
    }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});