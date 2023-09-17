import Card from '../../components/ui/Card/Card.tsx';

const AuthPage = () => {
    return (
        <div className={'p-4 h-max'} style={{ height: '100%' }}>
            <div>
                <Card title={'Login'}>
                    <div className={'flex flex-col gap-2'}>
                        <p>first</p>
                        <p>second</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AuthPage;
