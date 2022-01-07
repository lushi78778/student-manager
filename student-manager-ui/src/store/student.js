import {createSlice} from "@reduxjs/toolkit";

export const studentSlice = createSlice({
    name: 'student',
    initialState: {
        value: {
            id: null,
            realName: null,
            studentId: null,
            collegeName: null,
            className: null,
            type: null
        }
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        }
    }
})

export default studentSlice
