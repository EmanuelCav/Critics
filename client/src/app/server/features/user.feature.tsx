import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

import { CounterUser, SignInUser, SignUpUser } from "../../interface/user";

const initialState: CounterUser = {
    user: {},
    isAuth: false
}


export const counterSliceUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerAction: (state, action: PayloadAction<SignUpUser>) => {
            state.user = action.payload,
            state.isAuth = true
        },
        loginAction: (state, action: PayloadAction<SignInUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.user = {},
            state.isAuth = false
        }
    }
})

export const { registerAction, loginAction, logout } = counterSliceUser.actions

export default counterSliceUser.reducer