import {Product} from "./product.model";
import {ProductService} from "./product.service";
import {CategoryService} from "./category.service";


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

//дернуть метод, который возвращает имя категорий по айдишникам категорий в продакте
let categoryName: string = categoryService.getCategoryNameByCategoryId(2);
console.log(categoryName);





console.log('---------------');


// productService.deleteProductByProductId(2);



console.log('---------------');


// productService.deleteProductByProductId(2);







