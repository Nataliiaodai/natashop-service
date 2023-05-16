import {MultiLangText} from "./multiLangText.model";
import {ImageUrlModel} from "./image-url.model";
import {Expose, Type} from "class-transformer";


export class MediasObjectModel {

    @Expose()
    @Type(() => MultiLangText)
    altText: MultiLangText;

    @Expose()
    @Type(() => ImageUrlModel)
    variantsUrls: ImageUrlModel;

    // constructor(altText: MultiLangText = new MultiLangText(), variantsUrls: ImageUrlModel = new ImageUrlModel()) {
    //     this.altText = altText;
    //     this.variantsUrls = variantsUrls;
    // }

}
