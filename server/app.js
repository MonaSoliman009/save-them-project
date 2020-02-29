const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
var config = require("config")

var Strategy = require('passport-facebook').Strategy;
var passport = require('passport');
var session = require("session");
// var error = require("./middleware/error");
var donatepayment = require("./controllers/donationone");
var donatematerial = require("./controllers/donate material")
var admin = require("./controllers/admin");
require("express-async-errors");
var winston = require("winston");

var hpp = require("hpp");
var ratelimit = require("express-rate-limit");
var bodyParser = require("body-parser");


var helmet = require("helmet");
var fs = require("fs");
var mongosanatize = require("express-mongo-sanitize");
var xss = require("xss-clean");
var charityController = require("./controllers/charity");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const login = require("./controllers/login");
var donatematerial = require("./controllers/donate material");
var admin = require("./controllers/admin")
const volunteer = require("./controllers/volunteer");
var charityController = require("./controllers/charity");
const postcontroller = require("./controllers/posts")
const postModel = require('./models/post');
const commentModel = require('./models/comment');
const likemodel = require("./models/like")
const voluntermodel = require("./models/volunteer");
const charityModel = require('./models/charity')
const donateonline = require("./controllers/donationone");
var searchController = require("./controllers/search");


winston.configure({
  transports: [
    new winston.transports.File({
      filename: "logfile.log"
    })
  ]
});

if (!config.get("jwtprivatekey")) {
  console.error("jwtprivatekey undefined");
  process.exit(1);
}
app.use(express.static("upload"));
app.use(cors());
app.use(bodyParser.json());
// app.use(passport.intialize());
// app.use(passport.session())
var files_arr = fs.readdirSync(__dirname + "/models");
files_arr.forEach(function (file) {
  require(__dirname + "/models/" + file);
});

var limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this ip,Please try again in an hour !"
});

// limit number of requests from the same ip address
app.use("/savethem", limiter);
// http security headers
app.use(helmet());
// data sanitization against nosql query injection
app.use(mongosanatize());
// data sanitization against xss
app.use(xss());
// prevent parameter pollution
app.use(hpp());
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, HEAD, GET, OPTIONS, POST, PUT"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/search", searchController);





app.use("/savethem/charity", charityController);
app.use("/post", postcontroller)
app.use("/savethem/login", login);
app.use("/savethem/donatepayment", donatepayment);
app.use("/savethem/volunteer", volunteer);
app.use("/savethem/admin", admin);
app.use("/donate", donatematerial)
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://mona:123456aa@graduationsite-gnpxx.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.on("error", err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});
var parseUrlencoded = bodyParser.urlencoded({ extended: true });

// posts

