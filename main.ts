import {Product} from "./product/model/product.model";
import {ProductService} from "./product/product.service";
import {CategoryService} from "./category/category.service";
import {Category} from "./category/model/category.model";
import {AdminProductPageDto} from "./product/model/admin-product-page-dto";


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

productService.getProductPage(1, 2);

console.log('---------------');

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3003;


app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/** Admin API/Products */

// @ts-ignore
app.get('/api/v1/admin/products/:productId', (req, res) => {
    const productId: number = Number(req.params.productId);
    const product: Product = productService.getProductByProductId(productId);

    if (!product) {
        res.status(404).json({error: 'There is no such product'});
    } else {
        res.status(200).json(product);
    }
})


// @ts-ignore
app.delete('/api/v1/admin/products/:productId', (req, res) => {
    const productId: number = Number(req.params.productId);
    let deletedProduct: Product = productService.deleteProductByProductId(productId);

    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({error: `product with id: ${productId}  NOT FOUND`});
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
app.get('/api/v1/admin/products', (req, res) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const sort: string = req.query.sort;
    const direction: string = req.query.direction;

   let pageToReturn: AdminProductPageDto = productService.getProductPage(page, limit, sort, direction);
    console.log( 'pageToReturn ', pageToReturn.data.length);

    // console.log('req.query' , req.query);

    if (!pageToReturn) {
        res.status(404).json({error: 'No items found'});
    } else {
        res.status(200).json(pageToReturn);
    }
})




/** Admin API/Categories */


// @ts-ignore
app.get('/api/v1/admin/categories/:categoryId', (req, res) => {
    const categoryId: number = Number(req.params.categoryId);
    const category: Category = categoryService.getCategoryByCategoryId(categoryId);

    if (!category) {
        res.status(404).json({error: 'There is no such category'});
    } else {
        res.status(200).json(category);
    }

})




// @ts-ignore
app.delete('/api/v1/admin/categories/:categoryId', (req, res) => {
    const categoryId: number = Number(req.params.categoryId);
    let deletedCategory: Category = categoryService.deleteCategoryByCategoryId(categoryId);

    if (deletedCategory) {
        res.json(deletedCategory);
    } else {
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
