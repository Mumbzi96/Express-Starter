import { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(undefined)

export function useAuthContext(){
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuthContext must be userd within an AuthProvider');
    }
    return context;
}

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload?.user || null,
				token: action.payload?.token || null
			};
		case 'LOGOUT':
			return {
				...state,
				user: null,
				token: null
			};
		case "SET_LOADING":
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
    }
}

export function AuthProvider({ children }) {
    const location = useLocation();
	const navigate = useNavigate();
  
	const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
        isLoading: false,
	});
  
	const redirectUrl = useMemo(() => {
		return location.pathname || '/';
	}, [location.pathname]);
  
	useEffect(() => {
	  	loadUser();
	}, []);
  
	const login = async (formData) => {
		console.log("Form Data: ", formData)
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			const response = await fetch('/api/auth/login', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(formData)
			});
			const json = await response.json();
	
			dispatch({ type: "SET_LOADING", payload: false });

			if (!response.ok) {
				console.log('Error:', json);
				return json;
			}
	
			const decoded = jwtDecode(json.token);
			console.log("Decoded: ", decoded)
			dispatch({
				type: 'LOGIN',
				payload: {
					token: json.token,
					user: decoded.user ?? {}
				}
			});
	
			navigate(redirectUrl);
		} catch (err) {
			console.log(err);
		}
	};
  
	const loadUser = async () => {
		try {
			const response = await fetch('/api/auth/load-user', {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const json = await response.json();
	
			if (!response.ok || !json.token) {
				console.log('error: ', json);
				navigate('/auth/login');
			} else {
				const decoded = jwtDecode(json.token);
				dispatch({
					type: 'LOGIN',
					payload: {
						token: json.token,
						user: decoded.user ?? {}
					}
				});
	
				navigate(location.pathname);
			}
		} catch (err) {
			console.error('Failed to load user:', err);
			navigate('/auth/login');
		}
	};
  
	const logout = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
	
			if (response.ok) {
				dispatch({ type: 'LOGOUT' });
			}
		} catch (err) {
			console.error('Failed to log out:', err);
		}
	};
  
	return (
		<AuthContext.Provider
			value={{
				...state,
				isAuthenticated: Boolean(state.user),
				redirectUrl,
				login,
				logout,
				dispatch
			}}
		>
			{children}
	  	</AuthContext.Provider>
	);
}