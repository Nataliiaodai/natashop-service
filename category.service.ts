import {Category} from "./category.model";
import {Product} from "./product.model";

export class CategoryService {

    categories: Category []

    constructor() {
        this.categories = require('./data/categories-initial-data.json');
        // this.categories = [
        //     new Category(1, 'Paint'),
        //     new Category(2, 'Acrylic Paint'),
        //     new Category(3, 'Watercolor Paint'),
        //     new Category(4, 'Oil Paint'),
        //     new Category(5, 'Brushes'),
        // ];
    }


    //достать категорию, а затем ее имя, по айдишникам категорий в продакте

    getCategoryNameByCategoryId(categoryId: number): string {
        let categoryName: string;
        for (let category of this.categories) {
            if (category._id === categoryId) {
                categoryName = category.name.uk;
            }
        }
        return categoryName;
    }


    getCategoryByCategoryId(categoryId: number): Category {
        let foundCategory: Category;
        for (let category of this.categories) {
            if (category._id === categoryId) {
                foundCategory = category;
            }
        }
        return foundCategory;
    }


    deleteCategoryByCategoryId(categoryId: number): Category {
        let deletedCategory: Category;
        for (let i = 0; i < this.categories.length; i += 1) {
            if (this.categories[i]._id === categoryId) {
                deletedCategory = this.categories[i];
                this.categories.splice(i, 1);
                console.log(`Category with id ${categoryId} was successful deleted.`);
                break;
            }
        }
        if (!deletedCategory) {
            console.log('there is no category with such id');
        }
        return deletedCategory;
    }


    changeCategoryByCategoryId(categoryId: number, source: Category): Category {
        let changedCategory: Category;
        const categoryToChange: Category = this.getCategoryByCategoryId(categoryId);

        if (categoryToChange) {
            source._id = categoryId;
            changedCategory = Object.assign(categoryToChange, source)
        }

        return changedCategory;
    }


    createCategory(source: Category): Category {
        let createdCategory: Category;
        let idOfLastCategory: number = this.categories[this.categories.length - 1]._id;
        source._id = idOfLastCategory + 1;
        this.categories.push(source);
        createdCategory = this.getCategoryByCategoryId(source._id);

        return createdCategory;
    }


}
