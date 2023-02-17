import axios from 'axios';

import { SignInUser, SignUpUser } from '../../interface/user';

const api = axios.create({ baseURL: 'http://localhost:5000' })

export const signUpApi = async (userData: SignUpUser) => {
    return await api.post<SignUpUser>('/register', userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export const signInApi = async (userData: SignInUser) => {
    return await api.post<SignInUser>('/login', userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}