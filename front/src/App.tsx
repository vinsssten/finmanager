import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './modules/auth-page/AuthPage.tsx';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthRoute from "./components/core/AuthRoute/AuthRoute.tsx";

const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                        {/*<Route path={'main'}>*/}
                        {/*    <AuthRoute>*/}
                        {/*    </AuthRoute>*/}
                        {/*</Route>*/}
                    <AuthRoute>
                        <Route path={'main'} element={<h1>Main</h1>} />
                        <Route path={'login'} element={<AuthPage />} />
                    </AuthRoute>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
