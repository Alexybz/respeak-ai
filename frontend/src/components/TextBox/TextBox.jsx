import React from "react";
import "./TextBox.css";

const TextBox = ({ title, content, position }) => {
    return (
        <div className={`textbox ${position}`}>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}
export default TextBox;