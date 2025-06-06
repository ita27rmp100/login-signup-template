const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require("mysql")
const session = require("express-session")
// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { json } = require('stream/consumers');

const app = express();

// express session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// DB connection
let connection = mysql.createConnection({
  password:"",
  user:"root",
  host:"127.0.0.1",
  database:"template_db"
}) 
/ login & signup
  // SignUp
app.post('/logsign/signup',(req,res)=>{
  let body = ''
  req.on('data',(data)=>{
      body = body + data
  })
  req.on('end',()=>{
      let result = qs.parse(body)
      connection.query(`select * from users where username = '${result.username}'`,(error,results,fields)=>{
        if(results == undefined && result.password_sign==result.ConfirmPassword){
          connection.query(`
            insert into users()
            value('${result.username_sign}','${result.password_sign}','${result.start_day.replaceAll("-",'/')}','0 Days',1)`,
            (error,RES,fields)=>{
              req.session.login = true
              req.session.username = result.username_sign
              res.redirect('/')
            }
          )
        }
        else{
            res.json({ message: "signup_failed" });
        }
      })
  })
})
  // log in
app.post('/logsign/login',(req,res)=>{
  let body = ''
  req.on('data',(data)=>{
    body = body + data
  })
  req.on('end',()=>{
    let result = qs.parse(body)
    connection.query(
      `select * from users where username='${result.username_login}'`,
      (err,results,fields)=>{
        if(results != undefined && results[0].password == result.password_login){
          req.session.login = true
          req.session.username = result.username_login
          res.redirect('/')
        }
        else{
          if(results == undefined) res.json({message:"non-username"})
          else res.json({message:"wrong-password"})
        }
      }
    )
  }
  )
})
  // log out
app.post('/logsign',(req,res)=>{
  req.session.login = false
  res.redirect('/logsign')
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
