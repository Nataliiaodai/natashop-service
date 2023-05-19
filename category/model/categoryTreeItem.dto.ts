import {MultiLangText} from "../../shared-model/multiLangText.model";
import {MediasObjectModel} from "../../shared-model/medias.object.model";

export class CategoryTreeItemDto {
    _id: number;
    parentId: number;
    name: MultiLangText;
    slug: string;
    medias: MediasObjectModel [];
    children: CategoryTreeItemDto[];
}
