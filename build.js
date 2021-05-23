const fs = require("fs");
const ejsRenderFile = require("ejs").renderFile;

fs.rmdirSync('dist', { recursive: true });
fs.mkdirSync('dist');

const pages = require('src/data/pages.json');

pages.forEach(page => {

    if(page.url.length === 1) page.folder = '';
    else page.folder = `${page.url.substring(1)}/`;

    const folder = page.folder.slice(0, -1);

    ejsRenderFile(`./views/layouts/layout.ejs`, { page: page })
    .then(layoutContent => {
        if(!fs.existsSync(`dist/${folder}`)) fs.mkdirSync(`dist/${folder}`);
        fs.writeFileSync(`dist/${page.folder}index.html`, layoutContent);
    })
    .catch(err => console.error(err));

});