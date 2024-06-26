import { FC, ReactNode} from "react";
import { useAuthStore} from "../../../stores/auth.ts";
import { useQuery} from "react-query";
import { authFetches} from "../../../modules/auth-page/fetches/authFetches.ts";
import { useNavigate} from "react-router";

interface AuthRouteProps {
	children?: ReactNode;
}

export const AuthRoute: FC<AuthRouteProps> = ({ children }) => {
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
			setIsAuth(false);
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
	
	if (!isAuth && isInitialized) {
		nav('/login')
	}
	
	return children
}

export default AuthRoute;