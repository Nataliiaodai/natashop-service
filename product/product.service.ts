import {Product} from "./model/product.model";
import {AdminProductPageDto} from "./model/admin-product-page-dto";


export class ProductService {

    products: Product [];
    maxId: number = 0;


    constructor() {
        this.products = require('../data/products-initial-data.json');

        for (let i = 0; i < this.products.length; i += 1) {
            if (this.products[i]._id > this.maxId) {
                this.maxId = this.products[i]._id;
            }
        }

    };

    getProductsByCategoryId(categoryId: number): Product[] {
        const filteredProducts = [];
        for (let product of this.products) {
            for (let category of product.categories) {
                if (category.id === categoryId) {
                    filteredProducts.push(product);
                }
            }
        }
        return filteredProducts;
    };

    getProductByProductId(productId: number): Product {
        for (let product of this.products) {
            if (product._id === productId) {
                return product;
            }
        }
    };

    deleteProductByProductId(productId: number): Product {
        for (let i = 0; i < this.products.length; i += 1) {
            let deletedProduct: Product = this.products[i];
            if (this.products[i]._id === productId) {
                this.products.splice(i, 1);
                console.log(`Product with id ${productId} was successful deleted.`);
                return deletedProduct;
            }
        }
        console.log('there is no product with such id');
    };


    changeProductByProductId(productId: number, source: Product) {
        let changedProduct: Product;
        const productToChange: Product = this.getProductByProductId(productId);

        if (productToChange) {
            source._id = productId;
            changedProduct = Object.assign(productToChange, source)
        }

        return changedProduct;
    }


    createProduct(source: Product): Product {
        if (source.name.uk === '' || source.price < 0) {
            return;
        }

        let createdProduct: Product;
        this.maxId += 1;
        source._id = this.maxId;

        this.products.push(source);
        createdProduct = this.getProductByProductId(source._id);

        return createdProduct;
    }

    getSortedProducts(productsToSort: Product [], sort: string, direction: string): Product [] {
        if (sort === '_id' && direction === 'asc') {
            return productsToSort.sort((x, y) => x._id - y._id);
        }
        if (sort === '_id' && direction === 'desc') {
            return productsToSort.sort((x, y) => y._id - x._id);
        }
        if (sort === 'name' && direction === 'asc') {
            return productsToSort.sort((x, y) =>
                x.name.uk.localeCompare(y.name.uk));
        }
        if (sort === 'name' && direction === 'desc') {
            return productsToSort.sort((x, y) =>
                y.name.uk.localeCompare(x.name.uk));
        }
        if (sort === 'price' && direction === 'asc') {
            return productsToSort.sort((x, y) => x.price - y.price);
        }
        if (sort === 'price' && direction === 'desc') {
            return productsToSort.sort((x, y) => y.price - x.price);
        }

    }

    getProductPage(page: number, limit: number, searchString?: string, sort?: string, direction?: string): AdminProductPageDto {
        let pageToReturn: AdminProductPageDto = new AdminProductPageDto();
        pageToReturn.itemsFiltered = this.products.length;
        pageToReturn.itemsTotal = this.products.length;
        pageToReturn.pagesTotal = Math.round(pageToReturn.itemsFiltered / limit);
        pageToReturn.page = page;

        // console.log('sort', sort);
        // console.log('direction', direction);

        let sortedProducts: Product [] = this.getSortedProducts(this.products, sort, direction);

        const start = limit * page - limit;
        const end = start + limit;
        for (let i = start; i < end; i += 1) {
            pageToReturn.data.push(sortedProducts[i]);
        }

        return pageToReturn;
    }


}
