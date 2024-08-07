import React from "react";
import {ModalOptions, ModalKit} from "./kits";

export const defaultOptions: ModalOptions = {
    title: "Confirm or dismiss?",
    titleConfirm: "Confirm",
    titleDismiss: "Dismiss",
    labelConfirm: <span>OK</span>,
    labelDismiss: <span>X</span>,
}

export interface ModalProps {
    children: React.ReactNode;
    kit: ModalKit;
}

export function Modal(props: ModalProps) {
    function handleClick(event: React.MouseEvent<HTMLElement>) {
        const target = event.target as HTMLElement;
        if (target.tagName === "DIALOG") {
            event.preventDefault();
            event.stopPropagation();
            props.kit.dismiss();
        }
    }

    function handleConfirm(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        props.kit.confirm();
    }

    function handleDismiss(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        props.kit.dismiss();
    }

    const options = props.kit.options;
    return <dialog ref={props.kit.dialogRef} className="zenux-form-modal" onClick={handleClick}>
        <div>
            <div className="head">
                <div>
                    <span>{options.title}</span>
                </div>
                <div>
                    <a href="#" className="confirm" title={options.titleConfirm || "Confirm"} onClick={handleConfirm}>
                        {options.labelConfirm}
                    </a>
                    <a href="#" className="dismiss" title={options.titleDismiss || "Dismiss"} onClick={handleDismiss}>
                        {options.labelDismiss}
                    </a>
                </div>
            </div>
            <div className="body">
                {props.children}
            </div>
        </div>
    </dialog>
}