io.on("connection", (socket) => {
  console.log("new user connected");
  postModel.find({}, (err, allpost) => {
    if (err) {
      console.log(err)
    }
    else {
      io.emit("allPost", allpost)
      // console.log(allpost)
    }
  });


  socket.on("charityID", (charityid) => {

    console.log(charityid)


    postModel.find({ postedby: charityid }, (err, data) => {
      if (!err) {
        console.log(data)
        io.emit('allcharitypost', data)
      }
      else {
        // console.log(charitypost)

      }
    })
  });

  socket.on('disconnect', () => {
    console.log('disconnect')
  });


  socket.on('create post', function (data) {
    console.log(data)
    console.log('this  hi')
    createPosthome = new postModel({
      title: data.title,
      content: data.content,
      postedby: data.postedby,
      createdat: Date.now()

    })
    console.log(createPosthome)
    createPosthome.save((err, data) => {
      if (!err) {
        console.log("save....");
        postModel.find({}).populate('postedby.volunteer || postedby.charity').exec(function (err, post) {
          if (!err) {
            console.log(post)
            postModel.find({}, (err, allpost) => {
              console.log("post after database")

              if (err) {
                console.log(err)
              }
              else {
                io.emit("allPost", allpost)
                console.log(allpost)
              }
            })

          }


        })
      }
      if (err) {
        console.log(err)
      }
    })
  });


  socket.on('charitypost', (charitynewpost) => {
    // console.log(charitynewpost)
    createPost = new postModel({
      title: charitynewpost.title,
      content: charitynewpost.content,
      postedby: charitynewpost.postedby,
      createdat: Date.now()
    })
    createPost.save((err, data) => {
      if (!err) {
        console.log("save....");
        postModel.find({ postedby: charitynewpost.postedby }, (err, data) => {
          console.log("hi from post charity")
          if (!err) {
            console.log(data)
            io.emit('allCharityPost', data)
            console.log(data)
          }
          else {
            console.log(err)
          }
        })

      }
    });
  });



  socket.on("delete", (postID) => {

    console.log(postID)
    postModel.findByIdAndDelete(postID, (err, deletepost) => {

      console.log(deletepost)
      if (err) {
        console.log(err)
      }
      else {
        console.log(deletepost)
        console.log("deleted");

      }
    })
  });
  // socket.on("editpost",(postid)=>{
  //   console.log(postid)
  //   postModel.find({_id:postid},(err,post)=>{
  //     if(!err){
  //       console.log(post)
  //       io.emit("postthatwilledit",post)
  //     }
  //     else{
  //       console.log(err)
  //     }
  //   })
  // })

  socket.on("edit", (post) => {
    console.log(post);

    console.log("update")
    postModel.findByIdAndUpdate(post.postID,
      {
        $set: { title: post.title, content: post.content, createdat: Date.now() }
      },
      { new: true },
      function (err, updatepost) {
        if (err) {
          console.log(err)
        }
        else {
          console.log(updatepost)
        }

      })
  });

  socket.on("createcomment", (newcomment) => {
    console.log(newcomment)
    createcomment = new commentModel({
      text: newcomment.text,
      postedby: newcomment.postedby,
      post: newcomment.post
    })
    createcomment.save((err, comment) => {
      if (!err) {
        console.log(comment);

      }
      else {
        console.log(err)
      }
    })
  });

  socket.on("displaycomment",async (postid) => {
    console.log(postid)
    commentModel.find({ post: postid }, (err, comment) => {
      if (!err) {
        console.log(comment)
        io.emit("comments", comment)
      }
      else {
        console.log(err)
      }
    })

  })

  socket.on("like", (like) => {
    // console.log(like)
    newlike = new likemodel({
      postedby: like.postedby,
      post: like.post
    })
    newlike.save((err, like) => {
      if (!err) {
        console.log("saved")
        likemodel.find({}).populate('postedby.volunteer').populate('postedby.charity').exec(function (err, like) {
          if (like) {
            console.log(like)
            // console.log("tttttttttt")
          }
          else {
            console.log(err)
          }
        })
      }
      else {
        console.log(err)
      }
    })
  })

  socket.on("ALLlikes", (postid) => {
    console.log(postid)

    likemodel.find({ post: postid }, (err, likes) => {
      if (!err) {
        console.log(likes)

        io.emit("getAllLikes", likes)
      }
      else {
        console.log(err)
      }
    })
  });
  socket.on("likesPostedBy", (id) => {
    console.log(id)
    console.log("idpostedby like")
  })



  // charity

  socket.on("allCharity", () => {
    mongoose.model("charity").find({}, (err, data) => {
      if (!err) {
        console.log(data)
        io.emit('getCharities', data)
      }
      else {
        console.log(err)
      }
    });

  });

  socket.on("follow", async (data) => {
    console.log(data)
    console.log("asd")
    mongoose.model("charity").findOne({ _id: data.follower }, (err, charity) => {
      if (!err) {
        // console.log(charity.following)
        var ccc = charity.following
        var vvv = ''
        for (var i; i < ccc.length; i++)


          console.log(vvv += ccc[7] + "<br>");

        if (vvv += ccc[i] == data.following) {
          console.log("you foooooooooo");

        }
        else {

          mongoose.model("charity").update({ _id: data.follower }, { $push: { following: data.following } }, (err, following) => {
            if (err) {
              console.log(err);

            }
            else {

              mongoose.model("charity").findOne({ _id: data.following }, (err, Charity) => {
                if (!err) {
                  // console.log(data.following);
                  // console.log(Charity);

                  console.log(Charity.follower)
                  if (charity.follower == data.follower) {
                    console.log("fffffffffffffffff")
                  }
                  else {
                    mongoose.model("charity").update({ _id: data.following }, { $push: { follower: data.follower.toString() } }, (err, data) => {
                      if (err) {
                        console.log(err);

                      }
                      else {
                        // console.log(data);

                      }
                    })
                  }
                }

              }
              )
            }
          })
        }
      }
    })


  });



  socket.on("getfollowing", (data) => {
    console.log("lllllllllllllllllllllll");

    console.log(data);

    mongoose.model("charity").findOne({ _id: data }, (err, charity) => {
      if (err) {
        console.log(err)
      }
      else {

        // console.log(charity.following)
        var following = charity.following
        for (var i = 0; i < following.length; i++) {
          console.log(following[i]);

          mongoose.model("charity").find({ _id: following[i] }, (err, following) => {
            console.log("nnnnnnnnnnnnnn");

            if (err) {
              console.log(err)
            }
            else {
              console.log("kkkkkkkkkkkkkkkkkkkkkkkkk")
              console.log(following)
              io.emit("following", following)
            }
          })
        }
      }
    })
  });


  socket.on("removeFollow", (remove) => {
    console.log(remove)
    mongoose.model("charity").findOne({ _id: remove.charityID }, (err, charity) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log(charity)
      }
    })
  });

  socket.on("findUser", (id) => {
    console.log("USER")
    console.log(id);
    mongoose.model("charity").findOne({ _id: id }, (err, charity) => {

      if (err) {
        console.log(err);

      }

      if (charity == null) {

        mongoose.model("volunteer").findOne({ _id: id }, (err, volunteer) => {

          if (err) {
            console.log(err)
          }
          else {
            console.log(volunteer)
            io.emit("isVolunteer",volunteer)
            console.log(volunteer)
          }

        })
      }
      else {
        console.log(charity)
        io.emit("ischarity",charity)
      }

    });
    

  })


});


passport.use(
  new Strategy({
    clientID: 799856253853537,
    clientSecret: 'a1a57004dbdefed95f388a9a402a621f',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({
        facebookId: profile.id
      },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

server.listen(3000, function () {
  console.log("server running....");
});
