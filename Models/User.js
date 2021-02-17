const { ObjectID } = require('mongodb')
const { Schema, model } = require('mongoose')

const schema = new Schema({
    objectId: { type: ObjectID },
    id: { type: Number },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    gender: { type: String },
    job: { type: String },
    university: { type: String },
    avatar: { type: String },
})

module.exports = model('User', schema, 'usersData')