const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    email: { type: String, require: true, unique: true },
    senha: { type: String, require: true }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('senha') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt)
    }
    next();
})

userSchema.methods.comparePassword = async function (canditePassword) {
    return bcrypt.compare(canditePassword, this.senha);
};

const User = mongoose.model('User', userSchema)

module.exports = User;
