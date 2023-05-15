import {MediasObjectModel} from "../../shared-model/medias.object.model";
import {CategoriesIdentifyModel} from "../../category/model/categories-identify.model";
import {AttributesModel} from "../../shared-model/atributes.modell";
import {ClientMediaDto} from "./client-media.dto";

export class ClientProductDto {

    categories: CategoriesIdentifyModel [] = [];
    attributes: AttributesModel [] = [];
    medias: ClientMediaDto[] = [];
    name: string;
    slug: string;
    fullDescription: string;
    price: number;

    constructor(
        categories: CategoriesIdentifyModel [] = [],
        attributes: AttributesModel [] = [],
        medias: ClientMediaDto[] = [],
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
        this.slug = slug;
        this.fullDescription = fullDescription;
        this.price = price;
    }


}
