import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import DatePicker from "../Pages/DataPicker/DatePicker";


export const AllRoutes = () => {

    return (<Routes>
        <Route path="/" element={<Navigate replace to="/Main"/>}/>
        <Route path='/Main' element={<DatePicker />}> </Route>
    </Routes>);
}
