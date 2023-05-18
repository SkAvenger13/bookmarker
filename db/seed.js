const {db, Bookmark, Category} = require('./index');

const seed = async () => {
    try {
        await db.sync({force: true});
        const [search, coding, jobs] = await Promise.all([
            Category.create({name: 'search'}),
            Category.create({name: 'coding'}),
            Category.create({name: 'jobs'})
        ]);
        await Promise.all([
            Bookmark.create({name: 'Google', url: 'https://www.google.com/', categoryId: search.id}),
            Bookmark.create({name: 'Stack Overflow', url: 'https://stackoverflow.com/', categoryId: coding.id}),
            Bookmark.create({name: 'Bing', url: 'https://www.bing.com/', categoryId: search.id}),
            Bookmark.create({name: 'LinkedIn', url: 'https://www.linkedin.com/', categoryId: jobs.id}),
            Bookmark.create({name: 'Indeed', url: 'https://www.indeed.com/', categoryId: jobs.id}),
            Bookmark.create({name: 'MDN', url: 'https://developer.mozilla.org/en-US/', categoryId: coding.id}),
        ]);
        db.close();
    } catch (error) {
        db.close();
    }
};

seed();