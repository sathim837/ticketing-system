import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeMenu : "Dashboard"
}

const navigationSlice = createSlice({
    name : "navigation",
    initialState,
    reducers : {
        setActiveMenu : (state, action) => {
            state.activeMenu = action.payload
        }
    }
})

export const { setActiveMenu } = navigationSlice.actions

export default navigationSlice.reducer

