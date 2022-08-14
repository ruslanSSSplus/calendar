import {calendarAPI} from "../../API/calendarAPI";
import {actions} from "../Reducers/calendarReducer";


export const selectThunkCreater = (year, month, day ) => {
    return async (dispatch) => {
        dispatch(actions.putData(year, month-1,day))
        dispatch(actions.setSelectedDateElement(year, month,day))
        let txt =  window.prompt(`Ваша заметка на ${year}г. ${month} месяц ${day} число` )
        if (!!txt){
            let data = [year, month-1, day, txt]
            let response = await calendarAPI.postMessage(data)
            dispatch(actions.setAllSelectedDates(response))
            dispatch(actions.showMessage(year, month,day))
        } else {
            dispatch(actions.deleteMessage())
            alert("Вы ничего не написали");
        }
    }}

export const showMessageThunkCreater = (year, month, day ) => {
    return async (dispatch) => {
        dispatch(actions.showMessage(year, month, day))
        dispatch(actions.putData(year, month-1,day))
        dispatch(actions.setSelectedDateElement(year, month,day))
    }}


export const deleteMessageThunkCreater = (year, month, day ) => {
    return async (dispatch) => {
        let data = [year, month, day]
        let response = await calendarAPI.deleteMessage(data)
        dispatch(actions.setAllSelectedDates(response))
        dispatch(actions.setSelectedDateElement(data[0], data[1], data[2]))
        dispatch(actions.deleteMessage())

    }}

export const getMessageThunkCreater = () => {
    return async (dispatch) => {
        let response = await calendarAPI.getMessages()
        dispatch(actions.setAllSelectedDates(response))
    }}

