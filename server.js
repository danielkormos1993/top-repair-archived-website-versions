const express = require('express');
const app = express();
const cors = require('cors');

//setup
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//base
app.get('/', (req,res)=>{
    res.render('layouts/layout.ejs', { page: 'index'});
});

app.listen(process.env.PORT || 3000, () => {
    console.log('TOP REPAIR Server has started successfully');
});