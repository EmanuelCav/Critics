import { configureStore } from '@reduxjs/toolkit'

import criticsReducer from './features/critic.feature'
import usersReducer from './features/user.feature'
import responseReducer from './features/response.feature'

export const store = configureStore({
    reducer: {
        critics: criticsReducer,
        user: usersReducer,
        response: responseReducer
    }
})
