import {MediasObjectModel} from "../../shared-model/medias.object.model";
import {MultiLangText} from "../../shared-model/multiLangText.model";
import {CategoriesIdentifyModel} from "../../category/model/categories-identify.model";
import {AttributesModel} from "../../shared-model/atributes.modell";

export class ClientProductDto {

    categories: CategoriesIdentifyModel [] = [];
    attributes: AttributesModel [] = [];
    medias: MediasObjectModel[] = [];
    name: string;
    slug: string;
    fullDescription: string;
    price: number;

    constructor(
        categories: CategoriesIdentifyModel [] = [],
        attributes: AttributesModel [] = [],
        medias: MediasObjectModel[] = [],
        name: string = '',
        slug: string = '',
        fullDescription: string = '',
        price: number = 0,
        )
    {
        this.categories = categories;
        this.attributes = attributes;
        this.medias = medias;
        this.name = name;
        this. slug = slug;
        this.fullDescription = fullDescription;
        this.price = price;
    }


}
