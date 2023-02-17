import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import { CounterCritic, Critic, CriticCreate, CriticUpdate } from '../../interface/critic';

const initialState: CounterCritic = {
    critics: [],
    critic: {},
    trends: []    
}

export const counterSliceCritic = createSlice({
    name: "critics",
    initialState,
    reducers: {
        criticsAction: (state, action: PayloadAction<Critic[]>) => {
            state.critics = action.payload
        },
        criticsTrendsAction: (state, action: PayloadAction<Critic[]>) => {
            state.trends = action.payload
        },
        createCriticAction: (state, action: PayloadAction<CriticCreate>) => {
            state.critics = [...state.critics, action.payload]
        },
        getCriticAction: (state, action: PayloadAction<Critic>) => {
            state.critic = action.payload
        },
        getCategoryAction: (state, action: PayloadAction<Critic[]>) => {
            state.critics = action.payload
        },
        removeCriticAction: (state, action: PayloadAction<Critic>) => {
            state.critics = state.critics.filter((critic: any) => critic._id !== action.payload)
        },
        updateCriticAction: (state, action: PayloadAction<CriticUpdate>) => {
            state.critics = state.critics.map((critic: any) => critic._id === action.payload._id ? action.payload : critic)
        }
    }
})

export const { criticsAction, criticsTrendsAction, createCriticAction, getCriticAction, getCategoryAction, removeCriticAction, updateCriticAction } = counterSliceCritic.actions

export default counterSliceCritic.reducer