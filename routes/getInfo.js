const { Router } = require('express')
const router = Router()
const User = require('../Models/User')

module.exports = router


router.get('/', async function (req, res) { //получение общей информации о пользователе

    let usersInfo = await User.find({ id: { $gte: (Number(req.query.page) - 1) * 5, $lte: Number(req.query.page) * 5 - 1 } })
    res.send(usersInfo);

})

router.get('/get/:id', async function (req, res) { //получение подробной информации о пользователе

    let info = await User.findOne({ id: req.params.id })
    res.send(info)

})

router.get('/findCard', async function (req, res) {

    let info = await User.find({ last_name: req.query.lastName })
    res.send(info)

})