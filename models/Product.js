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

    image: {
        title: { type: String},
        description: {type: String},
        filename: {type: String},
        path: {type: String},
        originalname: {type: String},
        mimetype: {type: String},
        size: {type: Number},
    }
}

const Product = mongoose.model('Product', productSchema);
export default Product;