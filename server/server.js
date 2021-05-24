const   express = require('express'),   
        website = express(),
        compression = require('compression'), 
        cors = require('cors'),
        isProduction = process.env.mode === 'production',
        urlRedirecter = require('./urlRedirecter'),
        pages = require('../src/pages.json');
        
if(isProduction){website.use(urlRedirecter)}        
website.use(compression());
website.use(cors());
website.use(express.static('dist',{maxage:'1y'}));

pages.forEach(page => {
    website.get(page.url, (req, res) => {
        if(page.url === '*') res.status(404);
        res.sendFile(`${page.name}.html`, {root: 'dist/pages'});
    });
});

website.listen(process.env.PORT || 8080, () => {
    console.log("toprepair.hu server has been started...");
});