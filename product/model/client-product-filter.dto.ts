import {ClientProductFilterValueDto} from "./client-product-filter-value.dto";

export class ClientProductFilterDto {

    values: ClientProductFilterValueDto [];
    id: string;
    label: string;

    constructor(values: ClientProductFilterValueDto [] = [], id: string = '', label: string = '') {
        this.values = values;
        this.id = id;
        this.label = label;
    }
}
