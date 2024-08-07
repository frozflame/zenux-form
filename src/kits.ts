import React, {RefObject} from "react";
import {Field, FileField} from "./types";

export interface ModalOptions {
    title?: string | React.ReactNode;
    labelConfirm?: string | React.ReactNode;
    labelDismiss?: string | React.ReactNode;
    titleConfirm?: string;
    titleDismiss?: string;
}

export class ModalKit {
    options: ModalOptions;
    dialogRef: RefObject<HTMLDialogElement>;

    constructor(options: ModalOptions) {
        this.options = options;
        this.dialogRef = {current: null};
    }

    confirm(): void {
        if (this.dialogRef.current) {
            this.dialogRef.current.close();
        }
    }

    dismiss(): void {
        if (this.dialogRef.current) {
            this.dialogRef.current.close();
        }
    }

    display(): void {
        if (this.dialogRef.current) {
            this.dialogRef.current.showModal();
        }
    }
}


export class FormKit {
    fields: Field[];
    record: any;
    localChanges: any;

    constructor(fields: Field[], record: any) {
        this.fields = fields;
        this.record = record;
        this.localChanges = {};
    }

    change(key: string, value: any) {
        if (value === this.record[key]) {
            delete this.localChanges[key];
        } else {
            this.localChanges[key] = value;
        }
    }
}


export class FileFormKit {
    fields: FileField[];
    localChanges: any;

    constructor(fields: FileField[]) {
        this.fields = fields;
        this.localChanges = {};
    }

    change(key: string, value: File) {
        this.localChanges[key] = value;
    }
}

export class FormModalKit extends ModalKit {
    formKit: FormKit;

    constructor(options: ModalOptions, formKit: FormKit) {
        super(options);
        this.formKit = formKit;
    }
}


// TODO: use tyep param and merge with ModalFormKit
export class FileFormModalKit extends ModalKit {
    formKit: FileFormKit;

    constructor(options: ModalOptions, formKit: FileFormKit) {
        super(options);
        this.formKit = formKit;
    }
}
