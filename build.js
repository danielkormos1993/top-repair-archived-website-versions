// HTML

const fs = require("fs");
const ejsRenderFile = require("ejs").renderFile;

const buildPath = 'client/pages';

if(!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

const oldFiles = fs.readdirSync(buildPath);

oldFiles.forEach(file => {
   fs.unlink(`${buildPath}/${file}`, err => {
        if(err) return console.log(err);
    });
});

const pages = require(`./src/pages.json`);

pages.forEach(page => {

    ejsRenderFile(`./src/main.ejs`, { page: page })
    .then(html => fs.writeFileSync(`${buildPath}/${page.name}.html`, html))
    .catch(err => console.error(err));

});