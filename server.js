const express = require('express');
const app = express();
const cors = require('cors');

// setup
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// data
const pages = require('./public/cdn/data/pages.json');
const contactData = require('./public/cdn/data/contact.json');
const reviews = require('./public/cdn/data/reviews.json');

const isProduction = process.env.mode === 'production';

app.use(function(req, res, next){
    res.locals.contactData = contactData;
    res.locals.reviews = reviews;
    res.locals.isProduction = isProduction;
    res.locals.hostUrl = isProduction ? 'https://toprepair.hu' : 'http://192.168.0.101:3000';
    res.locals.pages = pages;
    next();
});

// routes
app.get('/', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'index'});
});

app.get('/jegkarjavitas', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'hdr'});
});

app.get('/jegkarjavitas/cascojegkar', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'hdr_casco'});
});

app.get('/jegkarjavitas/nemcascojegkar', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'hdr_nemcasco'});
});

app.get('/horpadasjavitas', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'pdr'});
});

app.get('/pdrtechnologia', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'technology'});
});

app.get('/munkaink', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'works'});
});

app.get('/rolunk', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'aboutus'});
});

app.get('/gyik', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'faq'});
});

app.get('/kapcsolat', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'contact'});
});

app.get('/adatvedelem', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'pp'});
});

app.get('*', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'notfound'});
});

app.listen(process.env.PORT || 3000, () => {
    console.log('TOP REPAIR Server has started successfully');
});