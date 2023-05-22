import Express from 'express';
import 'reflect-metadata';
import {Product} from "./product/model/product.model";
import {ProductService} from "./product/product.service";
import {CategoryService} from "./category/category.service";
import {Category} from "./category/model/category.model";
import {ClientProductDto} from "./product/model/client-product.dto";
import {ClientCategoryDto} from "./category/model/client-category-dto";
import {ClientProductPageDto} from "./product/model/client-product-page.dto";
import {AdminProductPageDto} from "./product/model/admin-product-page.dto";
import {CategoryTreeDto} from "./category/model/category.tree.dto";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3003;
const multer = require("multer");

const storageEngine = multer.diskStorage({
    destination: "uploads/products",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

const path = require("path");

const checkFileType = function (file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};

app.post("/api/v1/admin/products/media" , upload.single("image"), (req, res) => {
    if (req.file) {
        res.send("Single file uploaded successfully");
    } else {
        res.status(400).send("Please upload a valid image");
    }
});




// const upload = multer({ dest: "uploads/" });
// const upload = multer({ dest: "/Users/nataliiaodai/projects/natashop-service/uploads/products" });

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const categoryService = new CategoryService();

const productService = new ProductService(categoryService);


console.log('---------------');
console.log('---------------');


/** admin API/Products */


app.get('/api/v1/admin/products/:productId', (req, res) => {
    const productId: number = Number(req.params.productId);
    const product: Product = productService.getProductByProductId(productId);

    if (!product) {
        res.status(404).json({error: 'There is no such product'});
    } else {
        res.status(200).json(product);
    }
})



app.delete('/api/v1/admin/products/:productId', (req, res) => {
    const productId: number = Number(req.params.productId);
    let deletedProduct: Product = productService.deleteProductByProductId(productId);

    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({error: `product with id: ${productId}  NOT FOUND`});
    }

})


app.put('/api/v1/admin/products/:productId', (req, res) => {
    const productId: number = Number(req.params.productId);
    const changedProduct = productService.changeProductByProductId(productId, req.body);

    if (changedProduct) {
        res.json(changedProduct);
    } else {
        res.status(404).json({error: `product with id: ${productId}  NOT FOUND`});
    }
})


app.post('/api/v1/admin/products', (req, res) => {
    const createdProduct = productService.createProduct(req.body);

    if (createdProduct) {
        res.json(createdProduct);
    } else {
        res.status(404).json({error: 'Invalid request'});
    }
})


app.get('/api/v1/admin/products', (req, res) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const searchString: string = req.query.searchString;
    const sort: string = req.query.sort;
    const direction: string = req.query.direction;
    const categoryId: number = Number(req.query.categoryId);

    let pageToReturnOnAdmin: AdminProductPageDto = productService.getAdminProductPage(page, limit, searchString, sort, direction, categoryId);

    if (!pageToReturnOnAdmin) {
        res.status(404).json({error: 'No items found'});
    } else {
        res.status(200).json(pageToReturnOnAdmin);
    }
})



// app.post('/api/v1/admin/products/media',upload.single("file"), uploadFile);
// // @ts-ignore
// function uploadFile(req, res) {
//     console.log(req.body);
//     console.log(req.files);
//     res.json({ message: "Successfully uploaded files" });
// }

// @ts-ignore
// app.post('/api/v1/admin/products/media',upload.array("files"), (req, res) => {
//     // console.log(req.body);
//     console.log(req);
//     console.log(req.files);
//     res.json({ message: "Successfully uploaded files" });
// });




/** admin API/Categories */

app.get('/api/v1/admin/categories/tree', (req, res) => {
    const tree: CategoryTreeDto = categoryService.getAdminCategoryTree();

    if (tree) {
        res.json(tree);
    } else {
        res.status(404).json({error: 'Invalid request'});
    }
})


app.get('/api/v1/admin/categories/:categoryId', (req, res) => {
    const categoryId: number = Number(req.params.categoryId);
    const category: Category = categoryService.getCategoryByCategoryId(categoryId);

    if (!category) {
        res.status(404).json({error: 'There is no such category'});
    } else {
        res.status(200).json(category);
    }

})




app.delete('/api/v1/admin/categories/:categoryId', (req, res) => {
    const categoryId: number = Number(req.params.categoryId);
    let deletedCategory: Category = categoryService.deleteCategoryByCategoryId(categoryId);

    if (deletedCategory) {
        res.json(deletedCategory);
    } else {
        res.status(404).json({error: `category with id: ${categoryId}  NOT FOUND`});
    }
})


app.put('/api/v1/admin/categories/:categoryId', (req, res) => {
    const categoryId: number = Number(req.params.categoryId);
    const changedCategory = categoryService.changeCategoryByCategoryId(categoryId, req.body);

    if (changedCategory) {
        res.json(changedCategory);
    } else {
        res.status(404).json({error: `category with id: ${categoryId}  NOT FOUND`});
    }
})




app.post('/api/v1/admin/categories', (req, res) => {
    const createdCategory = categoryService.createCategory(req.body);

    if (createdCategory) {
        res.json(createdCategory);
    } else {
        res.status(404).json({error: 'Invalid request'});
    }
})





/** client API/Products */

app.get('/api/v1/products/slug/:slug', (req, res) => {
    const productSlug: string = req.params.slug;

    const productBySlug: ClientProductDto = productService.getProductBySlug(productSlug);

    if (productBySlug) {
        res.json(productBySlug);
    } else {
        res.status(404).json({error: 'Invalid request'});
    }
})



app.get('/api/v1/products', (req, res) => {

    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const searchString: string = req.query.searchString;
    const sort: string = req.query.sort;
    const direction: string = req.query.direction;
    const categoryId: number = Number(req.query.categoryId);

    let pageToReturnOnClient: ClientProductPageDto = productService.getClientProductPage(page, limit, searchString, sort, direction, categoryId);

    if (!pageToReturnOnClient) {
        res.status(404).json({error: 'No items found'});
    } else {
        res.status(200).json(pageToReturnOnClient);
    }

})






/** client API/Categories */


app.get('/api/v1/categories/:slug', (req, res) => {
    const slug: string = req.params.slug;

    const  categoryBySlug: ClientCategoryDto = categoryService.getCategoryBySlug(slug);

    if (categoryBySlug) {
        res.json(categoryBySlug);
    } else {
        res.status(404).json({error: 'Invalid request'});
    }

})




app.listen(port, '0.0.0.0', function () {
    console.log('Listening at http://localhost:3003/\n')
})
