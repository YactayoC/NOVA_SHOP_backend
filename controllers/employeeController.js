import Employee from '../models/Employee.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import generateJWT from '../helpers/generateJWT.js'

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email: email });
    if (!employee) {
        const error = new Error('The employee does not exist');
        return res.status(403).json({ msg: error.message });
    }

    if (await employee.checkPassword(password)) {
        res.json({
            _id: employee._id,
            name: employee.name,
            lastname: employee.lastname,
            email: employee.email,
            phone: employee.phone,
            token: generateJWT(employee.token)
        });
    } else {
        const error = new Error('The password is incorrect');
        return res.status(403).json({ msg: error.message });
    }
}

// requiere enctype
// action = url, method post enctype=multipart/form-data
const addProduct = async (req, res) => {
    const { name } = req.body;
    // const img = req.file
    const  img  = req.file;
    console.log(img);
    const productExist = await Product.findOne({ name: name });
    if (productExist) {
        const error = new Error('The product exists');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const product = new Product(req.body);
        const productSave = await product.save();
        res.json(productSave);
    } catch (error) {
        console.log(error);
    }
}
// funcion agrega imagen

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
    // data.forEach(d => {
    //     console.log(d.name);
    // })
}

const getProduct = async (req, res) => {
    const { id } = req.params;

    const productExist = await Product.findOne({ _id: id })
    console.log(productExist);
    if (!productExist) {
        const error = new Error('There was an error');
        return res.status(400).json({ msg: error.message });
    }

    try {
        res.json(productExist);
    } catch (error) {
        consolelog(error);
    }
}

// requiere enctype
// action = url, method post enctype=multipart/form-data
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, description } = req.body
    // const img = req.file
    const productExist = await Product.findOne({ _id: id });

    if (!productExist) {
        const error = new Error('There was an error');
        return res.status(400).json({ msg: error.message });
    }

    try {
        productExist.name = name;
        productExist.price = price;
        productExist.quantity = quantity;
        productExist.description = description;
        const productUpdate = await productExist.save()
        res.json(productUpdate);
    } catch (error) {
        console.log(error);
    }

}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const productExist = await Product.findOne({ _id: id });

    if (!productExist) {
        const error = new Error('There was an error');
        return res.status(400).json({ msg: error.message });
    }

    try {
        await Product.deleteOne({ _id: id });
        res.json({ msg: 'Product deleted successfully' })
    } catch (error) {
        console.log(error);
    }
}

const getClients = async (req, res) => {
    const clients = await User.find({ confirmed: true });
    res.json(clients);
}

export { authenticate, addProduct, getProducts, getProduct, updateProduct, deleteProduct, getClients }