import axios from "axios";


export const calendarAPI = {
    getMessages() {
        return axios.get( `https://testback123321.herokuapp.com/getMessage`).then(res=>res.data)
    },

    postMessage(data) {
        return axios.post( `https://testback123321.herokuapp.com/postMessage`, data).then(res=>res.data)
    },
    deleteMessage(data) {
        return axios.post( `https://testback123321.herokuapp.com/deleteMessage`, data).then(res=>res.data)
    },
}

