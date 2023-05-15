export class ClientProductFilterValueDto {
    id: string;
    label: string;
    productCount: number;
    isSelected: boolean;

    constructor(id: string = '', label: string = '', productCount: number = 0, isSelected: boolean = false) {
        this.id = id;
        this.label = label;
        this.productCount = productCount;
        this.isSelected = isSelected;
    }
}
