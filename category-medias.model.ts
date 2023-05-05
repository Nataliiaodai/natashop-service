
import {MultiLangText} from "./multiLangText.model";
import {CategoryImageURLModel} from "./category-image-URL.model";

export class CategoryMediasModel {
  variantsUrls : CategoryImageURLModel;
  altText: MultiLangText;

  constructor(variantsUrls = new CategoryImageURLModel(), altText: MultiLangText = new MultiLangText()) {
    this.variantsUrls = variantsUrls;
    this.altText = altText;
  }

}
