const express = require('express');
const path = require('path');
const authRoute = require('./routes/auth');
const leaderBoardRoute = require ('./routes/leaderboard');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = 8080;

require('./database/database');

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/templates'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret stuff',
    resave: false,
    saveUninitialized: false,
}));

app.use('/auth', authRoute);
app.use('/leaderboard', leaderBoardRoute);

app.get('/', (req, res) => {
    if (!req.session.user){
        res.render('index', {id: 'auth', text:'Sign In/Up', classLeader: '', classUser:''});
    } else {
        res.render('index', {id: 'profile', text:'Profile', classLeader: '', classUser:''});
    }
})

app.get('/board', (req, res) => {
    res.render('board');
})

app.get('/profile', (req, res) => {
    res.render('profile', {id: 'profile', text:'Profile', classLeader: '', classUser:'active'});
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));