import {Product} from "./product.model";
import {ProductService} from "./product.service";
import {CategoryService} from "./category.service";
import {Category} from "./category.model";


const productService = new ProductService();
const categoryService = new CategoryService();

const productsByCategoryId: Product [] = productService.getProductsByCategoryId(3);
// for (let prod of productsByCategoryId) {
//     let detailOfFoundProduct: string = prod.getDetailsLabel();
//     // console.log(detailOfFoundProduct);
// }


console.log('---------------');
console.log('---------------');
console.log('---------------');


const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3003;


app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @ts-ignore
app.get('/api/v1/admin/products/:productId', (req, res) => {
    // console.log("Try to find product by id", req.params.productId);
    const productId: number = Number(req.params.productId);
    const product: Product = productService.getProductByProductId(productId);
    if (!product) {
        // console.log("Not Found product by id", productId);
        res.status(404).json({error: 'There is no such product'});
    } else {
        // console.log("Found product by id", productId, product);
        res.status(200).json(product);
    }
})


// @ts-ignore
app.get('/api/v1/admin/categories/:categoryId', (req, res) => {
    // console.log("Try to find category by id", req.params.categoryId);
    const categoryId: number = Number(req.params.categoryId);
    const category: Category = categoryService.getCategoryByCategoryId(categoryId);
    // console.log("Found category by id", categoryId, category);

    if (!category) {
        // console.log("Not Found category by id", categoryId);
        res.status(404).json({error: 'There is no such category'});
    } else {
        // console.log("Found product by id", categoryId, category);
        res.status(200).json(category);
    }

})


// @ts-ignore
app.delete('/api/v1/admin/products/:productId', (req, res) => {
    const productId: number = Number(req.params.productId);
    let deletedProduct: Product = productService.deleteProductByProductId(productId);
    if (deletedProduct) {
        // console.log(`product with id: ${productId}  was DELETED`);
        res.json(deletedProduct);
    } else {
        // console.log(`product with id: ${productId}  NOT FOUND`);
        res.status(404).json({error: `product with id: ${productId}  NOT FOUND`});
    }

})


// @ts-ignore
app.delete('/api/v1/admin/categories/:categoryId', (req, res) => {
    const categoryId: number = Number(req.params.categoryId);
    // console.log(categoryId);
    let deletedCategory: Category = categoryService.deleteCategoryByCategoryId(categoryId);
    if (deletedCategory) {
        // console.log(`category with id: ${categoryId}  was DELETED`);
        res.json(deletedCategory);
    } else {
        // console.log(`category with id: ${categoryId}  NOT FOUND`);
        res.status(404).json({error: `category with id: ${categoryId}  NOT FOUND`});
    }
})


// @ts-ignore
app.put('/api/v1/admin/categories/:categoryId', (req, res) => {
    const categoryId: number = Number(req.params.categoryId);
    const changedCategory = categoryService.changeCategoryByCategoryId(categoryId, req.body);

    if (changedCategory) {
        res.json(changedCategory);
    } else {
        res.status(404).json({error: `category with id: ${categoryId}  NOT FOUND`});
    }
})




// @ts-ignore
app.put('/api/v1/admin/products/:productId', (req, res) => {
    const productId: number = Number(req.params.productId);
    const changedProduct = productService.changeProductByProductId(productId, req.body);

    if (changedProduct) {
        res.json(changedProduct);
    } else {
        res.status(404).json({error: `product with id: ${productId}  NOT FOUND`});
    }
})


// @ts-ignore
app.post('/api/v1/admin/products', (req, res) => {
    const createdProduct = productService.createProduct(req.body);

    if (createdProduct) {
        res.json(createdProduct);
    } else {
        res.status(404).json({error: 'Invalid request'});
    }
})


// @ts-ignore
app.post('/api/v1/admin/categories', (req, res) => {
    const createdCategory = categoryService.createCategory(req.body);

    if (createdCategory) {
        res.json(createdCategory);
    } else {
        res.status(404).json({error: 'Invalid request'});
    }
})




app.listen(port, '0.0.0.0', function () {
    console.log('Listening at http://localhost:3003/\n')
})
