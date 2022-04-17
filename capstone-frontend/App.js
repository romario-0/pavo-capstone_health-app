import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './app/navigations/MainNavigator';

export default function App() {


  return (
    <>
      <MainNavigator />
      <StatusBar style="auto" />
    </>
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
