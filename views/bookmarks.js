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
                            <a href="${bookmark.url}">${bookmark.name}</a> - ${bookmark.category.name}
                        </li>
                    `
                    ).join("")}
                </ul>
            </div>
            <div>
                <form id="categoryform">
                </form>
                <select id="categories" form="categoryform">
                    <option value="all">all</option>
                    ${categories.map((category) =>
                        `
                            <option value="${category.name}">${category.name}</option>
                        `
                    )}
                </select>
            </div>
        </body>
        </html>
    `
}