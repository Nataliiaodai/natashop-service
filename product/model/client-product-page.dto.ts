
import {ClientProductFilterDto} from "./client-product-filter.dto";
import {ClientProductDto} from "./client-product.dto";


export class ClientProductPageDto {
    filters: ClientProductFilterDto [];
    itemsFiltered: number;
    itemsTotal: number;
    page: number;
    pagesTotal: number;
    data: ClientProductDto[];

    constructor(
        filters: ClientProductFilterDto [] = [],
        itemsFiltered = 0,
        itemsTotal = 0,
        page = 0,
        pagesTotal = 0,
        data: ClientProductDto [] = []) {

        this.filters = filters;
        this.itemsFiltered = itemsFiltered;
        this.itemsTotal = itemsTotal;
        this.page = page;
        this.pagesTotal = pagesTotal;
        this.data = data;
    }

}
