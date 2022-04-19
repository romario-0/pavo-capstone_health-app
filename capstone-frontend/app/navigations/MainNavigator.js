import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import { AuthenticationContext } from '../services/AuthenticationContext';
import AccountNavigator from './AccountNavigator';
import AppNavigator from './AppNavigator';

const MainNavigator = () => {

    const {user, isLoading} = useContext(AuthenticationContext);

    return (
        <>
            {isLoading && <LoadingScreen />}
            {
            !isLoading &&
            <NavigationContainer>
                { user ? <AppNavigator /> : <AccountNavigator /> }
            </NavigationContainer>
            }
        </>  
    );
}

export default MainNavigator;