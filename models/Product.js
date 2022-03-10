import mongoose from "mongoose";

const productSchema = {
    name: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    // urlImage: {
    //     data: Buffer,
    //     contentType: String,
    //     required: true
    // }
}

const Product = mongoose.model('Product', productSchema);
export default Product;