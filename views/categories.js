module.exports = (bookmarks) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../style.css" />
            <title>Categories</title>
        </head>

        <body>
            <header>
                <h1>Categories</h1>
            </header>
            <div>
                <h2>${bookmarks[0].category.name}</h2>
                <ul>
                    ${bookmarks.map((bookmark) =>
                        `
                            <li>
                                ${bookmark.name}
                            </li>
                        `
                    ).join("")}
                </ul>
            </div>
        </body>
        </html>
    `
};