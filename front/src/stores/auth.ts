import {create} from "zustand";

export interface AuthStore {
    isInitialized: boolean;
    isAuth: boolean,
    isLoading: boolean,
    error: string | null,
    setError: (error: string | null) => void
    setIsAuth: (isAuth: boolean) => void,
    setIsInitialized: (isInitialized: boolean) => void,
}

export const useAuthStore = create<AuthStore>((set) => ({
    isInitialized: false,
    isAuth: false,
    isLoading: true,
    error: null,
    setError: (error) => set({error}),
    setIsAuth: (isAuth) => set({ isAuth }),
    setIsInitialized: (isInitialized) => set({ isInitialized }),
}))