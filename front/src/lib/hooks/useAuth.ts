import {useNavigate} from "react-router";
import {useAuthStore} from "../../stores/auth.ts";
import {useQuery} from "react-query";
import {authFetches} from "../../modules/auth-page/fetches/authFetches.ts";

const useAuth = () = {
	const nav = useNavigate();
	
	const { isInitialized, isAuth, setIsAuth, setIsInitialized, setError, } = useAuthStore();
	
	const check = useQuery({
		queryFn: authFetches.check,
		queryKey: '/auth/check',
		onSuccess: () => {
			setIsAuth(true);
		},
		onSettled: () => {
			setIsInitialized(true);
		},
		onError: () => {
			setIsAuth(true);
			setIsInitialized(true);
			
			if (isInitialized) {
				setError('Session has been expired')
			}
		}
	});
	
	if (!isInitialized && check.isLoading) {
	return <h1>Loading...</h1>
}

if (isAuth && !check.isLoading) {
	nav('/main');
}

if (isAuth && isInitialized) {
	nav('/login')
}
}