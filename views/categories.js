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
                <h2>${bookmarks[0].category.name}</h2>
            </header>
            <div>
                <ul>
                    ${bookmarks.map((bookmark) =>
                        `
                            <li>
                                ${bookmark.name}
                            </li>
                            <form method='POST' action='/bookmarks/${bookmark.id}?_method=DELETE'><button>X</button></form>
                        `
                    ).join("")}
                </ul>
            </div>
            <div>
            <button type="button" id ="back"><a href="/bookmarks">Back</a></button>
            </div>
        </body>
        </html>
    `
};