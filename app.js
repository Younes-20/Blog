
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const app = express();




// connect to mongodb
const dbURI = 'mongodb+srv://Youness:PCi6PUbNATxBK392@cluster0.pqfre.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));



//register view engine
app.set('view engine', 'ejs');



// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev')); // logging details of every request
app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res) => {
    // redirect the user to blogs page
    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    // send the rendered view to the client
    res.render('about', { title: 'About' });
});



// blog routes
app.use(blogRoutes);



// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page not found' });
});


