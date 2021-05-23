const express = require('express');
const server = express();
const cors = require('cors');

// setup
server.use(cors());
server.use(express.static(__dirname + '/public'));

// routes
server.get('/', (req,res)=>{
    res.sendFile('index.html', {root: 'public/pages'});
});

server.get('/jegkarjavitas', (req,res)=>{
    res.sendFile('hdr.html', {root: 'public/pages'});
});

server.get('/jegkarjavitas/cascojegkar', (req,res)=>{
    res.sendFile('hdr_casco.html', {root: 'public/pages'});
});

server.get('/jegkarjavitas/nemcascojegkar', (req,res)=>{
    res.sendFile('hdr_nemcasco.html', {root: 'public/pages'});
});

server.get('/horpadasjavitas', (req,res)=>{
    res.sendFile('pdr.html', {root: 'public/pages'});
});

server.get('/pdrtechnologia', (req,res)=>{
    res.sendFile('technology.html', {root: 'public/pages'});
});

server.get('/munkaink', (req,res)=>{
    res.sendFile('works.html', {root: 'public/pages'});
});

server.get('/rolunk', (req,res)=>{
    res.sendFile('aboutus.html', {root: 'public/pages'});
});

server.get('/gyik', (req,res)=>{
    res.sendFile('faq.html', {root: 'public/pages'});
});

server.get('/kapcsolat', (req,res)=>{
    res.sendFile('contact.html', {root: 'public/pages'});
});

server.get('/adatvedelem', (req,res)=>{
    res.sendFile('pp.html', {root: 'public/pages'});
});

server.get('*', (req,res)=>{
    res.sendFile('notfound.html', {root: 'public/pages'});
});

server.listen(process.env.PORT || 3000, () => {
    console.log('TOP REPAIR Server has started successfully');
});