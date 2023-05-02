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



    deleteCategoryByCategoryId(categoryId: number) : Category {
        for (let i = 0; i < this.categories.length; i += 1) {
            if (this.categories[i].id === categoryId) {
                let deletedCategory: Category = this.categories[i]
                this.categories.splice(i, 1);
                console.log(`Category with id ${categoryId} was successful deleted.`);
                return deletedCategory;
            }
        }
        console.log('there is no category with such id');
    }

}
