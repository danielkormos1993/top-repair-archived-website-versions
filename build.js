const fs = require("fs");
const ejsRenderFile = require("ejs").renderFile;

fs.readdir('dist', (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        if(file != 'cdn') fs.rmSync(`dist/${file}`, {recursive: true});
    });
});

const pages = require('./src/pages.json');

pages.forEach(page => {

    if(page.url.length === 1) page.folder = '';
    else page.folder = `${page.url.substring(1)}/`;

    const folder = page.folder.slice(0, -1);

    ejsRenderFile(`src/main.ejs`, { page: page })
    .then(layoutContent => {
        if(!fs.existsSync(`dist/${folder}`)) fs.mkdirSync(`dist/${folder}`);
        if(page.name != '404') fs.writeFileSync(`dist/${page.folder}index.html`, layoutContent);
        else fs.writeFileSync(`dist/404.html`, layoutContent);
        
    })
    .catch(err => console.error(err));

});