import {MultiLangText} from "./multiLangText.model";
import {CategoryMediasModel} from "./category-medias.model";


export class Category {
    _id: number;
    parentId: number;
    name: MultiLangText;
    slug: string;
    description: MultiLangText;
    medias: CategoryMediasModel [];
    size: string
    dimensions: string;

    constructor(_id = 0, parentId = 0,  name:  MultiLangText = new MultiLangText(), slug = '', description: MultiLangText = new MultiLangText(), medias: CategoryMediasModel [] = [], size = '', dimensions = '') {
        this._id = _id;
        this.parentId = parentId;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.medias = medias;
        this.size = size;
        this.dimensions = dimensions;
    }

}
