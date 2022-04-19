import { useContext } from "react";
import { Text } from "react-native";
import { AuthenticationContext } from "../services/AuthenticationContext";

const ProfileScreen = () => {
    const {user} = useContext(AuthenticationContext);

    return (
        <Text>Profile</Text>
    );
}

export default ProfileScreen;