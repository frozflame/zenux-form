import _fields from "./_fields.json";
import _record from "./_record.json";
import "../styles/main.scss";
import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import {defaultOptions} from "../modal";
import {FormModal} from "../formmodal";
import {FormKit, FormModalKit} from "../kits";


export function ButtonFormSuite() {
    const [formKit] = useState(new FormKit(_fields, _record));
    const [kit] = useState(new FormModalKit(defaultOptions, formKit));

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        kit.display();
    }

    return <>
        <a className="action" target="_blank" title="Modify Record" onClick={handleClick} href="#">
            <div className="btn-content amend">Show Modal</div>
        </a>
        <FormModal kit={kit}/>
    </>
}


export function App(){
    return <ButtonFormSuite/>
}

const rootElement = document.getElementById("root")!;
const reactRoot = ReactDOM.createRoot(rootElement);
reactRoot.render(<App/>);
