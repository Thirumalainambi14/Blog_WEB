const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = new express();
const Post = require('/home/thirumalainambi/Backup of projects/NODE-JS-BLOG/database /models/Post.js');
mongoose.connect('mongodb://localhost/node-js-blog', { useNewUrlParser: true });

app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const posts = await Post.find({});

  console.log(posts);

  res.render('index', {
    posts
  });
});

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post
  });
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

// app.post('/posts/store', (req, res) => {
//   console.log(req.body);
//   res.redirect('/');
// });

app.post('/posts/store', (req, res) => {
  const { image } = req.files;

  image.mv(path.resolve(__dirname, 'public/posts', image.name), error => {
    Post.create(
      {
        ...req.body,
        image: `/posts/${image.name}`
      },
      (error, post) => {
        res.redirect('/');
      }
    );
  });
});

app.get('/index.html', (req, res) => {
  res.render('index');
});

app.get('/about.html', (req, res) => {
  res.render('about');
});

app.get('/contact.html', (req, res) => {
  res.render('contact');
});

app.get('/post.html', (req, res) => {
  res.render('post');
});

app.listen(4100, () => {
  console.log('App listening on port 4000');
});
