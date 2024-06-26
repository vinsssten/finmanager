import Card from '../../components/ui/Card/Card.tsx';
import TextInput from '../../components/content/Inputs/TextInput/TextInput.tsx';
import { Button } from '../../components/ui/Button/Button.tsx';
import {useState} from 'react';
import {useMutation} from 'react-query';
import { authFetches } from './fetches/authFetches.ts';
import {useAuthStore} from "../../stores/auth.ts";
import {useNavigate} from "react-router";

const AuthPage = () => {
    const nav = useNavigate();
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    const setIsAuth = useAuthStore().setIsAuth;
    
    const auth = useMutation({
        mutationFn: (data: { login : string, password: string }) => authFetches.login(data.login, data.password),
        onSuccess: () => {
            setIsAuth(true);
            nav('/main')
        },
    })

    const loginHandle = () => auth.mutate({
        login, password
    });

    return (
        <div className={'p-4 h-max'} style={{ height: '100%' }}>
            <Card
              title={'Login'}
              footer={
                <>
                    {auth.isLoading && <p>Loading...</p>}
                    {!!auth.error && (
                      <p className={'red-500'}>
                          An error occured: {String(auth.error)}
                      </p>
                    )}
                </>
              }
            >
                <form className={'flex flex-col gap-2'} onSubmit={(e) => {
                    e.preventDefault();
                    loginHandle();
                }}>
                    <TextInput value={login} onChange={e => setLogin(e.target.value)} />
                    <TextInput
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={'password'}
                    />
                    <Button submit>Sign in</Button>
                </form>
            </Card>
        </div>
    );
};

export default AuthPage;
