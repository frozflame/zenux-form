import React, {useState} from "react";
import {EnumInputProps, FormItemProps, NumberInputProps, TextInputProps} from "./types";
import {FormKit} from "./kits";


function TextInput({field, value, kit}: TextInputProps) {
    const [modified, setModified] = useState<boolean>(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        kit.change(field.key, event.target.value);
        setModified(value !== event.target.value);
    }

    return <input type="text"
                  name={field.key}
                  className={modified ? "modified" : undefined}
                  defaultValue={value}
                  minLength={field.minlength}
                  maxLength={field.maxlength}
                  onChange={handleChange}/>
}


function EnumInput({field, value, kit}: EnumInputProps) {
    const [modified, setModified] = useState<boolean>(false);

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        kit.change(field.key, event.target.value);
        setModified(value !== event.target.value);
    }

    const options = field.choices.map((choice, idx) => {
        return <option value={choice} key={idx}>{choice}</option>
    });
    return <select name={field.key} defaultValue={value}
                   onChange={handleChange} className={modified ? "modified" : undefined}>
        {options}
    </select>
}



function NumberInput({field, value, kit}: NumberInputProps) {
    const [modified, setModified] = useState<boolean>(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const targetValue = parseFloat(event.target.value)
        kit.change(field.key, targetValue);
        setModified(value !== targetValue);
    }

    return <input type="number"
                  name={field.key} defaultValue={value}
                  min={field.min} max={field.max}
                  onChange={handleChange} className={modified ? "modified" : undefined}/>
}


function FormInput(props: FormItemProps) {
    switch (props.field.type) {
        case "text":
            return <TextInput {...props as TextInputProps}/>
        case "number":
            return <NumberInput {...props as NumberInputProps}/>
        case "enum":
            return <EnumInput {...props as EnumInputProps}/>
        default:
            console.error("unknown column: ", props.field);
            return <></>
    }
}

function FormItem(props: FormItemProps) {
    return <div className="form-item">
        <div className="label">{props.field.name}</div>
        <div className="input">
            <FormInput {...props}/>
        </div>
    </div>
}


export interface FormProps {
    kit: FormKit;
}


export function Form({kit}: FormProps) {
    const elements = kit.fields.map((field, idx) => {
            return <FormItem field={field} value={kit.record[field.key]}
                             key={idx} kit={kit}/>
        }
    );
    return <form className="zenux-form">
        {elements}
    </form>
}
