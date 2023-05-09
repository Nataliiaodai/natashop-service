export class CategoryImageURLModel {
  original: string;
  large: string;
  medium: string;
  small: string;

  constructor(original = '', large = '', medium = '', small = '') {
    this.original = original;
    this.large = large;
    this.medium = medium;
    this.small = small;
  }
}
