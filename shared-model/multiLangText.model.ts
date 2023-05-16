import {Expose} from "class-transformer";

export class MultiLangText {

  @Expose()
  uk: string;

  @Expose()
  en: string;

  // constructor(uk = '', en = '') {
  //   this.uk = uk;
  //   this.en = en;
  // }
}


