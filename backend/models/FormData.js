const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    username : String,
    email: String,
    password: String
})

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
