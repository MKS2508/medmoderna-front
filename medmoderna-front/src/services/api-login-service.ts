import axios from 'axios';
import { API_URL } from '../config';
import { IUser } from '../models/IUser';
import { IAuthResponse } from '../models/IAuthResponse';
import {toast} from "react-toastify";
const handleError = (error: any) => {
    toast(`Error: ${error.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    console.error(new Error(error));
};

export const registerUser = async (user: IUser): Promise<IAuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, user);
        return response.data;
    } catch (error: any) {
        handleError(error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string): Promise<IAuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error: any) {
        handleError(error);
        throw error;
    }
};


