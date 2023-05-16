import {Expose} from "class-transformer";

export class ImageUrlModel {

  @Expose()
  original: string;

  @Expose()
  large: string;

  @Expose()
  medium: string;

  @Expose()
  small: string;

  /*constructor(original = '', large = '', medium = '', small = '') {
    this.original = original;
    this.large = large;
    this.medium = medium;
    this.small = small;
  }*/
}
