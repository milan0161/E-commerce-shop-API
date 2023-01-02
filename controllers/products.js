const Product = require('../models/product');
const {Sequelize} = require('sequelize');
const clearImage = require('../utils/clear')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const createProduct = async (req, res, next) => {
    try {
        const { model, producer, price, processor, processorModel, ram, screenResolution, screenType, GPU, GPUModel, ssd, ssdModel, description, OS, battery, material, screenDiag} = req.body;

        const images = req.file.path.replaceAll("\\", '/')
      
        if(!req.file){
            const error = new Error('Put at least one picture')
            error.statusCode = 422;
            throw error;
        }
        
        
        const product = await Product.create({
            model:model,
            producer:producer,
            price:price,
            processor:processor,
            processorModel:processorModel,
            ram:ram,
            screenDiag:screenDiag,
            screenResolution:screenResolution,
            screenType:screenType,
            GPU:GPU,
            GPUModel:GPUModel,
            ssd:ssd,
            ssdModel:ssdModel,
            description:description,
            OS:OS,
            images: images,
            battery:battery,
            material:material,
        })

        res.status(201).json({product:product})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    };
}


const getAllProducts = async (req, res, next) => {
    try {
       const products = await Product.findAll()
       res.status(200).json(products)
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
}

const getProducts = async (req, res, next) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3
    let skip = (page -1 ) * limit;
    
    try {
        const totalItems = await Product.count()
        const products = await Product.findAndCountAll({
        limit:limit,
        offset:skip
       })
       res.status(200).json({
        products:products.rows,
        totalItems:totalItems
       })
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
}

const getOneProduct = async (req, res, next) => {
    const prodId = req.params.id;
    try {
        const product = await Product.findByPk(prodId);
        res.status(200).json(product)
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
};

const updateProduct = async (req, res, next) => {
        const prodId = req.params.id
        const { model, producer, price, processor, processorModel, ram, screenDiag, screenResolution, screenType, GPU, GPUModel, ssd, ssdModel, description, OS, battery, material} = req.body;
        
    try {
        const product = await Product.findByPk(prodId);
        if(!product){
            const error = new Error('No product found')
            error.statusCode = 404;
            throw error
        }

        const images = req.file.path.replaceAll("\\", '/')
      
        if(!req.file){
            product.images = product.images
        } else{
            product.images = images
        }
        model? product.model = model : product.model;
        producer? product.producer = producer : product.producer;
        price? product.price = price: product.price;
        processor? product.processor = processor : product.processor;
        processorModel? product.processorModel = processorModel : product.processorModel;
        ram? product.ram = ram : product.ram;
        screenDiag? product.screenDiag = screenDiag : product.screenDiag;
        screenResolution? product.screenResolution = screenResolution : product.screenResoltion;
        screenType? product.screenType = screenType : product.screenType;
        GPU? product.GPU = GPU : product.GPU;
        GPUModel? product.GPUModel = GPUModel: product.GPUModel;
        ssd? product.ssd = ssd : product.ssd
        ssdModel? product.ssdModel = ssdModel : product.ssdModel;
        description? product.description = description : product.description;
        OS? product.OS = OS : product.OS;
        battery? product.battery = battery : product.battery;
        material? product.material = material : product.material;
        
        await product.save()
        res.status(200).json({product:product})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
};
    const deleteProduct = async (req, res, next) => {
    try {
        const prodId = req.params.id;
        const product = await Product.findByPk(prodId);
        if(!product){
            const error = new Error('No product found')
            error.statusCode = 404;
            throw error;
        };
        await product.destroy()
        clearImage(product.images);
        res.status(200).json({message: 'product deleted'})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getProducts
    
}