import {FormKit} from "./kits";

interface _Field {
    key: string;
    name: string;
}

interface TextField extends _Field {
    type: 'text';
    minlength?: number;
    maxlength?: number;
}

interface NumberField extends _Field {
    type: 'number';
    min?: number | string;
    max?: number | string;
}

interface EnumField extends _Field {
    type: 'enum';
    choices: string[];
}


interface OtherField extends _Field {
    type: string;
}

export type Field = TextField | NumberField | EnumField | OtherField;


export interface TextInputProps {
    field: TextField;
    value: string;
    kit: FormKit;
}


export interface EnumInputProps {
    field: EnumField;
    value: string;
    kit: FormKit;
}

export interface NumberInputProps {
    field: NumberField;
    value: number;
    kit: FormKit;
}

export interface OtherInputProps {
    field: OtherField;
    value: string;
    kit: FormKit;
}


export type FormItemProps =
    TextInputProps | NumberInputProps | EnumInputProps | OtherInputProps;

export interface FileField extends _Field {
    type: 'file';
    accept: string;
}
