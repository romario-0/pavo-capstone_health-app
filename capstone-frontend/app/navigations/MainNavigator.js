import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthenticationContext } from '../services/AuthenticationContext';
import AccountNavigator from './AccountNavigator';
import AppNavigator from './AppNavigator';

const MainNavigator = () => {

    const {user} = useContext(AuthenticationContext);

    return (
        <NavigationContainer>
            { user ? <AppNavigator /> : <AccountNavigator /> }
        </NavigationContainer>
    );
}

export default MainNavigator;