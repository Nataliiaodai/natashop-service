import {ProductListItem} from "./product-list-item.model";


export class AdminProductPageDto {
  itemsFiltered: number;
  itemsTotal: number;
  page: number;
  pagesTotal: number;
  data: ProductListItem[];

  constructor(itemsFiltered = 0, itemsTotal = 0, page = 0, pagesTotal = 0, data: ProductListItem[] = []) {
    this.itemsFiltered = itemsFiltered;
    this.itemsTotal = itemsTotal;
    this.page = page;
    this.pagesTotal = pagesTotal;
    this.data = data;
  }

}


