import {Product} from "./model/product.model";
import {ClientProductDto} from "./model/client-product.dto";
import {AdminProductPageDto} from "./model/admin-product-page.dto";
import {ClientProductPageDto} from "./model/client-product-page.dto";
import {ClientProductListItemDto} from "./model/client-product-list-item.dto";
import {plainToClass} from "class-transformer";
import {CategoryService} from "../category/category.service";
import {Category} from "../category/model/category.model";
import {CategoriesIdentifyModel} from "../category/model/categories-identify.model";
import {ClientProductCategoryDto} from "./model/client-product-category.dto";


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
        let tempSortedProducts: Product[] = this.getSortedAdminProducts(this.products, sort, direction);

        const sortedLimitedProducts: Product[] = [];
        const start = limit * page - limit;
        const end = start + limit;
        for (let i = start; i < end; i += 1) {
            sortedLimitedProducts.push(tempSortedProducts[i]);
        }



        let clientProducts : ClientProductListItemDto[] = [];

        for (let product of sortedLimitedProducts) {

            let clientProduct: ClientProductListItemDto = new ClientProductListItemDto();

            clientProduct.categories = this.toClientProductCategories(product.categories);
            clientProduct.attributes = [];

            clientProduct.medias = product.medias.map(mediaModel => {
                return {
                    altText: mediaModel.altText.uk,
                    variantsUrls: mediaModel.variantsUrls
                };
            });
            // clientProduct.medias = [];
            // for (let mediaModel of prod.medias) {
            //     clientProduct.medias.push(
            //         {
            //             altText : mediaModel.altText.uk,
            //             variantsUrls : mediaModel.variantsUrls
            //         }
            //     )
            // }

            clientProduct.name = product.name.uk;
            clientProduct.slug = product.slug;
            clientProduct.fullDescription = product.fullDescription.uk;
            clientProduct.price = product.price;

            clientProducts.push(clientProduct)
        }


        let pageToReturnOnClient: ClientProductPageDto = new ClientProductPageDto();
        pageToReturnOnClient.itemsFiltered = this.products.length;
        pageToReturnOnClient.itemsTotal = this.products.length;
        pageToReturnOnClient.pagesTotal = Math.round(pageToReturnOnClient.itemsFiltered / limit);
        pageToReturnOnClient.page = page;

        pageToReturnOnClient.data = clientProducts;

        return pageToReturnOnClient;
    }


}
