import {Product} from "./model/product.model";
import {ClientProductDto} from "./model/client-product.dto";
import {AdminProductPageDto} from "./model/admin-product-page.dto";
import {ClientProductPageDto} from "./model/client-product-page.dto";
import {ClientProductFilterValueDto} from "./model/client-product-filter-value.dto";
import {ClientProductListItemDto} from "./model/client-product-list-item.dto";
import {ClientMediaDto} from "./model/client-media.dto";
import {MediasObjectModel} from "../shared-model/medias.object.model";
import {plainToClass} from "class-transformer";


export class ProductService {

    products: Product[];
    maxId: number = 0;


    constructor() {
        const rawProducts: Product[] = require('../data/products-initial-data.json');
        this.products = [];
        for (let rawProduct of rawProducts) {
            const product : Product = plainToClass(Product, rawProduct, { excludeExtraneousValues: true });
            this.products.push(product);
        }
        // this.products = plainToClass(Product, this.products, {excludeExtraneousValues: true})
        // this.products = removeExtraFields(this.products, Product);

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

    getSortedAdminProducts(productsToSort: Product[], sort: string, direction: string): Product[] {
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

    getAdminProductPage(page: number, limit: number, searchString?: string, sort?: string, direction?: string): AdminProductPageDto {
        let pageToReturnOnAdmin: AdminProductPageDto = new AdminProductPageDto();
        pageToReturnOnAdmin.itemsFiltered = this.products.length;
        pageToReturnOnAdmin.itemsTotal = this.products.length;
        pageToReturnOnAdmin.pagesTotal = Math.round(pageToReturnOnAdmin.itemsFiltered / limit);
        pageToReturnOnAdmin.page = page;


        let sortedProducts: Product [] = this.getSortedAdminProducts(this.products, sort, direction);

        const start = limit * page - limit;
        const end = start + limit;
        for (let i = start; i < end; i += 1) {
            pageToReturnOnAdmin.data.push(sortedProducts[i]);
        }

        return pageToReturnOnAdmin;
    }


    getProductBySlug(slug: string): ClientProductDto {

        for (let product of this.products) {
            if (product.slug === slug) {
                const productBySlug: ClientProductDto = new ClientProductDto();

                productBySlug.slug = slug;
                productBySlug.name = product.name.uk;
                productBySlug.medias = product.medias.map(mediaModel => {
                    return {
                        altText: mediaModel.altText.uk,
                        variantsUrls: mediaModel.variantsUrls
                    };
                });

                productBySlug.price = product.price;
                productBySlug.categories = product.categories;
                // productBySlug.attributes =
                productBySlug.fullDescription = product.fullDescription.uk;
                return productBySlug;
            }
        }

        return undefined;
    }


    getClientProductPage(page: number, limit: number, searchString?: string, sort?: string, direction?: string): ClientProductPageDto {
        let pageToReturnOnClient: ClientProductPageDto = new ClientProductPageDto();
        pageToReturnOnClient.itemsFiltered = this.products.length;
        pageToReturnOnClient.itemsTotal = this.products.length;
        pageToReturnOnClient.pagesTotal = Math.round(pageToReturnOnClient.itemsFiltered / limit);
        pageToReturnOnClient.page = page;

        let tempSortedProducts: Product[] = this.getSortedAdminProducts(this.products, sort, direction);
        let sortedClientProd: ClientProductListItemDto = new ClientProductListItemDto();


        for (let prod of tempSortedProducts) {
            sortedClientProd.categories = prod.categories;
            sortedClientProd.attributes = [];

            sortedClientProd.medias = prod.medias.map(mediaModel => {
                return {
                    altText: mediaModel.altText.uk,
                    variantsUrls: mediaModel.variantsUrls
                };
            });
            // sortedClientProd.medias = [];
            // for (let mediaModel of prod.medias) {
            //     sortedClientProd.medias.push(
            //         {
            //             altText : mediaModel.altText.uk,
            //             variantsUrls : mediaModel.variantsUrls
            //         }
            //     )
            // }

            sortedClientProd.name = prod.name.uk;
            sortedClientProd.slug = prod.slug;
            sortedClientProd.fullDescription = prod.fullDescription.uk;
            sortedClientProd.price = prod.price;
        }

        const start = limit * page - limit;
        const end = start + limit;
        for (let i = start; i < end; i += 1) {
            pageToReturnOnClient.data.push(sortedClientProd);
        }

        return pageToReturnOnClient;
    }


}
