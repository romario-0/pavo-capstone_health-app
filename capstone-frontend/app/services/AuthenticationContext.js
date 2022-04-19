import { createContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const checkLoggedUser = () => {
        setIsLoading(true);
        //await SecureStore.getItemAsync('token');
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', authorization : 'token' }
          };
          fetch('http://localhost:4000/user/userGet', requestOptions).then(res => res.json()).then(async data => {
            setUser(data.User);
            setIsLoading(false);
          });
    }

    const onLogin = (email, password) => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email : email,password : password})
          };
          fetch('http://localhost:4000/user/userLogin', requestOptions).then(res => res.json()).then(async data => {
            setUser(data.User);
            //await SecureStore.setItemAsync('token', data.userToken);
            setIsLoading(false);
          });
    }

    const onRegister = (userDetails) => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails)
          };
          fetch('http://localhost:4000/user/userAdd', requestOptions).then(res => res.json()).then(async data => {
            setUser(data.User);
            //await SecureStore.setItemAsync('token', data.userToken);
            setIsLoading(false);
          });
    }

    const onLogout = () => {
        setUser(null);
    }

    return (
    <AuthenticationContext.Provider
        value={{
            isLoading,
            user,
            error,
            onLogin,
            onRegister,
            onLogout,
            checkLoggedUser
        }}
    >
        {children}  
    </AuthenticationContext.Provider>
    );
}