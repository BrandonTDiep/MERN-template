const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

// mongoose will enforce this schema so the title has to be a string
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method

userSchema.statics.signup = async function(email, password) {

    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password too weak')
    }

    const normalizedEmail = email.toLowerCase()

    const exists = await this.findOne({ email: normalizedEmail })

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrpyt.genSalt(10)
    const hash = await bcrpyt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// static login method

userSchema.statics.login = async function(email, password){

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrpyt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)