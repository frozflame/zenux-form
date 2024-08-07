import React from "react";
import {FileField} from "./types";
import {FileFormKit} from "./kits";


interface FileItemProps {
    field: FileField;
    kit: FileFormKit;
}


function FileItem({field, kit}: FileItemProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            kit.change(field.key, event.target.files[0]);
        }
    }

    return <div className="form-item">
        <div className="label">{field.name}</div>
        <div className="input">
            <input type="file" name={field.key} accept={field.accept} onChange={handleChange}/>
        </div>
    </div>
}

export interface FileFormProps {
    kit: FileFormKit;
}


export function FileForm({kit}: FileFormProps) {
    return <form className="zenux-form form">
        {
            kit.fields.map((field, idx) => {
                return <FileItem field={field} kit={kit} key={idx}/>
            })
        }
    </form>
}
