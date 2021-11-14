const fs = require("fs");
const ejsRenderFile = require("ejs").renderFile;

const buildPath = 'dist/pages';

if(!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

const oldFiles = fs.readdirSync(buildPath);
console.log(oldFiles);
oldFiles.forEach(file => {
   fs.unlink(`${buildPath}/${file}`, err => {
        if(err) return console.log(err);
    });
});

const pages = require(`./src/pages.json`);

pages.forEach(page => {

    ejsRenderFile(`src/main.ejs`, { page: page })
    .then(html => fs.writeFileSync(`dist/pages/${page.name}.html`, html))
    .catch(err => console.error(err));

});