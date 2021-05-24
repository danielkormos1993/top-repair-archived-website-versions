const fs = require("fs");
const ejsRenderFile = require("ejs").renderFile;

fs.rmdirSync('dist/pages', {recursive: true});

const pages = require('./pages.json');

pages.forEach(page => {

    ejsRenderFile(`src/main.ejs`, { page: page })
    .then(html => fs.writeFileSync(`dist/pages/${page.name}.html`, html))
    .catch(err => console.error(err));

});