const express = require('express');
const path = require('path');
const authRoute = require('./routes/auth');
const leaderBoardRoute = require ('./routes/leaderboard');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const users = require('./database/schemas/users');

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

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.get('/board', (req, res) => {
    res.render('board');
})

app.get('/profile', (req, res) => {
    const {username, wins, loses, score} = req.session.user;
    const vars = {
        id: 'profile', 
        text:'Profile', 
        classLeader: '', 
        classUser:'active',
        username,
        wins,
        loses,
        score
    };
    res.render('profile', vars);
})

app.post('/log', async (req, res) => {
    const winner = req.body.winner;
    console.log(0);
    if (req.session.user) {
        const {username} = req.session.user;
        if (winner.includes('X')) {
            await users.updateOne( { username },
                {
                $set: {
                    wins: (req.session.user.wins += 1),
                    score: (req.session.user.wins - req.session.user.loses)}
                })
        } else if(winner.includes('O')) {
            await users.updateOne( { username },
                {
                $set: {
                    loses: (req.session.user.loses += 1),
                    score: (req.session.user.wins - req.session.user.loses)}
                })
        }
    }
    res.sendStatus(201);
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));