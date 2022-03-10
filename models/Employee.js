import mongoose from "mongoose";
import bcrypt from "bcrypt";

import generateToken from "../helpers/generateToken.js";

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: null,
        trim: true
    },

    token: {
        type: String,
        default: generateToken()
    },

    // confirmed: {
    //     type: Boolean,
    //     default: false
    // }
})

employeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

employeeSchema.methods.checkPassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;