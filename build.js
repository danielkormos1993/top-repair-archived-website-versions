﻿const fs = require("fs");
const ejsRenderFile = require("ejs").renderFile;

if(!fs.existsSync('dist/pages')) return console.error('dist/pages folder must be created manually. Exited.');

fs.rmSync(`dist/pages`, {force: true, recursive: true});
fs.mkdirSync('dist/pages'); //lol

const pages = require(`./src/pages.json`);

pages.forEach(page => {

    ejsRenderFile(`src/main.ejs`, { page: page })
    .then(html => fs.writeFileSync(`dist/pages/${page.name}.html`, html))
    .catch(err => console.error(err));

});