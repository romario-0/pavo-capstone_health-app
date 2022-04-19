import { useContext } from "react";
import { AuthenticationContext } from "../services/AuthenticationContext";
import { FlatList, SafeAreaView, Text } from 'react-native'

const HomeScreen = () => {
    const {user} = useContext(AuthenticationContext);
    return (
        <SafeAreaView>
            <Text>{user}</Text>
            <FlatList >
            </FlatList>
        </SafeAreaView>
    );
}

export default HomeScreen;