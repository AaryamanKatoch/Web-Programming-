// Setup server, session and middleware here.
const express = require('express');
const ehandle = require('express-handlebars');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  session({
    name: 'AuthCookie',
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true
  })
);

app.use('/protected', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render("forbiddenAccess");
  } else {
    next();
  }
});

app.use((req,res,next) => {
let time = new Date().toUTCString()
if(req.session.user){
  console.log(`[${time}]: ${req.method} ${req.originalUrl} (Authenticated User)`)
}
else{
  console.log(`[${time}]: ${req.method} ${req.originalUrl} (Non-Authenticated User)`)
}
next()
});

app.engine('handlebars', ehandle.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
