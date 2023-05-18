import {AdminProductDto} from "./admin-product.dto";


export class AdminProductPageDto {
  itemsFiltered: number;
  itemsTotal: number;
  page: number;
  pagesTotal: number;
  data: AdminProductDto[];

  constructor(itemsFiltered = 0, itemsTotal = 0, page = 0, pagesTotal = 0, data: AdminProductDto[] = []) {
    this.itemsFiltered = itemsFiltered;
    this.itemsTotal = itemsTotal;
    this.page = page;
    this.pagesTotal = pagesTotal;
    this.data = data;
  }

}


