import React, {useEffect, useState} from "react";
import classes from './DataPicker.module.css'
import Days from "./Days";
import {v1} from 'uuid'
import {useDispatch, useSelector} from "react-redux";
import {
    showMessageThunkCreater,
    selectThunkCreater,
    deleteMessageThunkCreater, getMessageThunkCreater
} from "../../Redux/Actions/calendar";


const DatePicker = () => {

    useEffect(() => {
        dispatch(getMessageThunkCreater())
    }, [])

    const dispatch = useDispatch()
    const {date, months, selectedDay, selectedMonth, selectedYear, selected_date_element,
        allSelectedDates, message} = useSelector((state)=> state.calendar)

    const [year, setYear] = useState(date.getFullYear())

    const [month, setMonth] = useState(date.getMonth())
    const [mth_element, setMth_element] = useState(months[month] + ' ' + year)
    let days_element = [];


    const select = (year, month, day ) => {

        dispatch(selectThunkCreater(year, month, day))
        populateDates();
    }

    const showMessage = (year, month, day) => {
      dispatch(showMessageThunkCreater(year, month, day))
    }
    const deleteMessage = (year, month, day ) => {
        dispatch(deleteMessageThunkCreater(year, month, day))
    }



    const goToNextMonth = (m, y) => {
        if (m >= 11) {
            setMonth(0);
            setYear(y + 1);
            setMth_element(months[0] + ' ' + `${y + 1}`);

        } else {
            setMonth(m + 1);
            setMth_element(months[m + 1] + ' ' + y);
        }
        populateDates();
    }

    const goToPrevMonth = (m, y) => {
        if (m <= 0) {
            setMonth(11)
            setYear(y - 1)
            setMth_element(months[11] + ' ' + `${y - 1}`);
        } else {
            setMonth(m - 1)
            setMth_element(months[m - 1] + ' ' + y)
        }
        populateDates();
    }

    const populateDates = () => {
        let amount_days = 31;
        if (month === 1) {
            amount_days = 28;
        }

        for (let i = 0; i < amount_days; i++) {

            if ( allSelectedDates.find((el) =>  el[0] === year && el[1] === month && el[2]===i+1)) {
                days_element.push(<Days day={i + 1} isSelected={true} select={select} key={v1()}
                                        year={year} month={month+1} haveMessage={true} showMessage={showMessage}/>)
            }
            else  if (selectedDay === (i + 1) && selectedYear === year && selectedMonth === month ) {
                days_element.push(<Days day={i + 1} isSelected={true} select={select} key={v1()}
                                        year={year} month={month+1} haveMessage={false} showMessage={showMessage}/>)
            }
            else {
                days_element.push(<Days day={i + 1} isSelected={false} select={select} key={v1()}
                                        year={year} month={month+1} haveMessage={false} showMessage={showMessage}/>)
            }
        }
    }
    populateDates();

    return <div className={classes.page}>
        <div className={classes.all}>
            <div className={classes.date} >
                {selected_date_element[0]} / {selected_date_element[1]} / {selected_date_element[2]}
            </div>
            <hr />

                <div>
                    <div className={classes.month}>
                        <span onClick={() => goToPrevMonth(month, year)} className={classes.prev}>&lt;</span>
                        <span className={classes.exactDate} >   {mth_element}  </span>
                        <span onClick={() => goToNextMonth(month, year)} className={classes.next}>&gt;</span>
                    </div>
                    <hr/>
                    <div className={classes.days}> {days_element}  </div>
                </div>
        </div>

        <div className={classes.allDates}>
            <h3> Заметка</h3>
            {!!message ?
                <div>
                    <div>
                        {selected_date_element[0]} / {selected_date_element[1]} / {selected_date_element[2]}
                    </div>
                {message}

                    <div>
                        <button onClick={() => deleteMessage(selectedYear, selectedMonth, selectedDay)}>
                            Delete
                        </button>
                    </div>
                </div>
                : null}
        </div>
    </div>
}
export default DatePicker;