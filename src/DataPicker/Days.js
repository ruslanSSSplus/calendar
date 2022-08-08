import React, {useState} from "react";
import classes from "./DataPicker.module.css";

const Days = (props) => {

    return <span className={!props.isSelected? classes.allDays :
        classes.selectedDay} onClick={props.haveMessage ?
        ()=> props.showMessage(props.year, props.month, props.day)
        : () => props.select(props.year, props.month, props.day)}
    >
        {props.day}

    </span>

}

export default Days;