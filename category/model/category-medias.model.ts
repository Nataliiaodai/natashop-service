
import {MultiLangText} from "../../shared-model/multiLangText.model";
import {ImageUrlModel} from "../../shared-model/image-url.model";

export class CategoryMediasModel {
  variantsUrls : ImageUrlModel;
  altText: MultiLangText;

  constructor(variantsUrls = new ImageUrlModel(), altText: MultiLangText = new MultiLangText()) {
    this.variantsUrls = variantsUrls;
    this.altText = altText;
  }

}
