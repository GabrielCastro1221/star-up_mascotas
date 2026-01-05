const { Schema, model } = require('mongoose');

const guardianPetConfigSchema = new Schema({
    company_name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    instagram_link: { type: String, required: true },
    facebook_link: { type: String, required: true },
});

module.exports = model('GuardianPetConfig', guardianPetConfigSchema);