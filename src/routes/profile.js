const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
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

module.exports = router;