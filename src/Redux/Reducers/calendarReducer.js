import {calendarAPI} from "../../API/calendarAPI";


const PUT_DATA = 'CALENDAR/PUT_DATA';
const SET_SELECTED_DATE_ELEMENT = 'CALENDAR/SET_SELECTED_DATE_ELEMENT';
const SET_ALL_SELECTED_DATES = 'CALENDAR/SET_ALL_SELECTED_DATES';
const SHOW_MESSAGE = 'CALENDAR/SHOW_MESSAGE';
const DELETE_MESSAGE = 'CALENDAR/DELETE_MESSAGE';

let initialState = {
     date: new Date(),
     months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
       'August', 'September', 'October', 'November', 'December', ],
    selectedDay: new Date().getDate(),
    selectedMonth:  new Date().getMonth(),
    selectedYear:  new Date().getFullYear(),
    selected_date_element: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],
    allSelectedDates: [],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    message: null,
}


const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUT_DATA:
            return {...state,
                selectedDay: action.day,
                selectedMonth: action.month,
                selectedYear: action.year
            }
        case SET_SELECTED_DATE_ELEMENT:
            return{
                ...state,
                selected_date_element: [action.year, action.month, action.day]
            }
        case SET_ALL_SELECTED_DATES:
            return {
                ...state,
                allSelectedDates: action.data
            }
        case SHOW_MESSAGE:
           let a = state.allSelectedDates.find((el) =>
                el[0] === action.year &&
                el[1] ===  action.month-1 &&
                el[2]=== action.day)
            return {
                ...state,
                message: a[3]
            }
        case DELETE_MESSAGE:

            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
}

export const selectThunkCreater = (year, month, day ) => {
    return async (dispatch) => {
        dispatch(actions.putData(year, month-1,day))
        dispatch(actions.setSelectedDateElement(year, month,day))
        let txt =  window.prompt(`Ваша заметка на ${year}г. ${month} месяц ${day} число` )
        console.log(!!txt)
        if (!!txt){
            let data = [year, month-1, day, txt]
            let response = await calendarAPI.postMessage(data)
            dispatch(actions.setAllSelectedDates(response))
            dispatch(actions.showMessage(year, month,day))
            console.log(response)
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
        let data = [year, month-1, day]
        let response = await calendarAPI.deleteMessage(data)
        console.log(response)
        dispatch(actions.setAllSelectedDates(response))
        dispatch(actions.setSelectedDateElement(data[0], data[1], data[2]))
        dispatch(actions.deleteMessage())

    }}

export const getMessageThunkCreater = () => {
    return async (dispatch) => {
        let response = await calendarAPI.getMessages()
        console.log(response)
        dispatch(actions.setAllSelectedDates(response))
    }}
export const actions = {
    putData: (year, month,day) => ({
        type: PUT_DATA, year, month, day
    }),
    setSelectedDateElement: (year, month,day) => ({
        type: SET_SELECTED_DATE_ELEMENT, year, month,day
    }),
    setAllSelectedDates: (data) => ({
        type: SET_ALL_SELECTED_DATES, data
    }),
    showMessage: ( year, month, day) => ({
        type: SHOW_MESSAGE, year, month, day
    }),
    deleteMessage: () => ({
        type: DELETE_MESSAGE
    }),
}


export default calendarReducer;