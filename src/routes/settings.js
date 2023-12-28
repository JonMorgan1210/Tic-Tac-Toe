const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    const vars = {
        id: 'profile', 
        text:'Profile', 
        classLeader: '', 
        classUser:'',
    };
    res.render('settings', vars);
})

module.exports = router;