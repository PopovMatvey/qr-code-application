import React from "react";
import './css/style.css';

// Кастомный элемент input
export function Input({ type, id, title, defaultValue, handlerOnChange, min, max, accept }) {

    return (
        <>
            <div className="input-container">
                <div className="input-container_input">
                    <label htmlFor={id}>{title}</label>
                    <input type={type} id={id} value={defaultValue} min={min} max={max} placeholder={title} multiple={"multiple"} accept={accept} onClick={handlerOnChange} onChange={handlerOnChange} />
                </div>
            </div>
        </>
    )
}