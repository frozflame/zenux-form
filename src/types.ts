import {FormKit} from "./kits";

interface _Field {
    key: string;
    name: string;
    wide?: boolean;
    disabled?: boolean;
}


interface BoolField extends _Field {
    type: 'bool';
}


interface EnumField extends _Field {
    type: 'enum';
    choices: string[];
}

interface NumberField extends _Field {
    type: 'number';
    min?: number | string;
    max?: number | string;
}

interface TextField extends _Field {
    type: 'text';
    subtype: 'email' | 'password';
    minlength?: number;
    maxlength?: number;
}

interface OtherField extends _Field {
    type: string;
}

export type Field = TextField | NumberField | EnumField | OtherField;


export interface BoolInputProps {
    field: BoolField;
    value: boolean;
    kit: FormKit;
}


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
    BoolInputProps | TextInputProps | NumberInputProps | EnumInputProps | OtherInputProps;

export interface FileField extends _Field {
    type: 'file';
    accept: string;
}
