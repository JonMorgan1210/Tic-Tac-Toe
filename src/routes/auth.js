const {Router} = require('express');
const users = require('../database/schemas/users');
const {hashPassword, comparePassword} = require('../utils/helpers')

const router = Router();

router.get('/', async (req, res) => {
    res.render('auth', {errorMessage: ''});
});

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const userDB = await users.findOne({ username });
    const isValid = comparePassword(password, userDB.password);

    if (userDB && isValid) {
        req.session.user = userDB;
        res.redirect('/');
    } else {
        res.render('auth', {errorMessage : 'Invalid Credentials'});
    }    
})

router.get('/register', (req, res) => {
    res.render('accountCreate', {errorMessage: ''});
})

router.post('/register', async (req, res) => {
    const {username, password, reEnter} = req.body;
    
    if (password !== reEnter) return res.render('accountCreate', {errorMessage : "Passwords Don't Match"});

    const checkUser = await users.findOne({ username });
    if (checkUser) return res.render('accountCreate', {errorMessage : 'Username Taken'});

    const hashedPassword = hashPassword(password);
    users.create({username, password: hashedPassword});

    const userDB = await users.findOne({ username });
    req.session.user = userDB;
    res.redirect('/');

})

module.exports = router;