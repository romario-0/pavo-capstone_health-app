import { useContext } from "react";
import { AuthenticationContext } from "../services/AuthenticationContext";
import { Text } from 'react-native'

const HomeScreen = () => {
    const {user} = useContext(AuthenticationContext);
    return (
        <>
            <Text>{user}</Text>
        </>
    );
}

export default HomeScreen;