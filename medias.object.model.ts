import {MultiLangText} from "./multiLangText.model";


class ImageURLSModel {
}

export class MediasObjectModel {
    altText: MultiLangText;
    variantsUrls: ImageURLSModel;

    constructor(altText: MultiLangText = new MultiLangText(), variantsUrls: ImageURLSModel = new ImageURLSModel()) {
        this.altText = altText;
        this.variantsUrls = variantsUrls;
    }
}
