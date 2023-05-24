module.exports = (bookmarks, categories) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../style.css" />
            <title>Bookmarks</title>
        </head>
        <body>
            <header>
                <h1>Bookmarks</h1>
            </header>
            <div>
                <ul>
                    ${bookmarks.map((bookmark) => 
                    `
                        <li>
                            <a href="${bookmark.url}">${bookmark.name}</a> - <a href="/categories/${bookmark.categoryId}">${bookmark.category.name}</a>
                        </li>
                    `
                    ).join("")}
                </ul>
            </div>
            <form method='POST' action='/bookmarks'>
                <label for='bookmarkName'>Bookmark Name</label>
                <input name='bookmarkName' type='text'>
                <label for='url'>URL</label>
                <input name='url' type='text'>
                <label for='categoryName'>Category Name</label>
                <input name='categoryName' type='text'>
                <button>Submit</button>
            </form>
        </body>
        </html>
    `
}