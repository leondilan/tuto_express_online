const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schemaEmploye = new Schema({
    name: { type: String},
    email: { type: String},
    tel: { type: String},
    adress: { type: String},
    nomimage: { type: String},
},{timestamps: true})

const EmployeModel = mongoose.model('employes', schemaEmploye)

module.exports = EmployeModel