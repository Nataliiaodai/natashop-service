import {Category} from "./category.model";

export class CategoryService {

    categories: Category []

    constructor() {
        this.categories = [
            new Category(1, 'Paint'),
            new Category(2, 'Acrylic Paint'),
            new Category(3, 'Watercolor Paint'),
            new Category(4, 'Oil Paint'),
            new Category(5, 'Brushes'),
        ];
    }


    //достать категорию, а затем ее имя, по айдишникам категорий в продакте

    getCategoryNameByCategoryId(categoryId: number): string {
        let categoryName: string;
        for (let category of this.categories) {
            if (category.id === categoryId) {
                categoryName = category.name;
            }
        }
        return categoryName;
    }


    getCategoryByCategoryId(categoryId: number): Category {
        let foundCategory: Category;
        for (let category of this.categories) {
            if(category.id === categoryId) {
                foundCategory = category;
            }
        }
        return foundCategory;
    }

}
