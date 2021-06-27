let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
	id:Number,
    name: String,
    email: String,
    phone: Number,
    city:String,
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)