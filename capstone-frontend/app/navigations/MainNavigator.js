import { NavigationContainer } from '@react-navigation/native';
import AccountNavigator from './AccountNavigator';

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <AccountNavigator />
        </NavigationContainer>
    );
}

export default MainNavigator;