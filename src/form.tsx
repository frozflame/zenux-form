import React, {useState} from "react";
import {BoolInputProps, EnumInputProps, FormItemProps, NumberInputProps, TextInputProps} from "./types";
import {FormKit} from "./kits";
import {joinClassNames} from "zenux";


function BoolInput({field, value, kit}: BoolInputProps) {
    const [modified, setModified] = useState<boolean>(false);

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const _value = event.target.value == 'yes';
        kit.change(field.key, _value);
        setModified(value !== _value);
    }

    return <select name={field.key} disabled={field.disabled} defaultValue={value ? 'yes' : 'no'}
                   onChange={handleChange} className={modified ? "modified" : undefined}>
        <option value='yes' key='yes'>Yes</option>
        <option value='no' key='no'>No</option>
    </select>
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
    return <select name={field.key} disabled={field.disabled} defaultValue={value}
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
                  name={field.key} disabled={field.disabled}
                  defaultValue={value} min={field.min} max={field.max}
                  onChange={handleChange} className={modified ? "modified" : undefined}/>
}


function TextInput({field, value, kit}: TextInputProps) {
    const [modified, setModified] = useState<boolean>(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        kit.change(field.key, event.target.value);
        setModified(value !== event.target.value);
    }

    if (field.wide) {
        return <textarea name={field.key}
                         disabled={field.disabled}
                         className={modified ? "modified" : undefined}
                         defaultValue={value}
                         minLength={field.minlength}
                         maxLength={field.maxlength}
                         cols={72} rows={4}
                         onChange={handleChange}/>
    }

    return <input type={field.subtype || 'text'}
                  name={field.key}
                  disabled={field.disabled}
                  className={modified ? "modified" : undefined}
                  defaultValue={value}
                  minLength={field.minlength}
                  maxLength={field.maxlength}
                  onChange={handleChange}/>
}


function FormInput(props: FormItemProps) {
    switch (props.field.type) {
        case "bool":
            return <BoolInput {...props as BoolInputProps}/>
        case "enum":
            return <EnumInput {...props as EnumInputProps}/>
        case "number":
            return <NumberInput {...props as NumberInputProps}/>
        case "text":
            return <TextInput {...props as TextInputProps}/>
        default:
            console.error("unknown column: ", props.field);
            return <></>
    }
}


function FormItem(props: FormItemProps) {
    const field = props.field;
    const className = joinClassNames(
        "form-item",
        field.wide ? 'wide' : ''
    )
    return <div className={className}>
        <div className="label">{field.name}</div>
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
