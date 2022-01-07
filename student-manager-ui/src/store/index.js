import {configureStore} from '@reduxjs/toolkit'
import studentSlice from "./student";

export default configureStore({
    reducer: {
        student: studentSlice.reducer
    }
})
