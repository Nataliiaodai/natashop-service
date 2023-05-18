import {Product} from "./model/product.model";
import {ClientProductDto} from "./model/client-product.dto";
import {AdminProductPageDto} from "./model/admin-product-page.dto";
import {ClientProductPageDto} from "./model/client-product-page.dto";

import {plainToClass} from "class-transformer";
import {CategoryService} from "../category/category.service";
import {Category} from "../category/model/category.model";
import {CategoriesIdentifyModel} from "../category/model/categories-identify.model";
import {ClientProductCategoryDto} from "./model/client-product-category.dto";
import {AdminProductDto} from "./model/admin-product.dto";


export class ProductService {

    private readonly products: Product[];
    private maxId: number = 0;

    private readonly categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
        const rawProducts: Product[] = require('../data/products-initial-data.json');
        this.products = [];
        for (let rawProduct of rawProducts) {
            const product: Product = plainToClass(Product, rawProduct, {excludeExtraneousValues: true});
            this.products.push(product);
        }


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


    filterProduct(products: Product[], searchString: string): Product[] {
        let filteredProductsByName: Product[] = [];
        if (searchString) {
            for (let i = 0; i < this.products.length; i += 1) {
                let nameToLowerCase: string = this.products[i].name.uk.toLowerCase();
                if (nameToLowerCase.includes(searchString.toLowerCase())) {
                    filteredProductsByName.push(this.products[i]);
                }
            }

        } else {
            filteredProductsByName = this.products;
        }

        return filteredProductsByName;
    }

    getAdminProductPage(page: number, limit: number, searchString?: string, sort?: string, direction?: string): AdminProductPageDto {
        const filteredProductsByName: Product[] = this.filterProduct(this.products, searchString);
        const sortedProducts: Product[] = this.getSortedProducts(filteredProductsByName, sort, direction);
        const adminProductData: AdminProductDto[] = this.getProductPage(limit, page, sortedProducts);

        return {
            itemsFiltered : filteredProductsByName.length,
            itemsTotal: this.products.length,
            pagesTotal: Math.round(filteredProductsByName.length / limit),
            page: page,
            data: adminProductData
        }
    }

    private getProductPage(limit: number, page: number, sortedProducts: Product[]): AdminProductDto[] {
        const adminProductData: AdminProductDto[] = [];
        const start = limit * page - limit;
        const end = start + limit;
        for (let i = start; i < end; i += 1) {
            adminProductData.push(sortedProducts[i]);
        }
        return adminProductData;
    }

    toClientProductCategories(prodCategories: CategoriesIdentifyModel[]): ClientProductCategoryDto[] {
        const clientCategories: ClientProductCategoryDto[] = [];
        for (let category of prodCategories) {
            let categoryByCategoryId: Category;
            categoryByCategoryId = this.categoryService.getCategoryByCategoryId(category.id);

            if (categoryByCategoryId) {
                clientCategories.push({
                    id: category.id,
                    name: categoryByCategoryId.name.uk,
                    slug: categoryByCategoryId.slug
                })
            }
        }
        return clientCategories;
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
                // productBySlug.attributes =
                productBySlug.fullDescription = product.fullDescription.uk;
                productBySlug.categories = this.toClientProductCategories(product.categories);
                return productBySlug;
            }
        }

        return undefined;
    }


    getClientProductPage(page: number, limit: number, searchString?: string, sort?: string, direction?: string): ClientProductPageDto {
        let getAdminProdPageResult: AdminProductPageDto = this.getAdminProductPage(page, limit, searchString, sort, direction);

        let clientProductDataItems: ClientProductDto[] = [];
        let adminProductDataItems: AdminProductDto[] = getAdminProdPageResult.data;

        for (let item of adminProductDataItems) {
            let dataItem: ClientProductDto = {
                categories: this.toClientProductCategories(item.categories),
                attributes: [],
                medias: item.medias.map(mediaModel => {
                    return {
                        altText: mediaModel.altText.uk,
                        variantsUrls: mediaModel.variantsUrls
                    };
                }),
                name: item.name.uk,
                slug: item.slug,
                fullDescription: item.fullDescription.uk,
                price: item.price,
            }

            clientProductDataItems.push(dataItem);
        }

        return {
            filters: [],
            itemsFiltered: getAdminProdPageResult.itemsFiltered,
            itemsTotal: getAdminProdPageResult.itemsTotal,
            page: getAdminProdPageResult.page,
            pagesTotal: getAdminProdPageResult.pagesTotal,
            data: clientProductDataItems
        };

    }

}
