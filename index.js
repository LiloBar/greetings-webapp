const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const flash = require('express-flash');
const session = require('express-session');


const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/greetings';

const pool = new Pool({
  connectionString
});

let NamesGreeted = require('./registration.js');
const greet = NamesGreeted(pool);

app.engine('handlebars', exphbs({
  defaultLayout: 'main',


}));
app.set('view engine', 'handlebars');


app.use(session({
  secret: '<Enter Your Names>',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(bodyParser.json());

app.get('/', async function (req, res) {

  let Count = await greet.countNames();

  res.render("index", {
    Count
  });
});

app.get('/greeted', async function (req, res) {


  //  (req.params.actionType);

  let greetedNames = await greet.getGreetedNames()


  res.render('action', {
    greetedNames
  });


});


app.get('/greetedName/:greetName', async function (req, res) {

  let name = req.params.greetName;

  let userRecord = await greet.getNameDetails(name)


  res.render('names', {
    userRecord
  })
})

app.post('/greetings', async function (req, res, next) {

  try {

    let name = req.body.theName;
    let lang = req.body.language;
    console.log('Name: ' + name)
    console.log('Lang: ' + lang)



    if (name === ''&& lang === undefined) {
        req.flash('error', 'Please enter a name & select a language')
    }

   else if (name === '') {

      req.flash('error', 'Please enter a name ')
    }

   else if (lang === undefined) {

      req.flash('error', 'Please select Language')

    }

    let Greet = await greet.greet(name, lang);
    let Count = await greet.countNames();
    res.render("index", {
      Greet,
      Count

    });


  } catch (error) {
    alert(errors)
    //next(error)
  }



  // if (name === '' && lang === undefined) {
  //     req.flash('info', 'Please enter a name & select language ');
  // }


  // if (lang === undefined) {
  //     req.flash('info', 'Please select language ');
  // } else if (name === '') {
  //     req.flash('info', 'Please enter a name ');
  // } else {
  //     let Greet = await greet.greet(name, lang);
  //     let Count = await greet.countNames();
  // }



  //}

});

app.get('/reset', async function (req, res, next) {
  try {
    await greet.resetDataBase()


    res.redirect('/')
  } catch (err) {
    return next(err)
  }

});




const PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
  console.log("Starting on port ", +PORT);
});
