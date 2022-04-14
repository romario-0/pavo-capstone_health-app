import { Button, StyleSheet, View } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View>
            <Button title='Sign in' onPress={() => navigation.navigate('SignIn')} />
            <Button title='Sign up' onPress={() => navigation.navigate('SignUp')} />
        </View>
    );
}

export default WelcomeScreen;