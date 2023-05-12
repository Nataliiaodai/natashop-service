import {Product} from "./model/product.model";
import {AdminProductPageDto} from "./model/admin-product-page-dto";
import {ClientProductDto} from "./model/client-product-dto";


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

    getSortedProducts(productsToSort: Product[], sort: string, direction: string): Product[] {
        let compareFunction: (a: Product, b: Product) => number;
        if (sort === '_id' || sort === 'price') {
            compareFunction = (x, y) => direction === 'asc'
                ? x[sort] - y[sort] : y[sort] - x[sort];
        }
        if (sort === 'name') {
            compareFunction = (x, y) => direction === 'asc'
                ? x.name.uk.localeCompare(y.name.uk) : y.name.uk.localeCompare(x.name.uk);
        }
        return productsToSort.sort(compareFunction);
    }

    getProductPage(page: number, limit: number, searchString?: string, sort?: string, direction?: string): AdminProductPageDto {
        let pageToReturn: AdminProductPageDto = new AdminProductPageDto();
        pageToReturn.itemsFiltered = this.products.length;
        pageToReturn.itemsTotal = this.products.length;
        pageToReturn.pagesTotal = Math.round(pageToReturn.itemsFiltered / limit);
        pageToReturn.page = page;


        let sortedProducts: Product [] = this.getSortedProducts(this.products, sort, direction);

        const start = limit * page - limit;
        const end = start + limit;
        for (let i = start; i < end; i += 1) {
            pageToReturn.data.push(sortedProducts[i]);
        }

        return pageToReturn;
    }


    getProductBySlug(slug: string): ClientProductDto {

        for (let product of this.products) {
            if (product.slug === slug) {
                const productBySlug: ClientProductDto = new ClientProductDto();

                productBySlug.slug = slug;
                productBySlug.name = product.name.uk;
                productBySlug.medias = product.medias;
                productBySlug.price = product.price;
                productBySlug.categories = product.categories;
                // productBySlug.attributes =
                productBySlug.fullDescription = product.fullDescription.uk;
                return productBySlug
            }
        }

        return undefined;
    }


}
