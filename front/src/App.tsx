import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './modules/auth-page/AuthPage.tsx';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'login'} element={<AuthPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
