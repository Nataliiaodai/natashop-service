export class ClientCategoryDto {
    id: number;
    name: string;
    slug: string;
    description: string;

     constructor(id: number = 0, name: string = '', slug: string = '', description: string = '') {
         this.id = id;
         this.name = name;
         this.slug = slug;
         this.description = description;
     }
}
