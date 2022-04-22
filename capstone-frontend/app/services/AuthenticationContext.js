import { createContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [userToken, setUserToken] = useState(null);

    const localPath = "http://localhost:4000/";
    const path = 'https://ultimate-health-app.herokuapp.com/';

    const checkLoggedUser = () => {
        setIsLoading(true);
        if (Platform.OS != 'web') {
          //const token = await SecureStore.getItemAsync('token');
          if(userToken != null){
            const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'authorization' : userToken }
            };
            fetch(path+'user/userGet', requestOptions).then(res => res.json()).then(async data => {
              setUser(data.User);
              setIsLoading(false);
            });
          }
        }
    }

    const onLogin = (email, password) => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email : email,password : password})
          };
          fetch(path+'user/userLogin', requestOptions).then(res => res.json()).then(async data => {
            setUser(data.User);
            setUserToken(data.userToken);
            console.log(Platform.OS);
            if (Platform.OS != 'web') {
              //await SecureStore.setItemAsync('token', data.userToken);
            }
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
          fetch(path+'user/userAdd', requestOptions).then(res => res.json()).then(async data => {
            setUser(data.User);
            if (Platform.OS != 'web') {
              //await SecureStore.setItemAsync('token', data.userToken);
            }
            setIsLoading(false);
          });
    }

    const onLogout = () => {
        setUser(null);
        setUserToken(null);
        if (Platform.OS != 'web') {
          //await SecureStore.setItemAsync('token', null);
        }
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