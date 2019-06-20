const mongoose = require('mongoose');

const Post = require('/home/thirumalainambi/NODE-JS-BLOG/database /models/Post.js');

mongoose.connect('mongodb://localhost/node-js-test-blog');

//Create
Post.create(
  {
    title: 'My Second Blog',
    description: 'Second Blog Description',
    content: 'My Second Blog Contents.'
  },
  (error, post) => {
    console.log(error, post);
  }
);

// //Read
// Post.find(
//   {
//     title: 'My Second Blog'
//   },
//   (error, posts) => {
//     console.log(error, posts);
//   }
// );

Post.findByIdAndUpdate(
  '5d0af834ff58ba36c620e71d',
  {
    title: 'My Updated Second BLooooggg'
  },
  (error, post) => {
    console.log(error, post);
  }
);

// Post.findById('5d0af834ff58ba36c620e71d', (error, post) => {
//   console.log(error, post);
// });
