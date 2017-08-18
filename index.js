const express = require('express');
let app = express();
const session=require('express-session');
const mustacheExpress = require('mustache-express');
// const validator = require('express-validator');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('mustache',mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized:true
}));

app.get('/',(req,res)=> {
let myUser = {};
myUser.username = req.session.username
myUser.password = req.session.password
if(typeof req.session.username !== 'undefined'){
  res.render('index',myUser);
} else {
  res.redirect('/login');
}
});
app.get('/login',(req,res)=> {
  res.render('login');
});

const users = {
  Brooklynn:'12345',
  Jon: '1234'
};


app.post('/login/auth',(req,res)=> {
  // console.log(req.body);
let name = req.body.username;
let password = req.body.password;
  if(users[name] === password){
    req.session.username = name
    req.session.password = password
    res.redirect('/');
  }else {
    res.redirect('/login');
  }
});



app.listen(3000, () => console.log("Check this out"));



//   req.checkBody({
//     'password':{
//     notEmpty: true,
//     isLength: {
//       options: {min: 8},
//       errorMessage: "Must be at least 8 characters long"
//           },
//     errorMessage: 'Invalid Password'
//   },
//   'username':{
//     notEmpty:true,
//   errorMessage:'Invalid Username'
// }
// });
//   let errors = req.validationErrors();
//   if (errors){
//     let errorMessage = "You did not fill in a proper username and password";
//     return (errorMessage);
//     res.redirect('/');
//   } else {
//     res.send(`
//   <h1> Welcome to the Upside Down </h1>
//   <img src="https://media.giphy.com/media/l0MYOGb8rqLOug1gY/giphy.gif">
//   <p> You are logged in under '${name}'.</p>
//       `);
//   };
//
// });










// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));

// app.use((req, res, next) => {
//   if(typeof req.session.password === "undefined"){
//     const error = new Error('Password must be 8 or more characters long.');
//     req.status = 500;
//     next(error);
//   }else {
//     next();
//   }});

  // app.use((err, req, res, next) => {
  //   // res.send('TESTING');
  //   res.redirect('/');
  // });

// app.use(validator());

// let login =
//   `
//   <h1>Login Page </h1>
//   <form action="/" method="post">
//   <input type="text" name="username" value="" placeholder="username">
//   <input type=password name="password" value="" placeholder="password">
//   <button>Login</button>
//   </form>
//   `;
//     res.send(login);
