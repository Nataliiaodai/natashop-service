import {AttributesModel} from "../../shared-model/atributes.modell";
import {ClientMediaDto} from "./client-media.dto";
import {ClientProductCategoryDto} from "./client-product-category.dto";

export class ClientProductDto {

    categories: ClientProductCategoryDto [] = [];
    attributes: AttributesModel [] = [];
    medias: ClientMediaDto[] = [];
    name: string;
    slug: string;
    fullDescription: string;
    price: number;


}
