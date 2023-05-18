import {ImageUrlModel} from "../../shared-model/image-url.model";

export class ClientMediaDto {

    altText: string;
    variantsUrls: ImageUrlModel;

    constructor(altText: string = '', variantsUrls: ImageUrlModel = new ImageUrlModel()) {
        this.altText = altText;
        this.variantsUrls = variantsUrls;
    }

}
