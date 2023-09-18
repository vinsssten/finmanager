import Card from '../../components/ui/Card/Card.tsx';
import TextInput from '../../components/content/Inputs/TextInput/TextInput.tsx';
import { Button } from '../../components/ui/Button/Button.tsx';

const AuthPage = () => {
    return (
        <div className={'p-4 h-max'} style={{ height: '100%' }}>
            <div>
                <Card title={'Login'} flexChildren>
                    <TextInput />
                    <TextInput />
                    <Button>Sign in</Button>
                </Card>
            </div>
        </div>
    );
};

export default AuthPage;
