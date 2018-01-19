const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log +'\n', (err) => {
       if (err) {
           console.log('Unable to append to server.log...');
       }
   })
   next();
})

// use this when updating site
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle:'Node Testing Ground',
        welcomeMessage:'Welcome to Node Testing Ground. The place to test Node capabilities.'
    })
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:'About Page'
    });
})
app.get('/bad', (req, res) => {
    res.send({"Error":"Unable to process request"})
})

app.use(express.static(__dirname+'/public'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});