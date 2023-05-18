const express = require('express');
const bookmarksHTML = require('../views/bookmarks');
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
        res.send(bookmarksHTML(bookmarks));
    } catch (error) {
        next(error);
    }
});

app.get('/', (req, res) => {
    res.redirect('/bookmarks');
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});