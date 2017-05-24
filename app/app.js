let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

let app = express();

/* Configure */
app.use(express.static('./node_modules'));
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(cookieParser('ScreeM'));
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

/* Routing */
require('./router/router')(app);

/* Run */
app.listen(process.env.PORT || 3333, function() {
    console.log(`Server is running at ${process.env.PORT || 3333}`);
});