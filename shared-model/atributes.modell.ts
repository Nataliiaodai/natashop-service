import {AttributesIdentifyModel} from "./attributes-identify.model";

export class AttributesModel {
    values: AttributesIdentifyModel [] = [];
    _id: string;
    label: string;
    type: string;

    constructor(value : AttributesIdentifyModel [] = [], _id: string = '', label: string = '', type: string = '') {
        this.values = value;
        this._id = _id;
        this.label = label;
        this.type = type;
    }

}
