const Product = require("../models/products")
const mongoose = require('mongoose')

module.exports = {

    // get all producsts
    getProducts: async (req, res) => {
        const products = await Product.find({}).sort({createdAt: -1})
        res.status(200).json(products) //send it back as json
    },

    // get a single product
    getProduct: async (req, res) => {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such product'})
        }

        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({error: 'No such product'})
        }

        res.status(200).json(product)
    },


    // create new product
    createProduct: async (req, res) => {
        const {title, amount} = req.body

        let emptyFields = []

        if(!title){
            emptyFields.push('title')
        }
        if(!amount) {
            emptyFields.push('amount')
        }
        if(emptyFields.length > 0){
            return res.status(400).json({error: "Please fill in all the fields", emptyFields})
        }

        // add doc to db
        try{
            const product = await Product.create({title, amount})
            res.status(200).json(product)
        } catch(error){
            res.status(400).json({error: error.message})
        }
    },
    // delete a product
    deleteProduct: async (req, res) => {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such product'})
        }

        const product = await Product.findOneAndDelete({_id: id})

        if(!product){
            return res.status(404).json({error: 'No such product'})
        }

        res.status(200).json(product)

    },

    // update a product
    updateProduct: async (req, res) => {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such product'})
        }

        const product = await Product.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        if(!product){
            return res.status(404).json({error: 'No such product'})
        }

        res.status(200).json(product)

    }

}



