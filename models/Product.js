// TODO: Por hacer
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// import generateId from "../helpers/generateId.js";

// const productSchema = {
//     name: {
//         type: String,
//         required: true
//     },

//     price: {
//         type: Number,
//         required: true
//     },

//     description: {
//         type: String,
//         required: true
//     },

//     urlImage: {
//         data: Buffer,
//         contentType: String,
//         required: true
//     }
// }

// productSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// })

// productSchema.methods.checkPassword = async function(passwordForm) {
//     return await bcrypt.compare(passwordForm, this.password);
// }

// const Product = mongoose.model('Product', productSchema);
// export default Product;