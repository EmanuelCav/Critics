import axios from 'axios'
import { Critic, CriticCreate, CriticUpdate } from '../../interface/critic'

const api = axios.create({ baseURL: "http://localhost:5000" })

export const criticsApi = async () => {
    return await api.get<Critic[]>('/critics')
}
export const myCriticsApi = async (token: string) => {
    return await api.get<Critic[]>('/mycritics', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const createCriticApi = async (criticData: CriticCreate, token: string) => {
    return await api.post<CriticCreate>('/createCritic', criticData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
export const getCriticApi = async (id: string) => {
    return await api.get<Critic>(`/critics/${id}`)
}
export const getCategoryApi = async (category: string) => {
    return await api.get<Critic[]>(`/criticscategory/${category}`)
}
export const removeCriticApi = async (id: string, token: string) => {
    return await api.delete<any>(`/critics/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const updateCriticApi = async (criticData: CriticUpdate, id: string, token: string) => {
    return await api.put<CriticUpdate>(`/critics/${id}`, criticData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}