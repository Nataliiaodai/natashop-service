import {MediasObjectModel} from "../../shared-model/medias.object.model";
import {MultiLangText} from "../../shared-model/multiLangText.model";
import {CategoriesIdentifyModel} from "../../category/model/categories-identify.model";
import {Expose, Type} from "class-transformer";


export class Product {

    @Expose()
    @Type(() => MultiLangText)
    name: MultiLangText;

    @Expose()
    price: number;

    @Expose()
    note: string = '';

    @Expose()
    _id: number;

    @Expose()
    @Type(() => MultiLangText)
    fullDescription: MultiLangText;

    @Expose()
    slug: string;

    @Expose()
    @Type(() => MediasObjectModel)
    medias: MediasObjectModel[] = [];

    @Expose()
    @Type(() => CategoriesIdentifyModel)
    categories: CategoriesIdentifyModel [] = [];


    /*constructor(name: MultiLangText = new MultiLangText(),
                price = 0,
                note = '',
                _id = 0,
                fullDescription: MultiLangText = new MultiLangText(),
                slug: string = '',
                medias: MediasObjectModel [] = [],
                categories: CategoriesIdentifyModel [] = []) {
        this.name = name;
        this.price = price;
        this.note = note;
        this._id = _id;
        this.fullDescription = fullDescription;
        this.slug = slug;
        this.medias = medias;
        this.categories = categories;
    }



    getDetailsLabel(): string {
        return `Product name: ${this.name} price: ${this.price}, ID: ${this._id}, categories: ${this.categories}`;

    }*/

}



