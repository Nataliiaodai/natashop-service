import {Product} from "./product.model";
import {ProductService} from "./product.service";
import {CategoryService} from "./category.service";
import {Category} from "./category.model";


const productService = new ProductService();
const categoryService = new CategoryService();

const productsByCategoryId: Product [] = productService.getProductsByCategoryId(3);
for ( let prod of productsByCategoryId) {
    let detailOfFoundProduct: string = prod.getDetailsLabel();
    // console.log(detailOfFoundProduct);
}


// console.log('------- productService.getProductByProductId(5); --------');


let product: Product = productService.getProductByProductId(5);
// console.log(product.getDetailsLabel());



console.log('---------------');


// let categoryName: string = categoryService.getCategoryNameByCategoryId(2);
// console.log(categoryName);

// console.log(categoryService.getCategoryByCategoryId(4));




console.log('---------------');


// productService.deleteProductByProductId(2);



console.log('---------------');


// productService.deleteProductByProductId(2);


const express = require('express')
const app = express()

// @ts-ignore
app.get('/api/v1/admin/products/:productId', function (req, res) {
    console.log("Try find product by id", req.params.productId);
    const productId : number= Number(req.params.productId);
    const product: Product = productService.getProductByProductId(productId);
    console.log("Found product by id", productId, product);
    res.json(product);
})



// @ts-ignore
app.get('/api/v1/admin/categories/:categoryId', function (req, res) {
    console.log("Try find category by id", req.params.categoryId);
    const categoryId : number= Number(req.params.categoryId);
    const category: Category = categoryService.getCategoryByCategoryId(categoryId);
    console.log("Found category by id", categoryId, category);
    res.json(category);
})

app.listen(3003, '0.0.0.0', function () {
    console.log('Listening at http://localhost:3003/\n')
})
