const express = require('express');
const {monitorEventLoopDelay} = require("perf_hooks");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');
const Post = require("./models/post");

const app = express();
app.use(cors());
mongoose.connect("mongodb+srv://oreo97:TEYX8f5b2Q5ZtF1x@mongotestdb.3ls8izf.mongodb.net/node-Angular?retryWrites=true&w=majority")
  .then(() => {
      console.log('Connected to database!');
    }
  )
  .catch(() => {
    console.log('Connection Failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// app.use((req, res, next)=>{
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });
  console.log(post);
});

app.get("/api/posts", (req, res, next) => {
  if (req.query.post_id) {
    Post.findOne({_id: req.query.post_id})
      .then(documents => {
        //documents.title= 'hellaaaa';
        res.status(200).json({
          message: 'Single Post fetched with kamiyaabi!',
          posts: documents
        });
      });
  } else {
    Post.find()
      .then(documents => {
        res.status(200).json({
          message: 'Posts fetched with kamiyaabi!',
          posts: documents
        });
      });
  }
});

app.put("/api/posts/:id", (req,res, next)=>{
  console.log(req.params.id)
  Post.updateOne({_id: req.params.id}, {
    title: req.body.title,
    content: req.body.content
  }).then(result =>{
    console.log(result);
    res.status(200).json({message: "Update Successful!"})
  })
});


app.delete('/api/posts/:_id', (req, res, next) => {
  Post.deleteOne({_id: req.params._id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post Deleted!'});
  });

});


module.exports = app;
