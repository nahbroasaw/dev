const { model, Schema } = require('mongoose');

let levelSchema = new Schema({
    User: String,
    Role: String
})

module.exports = model("staff", levelSchema)