const express = require('express');
let app = express();
const session=require('express-session');
const validator = require('express-validator');
const bodyParser = require('body-parser');

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

app.use(validator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=> {
  let login =
    `
    <h1>Login Page </h1>
    <form action="/" method="post">
    <input type="text" name="username" value="" placeholder="username">
    <input type=password name="password" value="" placeholder="password">
    <button>Login</button>
    </form>
    `;
      res.send(login);
  });

app.post('/',(req,res)=> {
  console.log(req.body);
  let name = req.body.username;
  let password=req.body.password;

  req.checkBody({
    'password':{
    notEmpty: true,
    isLength: {
      options: {min: 8},
      errorMessage: "Must be at least 8 characters long"
          },
    errorMessage: 'Invalid Password'
  },
  'username':{
    notEmpty:true,
  errorMessage:'Invalid Username'
}
});
  let errors = req.validationErrors();
  if (errors){
    let errorMessage = "You did not fill in a proper username and password";
    return (errorMessage);
    res.redirect('/');
  } else {
    res.send(`
  <h1> Welcome to the Upside Down </h1>
  <img src="https://media.giphy.com/media/l0MYOGb8rqLOug1gY/giphy.gif">
  <p> You are logged in under '${name}'.</p>
      `);
  };

});

app.listen(3000, () => console.log("Check this out"));
