import {Product} from "./product.model";
import {ProductService} from "./product.service";
import {CategoryService} from "./category.service";
import {Category} from "./category.model";


const productService = new ProductService();
const categoryService = new CategoryService();

const productsByCategoryId: Product [] = productService.getProductsByCategoryId(3);
for (let prod of productsByCategoryId) {
    let detailOfFoundProduct: string = prod.getDetailsLabel();
    // console.log(detailOfFoundProduct);
}


// console.log('------- productService.getProductByProductId(5); --------');


let product: Product = productService.getProductByProductId(5);
// console.log(product.getDetailsLabel());


console.log('---------------');


// let categoryName: string = categoryService.getCategoryNameByCategoryId(2);
// console.log(categoryName);


// categoryService.deleteCategoryByCategoryId(5);
// console.log(categoryService.getCategoryByCategoryId(3));

console.log('---------------');


console.log(productService.deleteProductByProductId(8));


console.log('---------------');


// productService.deleteProductByProductId(2);


const express = require('express')
const app = express()

// @ts-ignore
app.get('/api/v1/admin/products/:productId', (req, res) => {
    console.log("Try find product by id", req.params.productId);
    const productId: number = Number(req.params.productId);
    const product: Product = productService.getProductByProductId(productId);
    if (!product) {
        console.log("Not Found product by id", productId);
        res.status(404).json({error: 'There is no such product'});
    } else {
        console.log("Found product by id", productId, product);
        res.status(200).json(product);
    }
})


// @ts-ignore
app.get('/api/v1/admin/categories/:categoryId', (req, res) => {
    console.log("Try find category by id", req.params.categoryId);
    const categoryId: number = Number(req.params.categoryId);
    const category: Category = categoryService.getCategoryByCategoryId(categoryId);
    console.log("Found category by id", categoryId, category);

    if (!category) {
        console.log("Not Found category by id", categoryId);
        res.status(404).json({error: 'There is no such category'});
    } else {
        console.log("Found product by id", categoryId, category);
        res.status(200).json(category);
    }

})


// @ts-ignore
app.delete('/api/v1/admin/products/:productId', (req, res) => {
    const productId: number = Number(req.params.productId);
    let deletedProduct: Product = productService.deleteProductByProductId(productId);
    if (deletedProduct) {
        console.log(`product with id: ${productId}  was DELETED`);
        res.json(deletedProduct);
    } else {
        console.log(`product with id: ${productId}  NOT FOUND`);
        res.status(404).json({error: `product with id: ${productId}  NOT FOUND`});
    }

})



// @ts-ignore
app.delete('/api/v1/admin/categories/:categoryId', (req, res) => {
    const categoryId: number = Number(req.params.categoryId);
    console.log(categoryId);
    let deletedCategory: Category = categoryService.deleteCategoryByCategoryId(categoryId);
    if (deletedCategory) {
        console.log(`category with id: ${categoryId}  was DELETED`);
        res.json(deletedCategory);
    } else {
        console.log(`category with id: ${categoryId}  NOT FOUND`);
        res.status(404).json({error: `category with id: ${categoryId}  NOT FOUND`});
    }
})


app.listen(3003, '0.0.0.0', function () {
    console.log('Listening at http://localhost:3003/\n')
})
