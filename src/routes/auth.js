const {Router} = require('express');
const users = require('../database/schemas/users');
const {hashPassword, comparePassword} = require('../utils/helpers')

const router = Router();

router.get('/', async (req, res) => {
    res.render('auth', {id: 'auth', text:'Sign In/Up', classLeader: '', classUser:'active', errorMessage:''});
});

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const userDB = await users.findOne({ username });

    if (userDB && comparePassword(password, userDB.password)) {
        req.session.user = userDB;
        res.redirect('/');
    } else {
        res.render('auth', {id: 'auth', text:'Sign In/Up', classLeader: '', classUser:'active', errorMessage:'Invalid Credentials'});
    }    
})

router.get('/register', (req, res) => {
    res.render('accountCreate', {id: 'auth', text:'Sign In/Up', classLeader: '', classUser:'active', errorMessage: ''});
})

router.post('/register', async (req, res) => {
    const {username, password, reEnter} = req.body;
    const vars = {
        id: 'auth', 
        text:'Sign In/Up', 
        classLeader: '', 
        classUser:'active'
    };
    
    if (password !== reEnter) {
        vars.errorMessage = "Passwords Don't Match";
        return res.render('accountCreate', vars);
    }

    const checkUser = await users.findOne({ username });
    if (checkUser) {
        vars.errorMessage = 'Username Taken';
        return res.render('accountCreate', vars);
    }
    
    const hashedPassword = hashPassword(password);
    users.create({username, password: hashedPassword});

    const userDB = await users.findOne({ username });
    req.session.user = userDB;
    res.redirect('/');

})

module.exports = router;