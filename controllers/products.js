const Product = require('../models/product');
const {Sequelize} = require('sequelize');


const createProduct = async (req, res, next) => {
    try {
        const urls = [];
        const { name, color, size, category, kids, material, description} = req.body;
        const images = req.files.map( singleImage => {
           const singleUrl =  singleImage.path.replace("\\", "/")
            urls.push(singleUrl)
        })
        console.log(urls)
        if(!req.files){
            const error = new Error('Put at least one picture')
            error.statusCode = 422;
            throw error;
        }
        
        const product = await Product.create({
            name:name,
            color:color,
            size: size,
            category: category,
            kids: kids,
            material: material,
            description: description,
            images: urls
        })

        res.status(201).json({product:product})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    };
}


module.exports = {
    createProduct,
}