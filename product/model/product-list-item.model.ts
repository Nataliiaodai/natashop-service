import {MultiLangText} from "../../shared-model/multiLangText.model";
import {MediasObjectModel} from "../../shared-model/medias.object.model";


export class ProductListItem {
    _id: number;
    name: MultiLangText;
    price: number;
    medias: MediasObjectModel[] = [];

    constructor(_id = 0, name: MultiLangText = new MultiLangText(), price = 0, medias: MediasObjectModel[] = []) {
      this._id = _id;
      this.name = name;
      this.price = price;
      this.medias = medias;
    }
}
