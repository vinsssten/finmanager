import {create} from "zustand";

export interface AuthStore {
    isAuth: boolean,
    isLoading: boolean,
    setIsAuth: (isAuth: boolean) => void,
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuth: false,
    isLoading: true,
    setIsAuth: (isAuth: boolean) => set({ isAuth })
}))