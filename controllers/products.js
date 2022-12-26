const Product = require('../models/product');
const {Sequelize} = require('sequelize');


const createProduct = async (req, res, next) => {
    try {
        
        const { name, color, size, category, kids, material, description} = req.body;
        const images = req.file.path.replaceAll("\\", '/')
      
        if(!req.file){
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
            images: images
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