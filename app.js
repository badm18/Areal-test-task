const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express()


app.use(cors())
app.use('/', require('./routes/getInfo')) //подключение файла, где описана логика ответа на get запросы 


const PORT = config.get('port') || 5000


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`app has been run on port ${PORT}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}


start()