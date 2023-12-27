const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    if (!req.session.user){
        res.render('leaderboard', {id: 'auth', text:'Sign In/Up', classLeader: 'active', classUser:''});
    } else {
        res.render('leaderboard', {id: 'profile', text:'Profile', classLeader: 'active', classUser:''});
    }
});

module.exports = router;