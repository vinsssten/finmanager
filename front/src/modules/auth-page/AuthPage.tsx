import Card from '../../components/ui/Card/Card.tsx';

const AuthPage = () => {
    return (
        <div className={'p-4 h-max'} style={{ height: '100%' }}>
            <div>
                <Card title={'Login'} flexChildren>
                    <p>first</p>
                    <p>second</p>
                </Card>
            </div>
        </div>
    );
};

export default AuthPage;
