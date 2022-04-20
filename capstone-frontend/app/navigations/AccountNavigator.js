import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Health App' }} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
}

export default AccountNavigator;