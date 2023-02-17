import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Responses } from '../../interface/response';

const initialState: Responses = {
    responseLogin: "",
    responseRegister: "",
    responseCreate: "",
    responseRemove: "",
    responseUpdate: ""
}

export const counterResponseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {
        responseLoginAction: (state, action: PayloadAction<string>) => {
            state.responseLogin = action.payload
            state.responseRegister = ""
            state.responseCreate = ""
            state.responseRemove = ""
            state.responseUpdate = ""
        },
        responseRegisterAction: (state, action: PayloadAction<string>) => {
            state.responseLogin = ""
            state.responseRegister = action.payload
            state.responseCreate = ""
            state.responseRemove = ""
            state.responseUpdate = ""
        },
        responseCreateAction: (state, action: PayloadAction<string>) => {
            state.responseLogin = ""
            state.responseRegister = ""
            state.responseCreate = action.payload
            state.responseRemove = ""
            state.responseUpdate = ""
        },
        responseRemoveAction: (state, action: PayloadAction<string>) => {
            state.responseLogin = ""
            state.responseRegister = ""
            state.responseCreate = ""
            state.responseRemove = action.payload
            state.responseUpdate = ""
        },
        responseUpdateAction: (state, action: PayloadAction<string>) => {
            state.responseLogin = ""
            state.responseRegister = ""
            state.responseCreate = ""
            state.responseRemove = ""
            state.responseUpdate = action.payload
        }
    }
})

export const { responseCreateAction, responseLoginAction, responseRegisterAction, responseRemoveAction, responseUpdateAction } = counterResponseSlice.actions

export default counterResponseSlice.reducer