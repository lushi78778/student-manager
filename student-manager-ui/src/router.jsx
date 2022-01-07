import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Index from "./view/Index"
import Login from "./view/Login"
import StudentEdit from "./view/StudentEdit"
import StudentList from "./view/StudentList"
import StudentAdd from "./view/StudentAdd"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/student">
                    <Route path="edit" element={<StudentEdit/>}/>
                    <Route path="list" element={<StudentList/>}/>
                    <Route path="add" element={<StudentAdd/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
