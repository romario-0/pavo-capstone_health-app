import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './pages/Signup';

export default function App() {
  return (
    <View style={styles.container}>
      <Signup/> 
      <StatusBar style="auto" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
});
