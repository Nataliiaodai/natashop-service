import {MultiLangText} from "./multiLangText.model";
import {ImageUrlModel} from "./image-url.model";


export class MediasObjectModel {
    altText: MultiLangText;
    variantsUrls: ImageUrlModel;

    constructor(altText: MultiLangText = new MultiLangText(), variantsUrls: ImageUrlModel = new ImageUrlModel()) {
        this.altText = altText;
        this.variantsUrls = variantsUrls;
    }

}
