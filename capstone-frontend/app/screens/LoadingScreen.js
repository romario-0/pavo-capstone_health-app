import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, StyleSheet } from 'react-native';

const LoadingScreen = () => {
    return(
        <View style={styles.container}>
            <FontAwesome name="spinner" size={24} color="white" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center", 
        backgroundColor: 'dodgerblue',
        alignItems:"center"
      },
})

export default LoadingScreen;