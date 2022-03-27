import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import generateJWT from "../helpers/generateJWT.js";

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email: email });
  if (!employee) {
    const error = new Error("The employee does not exist");
    return res.status(403).json({ msg: error.message });
  }

  if (await employee.checkPassword(password)) {
    res.json({
      _id: employee._id,
      name: employee.name,
      lastname: employee.lastname,
      email: employee.email,
      phone: employee.phone,
      token: generateJWT(employee.id),
    });
  } else {
    const error = new Error("The password is incorrect");
    return res.status(403).json({ msg: error.message });
  }
};

// requiere enctype
// action = url, method post enctype=multipart/form-data
const addProduct = async (req, res) => {
  const { name } = req.body;
  // const img = req.file
  const img = req.file;
  console.log(img);
  const productExist = await Product.findOne({ name: name });
  if (productExist) {
    const error = new Error("The product exists");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const product = new Product(req.body);
    await product.save();
  } catch (error) {
    console.log(error);
  }
};
// funcion agrega imagen

const getProducts = async (req, res) => {
  const products = await Product.find().sort({ name: 1 });
  res.json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const productExist = await Product.findOne({ _id: id });
  if (!productExist) {
    const error = new Error("There was an error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    res.json(productExist);
  } catch (error) {
    consolelog(error);
  }
};

// requiere enctype
// action = url, method post enctype=multipart/form-data
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, description, category } = req.body;
  // const img = req.file
  const productExist = await Product.findOne({ _id: id });

  if (!productExist) {
    const error = new Error("There was an error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    productExist.name = name;
    productExist.price = price;
    productExist.quantity = quantity;
    productExist.description = description;
    productExist.category = category;
    await productExist.save();
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productExist = await Product.findOne({ _id: id });

  if (!productExist) {
    const error = new Error("There was an error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    await Product.deleteOne({ _id: id });
    // res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getClients = async (req, res) => {
  const clients = await User.find({ confirmed: true }).sort({ $natural: -1 });
  res.json(clients);
};

const getEmployees = async (req, res) => {
  const employees = await Employee.find().sort({ $natural: -1 });
  res.json(employees);
};

const addEmployee = async (req, res) => {
  const { email } = req.body;
  const employeeExist = await Employee.findOne({ email: email });
  if (employeeExist) {
    const error = new Error("Existing employee");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const employee = new Employee(req.body);
    await employee.save();
  } catch (err) {
    console.log(err.message);
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ _id: id });
  if (!employee) {
    const error = new Error("There was an error");
    res.json(error);
  }

  try {
    res.json(employee);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ _id: id });
  if (!employee) {
    const error = new Error("There was an error");
    res.json(error);
  }

  try {
    const { name, lastname, password, phone } = req.body;
    employee.name = name;
    employee.lastname = lastname;
    employee.password = password;
    employee.phone = phone;
    await employee.save();
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const employeeExist = await Employee.findOne({ _id: id });
  if (!employeeExist) {
    const error = new Error("There was an error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    await Employee.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  const { id } = req.params;
  const employeeExist = await Employee.findOne({ _id: id });
  if (!employeeExist) {
    const error = new Error("There was an error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    res.json(employeeExist);
  } catch (error) {
    consolelog(error);
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ _id: id });
  const { name, lastname, phone, password } = req.body;

  if (!employee) {
    const error = new Error("There was an error");
    res.status(400).json({ msg: error.message });
  }

  try {
    employee.name = name;
    employee.lastname = lastname;
    employee.phone = phone;
    employee.password = password;
    await employee.save();
  } catch (error) {
    console.log(error);
  }
};

export {
  authenticate,
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getClients,
  getEmployees,
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getProfile,
  updateProfile,
};
