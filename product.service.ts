import {Product} from "./product.model";

export class ProductService {

    products: Product [];

    constructor() {
        this.products = [
            new Product(1, 'ROSA acrylic paint. Blue 45ml', 45, [ 1, 2], 'hrn'),
            new Product(2, 'ROSA acrylic paint. Yellow 40ml', 45, [1, 2], 'hrn'),

            new Product(3, 'Academy oil paint. Moss Green 100 ml', 70, [1, 4], 'hrn'),
            new Product(4, 'Academy oil paint. Dark Blue 100 ml', 70, [1, 4], 'hrn'),
            new Product(5, 'Academy oil paint. Navy 100 ml', 70, [1, 4], 'hrn'),

            new Product(6, 'Daniel Smith watercolor paint. Hot Red 5 ml', 20, [1, 3], 'hrn'),
            new Product(7, 'Daniel Smith watercolor paint. Orange 5 ml', 20, [1, 3], 'hrn'),

            new Product(8, 'Santi Studio brush. Flat, synthetic', 35, [1, 5], 'hrn'),
            new Product(9, 'Da Vinci brush. Round, synthetic, soft', 40, [1, 5], 'hrn'),
        ];
    };

    getProductsByCategoryId(categoryId: number): Product[] {
        const filteredProducts = [];
        for (let product of this.products) {
            for (let category of product.categories) {
                if (category === categoryId) {
                    filteredProducts.push(product);
                }
            }
        }
        return filteredProducts;
    };

    getProductByProductId(productId: number): Product {
        for (let product of this.products) {
            if (product.id === productId) {
                return product;
            }
        }
    };

    deleteProductByProductId(productId: number): void {
        for (let i = 0; i < this.products.length; i += 1) {
            if (this.products[i].id === productId) {
                this.products.splice(i, 1);
                console.log(`Product with id ${productId} was successful deleted.`);
                // console.log(this.products);
                return;
            }
        }
        console.log('there is no product with such index');
    };

}
