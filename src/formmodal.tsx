import {Modal} from "./modal";
import React from "react";
import {Form} from "./form";
import {FileForm} from "./fileform";
import {FileFormModalKit, FormModalKit} from "./kits";


export interface FormModalProps {
    kit: FormModalKit;
}

export function FormModal({kit}: FormModalProps) {
    return <Modal kit={kit}>
        <Form kit={kit.formKit}/>
    </Modal>
}


interface FileFormModalProps {
    kit: FileFormModalKit;
}


export function FileFormModal({kit}: FileFormModalProps) {
    return <Modal kit={kit}>
        <FileForm kit={kit.formKit}/>
    </Modal>
}